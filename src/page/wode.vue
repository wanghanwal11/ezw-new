<template>
    <div class="wode">
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left"></div>
          <div style="color: white;line-height: 55px">我的</div>
        </x-header>
      </div>
      <div style="padding: 20px;position: relative;display: -webkit-box;background:white;margin-top: 10px" @click="next('grxx')" class="line">
        <div style="width:72px;height: 72px;background-size: cover" :style="{backgroundImage:'url('+iconimage+')'}"></div>
        <div style="-webkit-box-flex: 1;padding: 11px 15px">
          <div>{{person.fullname}}</div>
          <div>{{person.phone}}</div>
        </div>
        <div style="padding-top: 21px;color: #C8C8CD" ><i class="iconfont icon-arrow" style="font-size: 20px"></i></div>
      </div>
      <div class="cell" style="margin-top: 10px;">
        <group gutter="0">
          <cell title="通讯录" is-link  @click.native="next()">
            <i slot="icon"  class="iconfont icon-tongxunlu" style="color: #FB9A25"></i>
          </cell>
        </group>
        <group gutter="0" style="margin-top: 10px">
          <cell title="邀请" is-link  @click.native="next()">
            <i slot="icon"  :class="'iconfont icon-yaoqing'+' '+color('yaoqing')"></i>
          </cell>
        </group>
        <!--<group gutter="0" style="margin-top: 10px">-->
          <!--<cell title="通知动态设置" is-link  @click.native="next()">-->
            <!--<i slot="icon" class="iconfont icon-tongzhidongtaishezhi" style="color: #ff5d5e;" :class="'iconfont icon-yaoqing'+' '+color('yaoqing')" ></i>-->
          <!--</cell>-->
        <!--</group>-->
        <!--<group gutter="0">-->
          <!--<cell title="统计动态设置" is-link  @click.native="next()">-->
            <!--<i slot="icon"  :class="'iconfont icon-tongjidongtaishezhi'+' '+color('tongjidongtaishezhi')"></i>-->
          <!--</cell>-->
        <!--</group>-->
        <group gutter="0" style="margin-top: 10px">
          <cell title="设置" is-link  @click.native="next('shezhi')">
            <i slot="icon" class='iconfont icon-gerendongtai' style="color: #3888C5"></i>
          </cell>
        </group>
      </div>
    </div>
</template>

<script>
  import { XHeader,Group, Cell} from 'vux'
  import iconimage from  '@/assets/ezw.png'
    export default {
        mounted(){
            this.person=this.$browser.getParameter('person'+this.$store.state.user.userid)[0]
            this.iconimage=this.person.iconimage?this.person.iconimage:iconimage
        },
        data () {
            return {
               person:{},
               iconimage:''
            }
        },
        components: {XHeader,Group, Cell},
        methods: {
          next(str){
            this.$router.push({path: '/'+str})
          }
        }
    }
</script>

<style>
  .wode .cell .weui-cell{
    padding: 13px 15px;
  }
  .wode .cell i{
    font-size: 25px;
    margin-right: 10px;
  }
  .wode .cell label{
    font-size: 16px;
  }

</style>
