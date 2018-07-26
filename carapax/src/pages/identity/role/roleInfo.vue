<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
                <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
                <BreadcrumbItem href="/roles">角色</BreadcrumbItem>
                <BreadcrumbItem href="roleInfo">角色信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <InfoTable title="角色信息" :config="configs" :data="data.role">
                <tr slot="body">
                    <td colspan='3'>
                        <span class="label">功能：</span>
                        <span v-for="item of data.role.features">
                            <Tag color="green" type="border">{{item}}</Tag>
                        </span>
                    </td>
                </tr>
            </InfoTable>
        </div>
    </div>
</template>
<script>
    import InfoTable from '@/components/infoTable/InfoTable';
    import  config  from '@/config/config.js';
    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                type: '',
                color:'',
                configs: config.info.roleInfo,
                data: {
                    role: {},
                },
                id: 'sisi',
            }
        },
        async created () {
            let roleId = this.$router.history.current.query.roleId;
            let res = await this.$util.http.get('/keyauth/role/' + roleId);
            this.data.role = res.data;
            let enable = this.data.role.enabled;
            this.type = enable ? "checkmark-circled" : "android-cancel";
            this.color = enable ? '#19be6b' : '#ccc';

        },
    }
</script>
