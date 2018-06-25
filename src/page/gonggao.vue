<template>
    <div>
      <div class="header" style="height: 71px">
        <div style="height: 15px;background:#2989ff;position: fixed;width: 100%;z-index: 99;"></div>
        <x-header style="background: #2989ff;position: fixed;width: 100%;z-index: 99;top: 15px;height: 55px">
          <div slot="overwrite-left" style="color: black;display: -webkit-box;">
            <div class="iconfont icon-icon_arrow_left" style="font-size: 20px;padding: 5px;color: white" @click="goback"></div>
          </div>
          <div style="color: white;line-height: 55px;">公告</div>
          <div slot="right" v-if="rights"  style="color: white;line-height: 37px" @click="go">写公告</div>
        </x-header>
      </div>
      <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" >
        <div class="box2">
          <div v-for="(item, index) in items1" :key="index" @click="xq(item)" style="background: white;padding: 6px;display: -webkit-box;margin-bottom: 10px">
            <div style="-webkit-box-flex: 1;padding: 0px 10px">
              <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.title}}</div>
              <div style="font-size: 14px;line-height: 20px;color: #999999">来源:{{item.username}}</div>
            </div>
            <div style="min-width: 50px;">
              <div style="font-size: 14px;color: #999999">{{item.createtime | formdate('yyyy-MM-dd',item.createtime)}}</div>
            </div>
          </div>
          <load-more :show-loading="loading" :tip="tip"></load-more>
        </div>
      </scroller>
    </div>
</template>

<script>
  import {XHeader,Scroller,LoadMore} from 'vux'
  var vm;
    export default {
        mounted(){
          vm=this;
          vm.load()
        },
        data () {
            return {
              page:1,
              items1: [],
              rights:false,
              onFetching: false,
              loading:true,
              tip:'加载中'
            }
        },
        components: {XHeader,Scroller,LoadMore},
        methods: {
          onScrollBottom () {
            vm.loading=true
            vm.tip='加载中'
            if (this.onFetching) {
              // do nothing
            } else {
              this.onFetching = true
              setTimeout(() => {
                vm.load()
                this.$nextTick(() => {
                  this.$refs.scrollerBottom.reset()
                })
                this.onFetching = false
              }, 1000)
            }
          },
          load(){

            vm.$ajax("listforphone",{
              page:vm.page,
              rows:'20',
            }).then(function(res){
              vm.page++
              vm.loading=false
              if(res.rows.length==0){
                vm.tip='没有更多数据'
              }else{
                vm.tip='上拉加载更多'
              }
              if(res.newPrimaryKeys.rights=='1'){
                  vm.rights=true
              }
              let data=res.rows;
              for (let value of data) {
                vm.items1.push(value)
              }
            })
          },
          goback(){
            this.$router.go(-1)
          },
          go(){
            this.$router.push({
              path:'/xiegonggao'
            })
          },
          xq(obj){
            this.$router.push({path:'/gonggaoxq',query:{id:obj.id}})
          }
        }
    }
</script>

<style>
</style>
