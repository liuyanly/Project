<style scoped>
    .wrapper {
        height: 100%;
        background: #F2F2F2;
    }
    .wrapper:before {
        content: " ";
        display: table;
    }
    #login {
        width: 100%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content:center;
    }
    .login-box {
        position: relative;
        width: 340px;
        height: 350px;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
    .login-box h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    .tool {
        margin-bottom: 15px;
    }
    .tool a {
        display: inline-block;
        float: right;
    }
    .login-btn {
        margin-top: 25px;
    }

</style>

<template>

<div class="wrapper">
    <div id="login">
        <div class="login-box" @keydown.enter="handleSubmit('formInline')">
            <h2>登 录</h2>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
              <FormItem  prop="domain">
                <Input v-model="formInline.domain" name="domain" placeholder="域名" >
                <Icon type="ios-navigate-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem  prop="userName">
                <Input v-model="formInline.userName" name="userName" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
                <FormItem prop="password">
                    <Input v-model="formInline.password" type="password" placeholder="密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <div class="tool">
                    <Checkbox v-model="rememberPassword"></Checkbox>
                    <label >记住密码</label>
                    <a href="">忘记密码</a>
                </div>
                <FormItem class="login-btn">
                    <Button type="success" @click="handleSubmit('formInline')" long>登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>

</template>

<script>
import util from '../util/util.js';
import {mapState} from 'vuex';
const Base64 = require('js-base64').Base64;
export default {
    data() {
        return {
            formInline: {
                userName: '',
                password: '',
                domain: ''
            },
            rememberPassword: false,
            ruleInline: {
                domain: [{
                    required: true,
                    message: '请填写域名',
                    trigger: 'blur'
                }],
                userName: [{
                    required: true,
                    message: '请填写用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请填写密码',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 3,
                    message: '密码长度不能小于6位',
                    trigger: 'blur'
                }]
            }
        }
    },
    created() {
        if (localStorage.rememberPassword === 'true') {
            this.formInline.domain = localStorage.domain;
            this.formInline.userName = localStorage.userName;
            this.formInline.password = localStorage.password;
            this.rememberPassword = localStorage.rememberPassword ? true : false;
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                console.log(valid);
                if (valid) {
                    this.login();
                } else {
                    console.error(valid);
                }
            })
        },
        login() {
            const {userName, password, domain} = this.formInline;
            localStorage.rememberPassword = this.rememberPassword;
            localStorage.domain = domain;
            localStorage.userName = userName;
            localStorage.password = password;

            console.log(userName + " " + password+ " " + this.rememberPassword);

            this.$http ({
                method: 'post',
                url: '/keyauth/token',
                data: 'grant_type=password&username='+ userName+'&password='+ password+'&domain='+ domain,
                headers: {
                    'Authorization': 'Basic ' + Base64.encode('sRuf3RT2Ig:TF6Q1y9PiYxXEjb'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if(response.status === 201) {
                    localStorage.token = response.data.access_token;
                    localStorage.isCloudAdmin = response.data.is_cloud_admin;
                    localStorage.isSystemAdmin = response.data.is_system_admin;
                    localStorage.userId = response.data.user.id;
                    localStorage.domainId = response.data.domain.id;
                    localStorage.userName = userName;
                    if(JSON.parse(localStorage.isSystemAdmin)) {
                        this.$router.push('/domains');
                    }else{
                        this.$router.push({path: '/userInfo', query: {userId: localStorage.userId}})
                    }
                    console.log(response);
                }
            })
            .catch( error => {
                console.log(error);
            });
        },
    }
}

</script>
