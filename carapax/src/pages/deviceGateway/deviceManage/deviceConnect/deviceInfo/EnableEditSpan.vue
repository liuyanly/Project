<!-- 依赖于iview 的图标-->
<!-- 复用性差 -->

<style lang="scss" scoped>
    .profile {
        line-height: 32px;
        .icon-container {
            text-align: center;
            .icon {
                line-height: 32px;
                cursor: pointer;
            }
        }
        
    }
</style>

<template>
    <!-- <div class="container" >
        <div class="left">
             <span v-if="!isEdit" class="value">{{name}}</span>
            <Input v-else class="value" v-model="editValue"></Input>
        </div>
        <div class="right" @click="edit">
            <Icon class="icon" :type="iconType"></Icon> 
        </div>
    </div> -->
    <Row class="profile">
        <Col span="6">
            <span>{{profile.key}}：</span>
        </Col>
        <Col span="10">
            <p v-if="!isEdit">
                <span>{{profile.value}}</span>
            </p>
            <Input v-else v-model="editValue"></Input>
        </Col>
        <Col span="3" >
            <div class="icon-container" @click="edit">
                <Icon class="icon" :type="iconType"></Icon> 
            </div>
        </Col>
    </Row>
</template>

<script>
    export default {
        name: 'EnableEditSpan',
        data() {
            return {
                profile: {},
                isEdit: false,
                iconType: 'edit',
                editValue: '',
                preValue: ''
            }
        },
        props: {
            data: {
                type: Object,
                default: {}
            }
        },
        created() {
            this.profile = this.data;
        },
        watch: {
            data() {
                this.profile = this.data;
            }
        },
        methods: {
            edit() {
                this.isEdit = !this.isEdit;
                if(this.iconType === 'edit') {
                    this.iconType = 'checkmark';
                    this.preValue = this.profile.value;
                    this.editValue = this.profile.value;
                } else {
                    this.iconType = 'edit';
                    if(this.preValue !== this.editValue) {
                        const newProfile = {};
                        newProfile[this.profile.key] = this.editValue;
                        this.$emit('onChange', newProfile);
                    }
                }
            }
        }
    }
    
</script>