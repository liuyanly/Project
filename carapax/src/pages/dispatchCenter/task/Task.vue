<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/job">调度中心</BreadcrumbItem>
        <BreadcrumbItem href="/job">作业管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="header">
        <div style="display:inline-block">
            <Input v-model="jobname" icon="search" placeholder="请输入作业名称..." style="width: 200px"></Input>
            <Button type="primary" icon="search" @click="search(jobname)">搜索</Button>
        </div>
        <div class="toolbar">
          <Button type="error" icon="android-add" @click="modal = true">停止任务</Button>
        </div>
      </div>
      <Table stripe :loading="loadingData" :columns="columns" :data="data" @on-sort-change="onSortChange"></Table>
      <Page class="page" :total="total" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer
        @on-change="onPageChange" @on-page-size-change="onPageSizeChange">
      </Page>
    </div>
  </div>
</template>
<script>
    import { mapState } from 'vuex';
    import $ from 'jquery';
    import config from '@/config/config.js';

    const STATUS = {
      '0':   { value: 0,   time: 'createtime' ,  name: '初始化' },
      '1':   { value: 1,   time: 'submittime' ,  name: '排队中' },
      '2':   { value: 2,   time: 'begintime',    name: '运行中' },
      '10':  { value: 10,  time: 'endtime' ,     name: '运行成功' },
      '-2':  { value: -2,  time: 'endtime',      name: '运行失败' },
      '-10': { value: -10, time: 'endtime',      name: '强制结束' },
    }

    export default {
        data() {
          return {
            jobname: '',
            condition: {
              filter: {},
              pageNo: 1,
              pageSize: 10,
              sortKey: 'createtime',
              sortOrder: 'ASC'
            },
            loadingData: true,
            total: 0,
            data: [],
            columns: [
              { title: '所属作业', key: 'jobname',
                render: (h, params) => {
                  const { taskid, jobtype, jobname } = params.row;
                  return <a onClick={()=> this.$router.push({path: '/taskInfo', query: { id: taskid , type: jobtype }})}>{jobname}</a>
                }
              },
              { title: '状态', key: 'status',
                filters: [
                    { label: '初始化', value: 0 },
                    { label: '排队中', value: 1 },
                    { label: '运行中', value: 2 },
                    { label: '运行成功', value: 10 },
                    { label: '运行失败', value: -2 },
                    { label: '强制结束', value: -10 }
                ],
                filterMultiple: false,
                filterRemote (value) {
                    if(value) {
                      this.condition.filter.status = value[0];
                    } else {
                      this.condition.filter.status = '';
                    }
                    this.getTaskList(this.condition);
                },
                render: (h, params) => {
                  return <span>{STATUS[params.row.status.toString()].name}</span>
                }
              },
              { title: '类型', key: 'jobtype', 
                filters: [
                    { label: 'jstorm', value: 'jstorm' },
                    { label: 'spark', value: 'spark' },
                    { label: 'storage', value: 'storage' }
                ],
                filterMultiple: false,
                filterRemote (value) {
                    if(value) {
                      this.condition.filter.jobtype = value[0];
                    } else {
                      this.condition.filter.jobtype = '';
                    }
                    this.getTaskList(this.condition);
                }
              },
              { title: '时间', key: 'createtime', sortable: 'custom',
                render: (h, params) => {
                  const time = params.row[STATUS[params.row.status.toString()].time];
                  return <span>{this.$util.common.formatDateTime(time)}</span>
                }
              },
              { title: '操作', key: 'action', align: 'center',
                render: (h, params) => {
                  let stopTask = {};
                  if(params.row.status === 0 || params.row.status === 1 || params.row.status === 2) {
                    stopTask = h('Poptip', {
                        props: {
                            confirm: true,
                            title: '确定要停止吗！',
                            placement: 'left-start',
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            'on-ok': () => this.stopTask(params.row)
                        }
                    }, '停止任务');
                  } else {
                    stopTask = h('span', {
                        attrs: {
                            href: "javascript:;",
                        },
                        style: {
                            cursor: 'not-allowed',
                            color: '#999'
                        }
                    }, '停止任务');
                  }
                  return h('div', [
                    h('a', [
                      stopTask,
                    ]),
                    h('span', {
                        style: { color: '#ccc', padding: '0 10px' }
                    }, '|'),
                    h('a', {
                      on: {
                        click: () => this.$router.push({path: '/taskInfo', 
                            query: { 
                              id: params.row.taskid, 
                              type: params.row.jobtype,
                              log: true
                            }
                        })
                      }
                    }, '日志')
                  ]);
                }
              }
            ],
          }
        },
        created () {
            this.getList();
        },
        computed: mapState({
            changeProject: state => state.changeProject,
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            }
        },
        methods: {
            getList() {
                this.getTaskList(this.condition);
            },
            search(jobname) {
              jobname = jobname.trim();
              this.condition.filter.jobname = jobname;
              this.getTaskList(this.condition);
            },
            async getTaskList(condition) {
                condition = this.judgeCondition(condition);
                this.loadingData = true;
                let res = await this.$util.http.post('/dispatchCenter/ui/taskdtails', condition);
                if(res.status === 200) {
                    this.total = res.data.count;
                    this.data.splice(0, this.data.length, ...res.data.result);
                    this.loadingData = false;
                }
            },
            async onSortChange(sortable) {
                if(sortable.order === 'asc') {  //降序
                    this.condition.sortOrder = 'ASC';
                    this.getTaskList(this.condition);
                } else if(sortable.order === 'desc') {  //升序
                    this.condition.sortOrder = 'DESC';
                    this.getTaskList(this.condition);
                }
            },
            async stopTask(data) {
                const params = {
                    taskId: data.taskid,
                    type: data.jobtype
                };
                let res = await this.$util.http.post('/dispatchCenter/ui/stopjob', params);
                console.log(res);
                if(res.status === 200 && res.data.code === 200) {
                    this.$Message.success('停止任务成功!');
                    this.getTaskList(this.condition);
                }
            },
            onPageChange(pageNum) {
                this.condition.pageNo = pageNum;
                this.getTaskList(this.condition);
            },
            onPageSizeChange(pageSize) {
                this.condition.pageSize = pageSize;
                this.getTaskList(this.condition);
            },
            judgeCondition(condition) {   //判断condition的filter中三个参数是否都是空，都为空则删除filter字段
                let obj = {};
                $.extend(obj, condition);   //克隆conditon
                for(let key in obj.filter) {
                    if(obj.filter[key] === '') {
                        delete obj.filter[key];
                    }
                }
                if(JSON.stringify(obj.filter) == "{}") {  //filter字段为空了,删除filter字段
                    delete obj.filter;  //慎用delete， 会删除condition，this.condition指向的元数据字段
                }
                return obj;
            }
        }  
    }
</script>
