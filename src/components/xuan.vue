<template>
  <div class="menu" :class="classes">
      <div :name="index" v-for="(item,index) in items" :key="index" class="li">
        <div class="text"  v-if="!remove"  @click="clk(item)"   :class="{'cur':item.show===true}">{{item.name}}<div class="iconfont icon-duigou" v-if="item.show" :class="{'duigou':item.show===true}"></div></div>

    </div>
  </div>
</template>

<script>
  export default {
    mounted(){

    },
    props:{
      items:{
        type:Array,
        default:[]
      },
      classes:{
        type:String,
        default:""
      },
      remove:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        message: ''
      }
    },
    components: {},
    methods: {
      clk:function(item,event){
        item.show = !item.show;
      },
      hehe(obj,index,$event){
        event.stopPropagation();
        obj.index=index
        this.$emit("removes",obj)
      }
    }
  }
</script>

<style scoped>
  .menu{
    width: 100%;
  }
  .li{
    color: #999999;
    font-size: 14px;
    width: 50%;
    display: inline-block;
    margin-bottom: 5px;
  }
  .cur{
    border-bottom: 1px solid #2989ff!important;
    background: white;
    color: #2989ff;
  }
  .text{
    padding: 15px 0px;
    border-bottom: 1px solid white;
    margin: 0 10px;
    padding-bottom: 5px;
  }
  .duigou{
    display: inline-block;
    float: right;
    font-size: 14px;
  }
</style>
