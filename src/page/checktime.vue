<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px">选择日期</div>
          <div slot="right"  style="color: white;line-height: 37px" @click="tijiao">完成</div>
        </x-header>
      </div>
      <checklist  label-position="left" :options="commonList" v-model="checklist002">

      </checklist>
    </div>
</template>

<script>
  import { Checklist,XHeader} from 'vux'
  var vm;
    export default {
        mounted(){
          vm=this
          this.$ajax("getJiabanDays").then(function(res){
            for(var i=0;i<res.rows.length;i++){
                let str="<div><span style='font-size: 16px;line-height: 30px'>加班日期:</span>"+res.rows[i].day+"</div><div><span style='font-size: 16px;line-height: 30px'>加班天数:</span>"+res.rows[i].alias+"</div>"
                vm.commonList.push({key:res.rows[i].id,value:str,num:res.rows[i].day})
            }
          })
        },
        data () {
            return {
              checklist002:[],
              commonList: [],
            }
        },
        components: {Checklist,XHeader},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          tijiao(){
              let arr=[]
              for(var i=0;i<this.checklist002.length;i++){
                  for(var j=0;j<this.commonList.length;j++){
                      if(this.checklist002[i]==this.commonList[j].key){
                        arr.push({id:this.checklist002[i],name:this.commonList[j].num})
                      }
                  }
              }
              let table=this.$store.state.user.tables.items
              for (let value of table) {
                if(value.router=='/checktime'){
                 this.$set(value,'btnlist',arr)
                }
              }
              this.$router.go(-1)
          }
        }
    }
</script>

<style>
</style>
