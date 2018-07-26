<style lang="scss">
    @import './401.scss';
</style>

<template>
    <div class="error401">
        <div class="body-con">
            <Card>
                <div class="logo">此处放置logo</div>
                <div class="title">4<span class="error401-0-span"><Icon type="android-lock"></Icon></span><span class="error401-key-span"><Icon type="key"></Icon></span></div>
                <p class="message">授权失败！</p>
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
    name: 'Error401',
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
