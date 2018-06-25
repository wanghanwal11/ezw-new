<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">写日志</div>
          <div slot="right"  style="color: white;line-height: 37px;font-size: 20px" @click="tijiao" class="iconfont icon-tijiao"></div>
        </x-header>
      </div>
      <div>
        <list :items="json1" v-if="bol"></list>
        <rizhi :items="items"></rizhi>
        <x-button @click.native="jia" style="width: 90%;color: white;background:#2989ff;font-size: 16px;margin-top: 10px ">+添加项目工作记录</x-button>
        <list :items="json2"></list>
        <div style="height: 50px"></div>
      </div>
    </div>
</template>

<script>
  import rizhi from '@/components/rizhi.vue'
  import {XButton,XHeader} from 'vux'
  import list from '@/components/list'
  var vm;
    export default {
        mounted(){
          vm=this;
          if(this.$route.query.time){
              vm.bol=true
              this.$set(vm.json1[0],'value',this.$browser.FormatDate(this.$route.query.time,"yyyy-MM-dd"))
          }
          if(this.$route.query.json){
            this.$set(vm.json2[0],'list',this.$route.query.json)
          }
          if(this.$route.query.arrday){
            vm.items=[]
            for(let i=0;i<this.$route.query.arrday.length;i++){
                let arr=[{
                  name:'上午',
                  value:this.$route.query.arrday[i].am
                },{
                  name:'下午',
                  value:this.$route.query.arrday[i].pm
                }]
              let json={}
              json.textlist=arr;
              json.title="工作项目记录";
              vm.items.push(json)
            }
          }
        },
        data () {
            return {
              items: [{
                  title:"工作项目记录",
                  textlist:[{
                      name:'上午',
                      value:''
                  },{
                    name:'下午',
                    value:''
                  }]
              }],
              json1:[{
                  type:'date',
                  name:"日期",
                  value:''
              }],
              json2:[{
                type:'image',
                name:"图片",
                url:this.$store.state.host+'/oa/docmobile/docupload.ht',
                list:[]
              }],
              bol:false
            }
        },
        components: {rizhi,XButton,list,XHeader},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          jia(){
              this.items.push({
                title:"工作项目记录",
                textlist:[{
                  name:'上午',
                  value:''
                },{
                  name:'下午',
                  value:''
                }]
              })
          },
          tijiao(){
            let arr=[]
            let am=[]
            let pm=[]
            for(let value of this.json2[0].list){
                  arr.push(value.id)
            }
            for(let value of this.items){
              am.push(value.textlist[0].value)
              pm.push(value.textlist[1].value)
            }
           this.$ajax("rizhitijiao",{
              logtime:this.json1[0].value,
              content :{
                am:am,
                pm:pm
              },
             type:'day',
             issave:'1',
             filesid:arr.join(',')
           }).then(function (res) {
              vm.$router.go(-1)
            },function(res){
             vm.show2=false
             vm.$vux.toast.show({
               type:'text',
               width:'15rem',
               text: res,
               time:2000,
               position:'middle'
             })
           })
          }
        }
    }
</script>

<style>
</style>
