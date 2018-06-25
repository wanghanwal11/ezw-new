<style scoped>
  body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
  }
  .item {
    cursor: pointer;
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
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
  li{
    list-style-type:none;
  }
</style>
<template>
  <li>
    <div
      @click="toggle(model)"
      @dblclick="changeType">
      <div v-if="isFolder" style="display: inline-block;font-size: 12px" class="iconfont icon-xiafanye" :class="{'rotate1':!open,'rotate':open}"></div>
     {{ model.orgname }}
      <div class="iconfont icon-duigou" v-if="model.select" style="display: inline-block;font-size: 14px;color: #2989ff; font-weight: bold;float: right;margin-right: 30px"></div>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </item>
    </ul>
  </li>
</template>

<script>
  let arr=[]
  export default {
        name:'item',
        props: {
          model: Object
        },
        data () {
          return {
            open: false,
            selects:[]
          }
        },
        mounted(){
          arr=[]
        },
        computed: {
          isFolder: function () {
            return this.model.children &&
              this.model.children.length
          }
        },
        methods: {
          toggle: function (model) {
            if (this.isFolder) {
              this.open = !this.open
            }else{
                if(model.select){
                  arr.splice(arr.findIndex(item => item.name ==model.orgname), 1)
                  this.$set(model,'select',false)
                }else{
                  this.$set(model,'select',true)
                  arr.push({name:model.orgname})
                }
            }
          },
          changeType: function () {
            if (!this.isFolder) {
              Vue.set(this.model, 'children', [])
              this.addChild()
              this.open = true
            }
          },
          getvalue(){
              return arr
          }
    }
  }
</script>
