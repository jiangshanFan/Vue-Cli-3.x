import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* eslint-disable */
//初始化图表
Vue.prototype.$chartInit = function (chart,source,times,type) {
  let data = source;
  /**
   * 判断年份是否为润年
   *
   * @param {Number} year
   */
  function isLeapYear(year) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
  }
  /**
   * 获取某一年份的某一月份的天数
   *
   * @param {Number} year
   * @param {Number} month
   */
  function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
  }

  /**
   * 获取某年的某天是第几周
   * @param {Number} y
   * @param {Number} m
   * @param {Number} d
   * @returns {Number}
   */
  function getWeekNumber(y, m, d) {
    var now = new Date(y, m - 1, d),
      year = now.getFullYear(),
      month = now.getMonth(),
      days = now.getDate();
//那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
      days += getMonthDays(year, i);
    }

//那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay === 1) {
      week = Math.ceil(days / 7);
    } else {
      days -= (7 - yearFirstDay + 1);
      week = Math.ceil(days / 7);
    }
    week = (week<10?"0":"")+ week;
    return week;
  }
  let s = new Date(times.startTime);
  let e = new Date(times.endTime);
  // let start = this.$format(s.getTime());
  // let end = this.$format(e.getTime());
  let startYear = s.getFullYear();
  let endYear = e.getFullYear();
  // let start = this.$format(new Date('2018-09-01').getTime());
  // let end = this.$format(new Date('2018-12-31').getTime());

  const tickInterval = 24*60*60*1000;
  if(times.startTime && times.endTime) {
    let min = s.getTime();
    let max = e.getTime();
    let ticks = [];
    // for(let i = min; i <= max; i += tickInterval){ticks.push(i);}
    let cha = (max - min) / tickInterval;
    if(cha > 630) {
      min = new Date(startYear + '-01-01').getTime();
      max = new Date(endYear + '-12-31').getTime();
      for (let i = startYear; i <= endYear; i++) {
        ticks.push(`${i}年1月`, `${i}年2月`,`${i}年3月`,`${i}年4月`,`${i}年5月`,`${i}年6月`,`${i}年7月`,`${i}年8月`,`${i}年9月`,`${i}年10月`,`${i}年11月`,`${i}年12月`);
      }

    } else if(cha > 90) {
      for(let i = min; i <= max; i += 7*tickInterval) {
        ticks.push(i);
      }
    } else {
      for(let i = min; i <= max; i += tickInterval) {
        ticks.push(i);
      }
    }

    /*设定高度和宽度*/
    let size = {
      width : 40*ticks.length + 150,
      height : 40*data.length + 160,
    };

    if(type === 0) {
      size = {
        width : 120*ticks.length,
        height : 100*data.length,
      };
      if(100*data.length < 200) {
        size.height = 200;
      }
    }

    chart.changeSize(size.width,size.height);
    // console.log(size);


    //纵轴的range
    let t = (1 - (size.width - 120) / size.width) /2 ;
    let rangeY = [0,1-2*t];

    if(cha > 90) { //注意区分周日
      t = (1 - (size.width - 120) / size.width) /14;
      rangeY = [0,1-2*t];
    } else if(cha > 630) {
      t = (1 - (size.width - 120) / size.width) /30;
      rangeY = [0,1-2*t];
    }

    const defs = {
      range: {
        type:'time',
        min: min,
        max: max,
        ticks:ticks,
        mask: 'MM/DD',
        range: rangeY,
        nice:false,
      },
      nodeName: {
        type: 'cat',
        alias: '加工零件', // 定义别名
        nice: false, // 不对最大最小值优化
      }
    };


    /*-- 配置坐标轴 --*/
    chart.axis('nodeName', {
      line: {
        lineWidth: 1,
        stroke: '#aaa',
      },
      grid: null,
      label: {
        offset: 180, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: 'red', // 文本的颜色
          fontSize: '8', // 文本大小
          fontWeight: 'bold', // 文本粗细
          textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
        }, // 文本样式，支持回调|| {function},
        htmlTemplate: value => {
          return `<p class="out" style="width:150px;height:40px;padding-left:5px;box-sizing:border-box;font-size:8px;line-height:40px;margin:0;color:#666;text-align:right;" title="${value}">${value}</p>`;
        },
      },
    });
    chart.axis('range', {
      label: {
        offset: 10, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: '#404040', // 文本的颜色
          fontSize: '8', // 文本大小
          fontWeight: 'bold', // 文本粗细
          textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        }, // 文本样式，支持回调|| {function},
        htmlTemplate: value => {
          if(cha > 200) {
            // let self = this;
            var lot;
            (function loaddate(){
              var now = new Date(value);
              var str = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
              var year = now.getFullYear();
              var month =((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1);
              var date=(now.getDate()<10?"0":"")+now.getDate();
              // this.date2=str;
              var ttwo=year.toString().substring(2,year.length);
              lot=ttwo+month+date;
              value = getWeekNumber(year,month,date);
            })();
            return '<p class="timeLine" style="margin:0;font-size:8px;">'
              +'<span></span>W'+value+
              // + format(new Date(value).getTime()).m +'月' + '' +
              '</p>';
          }else {
            return '<p class="timeLine" style="margin:0;font-size:8px;">'
              +'<span></span>'+value+
              // + format(new Date(value).getTime()).m +'月' + '' +
              '</p>';
          }
          // return '<p class="timeLine">'+ value+ '</p>';
        },
      },
      // tickLine: {
      //   lineWidth: 1, // 刻度线宽
      //   stroke: '#aaa', // 刻度线的颜色
      //   strokeOpacity: 0.5, // 刻度线颜色的透明度
      //   length: 5, // 刻度线的长度，可以为负值（表示反方向渲染）
      //   alignWithLabel:true//设为负值则显示为category数据类型特有的样式
      // },
      grid: null,
    });

    if(type === 0) {
      chart.axis(false);
    }

    var values = ['计划时间', '实际时间'];

    let arr = [];

    for(let ii=0; ii<data.length; ii++) {
      let n = {}, m = {};
      m.nodeName = n.nodeName = data[ii].nodeName;
      n.status = values[1];
      m.status = values[0];

      if(data[ii].planStartTime && data[ii].planEndTime) {
        m.range = [new Date(data[ii].planStartTime).getTime(), new Date(data[ii].planEndTime).getTime() + tickInterval];
      }else {
        m.range = [];
      }

      if(data[ii].actualStartTime && data[ii].actualEndTime) {
        n.range = [new Date(data[ii].actualStartTime).getTime(), new Date(data[ii].actualEndTime).getTime() + tickInterval];
      }else {
        n.range = [];
      }
      arr.push(m);
      arr.push(n);
    }

    console.log(arr);

    /** 导入数据 */
    chart.source(arr,defs);

    chart.coord().transpose().scale(1, -1);

    chart.legend(values[status], {position: "bottom-left", offsetX: 160, marker: 'circle'});

    chart.tooltip({
      triggerOn: 'mousemove', // tooltip 的触发方式，默认为 mousemove
      showTitle: true, // 是否展示 title，默认为 true
      offset: 0, // tooltip 距离鼠标的偏移量
      containerTpl: '<div class="g2-tooltip">'
        + '<div class="g2-tooltip-title" style="margin:0 0 10px 0;"></div>'
        + '<ul class="g2-tooltip-list" style="min-width:200px;"></ul></div>', // tooltip 容器模板
      itemTpl: '<li data-index={index} style="border-top:1px solid #eee;"><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{status}{range}</li>', // tooltip 每项记录的默认模板
      inPlot: true, // 将 tooltip 展示在指定区域内
      follow: true, // tooltip 是否跟随鼠标移动
      shared: true, // 默认为 true, false 表示只展示单条 tooltip
      // position: 'left' || 'right' || 'top' || 'bottom' // 固定位置展示 tooltip
    });

    // chart.on('tooltip:change', function(ev) {
    //   // const items = ev.items; // tooltip显示的项
    //   chart.showTooltip({x:ev.x, y:ev.y});
    //   console.log(ev);
    // });

    chart.interval().position('nodeName*range').color('status', ['#66b1ff', 'rgba(229,28,35,0.5)' ]).size(12).tooltip('status*range', (status,range) => {
      if(range.length) {
        if(status === '计划时间') {
          return {
            status: '<span>计划时间</span>',
            range: '<p class="margin0">开始时间：' + this.$format(range[0]) + '</p><p class="margin0">结束时间：' + this.$format(range[1] - tickInterval) + '</p>',
          };
        }else {
          return {
            status: '<span>实际时间</span>',
            range: '<p class="margin0">开始时间：' + this.$format(range[0]) + '</p><p class="margin0">结束时间：' + this.$format(range[1] - tickInterval) + '</p>',
          };
        }
      }else {
        return {range: '暂无数据!'}
      }
    });
  }
};

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
