<template>
    <div>
      <div class="header" style="height: 71px;">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;top: 15px;height: 55px;z-index: 99">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px">审批详情</div>
          <div slot="right"  style="color: white;line-height: 37px" @click="go">办理</div>
        </x-header>
      </div>
      <div>
        <d-flow v-if="bol" ref="flow" :data="json" @imgclick="imgclick"></d-flow>
      </div>
    </div>
</template>

<script>
  import {XHeader} from 'vux'
  import DFlow from 'devicebox/components/flow/DFlow.vue'
  var vm;
    export default {
        mounted(){
            vm=this
          this.$ajax("phoneBlForOA",{
            businessKey:this.$route.query.businessid,
            taskId:this.$route.query.taskid
          }).then(function(res){
              let json=JSON.parse(res.rows[0].json)[0]
              console.log(json)
              vm.bol=true
              vm.json=json
          })
        },
        data () {
            return {
                json:{},
                bol:false
            }
        },
        components: {DFlow,XHeader},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          go(){
            let content=this.$refs.flow.getContent()
            this.$browser.setParameter("content"+this.$store.state.user.userid,content)
            this.$router.push({path:'/shenqingbanli',query:{id:this.$route.query.taskid}})
          },
          imgclick(arr) {

          }
        }
    }
</script>

<style>
</style>
