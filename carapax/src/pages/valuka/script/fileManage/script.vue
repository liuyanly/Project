<style scoped lang="scss">
    .container {
        display: flex;
    }
    .nav {
        position: absolute;
        width: 240px;
        background-color: #f0f0f0;
        ul {
            margin-top: 20px;
            li {
                height: 50px;
                padding: 17px 0;
                text-align: center;
                border-bottom: 1px dashed #d2d3d2;
                span {
                    font-size: 14px;
                    color: #495060; 
                    margin-left: 10px;
                }
            }
        }
    }
    .nav-content {
        position: absolute;
        margin-left: 240px;
        padding:15px;
        box-shadow: 2px 2px 10px 2px rgba(0,0,0,.1);
    }
    .tags-container {
        min-height: 48px;
        border-radius: 5px;
        padding: 10px 15px;
        border: 1px #ccc solid;
        margin-bottom: 15px;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/script">计算平台</BreadcrumbItem>
                <BreadcrumbItem href="/script">文件管理</BreadcrumbItem>
                <BreadcrumbItem href="/script">算法管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content" >
            <div class="header">
                <span class="title">算法文件列表</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '上传算法文件', '上传')">上传算法</Button>
                    <Button type="error" icon="android-delete" @click="deleteScripts()">删除算法</Button>
                    </Poptip>
                </div>
            </div>
            <Table stripe :columns="columns" :data="data" :loading="table.loadingData" @on-selection-change="onSelectChange"></Table>
            <Page class="page" :total="table.total" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer></Page>
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
                <FormItem label="算法文件" prop="scriptFile">
                <!-- iview的Upload action的计算属性无效， 故重写组件为UploadFile，在手动上传时，传入uploadUrl-->
                    <UploadFile     
                        ref="upload"
                        multiple
                        type="drag"
                        :headers="headers"
                        :data="body"
                        :action="''"
                        :before-upload="handleUpload"
                        :on-success="handleSuccess">
                        <div>
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </UploadFile>
                    <div v-if="file !== null">
                        算法文件：{{ file.name }} 
                    </div>
                </FormItem>
                <FormItem label="算法名称" prop="scriptName">
                    <Input v-model="formValidate.scriptName" placeholder="算法名称"></Input>
                </FormItem>
                <FormItem label="算法类型" prop="scriptType">
                    <Select v-model="formValidate.scriptType" placeholder="算法类型">
                        <Option value="jstorm">在线计算</Option>
                        <Option value="spark">离线计算</Option>
                    </Select>
                </FormItem>
                <FormItem label="主类" prop="mainClass" v-if="formValidate.scriptType === 'spark'">
                    <Input v-model="formValidate.mainClass" placeholder="主类"></Input>
                </FormItem>
                <FormItem label="语言类型" prop="language" v-if="formValidate.scriptType === 'spark'">
                   <Input v-model="formValidate.language" placeholder="语言类型"></Input>
                </FormItem>
                <FormItem label="描述" prop="description">
                    <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加标签描述"></Input>
                </FormItem>
                <FormItem label="输入参数" v-if="formValidate.scriptType === 'spark'"
                    v-for="(item, index) in formValidate.items"
                    :key="index"
                    :prop="'items.' + index + '.name'">
                    <Row type="flex" justify="space-between">
                        <Col span="11">
                            <Input v-model="item.name" placeholder="参数名"></Input>
                        </Col>
                        <Col span="11">
                            <Input v-model="item.description" placeholder="描述"></Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem v-if="formValidate.scriptType === 'spark'">
                    <Row>
                        <Col span="8">
                            <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            width="600"
            v-model="scriptTag.modal"
            okText="确定"
            title="添加算法标签"
            :closable="false"
            :mask-closable="false">
            <template v-if="scriptTagList">
                <div class="tags-container">
                    <Tag v-for="(tag, index) of scriptTag.list" :key="index" :name="tag.tagId" closable @on-close="deleteTags">{{tag.tagName}}</Tag>
                </div>
                <Row :gutter="16">
                    <Col span="16">
                        <Select filterable label-in-value  placeholder="选择标签" @on-change="onChange">
                            <Option v-for="tag of scriptTagList" :key="tag.tagId" :value="tag.tagId">{{tag.tagName}}</Option>
                        </Select>
                    </Col>
                    <Col span="8" style="line-height: 32px">
                        <Button icon="ios-plus-empty" type="dashed" size="small" @click="addTags()">添加标签</Button>
                    </Col>
                </Row>
            </template>
            <div slot="footer">
                <span style="float: left;line-height: 35px;">注：一个算法只能添加一个标签</span>
                <Button type="primary" size="large" @click="handleCloseTag()">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import UploadFile from "@/components/iview/UploadFile.vue";
    
    export default {
        components: { UploadFile },
        data () {
            return {
                scriptTagList: [],
                scriptTag: {
                    modal: false,
                    scriptId: '',
                    select: '',
                    list: [],
                },
                modal: {
                    type: '',
                    show: false,
                    text: '',
                    title: '',
                },
                loading: true,
                file: null,
                uploadUrl: '',
                headers: { "X-OAUTH-TOKEN": localStorage.token },
                body: { "file": null, "type": '' },
                table: {
                    loadingData: true,
                    total: 0,
                },
                data: [],
                columns: [
                    {type: 'selection', width: 60, align: 'center'},
                    {title: '算法名称', key: 'scriptName',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            console.log(params.row);
                                            this.$router.push({ path: '/scriptInfo', query: { id: params.row.scriptId }});
                                        }
                                    }
                                } ,params.row.scriptName)
                            ]);
                        }
                    },
                    { title: '计算类型', key: 'type', align: 'center',
                        filters: [
                            { label: '在线计算', value: 0 },
                            { label: '离线计算', value: 1 }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if(value === 0) {
                                return row.type === 'jstorm';
                            } else if (value === 1) {
                                return row.type === 'spark';
                            }
                        },
                        render: (h, params) => {
                            return (
                                h('span',{},params.row.type === 'jstorm' ? '在线' : '离线')
                            );
                        }
                    },
                    {title: '创建时间', key: 'createTime', sortable: true,
                        render: (h, params) => {
                            return h('span',{},this.$util.common.formatDateTime(params.row.createTime))
                        }
                    },
                    {title: '修改时间', key: 'updateTime', sortable: true,
                        render: (h, params) => {
                            return h('span',{},this.$util.common.formatDateTime(params.row.updateTime))
                        }
                    },
                    // {title: '状态', key: 'status'},
                    // { title: '状态', key: 'status', 
                    //     filters: [
                    //         { label: '初始化', value: 0 },
                    //         { label: '完成', value: 1 }
                    //     ],
                    //     filterMultiple: false,
                    //     filterMethod (value, row) {
                    //         if(value === 0) return row.status === '0'
                    //         else if (value === 1) return row.status === '1'
                    //     },
                    //     render: (h, params) => {
                    //         return h('div',{
                    //             style: { height:'20px', paddingTop: '2px' }
                    //         },[
                    //             h('span', {
                    //                 class: params.row.status ? 'status online' : 'status init'
                    //             }),
                    //             h('span', {
                    //                 style: { paddingLeft: '10px' }
                    //             })
                    //         ]);
                    //     }
                    // },
                    {title: '描述', key: 'description'},
                    {title: '操作', key: 'actions', align: 'center', width: '25%',
                        render: (h, params) => {
                            return h('div', [
                                h('a', { 
                                    on: { click: () => {
                                            this.scriptTag.modal = true; 
                                            this.scriptTag.scriptId = params.row.scriptId;
                                            this.getCurrentTags(params.row.scriptId);
                                        } 
                                    } 
                                }, '标签'),
                                h('span', {style: {color: '#ccc',padding: '0 10px',}}, '|'),
                                h('a', { 
                                    on: {
                                        click: () => {
                                            this.downloadScript(params.row);
                                        }
                                    }
                                },'下载'),
                                h('span', {style: {color: '#ccc',padding: '0 10px',}}, '|'),
                                h('a', { 
                                    on: { click: () => { 
                                            this.editScriptId = params.row.scriptId;
                                            this.showModal('edit', true, '编辑', '确定');
                                            console.log(params.row);
                                            // this.formValidate.scriptType = params.row.type;
                                        } 
                                    } 
                                }, '编辑'),
                                h('span', {style: {color: '#ccc',padding: '0 10px',}}, '|'),
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
                                                this.deleteScript(params.row);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                formValidate: {
                    scriptFile: '',
                    // scriptName: '',
                    scriptType: '',
                    mainClass: '',
                    language: '',
                    description: '',
                    items: [{
                        name: '',
                        description: ''
                    }],
                },
                ruleValidate: {
                    scriptName: [
                        { required: true, message: '请输入算法名称', trigger: 'blur' }
                    ],
                    scriptType: [
                        { required: true, message: '请选择算法类型', trigger: 'change' }
                    ],
                    mainClass: [
                        { required: true, message: '请输入主类', trigger: 'blur' }
                    ],
                    language: [
                        { required: true, message: '请输入语言类型', trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.getList();
        },
        computed: mapState({
            changeProject:  state => state.changeProject,
            scriptList: state => state.valuka.scriptList,
            scriptTagList1: state => state.valuka.scriptTagList
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            scriptList: {
                handler:function(val,oldval){
                    this.table.loadingData = false;
                    this.setScriptList(val);
                },
                deep:true
            },
            scriptTagList1: {
                handler:function(val,oldval){
                    this.scriptTagList = this.scriptTagList.concat(val);
                },
                deep:true
            }
        },
        methods: {
            getList() {
                const { scriptList, scriptTagList } = this.$store.state.valuka;
                if(scriptList.length === 0) {
                    this.$store.dispatch('getScriptList', '/scripts?status=1');
                } else {
                    this.table.loadingData = false;
                    this.setScriptList(scriptList);
                }
                if(scriptTagList.length === 0) {
                    this.$store.dispatch('getScriptTagList');
                } else {
                    this.scriptTagList = scriptTagList;
                }
            },
            handleUpload (file) {
                this.file = file;
                return false;
            },
            handleAdd () {
                this.formValidate.items.push({ name: '', description: '' });
            },
            handleSuccess(response, file, fileList) {
                this.handleReset();
                this.$Message.success('上传成功！');
                this.$store.dispatch('getScriptList');
                this.modal.show = false;
            },
            changeLoading() {
                this.loading = false;
                this.$nextTick(() =>  this.loading = true );
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
                this.index = this.$util.getSelectList(this.data, selection, "scriptId");
                this.index = this.index.reverse();
            },
            handleReset() {
                this.$refs['formValidate'].resetFields();
                this.formValidate.items = [{name: '',description: ''}];
                this.file = null;
                this.$refs.upload.clearFiles();
            },
            handleCloseTag() {
                this.scriptTag = {  //重置弹窗
                    modal: false,
                    scriptId: '',
                    select: '',
                    list: [],
                }
            },
            handleCancel() {
                this.handleReset();
            },
            handleOk() {
                this.$refs['formValidate'].validate(valid => {
                    if (!valid) {
                        this.changeLoading();
                    } else {
                        if(this.modal.type === 'create') {
                            this.uploadScriptFile();
                        } else {
                            this.editScript();
                        }
                    }
                })
            },
            async setScriptList(scriptList) {
                this.data = [];
                this.data = scriptList.rows;
                this.table.total = scriptList.total;
            },
            async editScript() {
                // if(1) {  //未重新上传脚本
                //     const url = `/scripts/${this.editScriptId}?description=${this.formValidate.description}`;
                //     let res = await this.$util.http.put(url);
                //     if(res) {
                //         this.modal.show = false;
                //         this.$Message.success('更新成功！');
                //     }
                // } else {

                // }
            },
            async uploadScriptFile() {
                let scriptId = await this.getScriptId();
                const uploadUrl = `/scripts/${scriptId}/files`;
                this.body.file = this.file;
                this.body.type = this.formValidate.scriptType;
                this.$refs.upload.post(this.file, uploadUrl);
            },
            async getScriptId() {  //提交元数据，获取id
                const params = { 
                    scriptName: this.formValidate.scriptName,
                    // fileName: this.file.name,
                    type: this.formValidate.scriptType,
                    description: this.formValidate.description,
                    inputParamsPOs: []
                };
                if(params.type === 'spark') {
                    params.language = this.formValidate.language;
                }
                for(let item of this.formValidate.items) {
                    params.inputParamsPOs.push({
                        name: item.name, 
                        description: item.description,
                    });
                }
                console.log(params);
                let res = await this.$util.http.post('/valuka/scripts/', params);
                return res.data.data;
            },
            downloadScript(data) {
                const url = '/valuka/scripts/' + data.scriptId + '/files/' + data.scriptName;
                this.$util.http.get(url);
            },
            async deleteScript(data) {
                console.log(data);
                const url = `/valuka/scripts/${data.scriptId}`;  //软删除（日志）
                // let url = '/scripts/' + data.scriptId + '/files/' + data.fileName; //硬删除（删除文件）
                let res = await this.$util.http.delete(url);
                if(res) {
                    this.$Message.success('删除成功！');
                    this.$store.dispatch('getScriptList');
                }
            },
            deleteScripts() {
                if(this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for(let index of this.index) {
                                this.deleteDeviceTag(this.data[index]);
                            }
                        }
                    });
                } else {
                    // this.$Message.info('至少选中一项！');
                }
            },

            //tags
            async getCurrentTags(scriptId) {
                const url = `/valuka/scripts/${scriptId}/tags`;
                let res = await this.$util.http.get(url);
                console.log(res);
                if(res.data.errorCode == 200) {
                    for(let tag of res.data.data) {
                        this.scriptTag.list.push(tag);
                    }
                }
            },
            onChange(option) {
                this.scriptTag.select = {
                    tagId: option.value,
                    tagName: option.label
                }
            },
            async addTags() {
                if(this.scriptTag.list.length) {
                    return;  
                } else {
                    this.scriptTag.list.push(this.scriptTag.select);
                    const url = `/valuka/scripts/${this.scriptTag.scriptId}/tags/${this.scriptTag.select.tagId}`;
                    let res = await this.$util.http.post(url);
                    console.log(this.scriptTag.select);
                }
            },
            deleteTags (event, name) {
                const index = this.scriptTag.list.indexOf(name);
                this.scriptTag.list.splice(index, 1);
                const url = `/valuka/scripts/${this.scriptTag.scriptId}/tags/${name}`;
                this.$util.http.delete(url);
            },
            handleCancelTag() {
                this.scriptTag = {
                    modal: false,
                    scriptId: '',
                    select: '',
                    list: [],
                };
            }
        }
    }
</script>