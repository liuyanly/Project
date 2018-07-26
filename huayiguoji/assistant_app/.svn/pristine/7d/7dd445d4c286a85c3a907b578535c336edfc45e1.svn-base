<template>
    <div class="add-question">
        <headers headName="问卷填写"></headers>
        <div class="content-box">
            <ul class="form-list">
                <li class="clear">
                    <p class="title">
                        姓名
                    </p>
                    <p class="add-content">
                        <input type="text" class="txt userName" maxlength="8" v-model="userName" />
                    </p>
                </li>
                <li class="clear">
                    <p class="title">
                        性别
                    </p>
                    <p class="add-content clear">
                        <span>
                            <input type="radio" v-model="sex" value="0" name="sex" class="input-radio one_sel" />
    						<span class="radio-name">女</span>
                            <img class="radio-img" src="../assets/images/b2_icon1.png" v-if="sex==0" />
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="sex!=0" />
                        </span>
						<span>
    						<input type="radio" v-model="sex" value="1" name="sex" class="input-radio input-radio1 one_sel" />
    						<span class="radio-name radio-name1">男</span>
    						<img class="radio-img radio-img1" src="../assets/images/b2_icon1_p.png" v-if="sex!=1" />
    						<img  class="radio-img radio-img1" src="../assets/images/b2_icon1.png" v-if="sex==1" />
                        </span>
                    </p>
                </li>
                <li class="clear">
                    <p class="title">
                        身份证号码
                    </p>
                    <p class="add-content">
                        <input type="text" class="txt idNum" maxlength="" v-model="idNum" />
                    </p>
                </li>
                <li class="clear">
                    <p class="title">
                        出生日期
                    </p>
                    <p class="add-content">
                        <input type="text" class="text time" placeholder="请选择" @click="openDatePicker" v-model="brithday" readonly>
                    </p>
                </li>
                <li>
                    <p class="title">
                        民族
                    </p>
                    <p class="add-content">
                        <input type="text" v-model="nation" class="txt idNum" maxlength="" />
                    </p>
                </li>
                <li>
                    <p class="title">
                        血型
                    </p>
                    <p class="add-content clear">
                        <span>
                            <input type="radio" v-model="blood" value="1" name="blood" class="input-radio one_sel" />
    						<span class="radio-name">A</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="blood!=1" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="blood==1" />
                        </span>
                        <span>
                            <input type="radio" v-model="blood" value="2" name="blood" class="input-radio one_sel" />
    						<span class="radio-name">B</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="blood!=2" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="blood==2" />
                        </span>
                        <span>
                            <input type="radio" v-model="blood" value="3" name="blood" class="input-radio one_sel" />
    						<span class="radio-name">AB</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="blood!=3" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="blood==3" />
                        </span>
                        <span>
                            <input type="radio" v-model="blood" value="4" name="blood" class="input-radio one_sel" />
    						<span class="radio-name">O</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="blood!=4" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="blood==4" />
                        </span>
                        <span>
                            <input type="radio" v-model="blood" value="5" name="blood" class="input-radio one_sel" />
    						<span class="radio-name">Rh阴性</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="blood!=5" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="blood==5" />
                        </span>
                    </p>
                </li>
                <li>
                    <p class="title">
                        婚姻状况
                    </p>
                    <p class="add-content clear">
                        <span>
                            <input type="radio" v-model="marry" value="1" name="marry" class="input-radio one_sel" />
    						<span class="radio-name">未婚</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="marry!=1" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="marry==1" />
                        </span>
                        <span>
                            <input type="radio" v-model="marry" value="2" name="marry" class="input-radio one_sel" />
    						<span class="radio-name">已婚</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="marry!=2" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="marry==2" />
                        </span>
                        <span>
                            <input type="radio" v-model="marry" value="3" name="marry" class="input-radio one_sel" />
    						<span class="radio-name">离异</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="marry!=3" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="marry==3" />
                        </span>
                        <span>
                            <input type="radio" v-model="marry" value="4" name="marry" class="input-radio one_sel" />
    						<span class="radio-name">丧偶</span>
    						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="marry!=4" />
    						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="marry==4" />
                        </span>
                    </p>
                </li>
                <li>
                    <p class="title">
                        文化程度
                    </p>
                    <p class="add-content clear">
                        <span><input type="radio" v-model="educational" value="1" name="educational" class="input-radio one_sel" />
						<span class="radio-name">小学</span>
						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="educational!=1" />
						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="educational==1" /></span>
                        <span><input type="radio" v-model="educational" value="2" name="educational" class="input-radio one_sel" />
						<span class="radio-name">中学</span>
						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="educational!=2" />
						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="educational==2" /></span>
                        <span><input type="radio" v-model="educational" value="3" name="educational" class="input-radio one_sel" />
						<span class="radio-name">大专</span>
						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="educational!=3" />
						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="educational==3" /></span>
                        <span><input type="radio" v-model="educational" value="4" name="educational" class="input-radio one_sel" />
						<span class="radio-name">本科及以上</span>
						<img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="educational!=4" />
						<img class="radio-img" src="../assets/images/b2_icon1.png" v-if="educational==4" /></span>
                    </p>
                </li>
                <li class="clear">
                    <p class="title">
                        联系电话
                    </p>
                    <p class="add-content">
                        <input type="number" v-model="telNum" class="txt telNum" maxlength="" />
                    </p>
                </li>
                <li class="clear">
                    <p class="title">
                        职业
                    </p>
                    <p class="add-content">
                        <input type="text" v-model="occupation" class="txt occupation" maxlength="" />
                    </p>
                </li>
                <li class="clear">
                    <p class="title">
                        通讯地址
                    </p>
                    <p class="add-content">
                        <textarea type="text" v-model="address" class="txt address" maxlength="50" >
                        </textarea>
                    </p>
                </li>
            </ul>
            <p class="sub-btn" @click="subBtn()">
                提交
            </p>
        </div>
        <mt-datetime-picker
			ref="picker1"
			type="date"
			:startDate="startDate"
			:endDate="endDate"
			year-format="{value}"
		 	month-format="{value}"
			date-format="{value}"
			@confirm="handleConfirm"
		    v-model="pickerValue">
		</mt-datetime-picker>
    </div>
