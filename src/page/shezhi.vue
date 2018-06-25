<template>
    <div shezhi>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px">设置</div>
        </x-header>
      </div>
      <div style="margin-top: 10px;">
        <group gutter="0">
          <cell title="安全中心" is-link  @click.native="next('aqzx')"   style="font-size: 16px">
          </cell>
        </group>
        <div style="display: -webkit-box;background: white;padding: 8px 16px;margin-top: 10px;" class="line">
          <div style="-webkit-box-flex: 1">版本号</div>
          <div style="-webkit-box-flex: 1;text-align: right;color: #999999;font-size: 14px;">V{{banben}}</div>
        </div>
      </div>
      <x-button style="width: 90%;margin-top: 30px;border-radius: 30px;background: #2989ff;color: white;" @click.native="xiaotui">退出登录</x-button>
    </div>
</template>

<script>
  import { XHeader,Group, Cell,XButton} from 'vux'
  var vm
    export default {
        mounted(){
            vm=this;
          let user=this.$browser.getParameter('person'+this.$store.state.user.userid)
          this.$browser.banben(function (obj) {
            let a=JSON.parse(obj)
            vm.banben=a.banben
          })
         },
        data () {
            return {
              items:[],
              banben:1
            }
        },
        components: {XHeader,Group, Cell,XButton},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          next(str){
            this.$router.push({path: '/'+str})
          },
          xiaotui(){
            this.$store.commit('changeuserid','')
            this.$router.push({path: '/'})
          }
        }
    }
</script>

<style>
 .line{
    position: relative;
  }

</style>
