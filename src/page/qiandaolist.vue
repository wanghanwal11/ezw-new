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
          <div style="color: white">签到</div>
          <div slot="right"  style="color: white;line-height: 25px"  @click="qiandaos" >去签到</div>
        </x-header>
        <shaixuan @click="click"  style="width: 100%;" :items="items">
          <div style="width: 100px;line-height: 35px;text-align: center;" @click="cehua">筛选<div style="display: inline-block;   font-size: 18px;vertical-align: middle;" class="iconfont icon-shaixuan"></div></div>
        </shaixuan>
    </div>
    <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" >
      <div class="box2">
      <div style="height: 108px;"></div>
      <div v-for="(item, index) in items1"  :key="index">
          <div style="padding: 5px 10px;font-size: 14px">
            {{item.date}}
          </div>
          <div v-for="(list, index) in item.perdate"  :key="index" @click="hjzxxq(list)" style="display:-webkit-box;background: white;padding: 5px 10px">
              <div style="width: 40px;height: 40px;margin-top: 3px;background-size: 100% 100%" :style="{backgroundImage:'url('+(item.imageName?item.imageName:moren)+')'}"></div>
              <div style="-webkit-box-flex: 1;font-size: 14px;padding-left: 5px">
                <div>{{list.name}}</div>
                <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{list.address}}</div>
              </div>
          </div>
      </div>
      <load-more :show-loading="loading" :tip="tip"></load-more>
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
              <div  style="margin: 8px 0">签到标题</div>
              <x-input type="text" v-model="titlecontent" placeholder="请输入标题"></x-input>
            </div>
            <!--<div>-->
             <!--<div style="display: -webkit-box">-->
               <!--<div  style="margin: 8px 0;-webkit-box-flex: 1">事件类型</div>-->
               <!--<div  style="width: 30px;font-size: 25px;line-height: 40px">+</div>-->
             <!--</div>-->
              <!--<div></div>-->
            <!--</div>-->
            <div>
            <div  style="margin: 8px 0">签到类型</div>
            <btnlist :items="btnlists"></btnlist>
          </div>
            <div>
              <div  style="margin: 8px 0">提交时间</div>
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
  import {XHeader,Group,Radio,Badge,Popup,XButton,XInput,Scroller,LoadMore} from 'vux'
  import pounp from '@/components/pounp'
  import btnlist from '@/components/btnlist'
  import times from '@/components/time'
  import xuan from '@/components/xuan'
  import shaixuan from '@/components/shaixuan'
  import item from '../components/vueTree.vue'
  import morenimg from  '@/assets/morenimg.png'
  import moren from '@/assets/moren.png'
  var vm;
  export default {
    mounted(){
      vm=this;
      window.addEventListener('scroll',this.menu);
      vm.load()
    },
    data () {
      return {
        moren: moren,
        morenimg: morenimg,
        show9: false,
        scrollTops: 71,
        swipeleft: 'auto',
        overflow: 'inherit',
        dates: {date1: '', date2: ''},
        items1: [],
        page: 1,
        sjlx: '',
        sjzt: '',
        type: '',
        onFetching: false,
        loading:true,
        tip:'加载中',
        titlecontent: '',
        items: [{title: "签到类型", type: "sjlx", check: false}],
        btnlists: [{name: "我的签到", show: false, id: 'own'}, {name: "他人签到", show: false, id: 'other'}]
      }
    },
    components: {pounp,shaixuan,XHeader,Group,Radio,Badge,Popup,btnlist,times,item,XButton,XInput,xuan,Scroller,LoadMore},
    methods: {
        load(back){
          let lev=[]
          for (let value of vm.btnlists) {
              if(value.show){
                  lev.push(value.id)
              }
          }
          if(vm.sjlx!='') lev.push(vm.sjlx)
          lev=Array.from(new Set(lev)).join(',')
          var reg=/,$/gi;
          lev=lev.replace(reg,"");
          vm.$ajax("newlist",{
            page:vm.page,
            rows:'20',
            type:lev,
            userid:vm.$store.state.user.userid,
            beginlogtime:vm.dates.date1,
            endlogtime:vm.dates.date2,
            title:vm.titlecontent
          }).then(function(res){
            vm.page++
            vm.loading=false
            if(res.rows.length==0){
              vm.tip='没有更多数据'
            }else{
              vm.tip='上拉加载更多'
            }
            let data=res.rows;
            for (let value of data) {
              vm.items1.push(value)
            }
            if(back) back()
          })
        },
      onScrollBottom () {
        vm.loading=true
        vm.tip='加载中'
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            vm.load()
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 1000)
        }
      },
      goback(){
        this.$router.go(-1)
      },
      qiandaos(){
        this.$router.push({
          path:'/xieqiandao'
        })
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
        this.$router.push({path:'/qiandaolistxq',query:{id:item.id}})
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
