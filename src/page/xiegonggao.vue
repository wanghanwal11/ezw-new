<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">写公告</div>
          <div slot="right"  style="color: white;line-height: 37px" @click="tijiao">提交</div>
        </x-header>
      </div>
      <list :items="items" style="position: absolute;width: 100%; overflow-y: scroll;-webkit-overflow-scrolling: touch;top: 71px;z-index: 2 ">
      </list>
    </div>
</template>

<script>
  import { XHeader} from 'vux'
  import list from '@/components/list'
  var vm;
    export default {
        mounted(){
          vm=this;
        },
        data () {
            return {
                page:1,
                items: [{
                      type:'text',
                      name:'标题',
                      value: ""
                    },
                  {
                    type: "textarea",
                    name: "内容:",
                    value: "",
                  },
                    {
                      name: "日期:",
                      type: "date",
                      value: ""
                    },{
                    type: "image",
                    name: "图片:",
                    url: this.$store.state.host+'/oa/docmobile/docupload.ht',
                    list:[]
                  }]
            }
        },
        components: {list,XHeader},
        methods: {
          goback(){
            this.$router.go(-1)
          },
          tijiao(){
              let p={}
              for (let value of this.items) {
                if(value.type=='text'){
                  p.title=value.value
                }
                if(value.type=='textarea'){
                  p.content=value.value
                }
                if(value.type=='date'){
                  p.losetime=value.value
                }
                if(value.type=='image'){
                  var str=''
                  for(var i=0;i<value.list.length;i++){
                    str+=value.list[i].id+','
                    p.filesid=str
                  }
                  var reg=/,$/gi;
                  if(p.filesid) p.filesid=p.filesid.replace(reg,"");
                }
              }
              p.page=this.page;
              p.rows='20';
              this.$ajax("saveforphone",p).then(function(res){
                vm.$router.go(-1)
              })
          }
        }
    }
</script>

<style>
</style>
