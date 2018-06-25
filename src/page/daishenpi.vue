<template>
  <div style="height: 100%" :style="{overflow:overflow}" class="hjzx">
    <div class="header" @touchmove.prevent>
      <div style="height: 25px;background:#2989ff;width: 100%;position: fixed;top: 0;z-index: 99999"></div>
    </div>
    <div @touchmove.prevent style="width: 100%;position: fixed;z-index: 99;top: 0;">
        <x-header style="background: #2989ff;width: 100%;margin-top: 25px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;color: white" @click="goback"></div>
          </div>
          <div style="color: white">待审批</div>
        </x-header>
        <shaixuan @click="click"  style="width: 100%;" :items="items">
          <div style="width: 100px;line-height: 35px;text-align: center;" @click="cehua">筛选<div style="display: inline-block;   font-size: 18px;vertical-align: middle;" class="iconfont icon-shaixuan"></div></div>
        </shaixuan>
    </div>
    <scroller :on-infinite="infinite" ref="my_scroller" refreshText>
      <div style="height: 108px;"></div>
      <div v-for="(item, index) in items1" @click="hjzxxq(item)" :key="index" style="background: white;padding: 15px;display: -webkit-box;border-bottom: 1px solid #ccc">
        <div style="-webkit-box-flex: 1;padding: 0px 10px">
          <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.title}}</div>
          <div style="font-size: 14px;line-height:14px;color: #999999;margin: 5px 0">{{item.text}}</div>
          <div style="font-size: 14px;line-height: 20px;color: #999999">{{item.createtime | formdate('yyyy-MM-dd',item.createtime)}}</div>
        </div>
        <div style="min-width: 50px;">
          <div style="font-size: 14px;color: red">{{item.levelname}}</div>
          <div style="font-size: 14px;line-height: 35px">{{item.state}}</div>
        </div>
      </div>
    </scroller>
    <div class="cehua">
      <pounp ref="pounp" class="pounp"  @hides="hides">
        <group style="position: relative" @hides="hides">
          <xuan :items="btnlists" v-if="type=='sjlx'"></xuan>
          <xuan :items="btnlists1" v-if="type=='sjzt'"></xuan>
          <div style="display: -webkit-box;width: 100%;margin-top: 20px">
            <x-button mini style="width: 50%;height:40px;display: block;margin: 0;border-radius: 0" @click.native="chongzhi1">重置</x-button>
            <x-button mini style="width:50%;height: 40px;display: block;margin: 0;color: white;background: #2989ff" @click.native="queding1">确定</x-button>
          </div>
        </group>
      </pounp>
      <popup v-model="show9" position="right" @on-hide="onhide"  style="background: white">
        <div style="height: 25px"></div>
        <div style="width:300px;">
          <div style="padding: 10px">
            <div>
              <div  style="margin: 8px 0">事件标题</div>
              <x-input type="text" v-model="titlecontent" placeholder="请输入事件标题"></x-input>
            </div>
            <div>
              <div  style="margin: 8px 0">待办类型</div>
              <btnlist :items="btnlists"></btnlist>
            </div>
            <!--<div>-->
             <!--<div style="display: -webkit-box">-->
               <!--<div  style="margin: 8px 0;-webkit-box-flex: 1">事件类型</div>-->
               <!--<div  style="width: 30px;font-size: 25px;line-height: 40px">+</div>-->
             <!--</div>-->
              <!--<div></div>-->
            <!--</div>-->
            <div>
            <div  style="margin: 8px 0">待办状态</div>
            <btnlist :items="btnlists1"></btnlist>
          </div>
            <div>
              <div  style="margin: 8px 0">上报时间</div>
              <times style="margin: 15px" :dates="dates" ref="gettime"></times>
            </div>
          </div>
          <!--<item-->
            <!--class="item"-->
            <!--:model="treeData">-->
          <!--</item>-->
          <div style="height:41px "></div>
          <div style="position: fixed;bottom: 1px;display: -webkit-box;width: 100%">
              <x-button mini style="width: 150px;height: 40px;display: block;margin: 0" @click.native="chongzhi">重置</x-button>
              <x-button mini style="width: 150px;height: 40px;display: block;margin: 0;color: white;background: #2989ff" @click.native="shuaixuan"> 确定</x-button>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {XHeader,Group,Radio,Badge,Popup,XButton,XInput} from 'vux'
  import pounp from '@/components/pounp'
  import btnlist from '@/components/btnlist'
  import times from '@/components/time'
  import xuan from '@/components/xuan'
  import shaixuan from '@/components/shaixuan'
  import item from '../components/vueTree.vue'
  import morenimg from  '@/assets/morenimg.png'
  var vm;
  export default {
    mounted(){
      vm=this;
      window.addEventListener('scroll',this.menu);
    },
    data () {
      return {
        morenimg:morenimg,
        show9: false,
        scrollTops:71,
        swipeleft:'auto',
        overflow:'inherit',
        dates:{date1:'',date2:''},
        items1:[],
        page:1,
        sjlx:'',
        sjzt:'',
        type:'',
        loading:false,
        titlecontent:'',
        items:[{title:"待办类型",type:"sjlx",check:false},{title:"待办状态",type:"sjzt",check:false}],
        btnlists:[{name:"我的待办",show:false},{name:"待审核的",show:false},{name:"我发起的",show:false},{name:"我办理的",show:false}],
        btnlists1:[{name:"正在办理",show:false},{name:"已办结",show:false},{name:"人工结束",show:false},{name:"已保存",show:false},{name:"追回",show:false},{name:"驳回",show:false}]
      }
    },
    components: {pounp,shaixuan,XHeader,Group,Radio,Badge,Popup,btnlist,times,item,XButton,XInput,xuan},
    methods: {
        load(back){
          let lev=[]
          let st=[]
          for (let value of vm.btnlists) {
              if(value.show){
                  lev.push(value.name)
              }
          }
          for (let value of vm.btnlists1) {
            if(value.show){
              st.push(value.name)
            }
          }
          if(vm.sjlx!='') lev.push(vm.sjlx)
          if(vm.sjzt!='') st.push(vm.sjzt)
          lev=Array.from(new Set(lev)).join(',')
          st=Array.from(new Set(st)).join(',')
          var reg=/,$/gi;
          lev=lev.replace(reg,"");
          st=st.replace(reg,"");
          vm.$ajax("work_list",{
            type:'申请',
            page:vm.page,
            rows:'10',
            levelname:lev,
            state:st,
            begincreatetime:vm.dates.date1,
            endcreatetime:vm.dates.date2,
            title:vm.titlecontent
          }).then(function(res){
            vm.loading=res.rows.length>0?false:true;
            vm.page++
            let data=res.rows;
            for (let value of data) {
              vm.items1.push(value)
            }
            if(back) back()
          })
        },
      infinite(done) {
        if (vm.loading) {
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
         vm.load()
          setTimeout(() => {
            done()
          })
        }, 1500)
      },
      goback(){
        this.$router.go(-1)
      },
      cehua(){
        this.show9=true;
        this.overflow='hidden'
        this.$refs.pounp.hide()
      },
      onhide(){
        this.overflow='inherit'
      },
      hides(){
        for (let value of this.items) {
          this.$set(value,'check',false)
        }
      },
      click(item){
          this.type=item.type;
        if(item.check){
          this.$refs.pounp.shows()
        }else{
          this.$refs.pounp.hide()
        }
      },
      change(i,s){
        for (let value of this.items) {
          if(this.type==value.type){
            value.title=s
          }
        }
        vm.page=1
        vm.items1=[]
        this.$refs.pounp.hide()
        if(this.type=='sjlx'){
            vm.sjlx=s=='全部'?'':s
            vm.load()
        }
        if(this.type=='sjzt'){
          vm.sjzt=s=='全部 '?'':s
          vm.load()
        }
      },
      menu(){
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

         if(this.scrollTop<=46){
         this.scrollTops=71-this.scrollTop
         }else{
           this.scrollTops=25
         }
      },
      chongzhi(){
        for (let value of this.btnlists) {
            value.show=false
        }
        for (let value of this.btnlists1) {
          value.show=false
        }
        this.$set(this.dates,'date1','')
        this.$set(this.dates,'date2','')
        this.titlecontent=''
      },
      chongzhi1(){
        if(this.type=='sjlx'){
          for (let value of this.btnlists) {
            value.show=false
          }
        }
        if(this.type=='sjzt'){
          for (let value of this.btnlists1) {
            value.show=false
          }
        }
      },
      queding1(){
        vm.items1=[]
        vm.page=1;
        vm.load()
        this.$refs.pounp.hide()
      },
      shuaixuan(){
         vm.items1=[]
         vm.page=1;
         vm.load()
         vm.show9=false;
      },
      hjzxxq(item){
        this.$router.push({path:'/shenqingxq',query:{businessid:item.businessid,taskid:item.taskid,serviceid:item.serviceid}})
      }
    },
    destroyed(){
      window.removeEventListener("scroll",this.menu);
    }
  }
</script>

<style>
 .hjzx .cehua .pounp{
    position: absolute;
    top:108px!important;
    width: 100%;
    height: 100%;
  }
  .hjzx .cehua .pounp .vux-no-group-title{
    margin-top: 0!important;
  }
  .hjzx  .weui-cells:before,.weui-cell:before{
    border: none!important;
  }
  .hjzx  .fixed{
     position: fixed!important;
     top: 25px;
     z-index: 9;
   }
  .hjzx  .fixed1{
    position: fixed!important;
    top: 62px;
    z-index: 9;
  }
 .hjzx .vux-popup-mask{
    top:25px!important;
  }
 .hjzx .cehua .vux-popup-dialog.vux-popup-right{
    z-index: 999;
  }
  .hjzx .weui-cell__ft{
    display: none;
  }
</style>
