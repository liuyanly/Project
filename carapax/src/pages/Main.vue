<style lang="scss">
    @import "./main/allFile.scss";
</style>
<style lang="scss" scoped>
    @import "./main/main.scss";
</style>

<template>
    <div id="main">
        <div class="sidebar-menu" :style="{width: hideMenuText?'60px':'240px'}">
            <div class="layout-logo" :style="{fontSize: hideMenuText ? '16px' : '14px'}">
                {{hideMenuText ? 'C' : 'CARAPAX'}}
            </div>
            <sidebar-menu v-if="!hideMenuText" :menuList="menuList"/>
            <sidebar-menu-shrink v-else :menuList="menuList"/>
        </div>
        <div class="sidebar-content">
            <div class="main-header" >
                <Button class="nav-btn" :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </Button>
                <div class="layout-header-right">
                    <div class="isSystem" v-if="isSystem">
                        <Select v-model="select.domain " size="small" style="width:120px" @on-change="resetDomain">
                            <Option v-for="item in data.domain" :value="item.name" :key="item.name">{{ item.verbose }}
                            </Option>
                        </Select>
                        <Select v-model="select.project" size="small" style="width:120px" @on-change="resetProject">
                            <Option v-for="item in data.project" :value="item.name" :key="item.name">{{ item.name }}
                            </Option>
                        </Select>
                    </div>
                    <div class="isSystem" v-else>
                        <a href="javascript:;" class="domainTit" @click="getDomainInfo">{{domainName}}</a>
                        <Select v-model="select.project" size="small" style="width:120px" @on-change="getTokenByProjectId">
                            <Option v-for="item in data.project" :value="item.name" :key="item.name">{{ item.name }}
                            </Option>
                        </Select>
                    </div>
                    <div class="full-screen-btn" @click="handleFullScreen" v-if="showFullScreenBtn">
                        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                            <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
                        </Tooltip>
                    </div>
                    <div class="message" @click="showMessage">
                        <Tooltip :content="messageCount > 0 ? '有' + messageList.length + '条未读消息' : '无未读消息'" placement="bottom">
                            <Badge :count="messageCount" dot>
                                <Icon type="ios-bell" :size="22"></Icon>
                            </Badge>
                        </Tooltip>
                    </div>
                    <div>
                        <Dropdown trigger="click" style="margin-left: 20px" @on-click="userCenter">
                            <a href="javascript:void(0)" style="font-size: 14px">
                                <Icon :size="18" type="android-person"></Icon>
                                {{userName }}
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="personalCenter">个人中心</DropdownItem>
                                <DropdownItem >角色信息</DropdownItem>
                                <DropdownItem name="loginout" divided>退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                </div>
            </div>
            <div class="main-content" >
                <div>
                    <div class="content-container">
                        <transition class="content" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                    <div class="main-footer">
                        2011-2017 &copy; CARAPAX
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sidebarMenu from './main/sidebarMenu.vue';
import sidebarMenuShrink from './main/sidebarMenuShrink.vue';

