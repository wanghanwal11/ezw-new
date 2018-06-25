<template>
  <div style="background: white">
    <div class="header" style="height: 71px">
      <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
      <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
        <div slot="overwrite-left" style="color: black;display: -webkit-box;">
          <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
        </div>
        <div style="color: white;line-height: 55px;">考勤</div>
      </x-header>
    </div>
    <inline-calendar
      ref="calendar"
      @on-change="onChange"
      @on-view-change="onViewChange"
      class="inline-calendar-demo"
      :show.sync="show"
      v-model="value"
      start-date="2016-04-01"
      end-date="2018-05-30"
      :range="range"
      :show-last-month="showLastMonth"
      :show-next-month="showNextMonth"
      :highlight-weekend="highlightWeekend"
      :return-six-rows="return6Rows"
      :hide-header="hideHeader"
      :hide-week-list="hideWeekList"
      :replace-text-list="replaceTextList"
      :weeks-list="weeksList"
      :render-function="buildSlotFn"
      :disable-past="disablePast"
      :disable-future="disableFuture"
      :disable-weekend="disableWeekend"
      :disable-date-function="disableDateFunction">
    </inline-calendar>
  </div>
</template>

<script>
  import {InlineCalendar,XHeader} from 'vux'
  var vm;
  export default {
    created(){
      vm=this
    },
    methods: {
      load(){
        this.$ajax("getCheckattendance",{
          year:this.year,
          month:this.month,
          day:this.day
        }).then(function(res){
          vm.data=res.rows;
          console.log(vm.data)
        })
      },
      goback(){
        this.$router.go(-1)
      },
      onChange (val) {
         // alert(val)
        console.log('on-change', val)
      },
      onViewChange (val, count) {
        this.year=val.year;
         this.month=val.month
        this.load()
        this.useCustomFn=!this.useCustomFn
        console.log('on view change', val, count)
      }
    },
    data () {
      return {
        data:[],
        year:'',
        month:'',
        day:'',
        show: true,
        value: '',
        listValue: '',
        range: false,
        showLastMonth: true,
        showNextMonth: true,
        highlightWeekend: false,
        return6Rows: true,
        hideHeader: false,
        hideWeekList: false,
        replaceTextList: {},
        replace: false,
        changeWeeksList: false,
        weeksList: [],
        useCustomFn: true,
        buildSlotFn: () => '',
        disablePast: false,
        disableFuture: false,
        disableWeekend: false,
        disableDateFunction (date) {
          if (date.formatedDate === '2017-10-16') {
            return true
          }
        }
      }
    },
    watch: {
      replace (val) {
        this.replaceTextList = val ? {
          'TODAY': '今'
        } : {}
      },
      useCustomFn (val) {
        this.buildSlotFn = '1' ? (line, index, data) => {
         /* let str=''
          for(var i=0;i<vm.data.length;i++){
            Object.keys(data[i]).forEach(key => {
              if(data.formatedDate==vm.$browser.FormatDate(Number(key),"yyyy-MM-dd")){
                str=value[key].state
              }
            })
          }*/
         return /8/.test(data.date) ? '<div style="font-size:12px;position: absolute;top: -2px;right: 5px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;">{{str}}</span></div>' : ''
        } : () => ''
      },
      changeWeeksList (val) {
        this.weeksList = val ? ['日', '一', '二', '三', '四', '五', '六 '] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
      }
    },
    components: {
      InlineCalendar,XHeader
    }
  }
</script>

<style lang="less" scoped>
  .inline-calendar-demo {
    background: rgba(255,255,255,0.9);
  }
</style>
