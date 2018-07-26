<style scoped>

</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
                <BreadcrumbItem href="/services">服务提供商</BreadcrumbItem>
                <BreadcrumbItem href="/services">服务</BreadcrumbItem>
            </Breadcrumb>
        </div>

      <div class="content">
        <div class="header">
          <span class="title">功能列表</span>
        </div>
        <Table stripe :loading="loading" :columns="columns" :data="data"></Table>
      </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                loading: true,
                showService: false,
                columns: [
                    {
                        title: '服务名称',
                        key: 'serviceName'
                    },
                    {
                        title: '描述',
                        key:'status'
                    },
                    {
                        title: '服务状态',
                        key: 'enable',
                        align: 'center',
                        render: (h, params) => {
                          let status = params.row.active;
                          return h('div',{
                            style: {
                              height:'20px',
                              paddingTop: '5px'
                            }
                          },[
                            h('span', {
                              class:status ? 'status online' : 'status offline'

                            })
                          ]);
                        }
                    },
                    {
                        title: '查看详情',
                        key: 'actions',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.$router.push({ path: '/servicesInfo', query: { components: params.row.components, features: params.row.features }})
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                data: [],
            }
        },
        async created() {
          const { serviceList } = this.$store.state.userCenter;
          if(serviceList.length === 0) {
            this.$store.dispatch('getService');
          }else{
            this.loading = false;
            this.setService(serviceList);
          }
        },
        computed: mapState({
            serviceList: state => state.userCenter.serviceList,
        }),
        watch: {
            serviceList: {
                handler:function(val, oldval) {
                    this.loading = false;
                    this.setService(val);
                },
                deep:true
            }
        },
        methods: {
            setService(service) {
              this.data = [];
              for (let item of service) {
                if (item.gateway) {
                  this.data.push({
                    serviceName: '设备网关',
                    status: item.gateway.status,
                    active:item.gateway.active,
                    components: item.gateway.components,
                    features: item.gateway.features
                  })
                }
                if(item.valuka) {
                  this.data.push({
                    serviceName: '计算平台',
                    status: item.valuka.status,
                    active:item.valuka.active,
                    components: item.valuka.components,
                    features: item.valuka.features
                  })
                }
                if(item.keyauth) {
                  this.data.push({
                    serviceName: '用户管理',
                    status: item.keyauth.status,
                    active: item.keyauth.active,
                    components: item.keyauth.components,
                    features: item.keyauth.features
                  })
                }
              }
          },
        }
    }
</script>
