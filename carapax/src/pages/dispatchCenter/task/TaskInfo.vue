<style scoped>
    .log {
        overflow: auto;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/job">调度中心</BreadcrumbItem>
                <BreadcrumbItem href="/task">任务管理</BreadcrumbItem>
                <BreadcrumbItem href="/taskInfo">详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Tabs :animated="false" v-model="currentTab"> <!-- @on-click="changeTabs" -->
                <TabPane label="概况" name="summary">
                    <InfoTable title="任务详情" :config="taskInfo" :data="task"></InfoTable>
                </TabPane>
                <TabPane class="log" label="日志" name="log">
                    <template v-for="item of taskLog">
                        <span style="color: red">{{item.name}}：</span>
                        <pre>
                            <code class="java" v-highlight>{{item.value}}</code>
                        </pre>
                    </template>
                </TabPane>
            </Tabs>
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
                currentTab: 'summary',
                task: {},
                taskLog: [],
                taskInfo: config.info.taskInfo
            }
        },
        async created() {
            const { id, type } = this.$router.history.current.query;
            let tabLog = this.$router.history.current.query.log;
            if(tabLog) {
                this.currentTab = 'log';
            }
            this.task = await this.getdeviceTagInfo(id);
            this.taskLog = await this.getTaskLog({ taskId: id, type: type });
        },
        methods: {
            async getdeviceTagInfo(taskId) {
                const url = `/dispatchCenter/ui/querytask?taskid=${taskId}`;
                let res = await this.$util.http.get(url);
                return res.data;
            },
            async getTaskLog(data) {
                let res = await this.$util.http.post('/dispatchCenter/ui/queryjoblog', data);
                let taskLog = [];
                for(let key in res.data) {
                    taskLog.push({
                        name: key,
                        value: res.data[key]
                    });
                }
                return taskLog.reverse();
            }
        }
    }
</script>
