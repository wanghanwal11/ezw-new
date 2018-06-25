<template>
  <div id="app">
    <router-view  v-if="!$route.meta.keepAlive" />
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
 /*   this.$ajax('login', {
      username: 'cuidaguan',
      password: '123456'
    }).then(response=>console.log('response', response))
  }*/}
}
</script>

<style>
  *{
    /*-webkit-touch-callout:none;*/
    /*-webkit-user-select:none;*/
    /*-khtml-user-select:none;*/
    /*-moz-user-select:none;*/
    /*-ms-user-select:none;*/
    /*user-select:none;*/
  }
  html,body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: #eceef1;
  }
  div {
    /*关键代码*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    width: 100%;
    height: 100%;
    color: #2c3e50;
  }
  .font_a,.font_b,.font_c,.font_d,.font_e,.font_f{
      color: #3888C5;
  }
  .font_h,.font_i,.font_j,.font_k,.font_l,.font_y{
      color: #2AA589;
  }
  .font_m,.font_n,.font_o,.font_p,.font_q,.font_r,.font_z{
      color: #FB9A25;
  }
  .font_s,.font_t,.font_u,.font_v,.font_w,.font_x,.font_g{
      color: #EB5554;
  }
  .vux-header-left{
    top: 13px !important;
    left: 10px!important;
  }
  .line:before,.linetop:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .line:after,.linebottom:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
</style>
<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
