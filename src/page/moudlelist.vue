<template>
    <div>
      <div style="height: 70px;">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px">更多</div>
          <div slot="right" style="color: white;font-size: 14px;line-height: 35px;padding: 0 5px" @click="bj" >{{bjs}}</div>
        </x-header>
      </div>
      <div >
        <div style="background: white;margin-top: 10px;padding-top: 10px">
          <div style="margin-left: 15px;color: #939393;"><div class="lineleft"></div>常用</div>
          <draggable class="dragArea" :list="item1" :options="{group:'people',disabled:disabled,chosenClass:'choose',animation:200}" @change="log" style="overflow: hidden;">
            <div v-for="(i,index) in item1" :key="index" style="text-align: center;width: 25%;display: inline-block;padding: 10px 0;" @click="pointto(i,index)">
                <div style="width: 30px;height: 30px;margin: 0 auto;position: relative">
                  <div style="font-size:30px;position: absolute;top: -9px;left: 0" class="iconfont" :class="'icon-'+i.imageName+' '+color(i.imageName)">
                  </div>
                  <badge v-if="bianji"  :class="i.text?'iconfont icon-tianjia':'iconfont icon-shanchu'" style=" position: absolute;top: -15px; right: -15px;color:#EB5554;background: none;font-size: 15px"></badge>
                  <!--<badge v-if="!bianji" :text="i.num" style=" position: absolute;top: -8px; right: -8px;"></badge>-->
                </div>
                <span style="line-height: 20px;font-size: 12px;    overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{i.itemTitle}}</span>

              </div>
          </draggable>
        </div>
      </div>
      <div style=";margin-top: 10px;">
        <div style="background: white;padding-top: 10px;    margin-top: 10px;" v-for="(item,index) in item2" :key="index">
          <div style="margin-left: 15px;color: #939393"><div class="lineleft"></div>{{item.type}}</div>
          <draggable class="dragArea" :list="item2" :options="{group:'people',disabled:true,chosenClass:'choose',animation:200}" @change="log" style="overflow: hidden;">
            <!--<transition-group name="list" tag="p" >-->
            <div v-for="(i,index) in item.items" :key="index" style="text-align: center;width: 25%;display: inline-block;padding: 10px 0;" @click="pointto1(i,index)">
              <div style="width: 30px;height: 30px;margin: 0 auto;position: relative">
                <div style="font-size:30px;position: absolute;top: -9px;left: 0" class="iconfont" :class="'icon-'+i.imageName+' '+color(i.imageName)">
                </div>
                <badge v-if="bianji" :class="i.text?'iconfont icon-tianjia':'iconfont icon-shanchu'" :style="{color:i.text?'#3888C5':'#EB5554'}" style=" position: absolute;top: -15px; right: -15px;background: none;font-size: 15px"></badge>
                <!--<badge v-if="!bianji" :text="i.num" style=" position: absolute;top: -8px; right: -8px;"></badge>-->
              </div>
              <span style="line-height: 20px;font-size: 12px;    overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{i.itemTitle}}</span>
            </div>
            <!--</transition-group>-->
          </draggable>
        </div>
      </div>
    </div>
</template>

<script>
  import { XHeader,Badge} from 'vux'
  import draggable from 'vuedraggable'
  var vm;
    export default {
        mounted(){
          vm=this
          let moudlelist=this.$browser.getParameter("moudlelist"+vm.$store.state.user.userid)
          this.$ajax("work_more").then(function(res){
            vm.item2=res.rows[1];
            if(moudlelist&&moudlelist!=''){
              vm.item1=moudlelist;
            }else{
              vm.item1=res.rows[0][0].items;
            }
            for (let value of vm.item1) {
              value.text=false;
            }
            for (let value of vm.item2) {
              for (let value1 of value.items) {
                value1.text=true;
              }
            }
            let arr3 = vm.item2.filter((item, i) =>{
              item.items.filter((val,j) =>{
                vm.item1.filter((value, b) =>{
                  if(val.itemTitle==value.itemTitle){
                    val.text=false
                  }
                });
              })
            });
          })
        },
        data () {
            return {
              disabled:true,
              bianji:false,
              item1: [],
              item2: [],
              bjs:"编辑"
            }
        },
        components: {XHeader,draggable,Badge},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          bj(){
              this.disabled=!this.disabled
              this.bianji=!this.bianji
              if(this.bianji){
                    this.bjs='完成'
                }else{
                  this.bjs='编辑'
              }
            this.$browser.setParameter("moudlelist"+vm.$store.state.user.userid,this.item1)
          },
          log: function (evt){
            console.log(evt)
          },
          pointto(item,index){
              if(this.bianji){
                  if(this.item1.length<=4){
                    this.$vux.toast.show({
                      type:'text',
                      width:'8rem',
                      text: '不能小于4个',
                      time:2000,
                      position:'middle'
                    })
                     return;
                  }
                this.item1.splice(index,1)
//                for (let value of this.item2) {
//                    if(value.itemTitle==item.itemTitle){
//                      value.text=true
//                    }
//                }
                vm.item2.filter((item1, i) =>{
                  item1.items.filter((val,j) =>{
                      if(val.itemTitle==item.itemTitle){
                        val.text=true
                      }
                  })
                });
              }else{
                if(item.serviceid){
                  this.$store.commit('cleartables')
                  this.$router.push({path:'/shenqing',query:{serviceid:item.serviceid,title:item.itemTitle}})
                }else{
                  this.$router.push({
                    path:'/'+item.imageName
                  })
                }
              }
          },
          pointto1(item,index){
            if(this.bianji){
                if(item.text){
                  if(this.item1.length>=7){
                    this.$vux.toast.show({
                      type:'text',
                      width:'8rem',
                      text: '不能大于7个',
                      time:2000,
                      position:'middle'
                    })
                    return;
                  }
                  item.text=false
                  this.item1.push(item)

                }else{
                  if(this.item1.length<=4){
                    this.$vux.toast.show({
                      type:'text',
                      width:'8rem',
                      text: '不能小于4个',
                      time:2000,
                      position:'middle'
                    })
                    return;
                  }
                  item.text=true
                  for (let value of this.item1) {
                    if(value.itemTitle==item.itemTitle){
                      this.item1= this.item1.filter(function(i){
                          return i.itemTitle!=item.itemTitle
                      })
                    }
                  }
                }

            }else{
              if(item.serviceid){
                  this.$store.commit('cleartables')
                  this.$router.push({path:'/shenqing',query:{serviceid:item.serviceid,title:item.itemTitle}})
              }else{
                this.$router.push({
                  path:'/'+item.imageName
                })
              }
            }
          }
        }
    }
</script>

<style>
   .weui-grids:before, .weui-grid:before, .weui-grid:after{
    border: none;
  }
   .list-enter-active, .list-leave-active {
     transition: all 1s;
   }
   .list-enter, .list-leave-active {
     opacity: 0;
     transform: translateY(30px);
   }
  .lineleft{
    border: 2px solid #288BE0;width: 0px;height:12px;margin-right: 5px;float: left;margin-top: 4px;margin-left: -2px;
  }
</style>
