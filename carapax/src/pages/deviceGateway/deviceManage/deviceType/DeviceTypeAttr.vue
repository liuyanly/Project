<style rel="stylesheet/scss" lang="scss" scoped>
    table {
        border-collapse:collapse;
        .label {
            color: #999;
        }
    }
    td {
        padding: 11px 20px;
        border: 1px solid #eeeeee;
    }
    .content {
        padding: 15px;
        table {
            margin-bottom: 25px;
            width: 100%;
        }
    }
    .info-header {
        text-align: left;
        margin-top: 10px;
        margin-bottom: -1px;
        height: 40px;
        background: #F5f6FA;
        line-height: 38px;
        border: 1px solid #e1e6eb;
        position: relative;
        border-left: 4px solid #6d7781;
        .title {
            font-size: 14px;
            color: #333333;
            display: inline-block;
            margin-left: 16px;
        }
    }
    .create-attr {
        &:before {
            content: "*";
            display: inline-block;
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed3f14;
        }
    }
    .device-list {
        margin-right: 20px;
    }
    .label {
        display: inline-block;
        color: #999;
        min-width: 60px;
        text-align: right;
    }
</style>

<template>
    <div>
        <div class="content">
            <div class="header">
                <span class="title">{{title}}</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '创建指标', '创建')">创建指标</Button>
                    <Button type="error" icon="android-delete" @click="deleteAttrs()">删除指标</Button>
                    </Poptip>
                </div>
            </div>
            <Table stripe :columns="columns" :data="data" :loading="loadingData" @on-selection-change="onSelectChange"></Table>
            <!--<Page class="page" show-total show-elevator show-sizer :total="data.length" :page-size="10" :page-size-opts="[5,10,15,20]" ></Page>-->

            <Page class="page" :total="totalSize" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer @on-page-size-change="onPageSizeChange" @on-change="onPageChange"></Page>
        </div>
        <Modal
            width="800"
            v-model="modal.show"
            :okText="modal.okText"
            :title="modal.title"
            :mask-closable="false"
            :loading="loading"
            @on-ok="handleOk()"
            @on-cancel="handleCancel()">
            <Row :gutter="16">
                <Col span="8"><label class="create-attr">名称</label></Col>
                <Col span="8"><label class="create-attr">类型</label></Col>
                <Col span="8"><label>描述</label></Col>
            </Row>
            <Form ref="formValidate" :model="formValidate">
                <FormItem
                    v-for="(item, index) in formValidate.items"
                    :key="index"
                    :prop="'items.' + index + '.name'"
                    :rules="{required: true, message: '名称和类型不能为空', trigger: 'blur'}"
                >
                    <Row :gutter="16">
                        <Col span="8">
                            <Input v-model="item.name" placeholder="指标名称"></Input>
                        </Col>
                        <Col span="8">
                            <Input v-model="item.value_type" placeholder="数据类型"></Input>
                        </Col>
                        <Col span="8">
                            <Input v-model="item.description" placeholder="添加指标描述"></Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="8">
                            <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            width="500"
            v-model="modalAttr"
            title="指标信息"
            cancel-text="关闭">
            <div v-if="deviceTypeAttr.id">
                <p v-for="item of deviceTypeAttrConfig">
                    <span class="label">{{item.label}}：</span>
                    <span>{{ item.render ? item.render(deviceTypeAttr[item.value]) : deviceTypeAttr[item.value]}}</span>
                </p>
            </div>
        </Modal>
    </div>
