<style lang="scss">
    @import './500.scss';
</style>

<template>
    <div class="error500">
        <div class="body-con">
            <Card>
                <div class="logo">此处放置logo</div>
                <div class="title">
                    5<span class="error500-0-span"><Icon type="social-freebsd-devil"></Icon></span><span class="error500-0-span"><Icon type="social-freebsd-devil"></Icon></span>
                </div>
                <p class="message">服务器内部错误！</p>
                <div class="btn-con">
                    <Button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</Button>
                    <Button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error500',
    methods: {
        backPage () {
            this.$router.go(-1);
        },
        goHome () {
            this.$router.push({path: '/home'});
        }
    }
};
</script>
