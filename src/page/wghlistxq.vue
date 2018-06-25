<template>
  <div>
    <div class="header" style="height: 71px;">
      <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99"></div>
      <x-header style="background: #2989ff;position: fixed;width: 100%;top: 15px;height: 55px;z-index: 99">
        <div slot="overwrite-left" style="color: black;display: -webkit-box;">
          <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
        </div>
        <div style="color: white;line-height: 55px">网格化详情</div>
      </x-header>
    </div>
    <d-flow ref="flow" :data="json" @imgclick="imgclick" @fileclick="fileclick"></d-flow>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import DFlow from 'devicebox/components/flow/DFlow.vue'
  export default {
    mounted(){
      this.$ajax("connectInsideWeb",{
        methodtype:'wghDetails',
        businesskey:this.$route.query.businessid,
        isread:this.$route.query.isread,
        id:this.$route.query.id
      }).then(function(res){
        alert(JSON.stringify(res))
      })
    },
    data () {
      return {
        json: {}
      }
    },
    components: {DFlow,XHeader },
    methods: {
      goback(){
        this.$router.go(-1)
      },
      imgclick(){

      },
      fileclick(){

      }
    }
  }
</script>

<style>
</style>