import config from '../config/config.js';
const Base64 = require('js-base64').Base64;
import { mapState } from 'vuex';
export default {
    components: {
        sidebarMenu,
        sidebarMenuShrink
    },
    data() {
        return {
            menuList: [],
            hideMenuText: false,
            isFullScreen: false,
            showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
            messageCount: 0,
            data: {
                domain: [],
                project: []
            },
            select: {
                domain: '',
                project: ''
            },
            userName: '',
            isSystem: '',
            domainName: ''
        }
    },
    async created() {
        const { messageList } = this.$store.state;
        const { domainList } = this.$store.state.userCenter;
        this.$store.dispatch('getMessageList', '/messages/?system=true');

        this.userName = localStorage.userName;
        this.isSystem = JSON.parse(localStorage.isSystemAdmin);
        this.getPermission();
        if(this.isSystem){
            if (domainList.length === 0) {
                this.$store.dispatch('getDomainList');
                this.$store.state.userCenter.status.domainSign = true;
            }else {
                this.setDomain(domainList);
            }
        }else{
            let res = await this.$util.http.get('/keyauth/project/');
            this.data.project = res.data;
            this.select.project = this.data.project[0].name;
            let domainInfo = await this.$util.http.get('/keyauth/domain/' + localStorage.domainId);
            this.domainName = domainInfo.data.verbose;
        }
    },
    computed: mapState({
        messageList: state => state.messageList,
        domainList() {
            return this.$store.state.userCenter.domainList;
        },
    }),
    watch: {
        domainList: {
          handler:function(val){
            this.setDomain(val);
          },
          deep:true
        },
    },
    methods: {
        toggleClick () {
            this.hideMenuText = !this.hideMenuText;
        },
        handleFullScreen () {
            this.isFullScreen = !this.isFullScreen;
            let main = document.getElementById('main');
            if (!this.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        showMessage() {
          this.$router.push('/messageBox');
        },
        setDomain(domainList) {
          this.data.domain = domainList;
          if(domainList.length !== 0){
              this.data.project = domainList[0].projects;
              this.select.domain = domainList[0].name;
              this.select.project = domainList[0].projects[0].name;
              this.$store.dispatch('resetDomain',  this.select.domain);
          }
        },
        resetDomain(val) {
            let num = 0;
            for (let domain of this.data.domain) {
                if (domain.name !== val) {
                    ++num;
                } else {
                    break;
                }
            }
            this.data.project = this.data.domain[num].projects;
            this.select.domain = this.data.domain[num].name;
            this.select.project = this.data.domain[num].projects[0].name;
            this.$store.dispatch('resetDomain', val);
        },
        resetProject(val) {
          let num = 0;
          for(let project of this.data.project) {
            if(project.name !== val){
              ++num;
            }else{
              break;
            }
          }
          this.$store.dispatch('resetProject', val);
        },
        getPermission() {
            let isSystemAdmin =  JSON.parse(localStorage.isSystemAdmin);
            let isCloudAdmin =  JSON.parse(localStorage.isCloudAdmin);

            if (isSystemAdmin) {
                console.log('进入系统权限');
                this.menuList = config.menuList.List1;
            }
            if (isCloudAdmin) {
                this.menuList = config.menuList.List2;
            }
            if (!isSystemAdmin && !isCloudAdmin) {
                this.menuList = config.menuList.List3;
            }
        },
        userCenter(val) {
            console.log(val);
            if(val === 'personalCenter') {
                this.$router.push({path: '/userInfo', query: {userId: localStorage.userId}});
            }else if(val === 'loginout') {
                this.$router.push({path: '/login'});
                localStorage.token = ' ';
            }
        },
        getDomainInfo () {
            console.log( localStorage.domainId);
            this.$router.push({path: '/domainInfo', query: {domainId: localStorage.domainId}});
        },
        async getTokenByProjectId(val) {//这里是重新请求token
            let projectId = '';
            for (let project of this.data.project) {
                if (project.name === val) {
                    projectId = project.project_id;
                }
            }
            //这是重新请求token
            this.$http ({
                method: 'post',
                url: '/keyauth/token',
                data: 'grant_type=password&username='+ localStorage.userName+'&password='+ localStorage.password+'&domain='+ localStorage.domain+'&project_id='+ projectId,
                headers: {
                    'Authorization': 'Basic ' + Base64.encode('sRuf3RT2Ig:TF6Q1y9PiYxXEjb'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    if(response.status === 201) {
                        localStorage.token = response.data.access_token;
                        this.$Notice.success({
                            title: '系统通知',
                            desc: '项目绑定成功'
                        });
                        this.resetResource();
                    }
                }).catch( error => {
                console.log(error);
                this.$Notice.error({
                    title: '系统通知',
                    desc:'项目绑定失败'
                });
            });
        },
        resetResource() {
            let { gateway, valuka } = this.$store.state;
            for(let item in gateway) {
                gateway[item] = [];
            }
            for(let item in valuka) {
                gateway[item] = [];
            }
            this.$store.commit('changeProject');
        }
    }
}

</script>
