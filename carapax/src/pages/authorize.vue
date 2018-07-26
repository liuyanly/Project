<style scoped>
    .logo {
        font-size: 28px;
        font-weight: bold;
        margin: 10px 0 5px 0;
    }

    .entry-content {
        width: 560px;
        height: 370px;
        margin: 0 auto;
    }

    .authorize-content {
        width: 500px;
        height: 350px;
        margin: 40px auto;
    }

    .txt {
        margin: 5px 0 15px;
    }

    .textInfo {
        text-align: center;
    }

    .textInfo h5 {
        padding: 10px 0;
        font-size: 14px;
    }

    .hint {
        padding: 5px 0 10px;
    }

    .authorize-btn {
        text-align: center;
    }

    .check-btn {
        padding: 5px 0;
    }

    .check-btn a {
        text-decoration: underline;
    }

</style>

<template>
    <div>
        <section class="entry-content" v-if="!authorizeFlag">
            <div class="logo">CARAPAX</div>
            <Card style="width:540px">
                <div class="txt">我们将使用你的账号,并访问你的数据</div>
                <Form :label-width="120" :model="formValidate" ref="formValidate" :rules="ruleValidate">
                    <FormItem label="域名" prop="domain" style="width: 400px;">
                        <Input v-model="formValidate.domain" type="text" placeholder="请输入你域名"></Input>
                    </FormItem>

                    <FormItem label="账号" prop="username" style="width: 400px;">
                        <Input v-model="formValidate.username" type="text" placeholder="请输入你的账号"></Input>
                    </FormItem>

                    <FormItem label="密码" prop="password" style="width: 400px;">
                        <Input v-model="formValidate.password" type="password" placeholder="请输入密码"></Input>
                    </FormItem>

                    <FormItem style="padding-top: 15px; border-top: 1px dotted #ccc;">
                        <div style="float: right;">
                            <Button style="width: 80px" type="error" @click="handleSubmit('formValidate')">登录</Button>
                            <Button style="margin-left:12px; width: 80px;" type="ghost">取消</Button>
                        </div>
                    </FormItem>
                </Form>
            </Card>
        </section>
        <section>
            <div class="authorize-content" v-if="authorizeFlag">
                <Card style="width:500px">
                    <div class="textInfo">
                        <h5>检测到您的账号已经登录可以进行授权</h5>
                        <div class="hint">允许该网站应用进行以下操作：</div>
                        <div class="check-btn">
                            <Checkbox disabled v-model="getInfo"><span>访问您的个人资料等基础信息</span></Checkbox>
                        </div>
                        <div class="check-btn">
                            <Checkbox v-model="connect" @on-change="checkChange"><span>我同意 <a href="#">carapax账号连接协议</a></span>
                            </Checkbox>
                        </div>
                    </div>
                    <div class="authorize-btn">
                        <Button @click="getAuthorize" :disabled="authorizeBtn" type="primary"
                                style="width: 120px; margin: 25px 0 15px;">授权
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    </div>
</template>

<script>
    import $ from  'jquery';
    export default {
        data () {
            return {
                authorizeFlag: false,
                getInfo: true,
                connect: false,
                authorizeBtn: true,
                formValidate: {
                    domain: '',
                    username: '',
                    password: ''
                },
                ruleValidate: {
                    domain: {
                        required: true, message: 'The domain cannot be empty', trigger: 'blur'
                    },
                    username: {
                        required: true, message: 'The domain cannot be empty', trigger: 'blur'
                    },
                    password: {
                        required: true, message: 'The domain cannot be empty', trigger: 'blur'
                    },
                }
            }
        },
        async created() {


        },
        methods: {
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.accountAuthentication();
                    }
                })
            },
            async accountAuthentication(){
                let url = 'http://172.16.26.115:6749/user/get/?username='+ this.formValidate.username+ '&domain='+this.formValidate.domain+'&password='+this.formValidate.password;
                $.get(url, (data,status) => {
                    if (status === 'success'){
                        this.authorizeFlag = true;
                    }
                })
            },
            getAuthorize() {
                let data;
                if(!location.search){
                    data ='name='+this.formValidate.username+'&domain='+this.formValidate.domain+'&password='+this.formValidate.password;
                }else{
                    let query = location.search.substring(1);
                    data = query+'&name='+this.formValidate.username+'&domain='+this.formValidate.domain+'&password='+this.formValidate.password;
                }

                let url = 'http://172.16.26.115:6749/authorize/';
                $.post(url, data, (data,status) => {
                   let address= data ;
                   location.href = address.redirect_url;
                })
            },
            checkChange(val) {
                if (val) {
                    this.authorizeBtn = false;
                } else {
                    this.authorizeBtn = true;
                }
            }
        }
    }
</script>
