<style lang="scss" scoped>
    .message {
        .label {
            display: inline-block;
            color: #999;
            min-width: 60px;
            text-align: right;
        }
    }
</style>
<template>
    <div>
        <div>
            <Table stripe :loading="msgLoading" :columns="msgColumns" :data="deviceMsg"></Table>
            <Page class="page" :total="deviceMsg.length" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer></Page>
        </div>
        <Modal
            class="message"
            width="500"
            v-model="msgModal"
            title="属性信息"
            cancel-text="关闭">
            <div v-if="msg.id">
                <p v-for="item of deviceMsgInfo">
                    <span class="label">{{item.label}}：</span>
                    <span>{{ item.render ? item.render(msg[item.value]) : msg[item.value]}}</span>
                </p>
            </div>
        </Modal>
    </div>
</template>
<script>
    import config from '@/config/config.js';

    export default {
        data () {
            return {
                deviceMsgInfo: config.info.deviceMsg,
                msg: {},
                msgModal: false,
                deviceMsg: [],
                msgLoading: true,
                msgColumns: [
                    { type: 'selection', width: 60, align: 'center' },
                    { title: '消息名称', key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                           this.msgModal = true;
                                           this.msg = params.row;
                                        }
                                    }
                                } ,params.row.title)
                            ]);
                        }
                    },
                    { title: '是否查看', key: 'is_checked' },
                    { title: '告警等级', key: 'severity' },
                    { title: '发生时间', key: 'occurred_at', sortable: true,
                        render: (h, params) => {
                            return h('span',{}, this.$util.common.formatDateTime(params.row.occurred_at));
                        }
                    },
                    { title: '消息内容', key: 'message', },
                    { title: '操作', key: 'message', align: 'center',
                        width: '15%',
                        render: (h, params) => {
                            return h('div', [
                                h('a',{
                                    on: {
                                        click: () => {
                                            this.signRead(params.row.id, params.row._index );
                                        },
                                    }
                                },'标为已读'),
                                h('span', { style: { color: '#ccc', padding: '0 10px' } }, '|'),
                                h('a',[
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '确定要删除吗！',
                                            placement: 'left-start',
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.deleteMsg(params.row.id);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            async getMessageList(deviceId) {
                let response = await this.$util.http.get(`/gateway/messages/?did=${deviceId}`);
                if(response.status === 200) {
                    this.msgLoading = false;
                    this.deviceMsg = response.data.data;
                }
            },
            signRead(msgId, rowNum) {
                this.$http({
                    method: 'post',
                    url: '/messages/' + msgId,
                    headers: {
                        'X-OAUTH-TOKEN': localStorage.token,
                    },
                })
                .then(response => {
                    if(response.status === 200) {
                        this.deviceMsg[rowNum].is_checked = true;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            },
            deleteMsg(msgId) {
                console.log(msgId);
            },
        }
    }
</script>
