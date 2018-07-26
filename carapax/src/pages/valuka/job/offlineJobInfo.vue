

<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/script">计算平台</BreadcrumbItem>
        <BreadcrumbItem href="/offlineJobs">离线作业</BreadcrumbItem>
        <BreadcrumbItem href="/offlineJobsInfo">作业详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div>
        <InfoTable title="作业详情" :config="offlineJobInfo" :data="data"></InfoTable>
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
    data() {
      return {
          offlineJobInfo: config.info.offlineJobInfo,
          data: {}
      }
    },
    async created () {
      let {offlineJobsList} = this.$store.state.valuka;
      let jobId = this.$router.history.current.query.jobId;
      this.data = this.getJobInfo(offlineJobsList, jobId);
        console.log(this.data);
    },
    methods: {
      getJobInfo(list, jobId) {
          let res = [];
          for(let job of list) {
              if(job.jobId === jobId) {
                res = job;
              }
          }
          return  res;
      }
    }
  }
</script>
