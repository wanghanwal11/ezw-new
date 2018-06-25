<template>
    <div style="height: 100%;background: white">
        <div style="display: -webkit-box;height: 230px; -webkit-box-align: center;-webkit-box-pack: center;">
              <div style="width: 80px;height: 80px;border-radius: 50%;border: 1px solid white;" class="ezw"></div>
        </div>
      <div class="input">
          <div style="display: -webkit-box;padding:0 40px;position: relative">
            <div class="iconfont icon-zhanghao" style="font-size: 24px;color: #0e88eb;line-height: 43px;padding-left: 3px"></div>
            <div style="position:relative;width: 100%">
              <x-input   placeholder="请输入您的账号" v-model="zhanghao"  :show-clear="false"></x-input>
            </div>
          </div>
          <div style="display: -webkit-box;padding:0 40px;margin-top: 10px">
            <div class="iconfont icon-mima" style="font-size: 31px;color: #0e88eb;line-height: 43px"></div>
            <x-input   placeholder="请输入您的密码" :type="password?'password':'text'" :show-clear="false" style="-webkit-box-flex: 1" v-model="mima"></x-input>
            <div  class="iconfont" :class="password?'icon-yanjing-bi':'icon-chakanyanjingshishifenxi'" style="width: 40px;line-height: 44px;color: #999;text-align:center;font-size: 20px" @click="yan"></div>
          </div>
      </div>
      <div style="padding: 50px 40px">
        <x-button type="default" :show-loading="false" style="background: #3399ff;color: white;border-radius: 25px" @click.native="login">登录</x-button>
      </div>
      <div v-transfer-dom>
        <loading :show="show2" text=""></loading>
      </div>
    </div>
</template>

<script>
  import { XInput,XButton,Loading,TransferDomDirective as TransferDom} from 'vux'
  var vm;
    export default {
      directives: {
        TransferDom
      },
        created(){
          vm=this;
          let person=vm.$browser.getParameter('person'+localStorage.userid);
          if(person&&!this.$route.query.login){
            this.zhanghao=person[0].username
            this.mima=person[0].password
            this.$router.push({path:'/login1'})
          }else{
            this.zhanghao=person[0].username
            this.mima=person[0].password
          }
        },
        mounted(){
           vm=this;
        },
        data () {
            return {
              zhanghao: '',
              mima:'',
              password:true,
              show2:false
            }
        },
        components: {
          XInput,XButton,Loading
        },
        methods: {
          login(){
            this.show2=true
            this.$ajax("login",{
              username: this.zhanghao,
              password: this.mima
            }).then(function(res){
              vm.show2=false
              var rows=res.rows;
              vm.$browser.zhuce({alias:rows[0].userId})
              vm.$store.commit('changeuserid',rows[0].userId)
              //vm.$store.state.user.userid
              vm.$set(rows[0],'password',vm.mima)
              vm.$browser.setParameter('person'+vm.$store.state.user.userid,rows)
              vm.$router.replace({
                path:'/admin/shouye'
              })
            },function(res){
              vm.show2=false
              vm.$vux.toast.show({
                type:'text',
                width:'15rem',
                text: res,
                time:2000,
                position:'middle'
              })
            })
          },
          yan(){
              this.password=!this.password
          }
        }
    }
</script>

<style>
  .input .weui-cell:before{
    border: none;
  }
  .ezw{
    background: url("../assets/ezw.png");
    background-size: cover;
  }
</style>
