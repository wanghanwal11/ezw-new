<template>
    <div style="height: 100%;width: 100%">
      <div class="header" style="height: 71px;position: fixed;width: 100%;z-index: 99">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px">{{title?title:'申请'}}</div>
          <div slot="right"  style="color: white;line-height: 37px;font-size: 20px" @click="tijiao" class="iconfont icon-tijiao"></div>
        </x-header>
      </div>
        <list :items="items" style="position: absolute;width: 100%; overflow-y: scroll;-webkit-overflow-scrolling: touch;top: 71px;z-index: 2 ">
          <div v-if="itemsall.length>0">
            <div v-for="(item,index) in itemsall" :key="index" class="zibiao">
              <div style="display: -webkit-box">
                <div style="-webkit-box-flex: 1;padding: 5px 15px">{{item.title}}({{index+1}})</div><x-button v-if="index!=0" @click.native="shanchu(item,index)" style="background: #2989ff;margin-top: 3px;margin-right: 10px;color: white" mini>删除</x-button>
              </div>
              <list :items="item.table"></list>
            </div>
            <div>
              <x-button @click.native="zeng" style="background:#2989ff;color: white">新增</x-button>
            </div>
          </div>
        </list>
      <div style="height: 80px"></div>
    </div>
</template>

<script>
  import {XButton,XHeader} from 'vux';
  import list from '@/components/list'
  var vm;
    export default {
        created(){
          vm=this
          this.title=this.$route.query.title
          if(this.$store.state.user.tables.items){
            this.items=this.$store.state.user.tables.items
          }else {
            this.tables1()
          }
          if(this.$store.state.user.tables.itemsall){
            this.itemsall=this.$store.state.user.tables.itemsall
          }
        },
        mounted(){
        },
        data () {
            return {
              itemsall: [],
              items: [],
              biao:{},
              title:''
            }
        },
        components: {XButton,list,XHeader},
        methods: {
          tables1() {
            this.$ajax("shenqingtj",{
              serviceId: this.$route.query.serviceid
            }).then(function(res){
              vm.items=JSON.parse(res.rows[0].phoneHtml).items
              for (let value of vm.items) {
                if(value.type=='child'){
                  vm.biao=JSON.stringify(value)
                  vm.itemsall.push(value)
                }
              }
            })
          },
          goback(){
            this.$router.go(-1)
          },
          zeng(){
            this.itemsall.push(JSON.parse(this.biao))
          },
          shanchu(item,index){
              this.itemsall.splice(index,1)
          },
          tijiao(){
//              alert(JSON.stringify(this.itemsall))
              //alert(JSON.stringify(this.items))
                let p={}
                let obj={}
                let obj1={}
                let arr=[]
                let str=''
                let imagelist=[]
                for (let value of this.items) {
                  if(value.type!='hide'){
                    obj[value.id]=value.value
                  }
                  if(value.type=='image'){
                      if(value.list.length>0){
                        for(let s of value.list){
                          imagelist.push({annexpath:s.path})
                        }
                      }
                  }
                  if(value.router=='/checkpeople'){
                      if(this.title=='自由流程'){
                        for(let s of value.btnlist){
                          str+='user^'+s.id+'^'+s.name+'#'
                        }
                        p.coDestTaskUserIds=str;
                      }else{
                        var st=''
                        var reg=/,$/gi;
                        for(let s of value.btnlist){
                          st+=s.name+','
                        }
                        st=st.replace(reg,"");
                        obj[value.id]=st
                      }
                  }
                  if(value.router=='/checktime'){
                    var num=''
                    var reg=/,$/gi;
                    for(let s of value.btnlist){
                      num+=s.name+','
                    }
                    num=num.replace(reg,"");
                    obj[value.id]=num
                  }
                  if(value.router=='/checkzuzhi'){
                    var zuzhi=''
                    var reg=/,$/gi;
                    for(let s of value.btnlist){
                      zuzhi+=s.name+','
                    }
                    zuzhi=zuzhi.replace(reg,"");
                    obj[value.id]=zuzhi
                  }
                }
                if(this.itemsall.length>0){
                  for (let value of this.itemsall) {
                      for(let sub of value.table){
                        obj1[sub.id]=sub.value
                      }
                      arr.push(obj1)
                  }
                  p.sub=[{fields:arr,tableName:this.itemsall[0].id}];
                }
                p.main={fields:obj}
                p.serviceid=this.$route.query.serviceid
                p=JSON.stringify(p)
                alert(p)
                this.$ajax("phoneStartFlow",{
                  formData:p
                }).then(function(res){
                    if(imagelist.length>0){
                      imagelist=JSON.stringify(imagelist)
                      alert(imagelist)
                      vm.$ajax("saveByList",{
                        basedata:{
                          serviceid:vm.$route.query.serviceid,
                          runid:res.newPrimaryKeys.runId
                        },
                        rowdata:imagelist
                      }).then(function(res){
                        vm.$router.push({path:'/shenpi'})
                      })
                    }else{
                      vm.$router.push({path:'/shenpi'})
                    }
                })
          }
        }
    }
</script>

<style>
  .zibiao .alllist .vux-no-group-title{
    margin-top: 0;
  }
</style>
