<style lang="scss" scoped>
    .device-shadow {
        height: 660px;
        /*&, &>div, .ivu-table-wrapper {
                 height: 660px;
        }
        .ivu-table-body {
            height: 660px;
        }*/
    }
    .page{
        position: absolute;
        right: 10px;
        bottom: 0px;
    }
</style>
<template>
    <div class="device-shadow">
        <Table stripe :loading="shadowLoading" :columns="shadowColumns" :data="deviceShadow"></Table>
        <Page class="page" :total="totalSize" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer @on-page-size-change="onPageSizeChange" @on-change="onPageChange"></Page>
    </div>
</template>
<script>
    import config from '@/config/config.js';

    export default {
        data () {
            return {
                deviceShadow: [],
                shadowLoading: true,
                shadowColumns: [
                    {title: '名称', key: 'name' },
                    {title: '描述', key: 'description' },
                    {title: '更新时间', key: 'time' , sortable: true },
                    {title: '值',   key: 'value' },
                ],
                pageSize: 10,
                pageNum: 1,
                totalSize: 0,
                deviceId: ''
            }
        },
        methods: {
            async getDeviceShadow(deviceId,pageSize,pageNum) {
                this.deviceId = deviceId;
                let url = `/gateway/devices/${deviceId}/data/shadow/?&page_size=${pageSize}&page_number=${pageNum}`;
                let response = await this.$util.http.get(url);
                
                if(response.status === 200) {
                    this.shadowLoading = false;
                    this.totalSize = response.data.total_size;
                    for(let item of response.data.data) {
                        for(let key in item.latest_value) {
                            item.value = item.latest_value[key];
                            item.time  = this.$util.common.formatDateTime(key);
                        }
                    }
                    this.deviceShadow = response.data.data;
                }
            },
            onPageChange(pageNum) {
                this.getDeviceShadow(this.deviceId,this.pageSize,pageNum);
            },
            onPageSizeChange(pageSize) {
                this.getDeviceShadow(this.deviceId,pageSize,this.pageNum);
            },
        },

    }
</script>
