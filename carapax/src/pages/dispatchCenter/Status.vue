<style scoped>

</style>

<template>
	<div>
		<div class="layout-breadcrumb">
	  		<Breadcrumb>
	    		<BreadcrumbItem href="/domains">首页</BreadcrumbItem>
	    		<BreadcrumbItem href="/job">调度中心</BreadcrumbItem>
	    		<BreadcrumbItem href="/Status">节点查询</BreadcrumbItem>
	  		</Breadcrumb>
		</div>
        <div class="content">
            <div class="header">
                <span class="title">节点查询</span>
            </div>
            <Table stripe :loading="loading" :columns="columns" :data="data" ></Table>
        </div>
	</div>
</template>

<script>

  	export default {
	    data() {
	      	return {
                columns: [
                    { title: '名称', key: 'name' },
                    { title: 'IP地址', key: 'ip' },
                    { title: '刷新时间', key: 'refreshTime' },
                    {   title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        color: '#ccc',
                                        disabled: true
                                    },
                                    on: {
//                                        click: () => this.startJob(params.row)
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                data: [],
                loading: false
	      	}
	  	},
        async created ()  {
	        console.log('开始发送请求');
            let res = await this.$util.http.get('/dispatchCenter/ui/heartbeat');
            console.log(res);

            this.formatData(res.data);
        },
	  	methods: {
            formatData(arr) {
                for(let key of arr) {
                    let _name = key.name;
                    for(let item of key.value) {
                        this.data.push({
                            name: _name,
                            ip: item.ip,
                            refreshTime:  this.$util.common.formatDateTime(item.refreshTime)
                        })
                    }
                }
                console.log(this.data);
            }

	  	}
  	}
</script>
