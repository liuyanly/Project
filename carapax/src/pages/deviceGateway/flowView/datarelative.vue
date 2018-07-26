
<template>
    <div >
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">接入诊断</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备关系图</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="echart">
            <eGraph :data="data"></eGraph>
        </div>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import eGraph from '@/components/echarts/eGraph.vue';
    export default {
        components: {
            eGraph
        },
        data() {
            return {
                proxy:[],
                data: [],
                colors:['#ccc','#5ec430','#c6413d']
            }
        },
        created() {
            const { proxyList } = this.$store.state.gateway;
            if (proxyList.length === 0) {
                this.$store.dispatch('getProxyList');
            } else {
                this.setProxy(proxyList);
            }
        },
        computed: mapState({
            proxyList: state => state.gateway.proxyList,
        }),
        watch: {
            proxyList: {
                handler:function(val,oldval){
                    this.setProxy(val)
                },
                deep:true
            },
        },
        methods: {
            async setProxy(arr) {
                for(let key of arr) {
                    const url = `/gateway/proxy/${key.id}/devices/`;
                    let res = await this.$util.http.get(url);
                    let option ={
                        id: key.id,
                        name: key.name,
                        proxy: true,
                        status:key.status,
                        itemStyle: {
                            normal:{
                                borderColor: this.colors[key.status]
                            }
                        },
                        tooltip:{
                            formatter: function () {
                                return `<a href="/#/proxyInfo?id=${key.id}" class="e-item">${key.name}</a>`;
                            }
                        },
                    };
                    this.proxy.push(option);
                    this.getDevice(res,option);
                }

            },
            getDevice(res,option){
                    if(res.data.data){
                        for(let item of res.data.data){
                            item.itemStyle={
                                normal:{
                                    borderColor: this.colors[item.status]
                                }
                            };
                            item.tooltip={
                                formatter:function(){
                                    return `<a href="/#/deviceInfo?id=${item.id}" class="e-item">${item.name}</a>`;
                                }
                            }
                        }
                        option.children = res.data.data;
                    }
                this.data.push(option);

            }
        }
    }
</script>
