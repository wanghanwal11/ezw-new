<template>
    <div style="background: white;height: 100%">
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">公告详情</div>
        </x-header>
      </div>
      <div style="padding: 15px">
        <div style="font-size: 18px;text-align: center">
          {{message.title}}
        </div>
        <div style="display: -webkit-box;margin-top: 10px">
          <div style="font-size: 14px;color: #999999">{{message.createtime}}</div>
          <div style="padding-left: 30px;font-size: 14px;color:#2989ff ">{{message.fullname}}</div>
        </div>
        <div v-html="message.content">
        </div>
        <div>
          <d-flow ref="flow" v-if="bol" :data="json" @imgclick="imgclick"></d-flow>
        </div>
      </div>
    </div>
</template>

<script>
  import {XHeader} from 'vux'
  import DFlow from 'devicebox/components/flow/DFlow.vue'
  var vm;
    export default {
        mounted(){
          vm=this;
          vm.$ajax("getforphone",{
            id:this.$route.query.id
          }).then(function(res){
            vm.message=res.rows[0]
            var json={}
            if(vm.message.allfiles.length>0){
              let arr=[]
              for (let value of vm.message.allfiles) {
                  arr.push(vm.$store.state.host+"/"+value.url.replace(/\\/g,'/'))
              }
              json={
                files:[{
                  title: "图片",
                  min:arr}],
              }
            }
            vm.bol=true;
            vm.json=json
          })
        },
        data () {
            return {
                message: [],
                bol:false,
                json:{}
            }
        },
        components: {XHeader,DFlow},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          imgclick(s,a){
              let arr=[]
              for (let value of s) {
                arr.push({path:value})
              }
              this.$browser.viewPicture({url:arr,number:a})
          }
        }
    }
</script>

<style scoped>
</style>
