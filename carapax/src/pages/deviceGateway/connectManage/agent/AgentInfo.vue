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
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">接入代理管理</BreadcrumbItem>
                <BreadcrumbItem href="/agent">agent</BreadcrumbItem>
                <BreadcrumbItem href="/agentInfo">agent信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="user-info">
                <div>
                    <div class="info-header">
                        <span class="title">agent信息</span>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <span class="label">agent名称：</span>
                                    <span>{{agentInfo.agentName}}</span>
                                </td>
                                <td>
                                    <span class="label">agentID：</span>
                                    <span>{{agentInfo.agentId}}</span>
                                </td>
                                <td>
                                    <span class="label">运行状态：</span>
                                    <span>正常</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="label">创建时间：</span>
                                    <span>{{agentInfo.createTime}}</span>
                                </td>
                                <td>
                                    <span class="label">更新时间：</span>
                                    <span>{{agentInfo.updateTime ? agentInfo.updateTime : agentInfo.createTime}}</span>
                                </td>
                                <td>
                                    <span class="label">证书：</span>
                                    <span>XXX</span>
                                </td>
                            </tr>
                            <tr>
                               <td>
                                    <span class="label">运行状态：</span>
                                    <span>正常</span>
                                </td>
                                <td>
                                    <span class="label">上报管道：</span>
                                    <span>XXX</span>
                                </td>
                                <td>
                                    <span class="label">命令管道：</span>
                                    <span>XXX</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="label">代理设备：</span>
                                    <span>{{agentInfo.agentDevice}}</span>
                                </td>
                                <td colspan='2'>
                                    <span class="label">设备上报数据：</span>
                                    <span>{"data": "asd13254a654"}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import util from '../../../../util/util.js';
    export default {
        data () {
            const { agent } = this.$router.history.current.query;
            return {
                agentInfo: agent,
            }
        },
        methods: {

        }
    }
</script>
