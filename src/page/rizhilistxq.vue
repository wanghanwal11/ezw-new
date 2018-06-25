<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">日报</div>
          <div slot="right"  style="color: white;line-height: 37px;font-size: 20px" v-if="items.type=='day'" @click="bianji" class="iconfont icon-bianji" ></div>
        </x-header>
      </div>
        <div style="display: -webkit-box;background: white;padding: 10px 20px">
            <div style="width: 50px;height: 50px;background-size: 100% 100%" :style="{backgroundImage:'url('+(items.image?items.image:moren)+')'}"></div>
            <div style="padding-left: 10px">
              <div style="font-size: 14px">{{items.title}}</div>
              <div style="font-size: 12px">{{items.orgname}}</div>
            </div>
        </div>
      <div style="background: white;font-size: 14px;padding-left: 15px">
        <div><span class="spanleft">{{type}}日期:</span>{{items.createtime| formdate('yyyy-MM-dd',items.createtime)}}</div>
        <div><span class="spanleft">提交日期:</span>{{items.logtime| formdate('yyyy-MM-dd',items.logtime)}}</div>
      </div>
      <div v-if="items.type=='day'" style="background: white;padding: 5px 15px;font-size: 14px">
        <div v-for="(item,index) in arrday" :key="index">
          <div style="padding: 5px 0">工作项目记录({{index+1}})</div>
          <div  style="padding: 5px 0;position: relative" class="linetop"><span class="spanleft">上午:</span><span v-html="item.am"></span></div>
          <div  style="padding: 5px 0;position: relative" class="linebottom"><span class="spanleft">下午:</span><span v-html="item.pm"></span></div>
        </div>
      </div>
      <div v-if="items.type=='week'" style="background: white;padding: 5px 15px;font-size: 14px">
            <div v-for="(item,index) in arrweek" :key="index" >
              <div style="padding: 5px 0">工作项目记录({{index+1}})</div>
              <div style="padding: 5px 0;position: relative" class="linetop"><span class="spanleft">本周计划:</span><span v-html="item.bzjh"></span></div>
              <div><span class="spanleft">本周完成:</span><span v-html="item.bzwc"></span></div>
              <div style=" padding: 5px 0;position: relative" class="linebottom"><span class="spanleft">未完成原因:</span><span v-html="item.wwc"></span></div>
            </div>
            <div style="padding: 5px 0">
              <div><span class="spanleft">本周工作总结:</span><span v-html="content.gzzj"></span></div>
              <div><span class="spanleft">风险提示:</span><span v-html="content.fxts"></span></div>
              <div><span class="spanleft">需要协调和支持事项:</span><span v-html="content.xtsx"></span></div>
              <div><span class="spanleft">下周工作计划:</span><span v-html="content.xzjh"></span></div>
            </div>
      </div>
      <div v-if="items.type=='month'" style="background: white;padding: 5px 15px;font-size: 14px">
        <div v-for="(item,index) in arrmonth" :key="index">
          <div style="padding: 5px 0">工作项目记录({{index+1}})</div>
          <div  style="padding: 5px 0;position: relative" class="linetop"><span class="spanleft">本月计划:</span><span v-html="item.byjh"></span></div>
          <div><span class="spanleft">本月完成:</span><span v-html="item.bywc"></span></div>
          <div  style="padding: 5px 0;position: relative" class="linebottom"><span class="spanleft">未完成原因:</span><span v-html="item.wwc"></span></div>
        </div>
        <div style="padding: 5px 0">
          <div><span class="spanleft">工作分析:</span><span v-html="content.gzfx"></span></div>
          <div><span class="spanleft">风险对策:</span><span v-html="content.fxdc"></span></div>
          <div><span class="spanleft">关注事项:</span><span v-html="content.gzsx"></span></div>
          <div><span class="spanleft">下月工作计划:</span><span v-html="content.xyjh"></span></div>
        </div>
      </div>
      <div>
        <d-flow ref="flow" v-if="bol" :data="json" @imgclick="imgclick"></d-flow>
      </div>
      <div style="background: white;font-size: 14px;padding: 5px 15px">
          <div class="linebottom" style="position: relative;line-height: 25px">全部评论</div>
          <div style="text-align: center;padding-top: 5px" v-if="pinglun.length==0">暂无评论</div>
          <div style="display: -webkit-box;padding: 5px" v-for="(item,index) in pinglun" :key="index">
              <div style="width: 35px;height: 35px;background-size: 100% 100%;border: 1px solid white;border-radius: 50%" :style="{backgroundImage:'url('+(item.senderpicture?item.senderpicture:moren)+')'}"></div>
              <div style="-webkit-box-flex: 1;font-size: 12px;padding-left: 5px">
                <div>{{item.sendername}}</div>
                <div style="line-height: 14px;color: #999999;">{{item.createtime| formdate('yyyy-MM-dd',item.createtime)}}</div>
                <div style="margin-top: 5px">{{item.content}}</div>
              </div>
          </div>
      </div>
      <div style="height: 50px"></div>
      <div style="position: fixed;bottom: 0;width: 100%;height: 35px;display: -webkit-box;background: white">
        <div  style="-webkit-box-flex: 1;padding: 5px">
          <x-input placeholder="输入" v-model="text" style="padding: 0px;width: 80%;border-radius: 3px;margin-left: 10px;padding-left: 5px"></x-input>
        </div>
        <div  style="width: 70px;padding-top: 3px">
          <x-button mini style="background:#2989ff;color: white "  @click.native="tijiao">确定</x-button>
        </div>
      </div>
    </div>
