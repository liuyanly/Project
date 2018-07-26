<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/script">计算平台</BreadcrumbItem>
        <BreadcrumbItem href="/onlineJob">作业管理</BreadcrumbItem>
        <BreadcrumbItem href="/onlineJobInfo">作业详细信息</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <Tabs :animated="false">
        <TabPane label="概况" name="summary">
          <InfoTable title="作业详情" :config="onlineJobInfo" :data="data"></InfoTable>
        </TabPane>
        <TabPane class="calc" label="计算结果">
            <onlineCalcResult :deviceIds="data.deviceIds"></onlineCalcResult>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import onlineCalcResult from './info/onlineCalcResult';
  import InfoTable from '@/components/infoTable/InfoTable';
  import config  from '@/config/config.js';
  
  export default {
    components: {
        onlineCalcResult,
        InfoTable
    },
    data() {
      return {
          onlineJobInfo: config.info.onlineJobInfo,
          data: {},
          script: '',
          loading: true,
      }
    },
    async created () {
      const jobId = this.$router.history.current.query.jobId;
      this.getJobInfo(jobId);
    },
    methods: {
      async getJobInfo(jobId) {
        const url = `/valuka/online/jobs/${jobId}`;
        let res = await this.$util.http.get(url);
        const scriptUrl = `/valuka/scripts/${res.data.data.scriptId}`;
        let scriptRes = await this.$util.http.get(scriptUrl);
        this.data = res.data.data;
        this.script = scriptRes.data.data[0];
        this.loading = false;
        console.log(this.data);
      },
      checkScript() {
        console.log(this.script);
        this.$router.push({ path: '/scriptInfo', query: { id: this.script.scriptId }});
      }
    }
  }
</script>
