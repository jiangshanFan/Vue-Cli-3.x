<template>
  <div style="margin-left:100px;">

    <div class="gantteComponent" style="position:relative;width:600px;margin-left:210px;">
      <!-- 左侧表格 -->
      <!-- 注意：此处必须使用 height="550"，否则会造成滚动条无法正确显示 -->
      <el-table
        class="gantte_table drag"
        ref="gantte_table"
        :data="gTable"
        border
        height="550"
        tooltip-effect="dark"
        :span-method="objectSpanMethod"
        header-cell-class-name="tableHeaderCellClass"
        cell-class-name="tableCellClass"
        :cell-style="table_cell_style"
        :style="{
          width: table_width,
          left: '0',
          position: 'absolute',
        }">
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="subProjectName"
          label="子项目名称"
          title="子项目名称"
          width="80">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assignmentName"
          label="任务名称"
          width="50">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assignmentName"
          label="责任人"
          width="80">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assignmentName"
          label="任务状态"
          width="80">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assignmentName"
          label="计划开始时间"
          width="80">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assignmentName"
          label="计划结束时间"
          width="80">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assignmentName"
          label="实际开始时间"
          width="80">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assignmentName"
          label="实际结束时间"
          width="80">
        </el-table-column>
      </el-table>

      <!-- 中间间隔拖动条 -->
      <div 
        id="draggable"
        class="drag_border"
        draggable="true"
        @dragstart="dragEvent"
        :style="{
          width:'5px',
          height:'550px',
          position:'absolute',
          display:'block',
          background: 'yellowgreen',
          cursor: 'e-resize',
          left: table_width,
        }">
      </div>

      <!-- 右侧甘特图 -->
      <el-table
        class="gantte drag"
        ref="gantte"
        :data="gTable"
        border
        height="550"
        header-cell-class-name="tableHeaderCellClass"
        cell-class-name="tableCellClass"
        :style="{
          left: 'calc(' + table_width + ' + 5px)',
          width: 'calc(100% - ' + table_width + ')',
        }">
        <el-table-column
          :width="header_width">
          <!-- 此处 slot-scope="scope" 必须添加，否则无法渲染顶部数据，具体原因未明 -->
          <template slot="header" slot-scope="scope">
            <!-- 顶部时间 -->
            <div class="ganteview-toptime">
              <div
                class="ganteview-headercell" 
                v-for="(item,key) in top_time_data" 
                :title="item.date" 
                :key="key"
                :style="{
                  width:item.width+'px',
                  left:item.left+'px'
                }">
                {{item.date}}
              </div>
            </div>

            <!-- 底部时间 -->
            <div class="ganteview-bottomtime">
              <div
                class="ganteview-headercell" 
                :title="item.title" 
                v-for="(item) in bottom_time_data" 
                :key="item.title"
                :style="{width:item.width+'px',left:item.left+'px'}"
              >
                <p class="header_cells" :style="{background: item.is_rest?'red':null}">{{item.date}}</p>
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- 负责人 -->
            <span 
              class="charge"
              :style="{
                left:scope.row.left+'px',
              }">
              {{scope.row.assignmentName}}
            </span>

            <!-- 计划时间 -->
            <el-tooltip placement="top">
              <div slot="content">
                <p>计划开始时间：{{scope.row.planStartTime}}</p>
                <p>计划结束时间：{{scope.row.planEndTime}}</p>
              </div>
              <div 
                class="progress"
                :style="{
                  width:scope.row.width+'px',
                  height: '10px',
                  left:scope.row.left+'px',
                  top: '20px',
                  zIndex: 10,
                  position: 'absolute',
                  background: '#ddd',
                  borderRadius: '5px'
                }">
              </div>
            </el-tooltip>

            <!-- 实际时间 -->
            <el-tooltip placement="top" :hide-after="10000">
              <div slot="content">
                <p>计划开始时间：{{scope.row.actualStartTime}}</p>
                <p>计划结束时间：{{scope.row.actualEndTime}}</p>
              </div>
              <div 
                class="progress"
                :style="{
                  width:scope.row.width1+'px',
                  height: '10px',
                  left:scope.row.left1+'px',
                  bottom: '5px',
                  zIndex: 10,
                  position: 'absolute',
                  background: 'blue',
                  borderRadius: '5px'
                }">
              </div>
            </el-tooltip>

            <!-- 边框线 -->
            <div
              v-for="(item) in bottom_time_data" 
              :key="item.title"
              :style="{
                width:item.width+'px',
                left:item.left+'px',
                top: 0,
                zIndex: 1,
                borderRight: '1px solid #eee',
                height: '50px',
                position: 'absolute'
              }">
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Message } from 'element-ui'

