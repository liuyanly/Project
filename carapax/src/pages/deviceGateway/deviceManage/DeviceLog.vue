<style scoped>
    .header {
        text-align: left;
        margin-top: 10px;
        margin-bottom: -1px;
        height: 40px;
        background: #F5f6FA;
        line-height: 38px;
        border: 1px solid #e1e6eb;
        position: relative;
        border-left: 4px solid #6d7781;
    }
    .header .title {
        font-size: 14px;
        color: #333333;
        display: inline-block;
        margin-left: 16px;
    }
    .condition {
        text-align: left;
        padding: 15px 0 10px 5px;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/deviceLog">接入日志</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">接入日志</span>
            </div> 
            <div class="condition">
                <span>设备名称：</span>
                <Input v-model="deviceName1" placeholder="请输入..." style="width: 250px"></Input>
                <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="" style="width: 250px"></DatePicker>
                <Button type="primary" icon="search">搜索</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                deviceName: '',
                deviceName1: '',
                value2: ['2017-09-01', '2017-09-15']
            }
        }
    }
</script>