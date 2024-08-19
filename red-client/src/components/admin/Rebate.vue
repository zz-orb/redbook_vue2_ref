<template>
  <div class="Rebate">
    <h3>返利报表</h3>
    <div style="margin-bottom: 4px;">
      按年份查看：
      <el-select v-model="rebate_select_value" placeholder="请选择" @change="changeRebate">
        <el-option
          v-for="item in rebate_options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div
      id="rebate_echart"
      style="width: 95%; height: 600px; margin-bottom: 10px;"
    ></div>

    <h3>收益报表</h3>
    <div style="margin-bottom: 4px;">
       <div class="block">
         <span class="demonstration">选择日期查看：</span>
         <el-date-picker
           v-model="date_value"
           type="date"
           placeholder="选择日期"
           @change="changeEarnings">
         </el-date-picker>
      </div>
    </div>
    <div
      id="earnings_echart"
      style="width: 95%; height: 600px; margin-bottom: 100px;"
    ></div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      // 返利报表数据
      rebate_data: {
        "tableDataVos": [
          {
            "name": "销售金额",
            "data": [
              853.38,
              3390,
              101.96,
              53.2,
              3332
            ]
          },
          {
            "name": "返利金额",
            "data": [
              181.91,
              1007,
              31.63,
              7.79,
              686.4
            ]
          },
          {
            "name": "返利率",
            "data": [
              0.21,
              0.3,
              0.31,
              0.15,
              0.21
            ]
          }
        ],
        "xaxis": [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ],
        "yaxisRight": [
          0.1,
          0.2,
          0.3,
          0.4,
          0.5,
          0.6,
          0.7,
          0.8,
          0.9,
          1
        ],
        "yaxisLeft": [
          500,
          1000,
          1500,
          2000,
          2500,
          3000,
          3500
        ]
      },

      // 收益报表数据
      earnings_data: {
        "净收入": 1245.6,
        "总成本": 1400,
        "总返利金额": 686.4,
        "总金额": 3332
      },

      // 返利报表数据——echarts展示数据
      rebate_for_echarts_opition: {
        color: ['#5470C6', '#91CC75', '#EE6666'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['销售金额', '返利金额', '返利率']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '销售金额',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#5470C6'
              }
            },
            axisLabel: {
              formatter: '￥ {value} 元'
            }
          },
          {
            type: 'value',
            name: '返利金额',
            position: 'right',
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#91CC75'
              }
            },
            axisLabel: {
              formatter: '￥ {value} 元'
            }
          },
          {
            type: 'value',
            name: '返利率',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#EE6666'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '销售金额',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: '返利金额',
            type: 'bar',
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: '返利率',
            type: 'line',
            yAxisIndex: 2,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      },
      // 收益报表数据——echarts展示数据
      earnings_for_echarts_option: {
        tooltip: {
          trigger: '收益报表',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      },

      // 返利echarts
      rebate_echarts: null,
      // 收益echarts
      earnings_echarts: null,

      // 返利报表的选择框
      rebate_options: [
        {
          value: '2019',
          label: '2019'
        }, 
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2021',
          label: '2021'
        }, 
        {
          value: '2022',
          label: '2022'
        },
        {
          value: '2023',
          label: '2023'
        }],
        // 查看返利报表选择的年份
        rebate_select_value: '2023',

        // 查看收益报表选择的年份
        date_value: '',
        my_year: new Date().getFullYear,
        my_month: new Date().getMonth+1,
        my_day: new Date().getDate
    }
  },
  mounted () {
    this.get_rebate_data()
    this.get_earnings_data()
  },
  methods: {
    // 初始化返利报表
    init_reabte_echarts () {
      this.rebate_echarts = this.$echarts.init(document.getElementById("rebate_echart"));
      this.rebate_echarts.setOption(this.rebate_for_echarts_opition)
    },

    // 初始化收益报表
    init_earnings_echarts () {
      this.earnings_echarts = this.$echarts.init(document.getElementById("earnings_echart"));
      this.earnings_echarts.setOption(this.earnings_for_echarts_option)
    },

    // 获取返利报表--数据---并初始化 http://localhost:8080/report/rebate
    get_rebate_data () {
      this.$http({
        url: '/report/rebate',
        method: 'get',
        data: {
          year: this.rebate_select_value
        }
      }).then(res => {
        this.rebate_data = res.data.data

        // 更改rebate_for_echarts_opition的内容数据
        var xAxis_data = this.rebate_data.xaxis
        var legend_data = []
        var series_total_data = []
        for (var i=0; i< this.rebate_data.tableDataVos.length; i++) {
          if (i<2) {
            series_total_data.push({
              name: this.rebate_data.tableDataVos[i].name,
              type: 'bar',
              data: this.rebate_data.tableDataVos[i].data
            })
          }
          else if (i==2) {
            series_total_data.push({
              name: this.rebate_data.tableDataVos[i].name,
              type: 'line',
              data: this.rebate_data.tableDataVos[i].data,
              yAxisIndex:2
            })
          }
          
          legend_data.push(this.rebate_data.tableDataVos[i].name)
        }

        this.rebate_for_echarts_opition.xAxis[0].data = xAxis_data
        this.rebate_for_echarts_opition.legend.data = legend_data
        this.rebate_for_echarts_opition.series = series_total_data

        // 初始化rebate echarts
        this.init_reabte_echarts()
      }).catch(res => {
        console.log(res);
      })
    },


    // 获取收益报表--数据---并初始化 http://localhost:8080/report/earnings
    get_earnings_data () {
      this.$http({
        url: '/report/earnings',
        method: 'get',
        data: {
          "year": this.my_year + '',
          "month": this.my_month + '',
          "day": this.my_day + ''
        }
      }).then(res => {
        this.earnings_data = res.data.data

        // 更改earnings_for_echarts_opition的内容数据
        var xAxis_arr_data = ['净收入', '总成本', '总返利金额', '总金额']
        var series_arr_obj_data = [this.earnings_data.净收入,this.earnings_data.总成本,this.earnings_data.总返利金额,this.earnings_data.总金额]
        
        this.earnings_for_echarts_option.xAxis[0].data = xAxis_arr_data
        this.earnings_for_echarts_option.series[0].data = series_arr_obj_data

        // 初始化earnings echarts
        this.init_earnings_echarts()
      }).catch(res => {
        console.log(res);
      })
    },

    // rebate选择器变化
    changeRebate () {
      this.get_rebate_data()
    },
    // earnings日期选择器发生变化
    changeEarnings () {
      var chose_date = new Date(this.date_value)
      this.my_year = chose_date.getFullYear()
      this.my_month = chose_date.getMonth() + 1
      this.my_day = chose_date.getDate()
      // console.log(my_year)
      // console.log(my_month)
      // console.log(my_day)
      this.get_earnings_data()
    }
  }
}
</script>

<style>
.Rebate {
  width: 100%;
  height: 98%;
  padding: 20px;
  overflow: scroll;
}
.Rebate:-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}
</style>