<template>
    <div class="alllist">
        <div v-for="(item,index) in items" :key="index">
          <group v-if="item.type=='text'">
            <x-input :title="item.name" v-model="item.value" :show-clear="false" :placeholder="item.placeholder?item.placeholder:'请输入'" ></x-input>
          </group>
          <group v-if="item.type=='number'">
            <x-input :title="item.name" v-model="item.value" :show-clear="false" :placeholder="item.placeholder?item.placeholder:'请输入'" type="number"></x-input>
          </group>
          <group v-if="item.type=='textarea'">
            <x-textarea :title="item.name" v-model="item.value" :placeholder="item.placeholder?item.placeholder:'请输入'"></x-textarea>
          </group>
          <group v-if="item.type=='date'">
            <datetime
              v-model="item.value"
              :title="item.name">
            </datetime>
          </group>
          <group v-if="item.type=='time'">
            <datetime :title="item.name"  v-model="item.value" format="HH:mm"></datetime>
          </group>
          <group v-if="item.type=='datetime'">
            <datetime :title="item.name"  v-model="item.value" format="YYYY-MM-DD HH:mm"></datetime>
          </group>
          <group v-if="item.type=='select'">
            <selector  direction="rtl" :placeholder="item.placeholder?item.placeholder:'请选择'" v-model="item.value" :title="item.name" name="district" :options="item.select" ></selector>
          </group>
          <group v-if="item.type=='radio'">
            <selector  direction="rtl" :placeholder="item.placeholder?item.placeholder:'请选择'" v-model="item.value.key" :title="item.name" name="district" :options="item.select" ></selector>
          </group>
          <group v-if="item.type=='checkbox'">
            <checklist :title="item.name" :options="item.select" v-model="item.value" class="checkbox"></checklist>
          </group>
          <group v-if="item.type=='image'">
            <div style="display: -webkit-box">
              <div style="-webkit-box-flex: 1;padding:15px 15px 0px 15px;">{{item.name}}</div><div class="iconfont icon-zhaoxiangji" @click="startPhotos(item)" style="font-size: 20px;padding-right: 15px;line-height: 20px;padding-top: 15px;"></div>
            </div>
            <div style="padding: 5px">
            <flexbox :gutter="0" wrap="wrap" style="">
              <flexbox-item class="previewer-demo-img" :span="1/4" v-for="(lists,index) in item.list" :key="index">
                <div class="flex-demo" style="height: 70px;padding: 5px;position: relative">
                  <img :src="lists.path" style="width: 100%;height: 100%"  @click="shows(item,index,item.list)">
                  <div class="iconfont icon-shanchu" style="position: absolute;top: -8px;right: -4px;color: #EB5554" @click="deletes(item,index,item.list)"></div>
                </div>
              </flexbox-item>
            </flexbox>
            </div>
          </group>
          <group v-if="item.type=='btn'">
              <div style="display: -webkit-box;padding: 10px 15px">
                <div style="min-width: 50px">{{item.name}}</div>
                <div style="-webkit-box-flex: 1;">
                  <div v-for="(btn,index) in item.btnlist" :key="index" style="border: 1px solid #ccc;position: relative;color: #aaa;border-radius: 4px;display: inline-block;font-size: 14px;line-height: 14px;padding: 5px 3px;margin:0px 10px 10px 10px">
                    {{btn.name}}
                    <div class="iconfont icon-shanchu" style="position: absolute;top: -7px;right: -10px;color: #EB5554" @click="del(item,index,item.btnlist)"></div>
                  </div>
                </div>
                <div style="width: 30px;text-align: center;" class="iconfont icon-tianjia" @click="tianjia(item,index,item.btnlist)"></div>
              </div>
          </group>
        </div>
      <slot>
      </slot>
    </div>
</template>

<script>
  import { XInput,Group,XTextarea,Datetime,Selector,Checklist,Flexbox,FlexboxItem} from 'vux'
  var vm;
    export default {
        mounted(){
           vm=this;
        },
        props:{
            items:{
                type:Array
            }
        },
        data () {
            return {

            }
        },
        components: {XInput,Group,XTextarea,Datetime,Selector,Checklist,Flexbox,FlexboxItem},
        methods: {
          startPhotos(obj){
              this.$browser.startPhotos({url:this.$store.state.host+'/oa/docmobile/docupload.ht'},function (res) {
                 let ress=JSON.parse(res)
                if(obj.list.length<9){
                  obj.list.push(ress.rows[0])
                }
              })
          },
          shows(item,index,list){
            this.$browser.viewPicture({url:list,number:index})
          },
          deletes(item,index,list){
            list.splice(index,1)
          },
          del(item,index,btnlist){
            btnlist.splice(index,1)
          },
          tianjia(item,index){
              this.$store.commit('tables',{key:'items',value:this.items})
              this.$router.push({path:item.router,query:{value:item}})
          }
        }
    }
</script>

<style>
  .checkbox{
    display: -webkit-box;
  }
  .checkbox .weui-cells_checkbox{
    -webkit-box-flex: 1!important;
  }
  .checkbox .weui-check_label{
    float: left!important;
  }
  .checkbox .weui-cells__title{
    font-size: 17px;
    color: #2c3e50;
  }
  .alllist .vux-no-group-title{
    margin-top: 10px;
  }
  .alllist select{
    color: #2c3e50;
  }
  .alllist .vux-cell-value{
    color: #2c3e50;
  }
</style>
