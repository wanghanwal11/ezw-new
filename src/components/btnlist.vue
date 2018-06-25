<template>
  <div class="menu" :class="classes">
      <span :name="index" v-for="(item,index) in items" :key="index" class="li" @click="clk(item)"   :class="{'cur':item.show===true}">
        <div  v-if="!remove">{{item.name}}</div>
    </span>
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
  .li{
    display: inline-block;
    padding: 1px 7px;
    border: 1px solid #eeeeee;
    background: #f7f5fa;
    border-radius: 2px;
    color: #999999;
    cursor: pointer;
    position: relative;
    margin: 8px;
    font-size: 15px;
  }
  .cur{
    border: 1px solid #2989ff;
    background: white;
    color: #2989ff;
  }
</style>
