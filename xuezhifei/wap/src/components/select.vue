<template>
    <mt-popup
      v-model="isPopupVisible"
      position="bottom"
      popup-transition="popup-fade"
      closeOnClickModal="false" style="width:100%;">
        <mt-picker v-model="isPopupVisible" :slots="versionSlots" :showToolbar="true" :item-height="44" @change="onValuesChange">
            <span class="mint-datetime-action mint-datetime-cancel" @click="versionCancle">取消</span><span class="mint-datetime-action mint-datetime-confirm" @click="versionSelect">确定</span>
        </mt-picker>
    </mt-popup>
</template>

<script>
export default {
  data () {
    return {
        popupVisible:true,
        versionSlots: [
            {
              flex: 1,
              values: ['苏教版', '人教版'],
              className: 'slot1',
              textAlign: 'center'
            }
        ],}
  },
  props:['isPopupVisible'],
mounted(){
    console.log(this.isPopupVisible)
},
  methods: {
    versionCancle() {
        this.popupVisible = false;
    },
    versionSelect(){
        this.popupVisible=false;

    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
