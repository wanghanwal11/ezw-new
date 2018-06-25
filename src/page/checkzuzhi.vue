<template>
  <div style="background: white">
    <div class="header" style="height: 71px">
      <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
      <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
        <div slot="overwrite-left" style="color: black;display: -webkit-box;" @click="goback">
          <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white"></div>
        </div>
        <div style="color: white;line-height: 55px">选择组织</div>
        <div slot="right"  style="color: white;line-height: 37px" @click="wancheng">完成</div>
      </x-header>
    </div>
    <div>
      <my-tree :model="datas" ref="getvalue"></my-tree>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import myTree from '../components/vueTree.vue'
  var vm;
  export default {
    created(){
        vm=this
      this.$ajax('getByOrgPath',{
        path:10000128825240
      }).then(function (data) {
        let val=vm.$browser.toTree(data.rows)
        vm.datas=val[0]
      })
      this.zuzhi=this.$route.query.value
    },
    data () {
      return {
        datas:{},
        zuzhi:{}
      }
    },
    components:{
      XHeader,myTree
    },
    methods: {
      goback(){
        this.$router.go(-1)
      },
      wancheng(){
        let arr= this.$refs.getvalue.getvalue()
        let table=this.$store.state.user.tables.items
        for (let value of table) {
          if(value.id==this.zuzhi.id){
            this.$set(value,'btnlist',arr)
          }
        }
        this.$router.go(-1)
      }
    }
  }
</script>
<style>

</style>
