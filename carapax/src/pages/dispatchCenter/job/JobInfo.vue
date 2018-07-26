<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/job">调度中心</BreadcrumbItem>
                <BreadcrumbItem href="/job">任务管理</BreadcrumbItem>
                <BreadcrumbItem href="/jobInfo">详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <InfoTable title="作业详情" :config="jobInfo" :data="job"></InfoTable>
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
                job: {},
                jobInfo: config.info.jobInfo,
            }
        },
        async created() {
            const { id } = this.$router.history.current.query;
            this.job = await this.getJobInfo(id);
        },
        methods: {
            async getJobInfo(jobId) {
                const url = `/dispatchCenter/ui/queryjob?jobid=${jobId}`;
                let res = await this.$util.http.get(url);
                return res.data;
            },
        }
    }
</script>
