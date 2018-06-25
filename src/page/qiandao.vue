<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">签到</div>
          <div slot="right"  style="color: white;line-height: 37px" @click="tijiao">提交</div>
        </x-header>
      </div>
        <div>
          <div style="display: -webkit-box;padding: 5px 15px;background: white">
            <div class="iconfont icon-zuobiao" style="font-size: 20px;width: 35px;line-height: 25px" ></div>
            <div style="-webkit-box-flex: 1;word-wrap: break-word; word-break: normal; " @click="show">{{address}}</div>
          </div>
        <list :items="json1"></list>
        <actionsheet
          v-model="show7"
          :menus="menu7"
          theme="android"
          @on-click-menu="click">
        </actionsheet>
      </div>
    </div>
</template>

<script>
  import {XButton,XHeader,Actionsheet} from 'vux'
  import list from '@/components/list'
  var vm;
    export default {
        mounted(){
            vm=this;
            this.$browser.dingwei(function (obj) {
              vm.address=obj.address
              for(let i=0;i<5;i++){
                  vm.menu7.push(obj.list[i].address)
              }
            })
        },
        data () {
            return {
              show7:false,
              menu7: [],
              address:'加载中...',
              json1: [{
                type:'textarea',
                name:'备注',
                value:''
              },{
                type:'image',
                name:'图片',
                url:this.$store.state.host+'/oa/docmobile/docupload.ht',
                state:'0',
                list:[]
              }]
            }
        },
        components: {XButton,XHeader,list,Actionsheet},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          tijiao(){
              let arr=[];
              if(this.json1[1].list.length>0){
                  for(let value of this.json1[1].list){
                    arr.push(value.id)
                  }
                arr=arr.join(',')
              }
            this.$ajax("newsave",{
              address:this.address,
              content:this.json1[0].value,
              filesid:arr
            }).then(function(res){
                vm.$router.go(-1)
            })
          },
          click(s,a){
            vm.address=a
          },
          show(){
              this.show7=true
          }
        }
    }
</script>

<style>
</style>
