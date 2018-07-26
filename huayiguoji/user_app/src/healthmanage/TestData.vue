<template>
    <div class="test-data">
        <headers headName="体检数据"></headers>
        <div class="contentScollr">
        <div class="filter-box">
            <ul class="head-list" :style="ulHeight">
                <li v-for="data in abnormalData" :class="{current:title==data.name}" @click="changeId(data.name)">{{data.name}}<span class="tag" v-if="data.count>0" >{{data.count}}</span></li>
            </ul>
            <img @click="viewMore(1)" v-if="ulHeight.height == '2.35rem'" src="../assets/images/c12_xiala.png" />
            <img @click="viewMore(0)" v-else src="../assets/images/c12_xiala_p.png" />
        </div>
        <div class="content-box">
            <p class="title">
                {{title}}
            </p>
            <table>
                <tbody>
                    <tr class="head-td">
                        <td>项目</td>
                        <td>检查值</td>
                        <td>单位</td>
                        <td>参考范围</td>
                        <td>趋势图</td>
                    </tr>
                    <tr :class="{abnormal:data.pivot.value>data.max||data.pivot.value<data.min}" v-for="data in detailData">
                        <td>{{data.title}}</td>
                        <td>{{data.pivot.value}}<img v-if="data.pivot.value>data.max" src="../assets/images/c51_icon3_p.png" />
                        <img v-if="data.pivot.value<data.min" src="../assets/images/c51_icon3.png" /></td>
                        <td>{{data.unit}}</td>
                        <td v-if="data.translates.range_desc == ''">-</td>
                        <td v-else>{{data.translates.range_desc}}</td>
                        <td><img v-if="data.pivot.value>data.max||data.pivot.value<data.min" src="../assets/images/c51_icon1_p.png"  @click="link(data.title,data.id)"/><img v-else src="../assets/images/c51_icon1.png"  @click="link(data.title,data.id)" /></td>
                    </tr>
                    <!-- <tr>
                        <td>体重</td>
                        <td>54.4</td>
                        <td>Kg</td>
                        <td>-</td>
                        <td><img src="../assets/images/c51_icon1.png"  @click="link('体重')" /></td>
                    </tr>
                    <tr>
                        <td>腰围</td>
                        <td>90.4</td>
                        <td>cm</td>
                        <td>-</td>
                        <td><img src="../assets/images/c51_icon1.png" @click="link('腰围')" /></td>
                    </tr>
                    <tr>
                        <td>ABO血型</td>
                        <td>O型</td>
                        <td></td>
                        <td>-</td>
                        <td><img src="../assets/images/c51_icon1.png" @click="link('ABO血型')" /></td>
                    </tr>
                    <tr>
                        <td>RHD血型</td>
                        <td></td>
                        <td></td>
                        <td>-</td>
                        <td><img src="../assets/images/c51_icon1.png" @click="link('RHD血型')" /></td>
                    </tr>
                    <tr class="abnormal">
                        <td>收缩压(HGB)</td>
                        <td>110<img src="../assets/images/c51_icon3.png" /></td>
                        <td>mmHg</td>
                        <td>≤130</td>
                        <td><img src="../assets/images/c51_icon1_p.png" @click="link('收缩压(HGB)')" /></td>
                    </tr>
                    <tr>
                        <td>舒张压(DBP)</td>
                        <td>84</td>
                        <td>mmHg</td>
                        <td>60~90</td>
                        <td><img src="../assets/images/c51_icon1.png" @click="link('舒张压(DBP)')" /></td>
                    </tr>
                    <tr>
                        <td>心率</td>
                        <td>75</td>
                        <td>次/分钟</td>
                        <td>60~100</td>
                        <td><img src="../assets/images/c51_icon1.png"  @click="link('心率')" /></td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    </div>
    </div>
