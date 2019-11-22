const charge = (weekdate) => {
    const max = Math.max.apply(null, weekdate)
    if (!max) return 0
    let maxbast = 0
    let count = 10
    const maxLen = max.toString().length
    for (let i = 1; i < maxLen - 1; i++) {
      count = count * 10
    }
    maxbast = [parseInt(max / count) + 1] * count
    return maxbast
  }

  const dataEcharts = (Xdata,Arrdata) => {
    
    // 计算数据组最大值
    const max = Math.max.apply(null, Arrdata)
    if (!max) return 0
    let maxbast = 0
    let count = 10
    const maxLen = max.toString().length
    for (let i = 1; i < maxLen - 1; i++) {
      count = count * 10
    }
    maxbast = [parseInt(max / count) + 1] * count

    const Item = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          animation:false,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#9A9A9A'
            }
          },
          axisTick: {
            show: false
          },
          // axisLabel:{
          //   //X轴刻度配置
          //   interval:2 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
          // },
          data: Xdata
        },
        yAxis: {
          type: 'value',
          splitLine: { show: true },
          max: maxbast,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          boundaryGap: [0, '100%'],
          axisLabel: {
            margin: 20,
            textStyle: {
              color: '#9A9A9A'
            }
          }
        },
        grid: {
          left: 60,
          y: 30
        },
        series: [
          {
            name: '/KM',
            type: 'line',
            showSymbol: true,
            sampling: 'average',
            symbolSize: 10,
            itemStyle: {
              borderWidth: 5,
              normal: {
                color: '#FF5314'
              }
            },
            data: Arrdata
          }
        ]
      }
    return Item
  }

  export {
    charge,
    dataEcharts
  }