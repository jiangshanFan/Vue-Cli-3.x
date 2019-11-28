<template>
  <div class="about">
    <h1 style="font-size: 0.25rem;">This is an Gantte page!</h1>
    <button @click="toggle">toggle</button>
    <Gantte :gantte_data="gantte_datas"></Gantte>
  </div>
</template>

<script>
import Gantte from './gantte';
export default {
  name: 'about',
  components: {
    Gantte,
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    toggle() {
      if (this.flag) {
        this.flag = 0;
        //请求接口的数据
        this.gantte_datas = {
          status: 1,
          msg: {
            startTime: '2018-03-18',
            endTime: '2018-04-26',
            items: [{
              "assignmentName": "玄策",
              "planStartTime": "2018-3-19",
              "planEndTime": "2018-4-20",
              "actualStartTime": "2018-3-19",
              "actualEndTime": "2018-4-30",
              "date": 0,
              "subProjectName":"保险杠"
            }, {
              "assignmentName": "assignmentName1",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-18",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-20",
              "date": 1,
              "subProjectName":"保险杠",
              "flag": 1,
            }, {
              "assignmentName": "assignmentName2",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-23",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-24",
              "subProjectName":"保险杠",
              "date": 2
            }, {
              "assignmentName": "assignmentName3",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-26",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-20",
              "subProjectName":"底座",
              "date": 3
            }, {
              "assignmentName": "assignmentName0",
              "planStartTime": "2018-3-19",
              "planEndTime": "2018-4-20",
              "actualStartTime": "2018-3-19",
              "actualEndTime": "2018-4-20",
              "subProjectName":"底座",
              "date": 0,
            }, {
              "assignmentName": "assignmentName1",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-18",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-20",
              "subProjectName":"底座",
              "date": 1
            }, {
              "assignmentName": "assignmentName2",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-23",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-24",
              "subProjectName":"底座",
              "date": 2
            }, {
              "assignmentName": "assignmentName3",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-26",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-20",
              "subProjectName":"滚轴",
              "date": 3
            }, {
              "assignmentName": "assignmentName0",
              "planStartTime": "2018-3-19",
              "planEndTime": "2018-4-20",
              "actualStartTime": "2018-3-19",
              "actualEndTime": "2018-4-20",
              "subProjectName":"滚轴",
              "date": 0,
            }, {
              "assignmentName": "assignmentName1",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-18",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-20",
              "subProjectName":"滚轴",
              "date": 1
            }, {
              "assignmentName": "assignmentName2",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-23",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-24",
              "subProjectName":"支撑",
              "date": 2
            }, {
              "assignmentName": "assignmentName3",
              "planStartTime": "2018-4-18",
              "planEndTime": "2018-4-26",
              "actualStartTime": "2018-4-19",
              "actualEndTime": "2018-4-20",
              "subProjectName":"支撑",
              "date": 3
            }],
          }
        };
      } else {
        this.flag = 1;
        this.gantte_datas = {
          status: 1,
          msg: {
            startTime: '2019-03-18',
            endTime: '2019-04-26',
            items: [{
              "assignmentName": "玄策1",
              "planStartTime": "2019-3-10",
              "planEndTime": "2019-4-10",
              "actualStartTime": "2019-3-10",
              "actualEndTime": "2019-4-10",
              "date": 0,
              "subProjectName":"保险杠1"
            }, {
              "assignmentName": "assignmentName1",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-18",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-20",
              "date": 1,
              "subProjectName":"保险杠1",
              "flag": 1,
            }, {
              "assignmentName": "assignmentName2",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-23",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-24",
              "subProjectName":"保险杠1",
              "date": 2
            }, {
              "assignmentName": "assignmentName3",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-26",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-20",
              "subProjectName":"底座1",
              "date": 3
            }, {
              "assignmentName": "assignmentName0",
              "planStartTime": "2019-3-19",
              "planEndTime": "2019-4-20",
              "actualStartTime": "2019-3-19",
              "actualEndTime": "2019-4-20",
              "subProjectName":"底座1",
              "date": 0,
            }, {
              "assignmentName": "assignmentName1",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-18",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-20",
              "subProjectName":"底座1",
              "date": 1
            }, {
              "assignmentName": "assignmentName2",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-23",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-24",
              "subProjectName":"底座1",
              "date": 2
            }, {
              "assignmentName": "assignmentName3",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-26",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-20",
              "subProjectName":"滚轴1",
              "date": 3
            }, {
              "assignmentName": "assignmentName0",
              "planStartTime": "2019-3-19",
              "planEndTime": "2019-4-20",
              "actualStartTime": "2019-3-19",
              "actualEndTime": "2019-4-20",
              "subProjectName":"滚轴1",
              "date": 0,
            }, {
              "assignmentName": "assignmentName1",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-18",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-20",
              "subProjectName":"滚轴1",
              "date": 1
            }, {
              "assignmentName": "assignmentName2",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-23",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-24",
              "subProjectName":"支撑1",
              "date": 2
            }, {
              "assignmentName": "assignmentName3",
              "planStartTime": "2019-4-18",
              "planEndTime": "2019-4-26",
              "actualStartTime": "2019-4-19",
              "actualEndTime": "2019-4-20",
              "subProjectName":"支撑1",
              "date": 3
            }],
          }
        };
      }
    }
  },
  data() {
    return {
      // 传递到 Gantte 图中的数据源参数
      gantte_datas: {},
      flag: 1,
    }
  },
}
</script>
