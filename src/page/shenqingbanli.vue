<template>
    <div class="banli">
      <div class="header" style="height: 71px;">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px">办理</div>
        </x-header>
      </div>
      <div>
        <group>
          <x-textarea v-model="value" :rows=6 placeholder="填写办理意见"  name="description"></x-textarea>
        </group>
      </div>
      <div style="display: -webkit-box;position: fixed;bottom: 1px;width: 100%">
        <div v-for="(item,index) in items" :key="index" style="-webkit-box-flex: 1;text-align: center">
          <x-button style="width: 100%;height: 100%;font-size: 14px;line-height: 40px" @click.native="banli(item)">{{item.name}}</x-button>
        </div>
      </div>
    </div>
</template>

<script>
  import {XButton,XHeader,XTextarea,Group} from 'vux';
  var vm;
    export default {
        mounted(){
            vm=this;
//          this.$ajax("getbpmformbtn",{
//            taskId:this.$route.query.id
//          }).then(function(){
            let res={"isSucceed":true,"message":"请求成功!","rows":[{"createBy":"","createtime":"","updatetime":"","updateBy":"","updateuser":"","createuser":"","version":"","owner":"","spaceid":"","setid":10000109880174,"defid":10000109880168,"nodename":"部门经理审批1","nodeorder":0,"nodeid":"UserTask2","formtype":0,"formurl":"","formkey":10000110590181,"actdefid":"qj:1:10000109880172","formdefname":"请假","nodetype":"","jointaskkey":"","jointaskname":"","beforehandler":"","afterhandler":"","jumptype":"","settype":0,"isjumpfordef":1,"ishideoption":1,"ishidepath":0,"detailurl":"","isallowmobile":0,"informtype":"1#2#3","ishidefile":0,"ishidesatisfaction":0,"ishideorgname":"","ishideorgid":"","ishidestatecode":"","ishidelimit":0,"ishidecopath":0,"ishideperson":0,"ishidecoperson":0,"ishidebackopinion":0,"dependnode":"","ishidevitosign":0,"ishideresolve":0,"ishidecompanytoresolve":0,"ishideassistdepart":0,"ishidephotourl":0,"ishidechecksuggestion":0,"ishideopinionmust":0,"ishidelimitmust":0},{"button":[{"name":"同意","id":1},{"name":"拒绝","id":4},{"name":"驳回","id":5}]},{"isrecord":0,"isimage":0}],"footer":"","total":0,"newPrimaryKeys":{}}
            res=res.rows[1].button
            for (let value of res) {
              vm.items.push({name:value.name,id:value.id})
            }
         // })
        },
        data () {
            return {
              value:'',
              items:[]
            }
        },
        components: {XHeader,XTextarea,Group,XButton},
        methods: {
          goback(){
              this.$router.go(-1)
          },
          banli(btn){
            let content=this.$browser.getParameter("content"+this.$store.state.user.userid)
            let obj={}
            let obj1={}
            let arr=[]
            let p={}
            let p1={}
            for (let value of content) {
              if(value.type!='hide'){
                obj[value.id]=value.value
              }
              if(value.type=='child'){
                  for(var i=0;i<value.table.length;i++){
                    for(let value1 of value.table[i]){
                      obj1[value1.id]=value1.value
                    }
                    arr.push(obj1)
                  }
                p1.sub=[{fields:arr,tableName:value.id}];
              }
            }
            p1.main={fields:obj}
            pl.serviceid=this.$route.query.serviceid
            p.formData=JSON.stringify(p1)
            let button=btn.id
            if(button==1){
                p.voteAgree=1;p.back=0;p.mark=0;
            }
            if(button==4){
               p.voteAgree=3;p.back=1;p.mark=0;
            }
            if(button==20){
              p.voteAgree=1;p.back=0;p.mark=0;
            }
            if(button==5){
              p.voteAgree=3;p.back=2;p.mark=0;
            }
            if(button==17){
              p.voteAgree=1;p.back=0;p.mark=1;
            }
            p.taskId=this.$route.query.id;
            p.voteContent=this.value;
            alert(JSON.stringify(p))
            this.$ajax("complete",p).then(function(){
                  vm.$router.go(-1)
            })
          }
        }
    }
</script>

<style>
  .banli .weui-cells{
      margin-top: 0px!important;
  }
</style>
