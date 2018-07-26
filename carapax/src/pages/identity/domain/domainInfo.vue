<style rel="stylesheet/scss" lang="scss" scoped>
    .tag-span{
        border:1px solid #19be6b;
        padding:4px 6px;
        border-radius: 3px;
        margin: 0 4px;
        color: #19be6b;
        cursor: pointer;
    }

</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
                <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
                <BreadcrumbItem href="/domains">域</BreadcrumbItem>
                <BreadcrumbItem href="/domainInfo">域信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div>
                <InfoTable title="域信息" :config="configs" :data="data.domain">
                    <tr slot="body">
                        <td colspan='3'>
                            <span class="label" >项目：</span>
                            <div  @click="checkProjectInfo(item)" v-for="item of data.domain.projects"  style="display: inline-block">
                                <span  class="tag-span">{{item.name}}</span>
                            </div>
                        </td>
                    </tr>
                </InfoTable>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import InfoTable from '@/components/infoTable/InfoTable';
  import  config  from '@/config/config.js';

    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                configs: config.info.domainInfo,
                data: {
                    domain: {},
                    project: {}
                },
                type: '',
                color: '',
            }
        },
        async created () {
            let domainId = this.$router.history.current.query.domainId;
            let res = await this.$util.http.get('/keyauth/domain/'+domainId);
            this.data.domain = res.data;
            let enabled = this.data.domain.enabled;
            this.type = enabled ? "checkmark-circled" : "android-cancel";
            this.color = enabled ? '#19be6b' : '#ccc';
        },
        computed: {
            displayProjectInfo() {
                return this.showProjectInfo ? 'show' : 'no-show';
            }
        },
        methods: {
            checkProjectInfo(project) {
                this.$router.push({path: '/projectsInfo', query: { projectId: project.project_id}});
            },
        }
    }
</script>
