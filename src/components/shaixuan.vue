<template>
    <div style="display: -webkit-box;background: white;border-top: 1px solid #D9D9D9;border-bottom: 1px solid #D9D9D9">
      <div v-for="(item,index) in items" :key="index" style="-webkit-box-flex: 1;padding: 5px;text-align: center" @click="click(index,item)">{{item.title}}
        <div style="display: inline-block;font-size: 10px;vertical-align: middle;" class="iconfont icon-xiafanye"  :class="{rotate:item.check,rotate1:!item.check}"></div>
      </div>
      <slot></slot>
    </div>
</template>

<script>
    export default {
        created(){
        },
        mounted(){

        },
        props:{
          items:{
              type:Array,
              defalut:[]
          }
        },
        data () {
            return {
                isscurr:null
            }
        },
        components: {},
        methods: {
          click(index,item){
             if(this.isscurr!=index){
              for (let value of this.items) {
                this.$set(value,'check',false)
              }
            }
            this.isscurr=index
              item.check=!item.check;
              this.$emit("click",item)
          }
        }
    }
</script>

<style scoped>
    .color{

    }
    .rotate
    {
      -webkit-transition: -webkit-transform 0.4s ease-out;
      -webkit-transform: rotate(180deg);
    }
    .rotate1
    {
      -webkit-transition: -webkit-transform 0.4s ease-out;
      -webkit-transform: rotate(0deg);
    }
</style>
