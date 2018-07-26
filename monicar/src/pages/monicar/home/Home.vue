<style scope>
  @import './home.css';
</style>

<template>
  <div class="wrapper">
    <Row>
        <Col span="7">
          <div class="dataBox">
            <div class="data-con">
              <echartLine :sty="sty" :data="eline"></echartLine>
            </div>
          </div>
          <div class="dataBox">
            <div class="data-con">
              <ebar :sty="sty" :data="ebar"></ebar>
            </div>
          </div>
        </Col>
        <Col span="10">
          <div class="dataBox">
            <div class="data-con data-total">
              <div class="data-title">累计驾驶行程里程统计</div>
              <div class="data-count">
                <span v-for="(num, index) in count">
                  <span class="data-num">{{num}}</span>
                  <span class="data-separate" v-if="(index%3===0) && (index!=count.length-1)">,</span>
                </span>
               <span class="data-title">公里</span>
              </div>
            </div>
          </div>
          <div>
            <!-- <Map :height="745"></Map> -->
            <FlyLine :sty="mapStyle"></FlyLine>
            <Emap :sty="mapStyle" style="z-index:99"></Emap>
          </div>
        </Col>
        <Col span="7">
          <div class="dataBox">
            <div class="data-con">
              <epie :sty="sty" :data="epie"></epie>
            </div>
          </div>
          <div class="dataBox">
            <div class="data-con">
              <ebar :sty="sty" :data="ebarCarDensity"></ebar>
            </div>
          </div>
        </Col>
    </Row>
  </div>
</template>

<script>
  import config from '@/config/config.js';
  import echartLine from '@/components/echarts/eLine.vue';
  import ebar from '@/components/echarts/eBar.vue';
  import epie from '@/components/echarts/ePie.vue';
  import etable from '@/components/echarts/eTable.vue';
  import Map from './Map';
  import Emap from './map/Emap';
  import FlyLine from './map/FlyLine.vue';

  export default {
    components: {
      echartLine,
      ebar,
      epie,
      etable,
      Map,
      Emap,
      FlyLine
    },
    data() {
      return {
        sty: {
            width: 100+'%',
            height: 400+'px'
        },
        mapStyle: {
          width: '100%',
          height: '600px'
        },
        eline: {},
        ebar: {},
        epie: {},
        ebarCarDensity: {},
        count: [],
        mileUrl:`${config.baseUrl}/datacenter/ui/number?type=Miletotal&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570`,
        timer: null
      }
    },
    created() {
      const barUrl = `${config.baseUrl}/datacenter/ui/bar?type=ObdConnect&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570`;
      const lineUrl = `${config.baseUrl}/datacenter/ui/line?type=TravelDistance&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570`;
      const pieUrl = `${config.baseUrl}/datacenter/ui/pie?type=brand&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570`;
      const carDensityUrl = `${config.baseUrl}/datacenter/ui/bar?type=CarDensity&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570`;
      this.requestData(barUrl,'bar', (data) => this.ebar = data);
      this.requestData(lineUrl,'line', (data) => this.eline = data);
      this.requestData(pieUrl, 'pie', (data) => this.epie = data);
      this.requestData(carDensityUrl, 'bar', (data) => this.ebarCarDensity = data);
      this.getData(this.mileUrl,(data)=> this.count = data);
      this.timer = setInterval(() =>{
          this.getData(this.mileUrl,(data)=> this.count = data);
      }, 3000);
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      requestData(url, type, callBack) {
          let xhr = new XMLHttpRequest();
          if (xhr.withCredentials === undefined) return false;

          xhr.open("get", url);
          xhr.onreadystatechange = () => {
              if (xhr.readyState !== 4) return;
              if (xhr.status === 200) {
                  let res = JSON.parse(xhr.responseText);
                  callBack(res);
              }
          };
          xhr.send(null);
      },
      getData(url, callBack) {
          let xhr = new XMLHttpRequest();
          if (xhr.withCredentials === undefined) return false;

          xhr.open("get", url);
          xhr.onreadystatechange = () => {
              if (xhr.readyState !== 4) return;
              if (xhr.status === 200) {
                  let res = JSON.parse(xhr.responseText);
                  let num = parseInt(res.data);
                  let aNum = num.toString().split('');
                  callBack(aNum);
              }
          };
          xhr.send(null);
      }
    }
  }
</script>