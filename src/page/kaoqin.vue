<template>
  <div style="overflow-x: hidden">
    <div class="header" style="height: 71px">
      <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
      <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
        <div slot="overwrite-left" style="color: black;display: -webkit-box;">
          <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
        </div>
        <div style="color: white;line-height: 55px;">考勤</div>
      </x-header>
    </div>
    <div style="padding: 5px;background: white;">
        <div style="width: 100%">
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
    </div>
    <div style="padding: 10px;background: white;margin-top: 10px">
        <div style="display: -webkit-box">
            <div style="width: 40px;height: 40px;border: 1px solid white;border-radius: 50%;background-size: 100% 100%" :style="{backgroundImage:'url('+(data.picture?data.picture:moren)+')'}"></div>
            <div style="-webkit-box-flex: 1;padding-left: 10px;line-height: 40px">{{geren.name}}</div>
        </div>
        <div style="padding: 5px">
          记录:<span v-html="geren.am" style="padding:  0 10px"></span><span v-html="geren.pm"></span>
        </div>
        <div style="padding-left: 5px">
            <div class="iconfont icon-shijian" style="display: inline-block;font-size: 20px;vertical-align: middle"></div>
            <span style="vertical-align: middle">{{geren.state}}</span>
        </div>
    </div>
    <div style="padding: 10px;background: white;margin-top: 10px" v-for="(item,index) in items" :key="index">
      <div style="display: -webkit-box">
        <div style="width: 40px;height: 40px;border: 1px solid white;border-radius: 50%;background-size: 100% 100%" :style="{backgroundImage:'url('+(item.picture?item.picture:moren)+')'}"></div>
        <div style="-webkit-box-flex: 1;padding-left: 10px;line-height: 40px">{{item.name}}</div>
      </div>
      <div style="padding: 5px">
        记录:<span v-html="item.begtime" style="padding:  0 10px"></span><span v-html="item.endtime"></span>
      </div>
      <div style="padding-left: 5px">
        <div class="iconfont icon-shijian" style="display: inline-block;font-size: 20px;vertical-align: middle"></div>
        <span style="vertical-align: middle">{{item.status}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {InlineCalendar,XHeader} from 'vux'
  import moren from '@/assets/moren.png'
  var vm;
  export default {
    created(){
      vm=this
      var myDate = new Date();
      var year =myDate.getFullYear();
      var month=(myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1);
      this.day=myDate.getDate();
      vm.mydate=year+'-'+month+'-'+this.day
    },
    methods: {
      load(){
        this.$ajax("getCheckattendance",{
          year:this.year,
          month:this.month,
          day:this.day
        }).then(function(res){
          vm.data=res.rows;
          for(var i=0;i<vm.data.length;i++){
            Object.keys(vm.data[i]).forEach(key => {
              if(vm.mydate==vm.$browser.FormatDate(Number(key),"yyyy-MM-dd")){
                vm.geren=vm.data[i][key]
              }
            })
          }
        })
      },
      load1(){
        this.$ajax("getAttendanceByRights",{
          year:this.year,
          month:this.month,
          day:this.day
        }).then(function(res){
         vm.items=res.rows;
        })
      },
      goback(){
        this.$router.go(-1)
      },
      onChange (val) {
        for(var i=0;i<vm.data.length;i++){
          Object.keys(vm.data[i]).forEach(key => {
            if(val==vm.$browser.FormatDate(Number(key),"yyyy-MM-dd")){
              vm.geren=vm.data[i][key]
            }
          })
        }
        let vals=val.split('-')
        this.day=vals[2]
        this.load1()
      },
      onViewChange (val, count) {
        this.year=val.year;
        this.month=val.month
        this.day='00'
        this.load()
        this.load1()
        this.useCustomFn=!this.useCustomFn
        console.log('on view change', val, count)
      }
    },
    data () {
      return {
        items:[],
        mydate:"",
        geren:{},
        moren:moren,
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
        disableFuture: true,
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
           let str=''
           for(var i=0;i<vm.data.length;i++){
               Object.keys(vm.data[i]).forEach(key => {
               if(data.formatedDate==vm.$browser.FormatDate(Number(key),"yyyy-MM-dd")){
                   if(vm.data[i][key].state!='周末'&&vm.data[i][key].state!='正常'){
                     str=vm.data[i][key].state
                   }
               }
             })
           }
          return '1' ? '<div style="font-size:12px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 35px;margin: 0 auto;text-align:center;border: 1px solid white;border-radius: 30px;background: #EB5554;color: white;line-height: 16px;">'+str+'</div>' : ''
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
    text-align: center;
  }
</style>
