<template>
    <div >
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">个人信息</div>
        </x-header>
      </div>
      <div style="margin-top: 10px">
      <div style="display: -webkit-box;background: white;padding: 8px 20px;position: relative" class="line" v-for="(item,index) in items" :key="index">
            <div style="-webkit-box-flex: 1;padding-top: 10px;line-height: 50px;" v-if="index==0">{{item.title}}</div>
            <div style="-webkit-box-flex: 1" v-else>{{item.title}}</div>
            <div style="-webkit-box-flex: 1;text-align: right;padding-top: 5px;" v-if="index==0">
              <div style="width: 50px;height: 50px;border-radius: 50%;border: 1px solid white;display: inline-block" @click="touxiang(item)">
                <img :src="item.text?item.text:moren" style="width: 100%;height: 100%">
              </div>
            </div>
            <div style="-webkit-box-flex: 1;text-align: right;color: #999999;font-size: 14px;line-height: 26px" v-else>{{item.text}}</div>
      </div>
      </div>
    </div>
</template>

<script>
  import { XHeader} from 'vux'
  import moren from '@/assets/moren.png'
  var vm;
    export default {
        mounted(){
            vm=this;
          let user=this.$browser.getParameter('person'+this.$store.state.user.userid)
          this.items=[{title:'头像',text:user[0].Iconimage},{title:'姓名',text:user[0].fullname},{title:'性别',text:user[0].sex},{title:'部门',text:user[0].orgName},{title:'电话',text:user[0].phone},{title:'Email',text:user[0].email}]
        },
        data () {
            return {
              items:[],
              moren:moren
            }
        },
        components: {XHeader},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          touxiang(item){
              this.$browser.startPhotos({url:this.$store.state.host+'/oa/docmobile/docupload.ht'},function (obj) {
                  let data=JSON.parse(obj)
                  vm.$ajax("mobileupdate",{
                    picname:data.rows[0].docname,
                    picture:data.rows[0].path
                  }).then(function(res){
                      alert(JSON.stringify(res))
                      vm.$set(item,'text',this.$store.state.host+data.rows[0].path)
                  })
              })
          }
        }
    }
</script>

<style scoped>
  .line:before{
    margin-left: 15px;
  }
  .line:after{
    border: none;
  }
</style>
