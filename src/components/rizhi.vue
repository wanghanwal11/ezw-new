<template>
    <div>
        <div v-for="(item,index) in items" :key="index">
              <div v-if="item.title" style="padding: 5px 15px;position: relative">{{item.title}}({{index+1}})<x-button v-if="index!=0" @click.native="deletes(items,index)" style="background: #2989ff;margin-top: 0px;margin-right: 10px;color: white;position: absolute;right: 5px" mini>删除</x-button></div>
              <div v-for="(list,index) in item.textlist" style="display: -webkit-box;background: white">
                  <div style="min-width: 40px;max-width: 80px;padding-left: 15px;padding-top: 5px">{{list.name}}</div>
                  <x-textarea v-model="list.value" style="-webkit-box-flex: 1" :placeholder="list.placeholder?list.placeholder:'请输入文字'"></x-textarea>
              </div>
        </div>
    </div>
</template>

<script>
  import {XTextarea,XButton} from 'vux'
    export default {
        name:'rizhi',
        props:{
            items:Array
        },
        mounted(){

        },
        data () {
            return {
                message: ''
            }
        },
        components: {XTextarea,XButton},
        methods: {
          deletes(obj,index){
            obj.splice(index,1)
          }
        }
    }
</script>

<style>
</style>
