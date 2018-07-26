<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/script">计算平台</BreadcrumbItem>
                <BreadcrumbItem href="/scriptTag">标签管理</BreadcrumbItem>
                <BreadcrumbItem href="/scriptTag">标签管理</BreadcrumbItem>
                <BreadcrumbItem href="/scriptTagInfo">标签详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div>
                <InfoTable title="算法标签详情" :config="tagInfo" :data="tag"></InfoTable>
                <!-- <div class="info-header">
                    <span class="title">算法标签详情</span>
                </div>
                <table>
                    <tbody>
                        <tr v-for="item of tagInfo">
                            <td v-for="info of item" :colspan="info.colspan">
                                <span class="label">{{info.label}}：</span>
                                <span>{{info.render ? info.render(tag[info.value]) : tag[info.value]}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <span class="label">算法列表：</span>
                                <span class="device-list" v-for="item of scriptList">
                                    <a @click="checkScriptInfo(item.scriptId)">{{item.fileName}}</a>
                                </span>
                            </td>
                        </tr> -->
                        <!-- <tr>
                            <td colspan='3'>
                                <span class="label">算法列表：</span>
                                <span v-for="item of data.domain.projects">
                                    <span  @click="checkProjectInfo(item)">
                                      <Tag type="border" color="green">{{item.name}}</Tag>
                                    </span>
                                </span>
                            </td>
                        </tr> -->
                    <!-- </tbody>
                </table> -->
            </div>
        </div>
    </div>
</template>
<script>
    import InfoTable from '@/components/infoTable/InfoTable';
    import config from '@/config/config.js';
    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                tag: {},
                scriptList: [],
                tagInfo: config.info.scriptTag,
            }
        },
        created() {
            const tagId = this.$router.history.current.query.id;
            this.getTagInfo(tagId);
            this.getScriptList(tagId);
        },
        methods: {
            async getTagInfo(tagId) {
                const url = `/valuka/tags/${tagId}`;
                let res = await this.$util.http.get(url);
                this.tag = res.data.data;
                console.log(this.tag);
            },
            async getScriptList(tagId) {
                const url = `/valuka/tags/${tagId}/scripts`;
                let res = await this.$util.http.get(url);
                this.scriptList = res.data.data;
            },
            checkScriptInfo(scriptId) {
                console.log(scriptId);
                this.$router.push({path: '/scriptInfo', query: { id: scriptId}});
            }
        }
    }
</script>
