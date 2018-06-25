<template>
    <div style="display: -webkit-box">
        <div class="time" @click="showPlugin(0,dates)">{{dates.date1?dates.date1:'开始时间'}}</div>
        <div style="line-height: 28px;padding: 0 5px">--</div>
        <div class="time" @click="showPlugin(1,dates)">{{dates.date2?dates.date2:'结束时间'}}</div>
    </div>
</template>

<script>
  var vm;
    export default {
        mounted(){
              vm=this;
        },
        props:{
          dates:{
                type:Object
            }
        },
        data () {
            return {
            }
        },
        components: {},
        methods: {
          showPlugin (index,dates) {
            this.$vux.datetime.show({
              cancelText: '取消',
              confirmText: '确定',
              format: 'YYYY-MM-DD',
              onConfirm (val) {
                  if(index==0){
                      vm.$set(dates,'date1',val)
                  }else{
                    vm.$set(dates,'date2',val)
                  }
              }
            })
          }
        }
    }
</script>

<style scoped>
  .time{
    -webkit-box-flex: 1;
    padding: 5px;
    height: 20px;
    border: 1px solid #eeeeee;
    background: #f7f5fa;
    color: #999999;
    font-size: 15px;
    text-align: center;
    line-height: 20px;
    border-radius: 2px;
  }
</style>
