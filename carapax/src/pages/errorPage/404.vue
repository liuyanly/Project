<style lang="scss">
    @import './404.scss';
</style>

<template>
    <div class="error404">
        <div class="body-con">
            <Card>
                <div class="logo">此处放置logo</div>
                <div class="title">4<span><Icon type="ios-navigate-outline"></Icon></span>4</div>
                <p class="message">没有找到相关内容，请访问其它页面！</p>
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
    name: 'Error404',
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
