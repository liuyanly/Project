<style rel="stylesheet/scss" lang="scss" scoped>
  table {
    border-collapse:collapse;
  td {
    padding: 11px 20px;
    border: 1px solid #eeeeee;
  }
  label {
    color: #999;
  }
  }
  .content {
    padding: 15px;
  table {
    margin-bottom: 25px;
    width: 100%;
  }
  }
  .info-header {
    text-align: left;
    margin-top: 10px;
    margin-bottom: -1px;
    height: 40px;
    background: #F5f6FA;
    line-height: 38px;
    border: 1px solid #e1e6eb;
    position: relative;
    border-left: 4px solid #6d7781;
  .title {
    font-size: 14px;
    color: #333333;
    display: inline-block;
    margin-left: 16px;
  }
  }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
                <BreadcrumbItem href="/services">服务提供商</BreadcrumbItem>
                <BreadcrumbItem href="/services">服务</BreadcrumbItem>
                <BreadcrumbItem href="/servicesInfo">服务详情</BreadcrumbItem>
            </Breadcrumb>
        </div>

      <div class="content">
        <div>
          <div class="info-header">
            <span class="title">组件列表</span>
          </div>
          <table>
            <tbody>
              <tr v-for="component in data.component">
                <td>
                  <span class="label">组件名称：</span>
                  <span>{{component.name}}</span>
                </td>
                <td>
                  <span class="label">在线实例：</span>
                  <span v-for="instance in  component.instance"><Tag type="border">{{instance}}</Tag></span>
                </td>
              </tr>
              <tr>
                <td colspan='3'>
                  <span class="label">功能：</span>
                  <span v-for="feature in data.features">
                      <Tag type="border">{{feature}}</Tag>
                  </span>
                </td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data: {
                    component:[],
                    features: []
                },
            }
        },
        async created() {
          let {components, features} = this.$router.history.current.query;
          this.setServiceDetail(components, features)
        },
        methods: {
          setServiceDetail(components, features) {
            this.data.features = features;
            for(let c of components) {
                let obj={};
                obj.name=c.name;
                obj.instance = [];
                for(let instance of c.instances) {
                  obj.instance.push(instance);
                }
                this.data.component.push(obj);
            }
            console.log(this.data.component)
          }
        }
    }
</script>
