<style>
    .has-upload {
        background: #5cb85c !important;
    }
    .has-delete {
        background: #d2d3d2 !important;
    }
</style>
<style scoped lang="scss">
    @import "./messageBox.scss";
</style>

<template>
    <div class="message-main-con">
        <div class="message-nav">
            <ul>
                <li @click="setCurrentMsgType('unRead')">
                    <transition name="mes-current-type-btn">
                        <Icon type="checkmark" size="14px" v-show="currentMessageType === 'unRead'"></Icon>
                    </transition>
                    <span class="message-type">未读消息</span>
                    <Badge class="badge" :count="unReadMsgList.length"></Badge>
                </li>
                <li @click="setCurrentMsgType('hasRead')">
                    <transition name="mes-current-type-btn">
                        <Icon type="checkmark" size="14px" v-show="currentMessageType === 'hasRead'"></Icon>
                    </transition>
                    <span class="message-type">已读消息</span>
                    <Badge class="badge" class-name="has-upload" :count="hasReadMsgList.length"></Badge>
                </li>
                <!-- <li @click="setCurrentMsgType('hasDelete')">
                    <transition name="mes-current-type-btn">
                        <Icon type="checkmark" size="14px" v-show="currentMessageType === 'hasDelete'"></Icon>
                    </transition>
                    <span class="message-type">回收站</span>
                    <Badge class="badge" class-name="has-delete" count="20"></Badge>
                </li> -->
            </ul>
        </div>
        <div class="message-content">
            <transition name="view-message">
                <div v-if="showMsgTitleList" class="message-title-list-con">
                    <Table :loading="loading" :columns="columns" :data="currentMsgList" :no-data-text="noDataText"></Table>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showMsgTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMsgTitleList"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ msg.title }}</h3>
                    </div>
                    <p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ msg.time }}</p>
                    <div class="message-content-body">
                        <p class="message-content">{{ msg.content }}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'messageBox',
    data () {
        const markAsreadBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: () => {
                        this.hasReadMsgList.unshift(this.currentMsgList.splice(params.index, 1)[0]);
                        this.signRead('/messages/' + params.row.id);
                    }
                }
            }, '标为已读');
        };
        const deleteMsgBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small',
                    type: 'error'
                },
                on: {
                    click: () => {
                        // this.recyclebinList.unshift(this.hasReadMsgList.splice(params.index, 1)[0]);
                        this.hasReadMsgList.splice(params.index, 1);
                        this.$util.http.delete('/messages/' + params.row.id);
                    }
                }
            }, '删除');
        };
        const restoreBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: () => {
                        this.hasreadMesList.unshift(this.recyclebinList.splice(params.index, 1)[0]);
                    }
                }
            }, '还原');
        };
        return {
            showMsgTitleList: true,
            currentMessageType: 'unRead',
            currentMsgList: [],
            unReadMsgList: [],
            hasReadMsgList: [],
            noDataText: '暂无未读消息',
            msg: {
                title: '',
                time: '',
                content: ''
            },
            loading: true,
            data: [],
            columns: [
                {
                    title: ' ',
                    key: 'title',
                    align: 'left',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.showMsgTitleList = false;
                                    this.msg.title = params.row.title;
                                    this.msg.time = params.row.occurred_at;
                                    this.msg.content = params.row.message;
                                }
                            }
                        }, params.row.title);
                    }
                },
                {
                    title: ' ',
                    key: 'time',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        return h('span', [
                            h('Icon', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                },
                                style: {
                                    margin: '0 5px'
                                }
                            }),
                            h('span', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                }
                            }, this.$util.common.formatDateTime(params.row.occurred_at))
                        ]);
                    }
                },
                {
                    title: ' ',
                    key: 'asread',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (this.currentMessageType === 'unRead') {
                            return h('div', [
                                markAsreadBtn(h, params)
                            ]);
                        } else if (this.currentMessageType === 'hasRead') {
                            return h('div', [
                                deleteMsgBtn(h, params)
                            ]);
                        } else {
                            // return h('div', [
                            //     restoreBtn(h, params)
                            // ]);
                        }
                    }
                }
            ]
        };
    },
    created() {
        const { messageList } = this.$store.state;
        if(messageList.length === 0) {
            this.$store.dispatch('getMessageList', '/messages/?system=true');
        } else {
            this.loading = false;
            this.currentMsgList = messageList.slice(0, 15);
            this.splitChecked(this.currentMsgList);
        }
    },
    computed: mapState({
        messageList: state => state.messageList,
    }),
    watch: {
        messageList: {
            handler:function(val,oldval){  
                this.loading = false;
                this.currentMsgList = val;
                this.splitChecked(val.slice(0, 15));
            },
            deep:true
        },
    },
    methods: {
        backMsgTitleList () {
            this.showMsgTitleList = true;
        },
        setCurrentMsgType (type) {
            if (this.currentMessageType !== type) {
                this.showMsgTitleList = true;
            }
            this.currentMessageType = type;
            if (type === 'unRead') {
                this.noDataText = '暂无未读消息';
                this.currentMsgList = this.unReadMsgList;
            } else if (type === 'hasRead') {
                this.noDataText = '暂无已读消息';
                this.currentMsgList = this.hasReadMsgList;
            } 
            // else {
            //     this.noDataText = '回收站无消息';
            //     this.currentMsgList = this.recyclebinList;
            // }
        },
        splitChecked(msgList) {
            for(let msg of msgList) {
                if(msg.is_checked) {
                    this.hasReadMsgList.push(msg);
                } else {
                    this.unReadMsgList.push(msg);
                }
            }
        },
        signRead(url) {
            this.$http({
                method: 'post',
                url: url,
                headers: {
                    'X-OAUTH-TOKEN': localStorage.token,
                },
            })
            .then(response => {})
            .catch(error => console.error(error));
        },
    }
};
</script>