</template>
<script>
    import headers from '../components/Header';

    export default {
        data(){
            return{
                id:this.$route.params.id,
                fieldId:this.$route.params.fieldId,
                ulHeight:{height:'2.35rem'},
                abnormalData:[],
                detailData:[],
                title:this.$route.params.title
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            this.getData()
            this.getDetail()
        },
        methods:{
            link(name,id){
                this.$router.push({name:'TrendMap',params:{title:name,reId:id}})
            },
            changeId(title){
                this.title = title
                this.getDetail()
            },
            viewMore(type){
                if(type == 1){
                    this.ulHeight.height = 'auto'
                }else{
                    this.ulHeight.height = '2.35rem'
                }
            },
            getDetail(){
                var that = this
                that.$ajax.get('/archive/showdetection?archive_id='+that.id+'&category='+that.title)
                .then(function(res){
                    if(res.data.status == 200){
                        that.detailData = res.data.data.data
                        console.log(that.detailData)
                    }
                })
                .catch(function(err){

                })
            },
            getData(){
        		var that=this
        		that.$ajax.get('/archive/'+that.id)
        		.then(function(res){
        			if(res.data.status==200){
                        //重组检查数据
        				for(var i = 0;i<res.data.data.detection.length;i++){
        					var tem = {
        						name:res.data.data.detection[i].category,
        						count:0,
        					}
        					for(var j = 0;j<res.data.data.detection[i].data.length;j++){
        						tem.count += res.data.data.detection[i].data[j].abnormal_count
        					}
        					that.abnormalData.push(tem)
        				}
        			}else if(res.data.status==401){
        				//that.BaseSet.linkLogin(that)
        			}
        			else{
        				that.$toast(res.data.message)
        			}
        		})
        		.catch(function(err){
        			console.log(err)
        			//that.BaseSet.linkLogin(that)
        		})
            }
        },
        components:{headers},
    }
</script>
<style lang="scss">
    .test-data{
        display: flex;
    	height: 100%;
    	flex-direction: column;
    	.contentScollr{
    		flex: 1;
    		overflow: auto;
    		-webkit-overflow-scrolling:touch;
    	}
        background: #fff;
        .filter-box{
            position: relative;
            >img{
                position: absolute;
                right: .8rem /* 30/40 */;
                top: 1rem /* 30/40 */;
                width: .5rem /* 20/40 */;
                height: .3rem /* 11/40 */;
            }
        }
        .head-list{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 .55rem;
            margin-top: .25rem;
            li{
                padding: .3rem .5rem;
                background-color: #eeeeee;
                color: #666666;
                font-size: .7rem;
                display: inline-block;
                margin: .425rem .1rem;
                border-radius:.25rem;
                &.current{
                    background: #ccc;
                }
                .tag{
                    width: .8rem;
                    height: .8rem;
                    border-radius:50%;
                    background-color: #EE774D;
                    text-align: center;
                    line-height: .8rem;
                    color: #ffffff;
                    font-size:.55rem;
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -4px;
                    margin-left: .25rem;
                }
            }
        }
        .content-box{
            margin-top: 2 /* 100/40 */;
            border-top: .5rem /* 20/40 */ solid #eee;
            margin-bottom: .5rem /* 20/40 */;
            .title{
                font-size: .8rem /* 30/40 */;
                color: #4CC6D8;
                line-height: 2rem /* 80/40 */;
                padding: 0 .6rem /* 25/40 */;
            }
            table{
                width: 100%;
                tbody{
                    tr,td{
                        border: 1px solid #e5e5e5;
                        font-size: .6rem /* 24/40 */;
                        color: #666;
                        text-align: center;
                        padding: .3rem /* 10/40 */;
                        height: 1.6rem /* 88/40 */;
                    }
                    td{
                        width: 20%;
                    }
                    .abnormal{
                        td{
                            color: #ee774d;
                            position: relative;
                            &:nth-child(2){
                                img{
                                    position: absolute;
                                    top: .85rem;
                                    right: .3rem /* 14/40 */;
                                    width: .3rem /* 14/40 */;
                                    height: .5rem /* 20/40 */;
                                }
                            }
                        }
                    }
                    tr{
                        &:nth-of-type(2n){
                            background: #F9F6F6;
                        }
                        td:last-child{
                            img{
                                width: .8rem /* 30/40 */;
                                height: .8rem /* 30/40 */;
                            }
                        }
                    }

                    .head-td{
                        td{
                            color: #333;
                        }
                    }
                }
            }
        }
    }
</style>