</template>
<script>
    import config from '@/config/config.js';
    export default {
        data () {
            return {
                modalAttr: false,
                modal: {
                    type: '',
                    deviceModal: false,
                    modalOkText: '',
                    modalTitle: ''
                },
                loading: true,
                loadingData: true,

                deviceTypeAttr: {},
                deviceTypeAttrConfig: config.info.deviceTypeAttr,
                data: [],
                columns: [
                    { type: 'selection', width: 60, align: 'center' },
                    { title: '指标名称', key: 'name',
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.modalAttr = true;
                                        this.deviceTypeAttr = params.row;
                                    }
                                }
                            }, params.row.name)
                        }
                    },
                    { title: '指标类型', key: 'value_type', },
                    { title: '创建时间', key: 'create_at',sortable: true,
                        render: (h, params) => {
                            return h('span',{},this.$util.common.formatDateTime(params.row.create_at))
                        }
                    },
                    { title: '描述', key: 'description',
                    },
                    {
                        title: '操作',
                        key: 'actions',
                        align: 'center',
                        width: '15%',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.showModal('edit', true, '编辑设备', '确定')
                                            this.editDeviceTypeAttr(params.row);
                                        }
                                    }
                                }, '编辑'),
                                h('span', {
                                    style: {
                                        color: '#ccc',
                                        padding: '0 10px',
                                    }
                                }, '|'),
                                h('a',[
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '确定要删除吗！',
                                            placement: 'left-start',
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.deleteAttr([params.row.id], [params.row._index]);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                formValidate: {
                    items: [{
                        name: '',
                        description: '',
                        value_type:''
                    }]
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '指标名称不能为空', trigger: 'blur' }
                    ],
                    value_type: [
                        { required: true, message: '指标类型不能为空', trigger: 'blur' }
                    ],
                },
                pageSize: 10,
                pageNum: 1,
                totalSize: 0
            }
        },
        props: {
            id: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            }
        },
        computed: {
            title: function() {
                return this.type === 'physics' ? '物理指标' : '计算指标';
            }
        },
        watch: {
            id: function(val, oldVal) {
                if(val) {
                    this.deviceTypeId = val;
                    this.getAttrList(this.pageSize,this.pageNum);
                }
            }
        },
        methods: {
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
                // this.index = this.index.reverse();
            },
            handleAdd () {
                this.formValidate.items.push({
                    name: '',
                    description: '',
                    value_type:''
                });
            },
            handleReset () {
                this.$refs['formValidate'].resetFields();
                this.formValidate.items = [{
                    name: '',
                    description: '',
                    value_type:''
                }];
            },
            handleCancel() {
                this.handleReset();
            },
            handleOk() {
                this.$refs['formValidate'].validate((valid) => {
                    if (!valid) {
                        this.changeLoading();
                    } else {
                        if(this.modal.type === 'create') {
                            console.log(this.type);
                            this.createAttr(this.deviceTypeId, this.type);
                        } else {
                            this.editAttr();
                        }
                    }
                })
            },
            checkDeviceInfo(deviceId) {
                console.log(deviceId);
                this.$router.push({path: '/deviceInfo', query: { id: deviceId}});
            },
            async getAttrList(pageSize,pageNum) {
                let url = '';
                if(this.type === 'physics') {
                    url = `/gateway/devicetypes/${this.deviceTypeId}/attributes/?category=1&page_size=${pageSize}&page_number=${pageNum}`; //物理指标
                } else {
                    url = `/gateway/devicetypes/${this.deviceTypeId}/attributes/?category=2&page_size=${pageSize}&page_number=${pageNum}`; //计算指标
                }

                let response = await this.$util.http.get(url);
                if(response.data.status === 'success') {
                    this.loadingData = false;
                    this.data = response.data.data;
                    this.totalSize = response.data.total_size;
                }
            },
            async createAttr(id, type) {
                let url = '';
                if(type === 'physics') {
                    url = `/gateway/devicetypes/${id}/attributes/?category=1`; //物理指标
                } else {
                    url = `/gateway/devicetypes/${id}/attributes/?category=2`; //计算指标
                }
                let params = [];
                for(let item of this.formValidate.items) {
                    params.push({
                        name: item.name,
                        value_type: item.value_type,
                        description: item.description,
                    });
                }
                let response = await this.$util.http.post(url, params);
                console.log(response);
                if(response.status === 200 && response.data.status === 'success') {
                    this.getAttrList(this.pageSize,this.pageNum);
                    this.$Message.success('创建指标成功！');
                    this.modal.show = false;
                    this.handleReset();
                }
            },
            onPageChange(pageNum) {
                this.getAttrList(this.pageSize,pageNum);
            },
            onPageSizeChange(pageSize) {
                this.getAttrList(pageSize,this.pageNum);
            },
            editAttr(data) {
                this.modal = {
                    type: 'edit',
                    deviceModal: true,
                    modalTitle: '编辑设备',
                    modalOkText: '确定'
                }
                this.formValidate = {
                    deviceName: data.deviceName,
                    deviceAccess: data.deviceAccess,
                    deviceType: data.deviceType,
                    deviceState: data.deviceState,
                    //等等
                }
                this.editRow = this.$util.getEditRowNum(this.data, data.deviceName, "deviceName");
            },
            async deleteAttr(attrIdArray, rowNumArray) {
                console.log(this.deviceTypeId);
                const url = `/gateway/devicetypes/${this.deviceTypeId}/attributes/`;
                let response = await this.$util.http.delete(url, attrIdArray);
                if(response.data.status === "success") {
                    this.getAttrList(this.pageSize,this.pageNum);
                    this.$Message.success('删除成功！');
                }
            },
            deleteAttrs() {
                if(this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            let attrIdArray = [];
                            for(let index of this.index) {
                                attrIdArray.push(this.data[index].id);
                            }
                            // this.deleteDeviceTypeAttr(attrIdArray, this.index.reverse());
                        }
                    });
                } else {
                    this.$Message.warning('至少选中一项！');
                }
            },
        }
    }
</script>
