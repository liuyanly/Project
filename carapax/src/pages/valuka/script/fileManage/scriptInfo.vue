<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        .script-tag {
            display: inline-block;
            margin-right: 15px;
        }
        .params {
            padding: 20px;
            .card {
                box-shadow: 0 1px 6px rgba(0,0,0,.2);
                border-color: #eee;
                span {
                    padding-bottom: 5px;
                }
                .label {
                    display: inline-block;
                    color:#999;
                    min-width: 120px;
                    margin-right: 30px;
                    text-align: right;
                }
            }
        }
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
                <BreadcrumbItem href="/scriptInfo">算法详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Tabs :animated="false">
                <TabPane label="概况" name="summary">
                    <InfoTable title="算法详情" :config="scriptInfo" :data="script">
                        <tr slot="body">
                            <td colspan="3">
                                <span class="label">算法标签：</span>
                                <a class="script-tag" @click="checkScriptInfo(scriptTag.tagId)">{{scriptTag.tagName}}</a>
                                <div v-if="scriptTag.tagName" class="script-tag" @click="checkScriptInfo(scriptTag.tagId)">
                                    <Tag color="green">{{scriptTag.tagName}}</Tag>
                                </div>
                            </td>
                        </tr>
                        <tr slot="body">
                            <td colspan="3">
                                <span class="label">文件内容：</span>
                                <span v-if="script.type === 'spark'">非文本内容</span>
                                <pre v-else v-highlight>
                                    <code class="groovy" v-html="script.fileContent"></code>
                                </pre>
                            </td>
                        </tr>
                    </InfoTable>
                </TabPane>
                <TabPane label="参数" name="params">
                    <Row class="params">
                        <Col span="11">
                            <Card class="card" :bordered="false">
                                <p slot="title">输入参数</p>
                                <p v-for="(input,index) of scriptParam.require" :key="index">
                                    <span class="label">{{input.name}}：</span>
                                    <span>{{input.description}}</span>
                                </p>
                            </Card>
                        </Col>
                        <Col span="11" offset="2">
                            <Card class="card" :bordered="false">
                                <p slot="title">输出参数</p>
                                <p v-for="(output,index) of scriptParam.output" :key="index">
                                    <span class="label">{{output.name}}：</span>
                                    <span>{{output.description}}</span>
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>   
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import InfoTable from '@/components/infoTable/InfoTable';
    import config from '@/config/config.js';
    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                script: {},
                scriptTag: {},
                scriptParam: {
                    require: [],
                    output: []
                },
                scriptInfo: []
            }
        },
        created() {
            const scriptId = this.$router.history.current.query.id;
            this.getScriptInfo(scriptId);
            this.getScriptTag(scriptId);
            this.getScriptParam(scriptId);
        },
        methods: { 
            async getScriptInfo(scriptId) {
                const url = `/valuka/scripts/${scriptId}`;
                let res = await this.$util.http.get(url);
                this.script = res.data.data[0];
                if(this.script.type === 'jstorm') {
                    this.scriptInfo = config.info.script.online;
                } else {
                    this.scriptInfo = config.info.script.offline;
                }
            },
            async getScriptTag(scriptId) {
                const url = `/valuka/scripts/${scriptId}/tags`;
                let res = await this.$util.http.get(url);
                this.scriptTag = res.data.data[0];
            },
            async getScriptParam(scriptId) {
                const url = `/valuka/scripts/parameter/${scriptId}`;
                let res = await this.$util.http.get(url);
                this.scriptParam = res.data.data;
                if(!this.scriptParam.hasOwnProperty('require')) {
                    this.scriptParam = {
                        require: this.scriptParam,
                        output: []
                    }
                }
            },
            checkScriptInfo(tagId) {
                this.$router.push({ path: '/scriptTagInfo', query: { id: tagId }});
            }
        }
    }
</script>
