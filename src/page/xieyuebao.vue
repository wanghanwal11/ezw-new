<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">写月报</div>
          <div slot="right"  style="color: white;line-height: 37px;font-size: 20px" @click="tijiao" class="iconfont icon-tijiao"></div>
        </x-header>
      </div>
      <div>
        <list :items="json1"></list>
        <rizhi :items="items"></rizhi>
        <x-button @click.native="jia" style="width: 90%;color: white;background:#2989ff;font-size: 16px;margin-top: 10px;margin-bottom: 10px ">+添加项目工作记录</x-button>
        <rizhi :items="items2"></rizhi>
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
        },
        data () {
            return {
              items: [{
                  title:"工作项目记录",
                  textlist:[{
                      name:'本周计划',
                      value:''
                  },{
                    name:'本周完成',
                    value:''
                  },{
                    name:'未完成原因',
                    value:''
                  }]
              }],
              items2: [{
                textlist:[{
                  name:'工作分析',
                  value:''
                },{
                  name:'风险对策',
                  value:''
                },{
                  name:'关注事项',
                  value:''
                },{
                  name:'下月工作计划',
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
              }]
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
                  name:'本周计划',
                  value:''
                },{
                  name:'本周完成',
                  value:''
                },{
                  name:'未完成原因',
                  value:''
                }]
              })
          },
          tijiao(){
            let arr=[]
            let byjh=[]
            let bywc=[]
            let wwc=[]
            for(let value of this.json2[0].list){
              arr.push(value.id)
            }
            for(let value of this.items){
              byjh.push(value.textlist[0].value)
              bywc.push(value.textlist[1].value)
              wwc.push(value.textlist[1].value)
            }
            this.$ajax("rizhitijiao",{
              logtime:this.json1[0].value,
              content :{
                byjh:byjh,
                bywc:bywc,
                wwc:wwc,
                gzfx:this.items2[0].textlist[0].value,
                fxdc:this.items2[0].textlist[1].value,
                gzsx:this.items2[0].textlist[2].value,
                xyjh:this.items2[0].textlist[3].value
              },
              type:'month',
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
