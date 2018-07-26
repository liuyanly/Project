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
  .show { display: block; }
  .no-show { display: none; }
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
</style>

<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
        <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
        <BreadcrumbItem href="/projects">项目</BreadcrumbItem>
        <BreadcrumbItem href="/projectsInfo">项目信息</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <InfoTable title="项目信息" :config="configs" :data="data.project"></InfoTable>
    </div>
  </div>
</template>
<script>
    import InfoTable from '@/components/infoTable/InfoTable';
    import config  from '@/config/config.js';
    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                configs: config.info.projectInfo,
                data: {
                    project: {}
                },
                type: '',
                color: ''
            }
        },
        async created () {
            let projectId = this.$router.history.current.query.projectId;
            console.log(projectId)
            let res = await this.$util.http.get('/keyauth/project/' + projectId);
            this.data.project = res.data;

            let enabled = this.data.project.enabled;
            this.type = enabled ? "checkmark-circled" : "android-cancel";
            this.color = enabled ? '#19be6b' : '#ccc';
        }
    }
</script>