export default {
  name: 'gantte',
  components:{
  },
  props: {
    gantte_data: Object,
  },
  // 通过监听父组件传递的参数值变化，来动态渲染gantte图表，避免使用mounted中造成无法动态渲染
  watch: {
    gantte_data(newValue, oldValue) {
      this.getList(newValue);
    }
  },
  mounted () {
    this.$nextTick(function() {
      let self = this;
      // 间隔拖动条
      this.drag = document.querySelectorAll('.drag_border')[0];
      // // 获取右侧gantte图，设置其宽度等于header_width，避免出现无法占满屏幕多余出来的空白，8代表滚动条
      // this.gantte_width = document.querySelectorAll('.gantte')[0];
      // this.gantte_width.style.width = (this.header_width + 8) + 'px';
      // 获取左侧表格，设置横轴滚动，纵轴不滚动
      this.table = document.querySelectorAll('.gantte_table .el-table__body-wrapper')[0];
      this.table.style.cssText = 'overflow: scroll hidden';
      // 获取右侧gantte图，默认设置x轴滚动
      this.gantte = document.querySelectorAll('.gantte .el-table__body-wrapper')[0];
      this.gantte.style.cssText = 'overflow-x: scroll';
      // 在右侧gantte图上添加滚动事件，同步左右的滚动
      this.gantte.addEventListener('scroll', function(e) {
        self.table.scrollTop = e.target.scrollTop;
      });
    })
  },

  computed: { //已在data中定义无须在此处声明
    
  },

  methods: {
    getList(obj) {
      /*----------  此处最后的方式就是使用全局状态管理来传递参数，才能避免不必要的一些生命周期问题
      ----------*/
      let gantte_data = JSON.parse(JSON.stringify(obj));
      console.log(gantte_data)
      /** 特别注意：时间格式必须完全一致，例如 new Date('2018-02-19') 不同于 new Date('2018-2-19'),前者比后者多8个小时 */
      //进度表数据
      if (!gantte_data) {
        gantte_data = {
          status: 0,
          msg: [],
        }
      }
      
      if(gantte_data.status === 1) {
        this.gTable = gantte_data.msg.items.map(item => {
          return {...item, minTime: gantte_data.msg.startTime, maxTime: gantte_data.msg.endTime}
        });
        // console.log(this.gTable, gantte_data);

        // 设置每一个格子的占用多少毫秒
        let time = 24 * 60 * 60 * 1000 / this.one_px;
        // 判断当前子项目中是否有开始时间和结束时间
        // 如果有，就重新设置 this.header_width = 0;避免再次渲染图表时叠加长度
        // 如果没有，就需要设置长度为当前gantte图表格的可视长度，并且将header中的内容置空
        if (gantte_data.msg.startTime && gantte_data.msg.endTime) {
          this.header_width = 0;
          this.get_top_time(gantte_data.msg.startTime, gantte_data.msg.endTime, time);
        } else {
          this.header_width = 'calc(100% - ' + this.table_width + ')';
          this.top_time_data = [];
          this.bottom_time_data = [];
        }
        // 每一次重新渲染图表时必须重置 this.spanArr, 否则会叠加之前的结果
        this.spanArr = [];
        this.getSpanArr(this.gTable);
      }
    },

    /**
     * 判断年份是否为润年
     *
     * @param {Number} year
     */
    isLeapYear(year) {
      return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
    },
    /**
     * 获取某一年份的某一月份的天数
     *
     * @param {Number} year
     * @param {Number} month
     */
    getMonthDays(year, month) {
      return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (this.isLeapYear(year) ? 29 : 28);
    },

    /**
     * 格式化时间轴刻度
     *
     * @param {Date} time
     * @param {Number} mode
     */
    format(time,mode){
      var year = time.getFullYear();
      var month = time.getMonth()+1;
      var day = time.getDate()
      if(mode == 1){
        return year + "-" + (month < 10 ? '0'+month : month) + '-' + (day < 10 ? '0'+day : day)
      }else if(mode == 2){
        return year + "-" + (month < 10 ? '0'+month : month)
      }else if(mode == 3){
        return day < 10 ? '0'+day : day
      }else if(mode == 4){
        return month < 10 ? '0'+month : month
      }else if(mode == 5){
        return year
      }
    },

    /**
     * 获取顶部月份
     *
     * @param {String} min 最小时间
     * @param {String} max 最大时间
     * @param {Number} time 每个格子的时间间隔
     */
    get_top_time(min, max, time) {
      min = new Date(min);
      let arr = [];
      // 最后的时间，初始值是max，后续根据格子数产生变化
      let end_time = new Date(max).getTime();
      // 最开始的时间，设定为当前月份的第一天
      this.minTime = min.getFullYear()+ '-' + (min.getMonth()+1) + '-' + 1;
      min = new Date(min.getFullYear()+ '-' + (min.getMonth()+1) + '-' + 1);
      for(let i=0;i <= end_time;){
        // old_time 表示当前格子的初始时间, date 表示最后展现在UI上的数据
        let old_time = min,
            date = this.format(old_time, 2);
        min = new Date(min.getFullYear(), min.getMonth()+1, 1);
        // 每一个月份的宽度
        let width = (min.getTime() - old_time.getTime()) / time;
        // 叠加每个顶部时间刻度的宽度得到最后顶部时间轴的总长度
        this.header_width += width;
        arr.push({
          left: (old_time.getTime()-new Date(this.minTime).getTime())/time,
          width: width,
          date: date,
        });
        // 更新下一个月份的初始时间
        i = min.getTime();
        // 更新结束时间，避免出现最后的结束时间大于 max, 而没有更新max
        this.maxEnd = i;
      }
      // 存放所有头部时间刻度的信息
      this.top_time_data = arr;
      if(this.maxEnd){
        end_time = this.maxEnd;
      }
      this.get_bottom_time(this.minTime ,end_time, time);
    },

    /**
     * 获取底部具体时间
     *
     * @param {Date} min 最小时间
     * @param {Date} max 最大时间
     * @param {Number} time 每个格子的时间间隔
     */
    get_bottom_time(min, max, time) {
      min = new Date(min);
      let arr = [];
      for(let i=0;i <= max;){
          let old_time = min,
              date = this.format(old_time,3),
              title = this.format(old_time,1),
              is_rest = false;
          min = new Date(min.getFullYear(),min.getMonth(),min.getDate()+1)
          // 计算获取周六和周日休息
          if(old_time.getDay()==0||old_time.getDay()==6){
            is_rest = true;
          }
          let width = (min.getTime() - old_time.getTime()) / time;
          i = min.getTime();
          if(i<=max){
            arr.push({
              left:(old_time.getTime()-new Date(this.minTime).getTime())/time,
              width:width,
              date:date,
              title:title,
              is_rest:is_rest
            });
          }
        }
      // 存放所有底部时间刻度的信息
      this.bottom_time_data = arr;
      this.format_gante_data(this.gTable, this.minTime, time);
    },

    /**
     * 对数据进行处理
     *
     * @param {Date} gante_data 图表所有的数据源
     * @param {Date} minTime 图表修改后的最初始的时间，注意区分时间的格式
     * @param {Number} time 每个格子的时间间隔
     */
    format_gante_data(gante_data, minTime, time) {
      for (let i of gante_data) {
        if (i.planStartTime || i.planEndTime) {
          i["left"] = (new Date(i.planStartTime) - new Date(minTime)) / time;
          if (i.planEndTime && new Date(i.planEndTime).getTime() >= new Date(i.planStartTime).getTime() && i.planStartTime) {
            var _time = new Date(i.planEndTime).getFullYear()+ '-' + (new Date(i.planEndTime).getMonth()+1)+ '-' + (new Date(i.planEndTime).getDate() + 1);
            i["width"] = 
              (new Date(_time) -
                new Date(i.planStartTime)) /
              time;
          } else {
            i["width"] = 0;
          }
        }
        
        /*----------  实际时间轴的位置生成  ----------*/
        if (i.actualStartTime || i.actualEndTime) {
          i["left1"] = (new Date(i.actualStartTime) - new Date(minTime)) / time;
          if (i.actualStartTime && new Date(i.actualEndTime).getTime() >= new Date(i.actualStartTime).getTime() && i.actualStartTime) {
            var _time = new Date(i.actualEndTime).getFullYear()+ '-' + (new Date(i.actualEndTime).getMonth()+1)+ '-' + (new Date(i.actualEndTime).getDate() + 1);
            i["width1"] = 
              (new Date(_time) -
                new Date(i.actualStartTime)) /
              time;
          } else {
            i["width1"] = 0;
          }
        }
        i = {...i, topTime: this.top_time_data, bottomTime: this.bottom_time_data,};
      }
      console.log(gante_data);  
    },

    /**
     * 间隔拖动条拖动事件
     *
     */
    dragEvent() {
      let self = this;
      let gantteDOM = document.getElementsByClassName('gantteComponent')[0];
      var dragged;

      /* 拖动目标元素时触发drag事件 */
      gantteDOM.addEventListener("drag", function( event ) {

      }, false);

      gantteDOM.addEventListener("dragstart", function( event ) {
          // 保存拖动元素的引用(ref.)
          dragged = event.target;
          // 使其半透明
          event.target.style.opacity = .5;
          console.log('start')
      }, false);

      gantteDOM.addEventListener("dragend", function( event ) {
          // 重置透明度
          event.target.style.opacity = "";
      }, false);

      /* 放置目标元素时触发事件 */
      gantteDOM.addEventListener("dragover", function( event ) {
          // 阻止默认动作以启用drop
          event.preventDefault();
          // console.log('over')
      }, false);

      gantteDOM.addEventListener("drop", function( event ) {
        // 阻止默认动作（如打开一些元素的链接）
        event.preventDefault();
        // 将拖动的元素到所选择的放置目标节点中
        // if ( event.target.className.indexOf('drag') !== -1) {
        //     event.target.style.background = "";
        //     dragged.parentNode.removeChild( dragged );
        //     event.target.appendChild( dragged );
        //     console.log('drop')
        // }
        // 在放下时触发
        // self.table_width = 'calc(' + event.clientX + 'px - (1 / 3 * 100%))';  // 当图表的尺寸不是100%时
        // if (event.clientX > (gantteDOM.offsetLeft+20) && event.clientX < (gantteDOM.offsetLeft + gantteDOM.offsetWidth-20)) {
          
        //   self.table_width = (event.clientX-gantteDOM.offsetLeft -20) + 'px';
        // } else {
        //   Message({showClose: true, type: 'error', message: '超出可拖动范围，请在当前图表范围中拖动！'});
        // }
        
        // 避免当前元素的父容器不是body时出现的offset偏差
        let obj = gantteDOM;
        let l = obj.offsetLeft; //对应父容器的上边距
        //判断是否有父容器，如果存在则累加其边距
        while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
            l += obj.offsetLeft; //叠加父容器的左边距
        }
        self.table_width = (event.clientX-l -20) + 'px';
      }, false);
    },

    /**
     * 表格中显示项目当前的状态
     *
     */
    table_cell_style({row, column, rowIndex, columnIndex}) {
      if (columnIndex !== 0) {
        if (row.flag) {
          return {
            color: '#fff',
            background: 'red',
          }
        }
      }
    },

    /**
     * 合并子项目名称
     * 
     * 处理表格中需要合并的项，获取rowIndex
     * @param {Array} data 表格数据
     *
     */
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0
        } else {
          // 判断当前任务与上一个任务是否属于同一个子项目,
          if (data[i].subProjectName === data[i - 1].subProjectName) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
      console.log(this.spanArr);
    },

    /**
     * 合并子项目名称
     * 
     * 利用对象的方式获取
     *
     */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 此处循环处理不同rowIndex
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
  },

  data () {

    return {
      // 最终表格以及进度条数据
      gTable: [],

      // 时间轴的长度
      header_width: 0,

      // 每个格子占的像素
      one_px: 20,

      // 最小时间和最大时间
      minTime: 0,
      maxTime: 0,

      // 所有头部,底部时间刻度集合
      top_time_data: [],
      bottom_time_data: [],

      // 所有元素的定位标识,必须是带px的字符，或者带calc的计算值
      table_width: 'calc(20% - 5px)',

      // 所有需要的DOM元素
      gantte: '',
      gantte_width: '',
      table: '',
      drag: '',

      spanArr: [],
    }
  }
}
</script>
<style lang="scss">
  .ganteview-toptime{
    height:24px;
    position: relative;
    background: #FDF8F4;
    border-bottom: 1px solid #ddd;
  }
  .ganteview-bottomtime{
    height:25px;
    position: relative;
  }
  .ganteview-toptime .ganteview-headercell{
    /* text-align: center; */
    padding-left: 5px;
    font-weight: bold;
    line-height: 24px !important;
    border-right: 1px solid #ddd;
  }
  .ganteview-bottomtime .ganteview-headercell{
    // position: relative;
    text-align: center;
    line-height: 25px !important;
    .header_cells {
      position: relative;
      padding: 0;
      margin: 0;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 200px;
        border-right: 1px solid #ddd;
      }
    }
  }
  .ganteview-bottomtime{
    background-color: #fff;
  }
  .gantte {
    div, th, .cell {
      padding: 0 !important;
      line-height: unset !important;
    }
    th{
      div {
        overflow: unset;
      }
    }
    // 负责人
    .charge {
      display: block;
      z-index: 11;
      padding: 0 10px;
      color: #fff;
      background: green;
      position: absolute;
      top: 5px;
      line-height: 15px;
      border-radius: 5px;
      font-size: 10px;
    }
  }
  .tableCellClass{
    padding: 0 !important;
    height: 50px;
  }
  .tableHeaderCellClass {
    padding: 0 !important;
    height: 50px;
  }

  .gantte_table {
    th{
      .cell {
        white-space: nowrap !important;
      }
    }
  }
</style>