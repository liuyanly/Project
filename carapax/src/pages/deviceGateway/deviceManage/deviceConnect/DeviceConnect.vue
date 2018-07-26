<style lang="scss">
    @import './deviceConnect.scss';
</style>

<template>
    <div id="device-connect">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备接入</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <div style="display:inline-block">
                    <Input v-model="keyword" icon="search" placeholder="请输入..." style="width: 200px"></Input>
                    <Button type="primary" icon="search">搜索</Button>
                </div>
                <div class="toolbar">
                    <Button type="primary" icon="refresh" @click="refreshDeviceList()">刷新</Button>
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '创建设备', '创建')">创建设备</Button>
                    <Button type="error" icon="android-delete" @click="deleteDevices()">删除设备</Button>
                </div>
            </div>
            <Table id="deviceList" stripe :columns="columns" :data="data" :loading="loadingData" @on-selection-change="onSelectChange"></Table>
            <Page class="page" :total="totalSize" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer @on-page-size-change="onPageSizeChange" @on-change="onPageChange"></Page>
        </div>
        <Modal
            width="600"
            v-model="modal.show"
            :okText="modal.okText"
            :title="modal.title"
            :mask-closable="false"
            :loading="loading"
            @on-ok="handleOk()"
            @on-cancel="handleCancel()">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="设备名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="设备名称"></Input>
                </FormItem>
                <FormItem label="设备类型" prop="type">
                    <Select v-model="formValidate.type" placeholder="请选择设备类型" >
                        <Option v-for="item in typeList" :value="item.id" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="proxy" prop="proxy">
                    <Select v-model="formValidate.proxy" placeholder="请选择proxy类型" >
                        <Option v-for="item in proxyList" :value="item.id" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="标签" prop="tags">
                    <Select v-model="formValidate.tags" multiple placeholder="请选择设备标签">
                        <Option v-for="item in tagList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="区域" prop="location">
                    <Input v-model="formValidate.location" placeholder="设备区域"></Input>
                </FormItem>
                <FormItem label="描述" prop="description">
                    <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加设备描述"></Input>
                </FormItem>
                <FormItem label="profile"
                    v-for="(item, index) in formValidate.profiles"
                    :key="index"
                    :prop="'profiles.' + index + '.name'"
                >
                    <div style="display:flex;">
                        <Input v-model="item.attr" placeholder="profile名称"></Input>
                        <Input style="margin-left: 10px;" v-model="item.val" placeholder="profile值"></Input>
                        <Button style="margin-left: 10px;" type="ghost" @click="deleteProfile(index)">Delete</Button>
                    </div>
                </FormItem>
                <FormItem>
                    <Button type="dashed" long @click="addProfile" icon="plus-round">新增profile</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import $ from 'jquery';
    import Vue from 'vue' ;
    import { mapState } from 'vuex';
    import SparkLine from '@/components/SparkLine';
    import getColumns from './deviceConnect';
    
    export default {
        components: {
            SparkLine
        },
        data () {
            return {
                keyword: '',
                modal: {
                    type: '',
                    deviceModal: false,
                    modalOkText: '',
                    modalTitle: ''
                },
                loading: true,
                loadingData: true,
                proxy: [
                    {value:'agent', label:'agent'},
                    {value:'proxy', label:'proxy'},
                ],
                data: [],
                formValidate: {
                    name: '',
                    type: '',
                    proxy: '',
                    tags: [],
                    location: '',
                    description: '',
                    profiles: [
                        { attr: '',  val: '' }
                    ],
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '设备名称不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择设备类型', trigger: 'blur' }
                    ],
                    proxy: [
                        { required: true, message: '请选择proxy', trigger: 'blur' }
                    ],
                },
                pageSize: 10,
                pageNum: 1,
                totalSize: 0
            }
        },
        components: { SparkLine },
        created() {
            this.columns = getColumns(this, SparkLine);
            this.getList();
        },
        computed: mapState({
            changeProject: state => state.changeProject,
            deviceList: state => state.gateway.deviceList,
            typeList: state => {
                return state.gateway.deviceTypeList.length ? state.gateway.deviceTypeList : [];
            },
            tagList: state => {
                return state.gateway.deviceTagList.length ? state.gateway.deviceTagList : [];
            },
            proxyList: state => {
                return state.gateway.proxyList.length ? state.gateway.proxyList : []
            }
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            deviceList: {
                handler:function(val, oldval) {
                    if(val.data) {
                        this.setDeviceList(val);
                    }
                },
                deep:true
            }
        },
        methods: {
            getList() {
                const { deviceList, deviceTypeList, proxyList ,deviceTagList} = this.$store.state.gateway;
                if(!deviceList.data) {
                    this.$store.dispatch('getDeviceList', {pageSize: this.pageSize, pageNum: this.pageNum });
                } else {
                    this.setDeviceList(deviceList);
                }
                if(deviceTypeList.length === 0) {
                    this.$store.dispatch('getDeviceTypeList');
                }
                if(proxyList.length === 0) {
                    this.$store.dispatch('getProxyList');
                }
                if(deviceTagList.length === 0) {
                    this.$store.dispatch('getDeviceTagList');
                }
            },
            changeLoading() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
            },
            showModal(type, show, title, okText) {
                this.modal = {
                    type: type,
                    show: show,
                    title: title,
                    okText: okText
                };
            },
            onSelectChange(selection) {     //获取批量删除的行号（倒序）
                this.index = [];
                this.index = this.$util.getSelectList(this.data, selection, "id");
                this.index = this.index.reverse();
            },
            handleReset () {
                this.$refs['formValidate'].resetFields();
                this.formValidate.profiles = [{attr: '', val:''}];
                this.formValidate.tags = [];
            },
            addProfile() {
                this.formValidate.profiles.push({ attr: '', val:''});
            },
            deleteProfile(index) {
                this.formValidate.profiles.splice(index, 1);
            },
            handleCancel() {
                this.handleReset();
            },
            onPageChange(pageNum) {
                this.loadingData = true;
                this.$store.dispatch('getDeviceList', {pageSize: this.pageSize, pageNum: pageNum });
            },
            onPageSizeChange(pageSize) {
                this.$store.dispatch('getDeviceList', {pageSize: pageSize, pageNum: this.pageNum });
            },
            handleOk() {
                this.$refs['formValidate'].validate(async (valid) => {
                    if (!valid) {
                        this.changeLoading();
                    } else {
                        if(this.modal.type === 'create') {
                            const deviceId = await this.createDevice();
                            const typeId   = this.formValidate.type;
                            const proxyId  = this.formValidate.proxy;
                            const tagIds   = this.formValidate.tags;
                            const profiles = this.formValidate.profiles[0].attr ? this.formatProfiles(this.formValidate.profiles) : null;

                            await this.bindDeviceType(deviceId, typeId);
                            await this.bindProxy(deviceId, proxyId);
                            if(tagIds.length) {
                                await this.bindDeviceTag(deviceId, tagIds);
                            }
                            if(profiles) {
                                await this.bindDeviceProfile(deviceId, profiles);
                            }
                            this.$store.dispatch('getDeviceList', { pageSize: this.pageSize, pageNum:this.pageNum });
                            this.modal.show = false;
                            this.handleReset();
                            this.$Message.success('设备创建成功!');
                        } else {
                            this.editDevice();
                        }
                    }
                })
            },
            refreshDeviceList() {
                this.loadingData = true;
                this.$store.dispatch('getDeviceList', {pageSize: this.pageSize, pageNum:this.pageNum });
            },
            setDeviceList(data) {
                this.loadingData = false;
                this.data = [];
                this.totalSize = data.total_size;
                this.data = data.data
            },
            async bindDeviceType(deviceId, typeId) {
                const url  = `/gateway/devices/${deviceId}/bind/devicetype/${typeId}/`;
                let res = await this.$util.http.post(url);
                if(res.status !== 200 || res.data.status !== 'success') this.$Message.warning('绑定类型失败!')
            },
            async bindProxy(deviceId, proxyId) {
                const url = `/gateway/proxy/${proxyId}/bind/device/${deviceId}/`;
                let res = await this.$util.http.post(url);
                if(res.status !== 200 || res.data.status !== 'success') this.$Message.warning('绑定proxy失败!')
            },
            async bindDeviceTag(deviceId, tagIds) {
                const url  = `/gateway/devices/${deviceId}/tags/`;
                let res = await this.$util.http.post(url, tagIds);
                if(res.status !== 200 || res.data.status !== 'success') this.$Message.warning('绑定标签失败!')
            },
            async bindDeviceProfile(deviceId, profiles) {
                const url = `/gateway/devices/${deviceId}/profile/`;
                let res = await this.$util.http.patch(url, profiles);
                if(res.status !== 200 || res.data.status !== 'success') this.$Message.warning('添加profile失败!')
            },
            async createDevice() {
                const params = {
                    name: this.formValidate.name,
                    location: this.formValidate.location,
                    description: this.formValidate.description,
                };
                let res  = await this.$util.http.post('/gateway/devices/', params);
                const deviceId = res.data.data.id;
                return deviceId;
            },
            async editDevice(data) {
                
            },
            fillValue(data) {
                this.formValidate = {
                    name: data.name,
                    type: data.type ? data.type.id : '',
                    proxy: data.proxy ? data.proxy.id : '',
                    location: data.location,
                    description: data.description
                    //等等
                }
            },
            async deleteDevice(data) {
                this.$Message.info({
                    content: '删除中...',
                    duration: 0
                });
                const url = `/gateway/devices/${data.id}/`;
                let res = await this.$util.http.delete(url);
                if(res.status === 200) {
                    this.$store.dispatch('getDeviceList', {pageSize: this.pageSize, pageNum:this.pageNum });
                    this.$Message.destroy();
                    this.$Message.success('删除成功！');
                } else {
                    this.$Message.success('删除失败！');
                }
            },
            deleteDevices() {
                if(this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for(let index of this.index) {
                                // this.deleteDevice(this.data[index]);
                            }
                        }
                    });
                } else {
                    this.$Message.warning('至少选中一项！');
                }
            },
            formatProfiles(profiles) {
                let objs = {};
                for(let item of profiles) {
                    objs[item.attr] = item.val;
                }
                return objs;
            },
            checkOfflineDeviceMsg() {
                //设备离线原因展示（hover某一行时 提醒）
                $("#deviceList .ivu-table-row").each(function(index,element) {
                    let hasOffline = $(this).find(".status").hasClass("offline");
                    if(hasOffline) {
                        $(this).mouseenter(function() {
                            $(this).find(".offline").click();
                        });
                        $(this).mouseleave(function() {
                            $(this).find(".offline").click();
                        });
                    }
                });
            }
        },
        mounted() {
            //设备状态颜色区分提醒
            $("#deviceList .ivu-table-filter-select-item").each(function(index,element) {
                if(index === 1) $(this).prepend("<span class='status init' style='margin-right: 5px' ></span>")
                else if (index === 2) $(this).prepend("<span class='status online-1' style='margin-right: 5px' ></span>")
                else if (index === 3) $(this).prepend("<span class='status offline' style='margin-right: 5px' ></span>")
            });
            this.checkOfflineDeviceMsg();
        },
        updated() {
            this.checkOfflineDeviceMsg();
        }
    }
</script>