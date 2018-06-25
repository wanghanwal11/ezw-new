<template>
  <div style="background: white">
    <div class="header" style="height: 71px">
      <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
      <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
        <div slot="overwrite-left" style="color: black;display: -webkit-box;" @click="goback">
          <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white"></div>
        </div>
        <div style="color: white;line-height: 55px">选择人员</div>
        <div slot="right"  style="color: white;line-height: 37px" @click="wancheng">完成</div>
      </x-header>
    </div>
    <div class="list">
      <div class="box2" style="padding: 15px;position: relative;padding-top: 0">
        <div v-for=" (item,index) in num" :id="'anchor-'+index" :key="index" style="line-height: 35px;border-bottom: 1px solid #d9dde2" >
          <div>{{item}}</div>
          <div v-for=" (city,i) in city1[index]" :key="i" @click="listclick(city)" :id="'anchor-'+city.id">
           <input type="checkbox" v-model="city.check">
            {{city.name}}
          </div>
        </div>
        <div style="position: fixed;width: 35px;top: 90px;right:0;bottom:0;text-align: right;padding-right: 5px;   overflow-y: scroll;">
          <a v-for="(i,index) in num" style="display: block;font-size: 14px" @click="goAnchor('#anchor-'+index)">{{i}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  var vm;
  export default {
    created(){
      vm=this;
      this.$ajax('vitouser',{
        path:10000128825240
      }).then(function (data) {
        var data=data.rows;
        let sum=[];
        for(let i=0;i<vm.num.length;i++){
          let arr=[];
          for(let j=0;j<data.length;j++){
            if(vm.num[i]==data[j].firstletter){
              var obj={}
              obj.name=data[j].fullname;
              obj.id=data[j].userid
              obj.check=false
              arr.push(obj)
            }
          }
          sum.push(arr)
        }
        vm.city1=sum
      })
      this.people=this.$route.query.value
    },
    data () {
      return {
        num:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        city1:[],
        people:{}
      }
    },
    components:{
      XHeader
    },
    methods: {
      goback(){
        this.$router.go(-1)
      },
      listclick(obj){
          this.$set(obj,'check',!obj.check)
      },
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.getElementsByTagName("html")[0].scrollTop = anchor.offsetTop
      },
      wancheng(){
        let arr=[]
        for(let i=0;i<this.num.length;i++){
          for (let value of this.city1[i]) {
            if(value.check==true){
              arr.push(value)
            }
          }
        }
        let table=this.$store.state.user.tables.items
        for (let value of table) {
          if(value.id==this.people.id){
            this.$set(value,'btnlist',arr)
          }
        }
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>

</style>
