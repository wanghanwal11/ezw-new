<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px">安全中心</div>
        </x-header>
      </div>
      <div class="aqzx" >
        <!--<draggable>-->
          <group  v-for="(element,index) in myArray" :key="index"  style="margin-top: 10px">
            <x-switch :title="element.name" v-model="element.value" style="font-size: 16px" @on-change="change(element)"></x-switch>
          </group>
        <!--</draggable>-->

      </div>
    </div>
</template>

<script>
  import { XHeader,Group,XSwitch} from 'vux'
  import draggable from 'vuedraggable'
  var vm;
    export default {
        mounted(){
            vm=this;
            let user=this.$browser.getParameter('person'+this.$store.state.user.userid)
            let aqzx=this.$browser.getParameter('aqzx'+this.$store.state.user.userid)
            if(aqzx){
                this.myArray=aqzx
            }else{
                var arr=[{name:'指纹识别',value:false},{name:'人脸识别',value:false}]
                this.myArray=arr
            }
           },
        data () {
            return {
              myArray:[]
            }
        },
        components: {XHeader,draggable,Group,XSwitch},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          change(element){
              if(element.name=='指纹识别'&&element.value){
                this.$browser.finger(function (obj) {
                    if(obj.error){
                      vm.$set(element,'value',false)
                    }
                })
              }
            if(element.name=='人脸识别'&&element.value){
              this.$browser.facezhuce(function (obj) {
                if(obj.error){
                  vm.$set(element,'value',false)
                }
              })
            }
              this.$browser.setParameter('aqzx'+this.$store.state.user.userid,this.myArray)
          }
        }
    }
</script>

<style>
 .aqzx .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
    border-color: #2989ff!important;
    background-color: #2989ff!important;
  }
  .aqzx .vux-no-group-title{
    margin-top: 0px;
  }
</style>