</template>
<script>
    import headers from "../components/Header"
    export default{
        data(){
            return{
                sex: 0,
                brithday:'1991-02-30',
                startDate: new Date("1900"),
    			endDate: new Date(),
                pickerValue:'',
                blood:4,
                marry:1,
                educational:4,
                occupation:'企业主管',
                userName:'刘丽',
                idNum:'21010199102309203',
                address:'上海市徐汇区桂林路182号5栋1单元16号',
                telNum:'18483928392',
                nation:'汉',
            }
        },
        mounted(){

        },
        methods:{
            link(){

            },
            openDatePicker(){
    			this.$refs.picker1.open();
    		},
            handleConfirm(res){
    			console.log(res);
    			let d=new Date(res);
    			this.brithday=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
    		},
            subBtn(){
                this.$toast('问卷填写成功！')
                this.$router.push({name:'BaseQuestion'})
            },
        },
        components:{headers}
    }
</script>
<style lang="scss">
.add-question{
    margin-top: 2.2rem;
    background: #fff;
    padding-bottom: .8rem /* 30/40 */;
    .form-list{
        li{
            padding:0 .8rem /* 30/40 */ .8rem .8rem /* 30/40 */;
            border-bottom: 1px solid #ebebeb;
            .title{
                line-height: 2rem /* 80/40 */;
                font-size: .7rem /* 28/40 */;
                color: #333;
            }
            .add-content{
                >span{
                    position: relative;
                    float: left;
                    line-height: 2rem /* 80/40 */;
                }
                .txt{
                    width: 17.3rem /* 690/40 */;
                    height: 2rem /* 80/40 */;
                    padding: 0 .4rem /* 15/40 */;
                    font-size: .7rem /* 28/40 */;
                    box-sizing:border-box;
                    background: #eee;
                    border-radius: .3rem /* 10/40 */;
                }
                .address{
                    height: 3.8rem /* 150/40 */;
                    resize: none;
                    padding: .5rem /* 20/40 */;
                    box-sizing: border-box;
                }
            }
            .input-radio,.radio-img{
                width: 1rem;
                height: 1rem;
                // position: absolute;
                // right: 1.8rem /* 70/40 */;
                // top: .4rem;
            }
            img{
                vertical-align: middle;
                margin-right: .3rem /* 10/40 */;
                margin-top: -.3rem /* -10/40 */
            }
            .input-radio{
                position: absolute;
                z-index: 100;
                top: .5rem /* 15/40 */;
            }
            .radio-name{
                float: right;
                font-size: .7rem /* 28/40 */;
                color:#666;
                margin-right: .8rem /* 30/40 */;
            }
            .name{
                font-size: .7rem;
                color: #333333;
                float: left;
            }
        }
    }
    .sub-btn{
        width: 17.3rem /* 690/40 */;
        margin: 0 auto;
        margin-top: .8rem /* 30/40 */;
        text-align: center;
        color: #fff;
        background: #4cc6d8;
        border-radius: .3rem /* 10/40 */;
        line-height: 2rem /* 80/40 */;
        font-size: .8rem /* 32/40 */;
    }
}
</style>