</template>

<script>
  import moren from '@/assets/moren.png'
  import {XButton,XHeader,XInput} from 'vux'
  import DFlow from 'devicebox/components/flow/DFlow.vue'
  var vm;
    export default {
        mounted(){
            vm=this;
          this.$ajax("rizhilistxq",{
            id:this.$route.query.id,
          }).then(function(res){
           vm.items=res.rows[0];
           vm.content=JSON.parse(res.rows[0].content)
           if(vm.items.type=='day'){
             vm.type='日志'
             for (let i=0;i<vm.content.am.length;i++){
               vm.arrday.push({am:vm.content.am[i],pm:vm.content.pm[i]})
             }
           }
            if(vm.items.type=='week'){
              vm.type='周报'
                for (let i=0;i<vm.content.bzjh.length;i++){
                  vm.arrweek.push({bzjh:vm.content.bzjh[i],bzwc:vm.content.bzwc[i],wwc:vm.content.wwc[i]})
                }
            }
            if(vm.items.type=='month'){
              vm.type='月报'
              for (let i=0;i<vm.content.byjh.length;i++){
                vm.arrmonth.push({byjh:vm.content.byjh[i],bywc:vm.content.bywc[i],wwc:vm.content.wwc[i]})
              }
            }
            var json={}
            if(vm.items.files.length>0){
              let arr=[]
              let num=[]
              for (let value of vm.items.files) {
                arr.push(vm.$store.state.host+"/"+value.url.replace(/\\/g,'/'))
                num.push({path:vm.$store.state.host+"/"+value.url.replace(/\\/g,'/'),id:value.fileid})
              }
              vm.sum=num
              json={
                files:[{
                  title: "图片",
                  min:arr}],
              }
              vm.bol=true;
              vm.json=json
            }
            if(vm.items.information.length>0){
              vm.pinglun=vm.items.information
            }
          })
        },
        data () {
            return {
                moren:moren,
                items:[],
                sum:[],
                type:'',
                content:{},
                arrweek:[],
                 arrday:[],
              arrmonth:[],
                bol:false,
                json:{ },
              pinglun:[],
              text:''
            }
        },
        components: {XButton,XHeader,DFlow,XInput},
        methods: {
          goback(){
              this.$router.go(-1)
          },
          bianji(){
            this.$router.push({
              path:'/xierizhi',
              query:{
                arrday:vm.arrday,
                time:vm.items.logtime,
                json:vm.sum
              }
            })
          },
          imgclick(s,a){
            let arr=[]
            for (let value of s) {
              arr.push({path:value})
            }
            this.$browser.viewPicture({url:arr,number:a})
          },
          tijiao(){
           this.$ajax("rizhipl",{
              receiver:this.$store.state.user.userid,
              businessid:this.$route.query.id,
              content:this.text
            }).then(function(res){
                let arr=res.rows[0]
                vm.pinglun.push({
                  senderpicture:arr.picture,
                  content:arr.content,
                  sendername:arr.name,
                  createtime:arr.date
                })
            })
          }
        }
    }
</script>

<style scoped>
  .spanleft{
    color: #999999!important;
    padding-right: 5px;
  }
</style>
