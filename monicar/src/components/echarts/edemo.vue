<style scoped>

    h2{
        margin-bottom: 25px;
    }
</style>
<template>
    <div class="echart">
        <div>
            <h2>{{data.title}}</h2>
        </div>
        <Table stripe border  :columns="data.columns" :data="data.data" :loading="loading" ></Table>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                default:function () {
                    return {
                        columns: [],
                        data: []
                    }
                }
            }
        },
        watch: {
            data: {
                handler: function (val) {
                    this.changeSupport(val.columns);
                    this.loading = false;
                },
                deep: true
            },
        },
        data(){
            return {
                loading: true,
                sup: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    backgroundColor: params.row.isSupport === '支持' ? '#19be6b' : '#ed3f14',
                                    display: 'block',
                                    color: '#333'
                                }
                            }, params.row.isSupport)
                        ]);
                    },
                status: (h, params) => {
                    return h('div', [
                        h('div', {
                            style: {
                                backgroundColor: params.row.status === '已得到' ? '#19be6b' : '#ed3f14',
                                color: '#333'
                            }
                        }, params.row.status)
                    ])
                },

            }
        },
        methods: {
            changeSupport(arr) {
                for(let item of arr) {
                    if (item.key === 'isSupport') {
                        item.render = this.sup;
                    }
                    if(item.key === 'status') {
                        item.render = this.status;
                    }
                }
            },
        }

    }
</script>
