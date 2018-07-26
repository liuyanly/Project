<style rel="stylesheet/scss" lang="scss" scoped>
    table { 
        width: 100%;
        border-collapse:collapse; 
        td {
            padding: 11px 20px;
            border: 1px solid #eeeeee;
            .label {
                display: inline-block;
                color: #999;
                min-width: 60px;
                text-align: right;
            }
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
        <div class="info-header">
            <span class="title">{{title}}</span>
            <slot name="header"></slot>
        </div>
        <table v-if="JSON.stringify(data) !== '{}'">
            <tbody v-if="type === 'separate'">
                <tr v-for="info of config">
                    <td>
                        <span class="label">{{info.label}}</span>
                    </td>
                    <td>
                        <span v-if="!info.render">{{data[info.value]}}</span>
                        <Cell v-else :data="data" :render="info.render"></Cell>
                    </td>
                </tr>
                <slot name="body"></slot>
            </tbody>
            <tbody v-else>
                <tr v-for="item of config">
                    <td v-for="info of item" :colspan="info.colspan">
                        <span class="label" v-if="info.label">{{info.label}}：</span>
                        <span v-else></span>
                        <span v-if="!info.render">{{data[info.value]}}</span>
                        <Cell v-else :data="data" :render="info.render"></Cell>
                    </td>
                </tr>
                <slot name="body"></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Cell from './Cell';

    export default {
        components: { Cell },
        data () {
            return {

            }
        },
        name: 'InfoTable',
        props: {
            type: {
                type: String,
                default: ''  
            },
            title: {
                type: String,
                default: ''
            },
            config: {
                type: Array,
                default: {}
            },
            data: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<!-- 以及deviceType测试 -->
<!-- <InfoTable :config="deviceTypeInfo" :data="deviceType"></InfoTable> -->
<!-- deviceType: [
        {label: '类型名称', value: 'name'},
        {label: '类型id', value: 'id'},
        {label: 'parent_id', value: 'parent_id'},
        {
            label: '创建时间', value: 'create_at',
            render: (h, params) => {
                return h('span', {} ,util.common.formatDateTime(params.data.create_at));
            }
        },
        {
            label: '更新时间', value: 'update_at',
            render: (h, params) => {
                return h('span', {} ,util.common.formatDateTime(params.data.update_at));
            }
        },
        {label: '描述', value: 'description'},
    ], -->