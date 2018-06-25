<template>
    <div class="APeolple">

      <swipeout class="swipeoutH" v-for="(item, index) in table">

        <swipeout-item transition-mode="follow">

          <div slot="right-menu">
            <swipeout-button type="warn" @click.native="delPeolpleClick(item, index)">删除</swipeout-button>
          </div>

          <div slot="content" @click="peolpleClick(item, index)" class="APeolpleH box box_i_center">
            <div :class="'APeolpleIcon iconcolor_'+parseInt(index%5)">
              <div v-if="item.texticon && Array.isArray(item.texticon) && item.texticon.length>2" class="Aarc box box_hh">
                <div :class="'AarcC box box_center box_i_center color_'+key" v-for="(val, key) in item.texticon">
                  <sapn class="AarcCSpan">{{key!=3?val:'...'}}</sapn>
                </div>
              </div>
              <span v-else>{{item.name.substr(0,1)}}</span>
            </div>
            <div class="APeolpleName box-f1">{{item.name}}</div>
          </div>

        </swipeout-item>

      </swipeout>
      <actionsheet v-model="showDel" :menus="menusDel" @on-click-menu-delete="onDelete" show-cancel></actionsheet>
    </div>
</template>

<script>
    import 'devicebox/lib/index.css'
    import { Actionsheet, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    var self = null;
    export default {
        name: 'a-people',
        mounted() {
            self = this;
        },
        data() {
            return {
              showDel: false,
              delItem: {},
              delIndex: -1,
              menusDel: {
                'title.noop': '确定?<br/><span style="color:#666;font-size:12px;">删除后就无法撤消了哦</span>',
                delete: '<span style="color:red">确定删除</span>'
              }
            }
        },
        props: ["table"],
      components: {
        Actionsheet,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
      },
        methods: {
          peolpleClick(item, index) {
            this.$emit('a-click', item, index);
          },
          delPeolpleClick(item, index) {
            self.showDel = true;
            self.delItem = item;
            self.delIndex = index;
          },
          clickmenu (key) {
            console.log(key)
          },
          onDelete () {
            this.$emit('d-click', this.delItem, this.delIndex);
            this.delItem = {};
          }
        }
    }
</script>

<style scoped>
  .APeolple {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 0 0 15px;
  }
  .APeolple .swipeoutH {
    border-bottom: 1px solid #dedede;
  }
  .APeolpleH {
    box-sizing: border-box;
    padding: 10px 0;
  }
  .APeolple .swipeoutH:last-child {
    border-bottom:none;
  }
  .APeolpleIcon {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 40px;
    overflow: hidden;
    background-color: #5fcaf8;
    margin-right: 15px;
    color: #fff;
  }
  .iconcolor_0 {
    background-color: #5fcaf8;
  }
  .iconcolor_1 {
    background-color: #f7b55e;
  }
  .iconcolor_2 {
    background-color: #f2725e;
  }
  .iconcolor_3 {
    background-color: #17c295;
  }
  .Aarc {
    width: 100%;
    height: 100%;
  }
  .AarcC {
    width: 50%;
    height: 50%;
    box-sizing: border-box;
    color: #fff;
    border: 1px solid #fff;
  }
  .AarcCSpan {
    font-size: .6rem;
  }
  .color_0 {
    background-color: #3399ff;
  }
  .color_1 {
    background-color: #0abe8f;
  }
  .color_2 {
    background-color: #ff9134;
  }
  .color_3 {
    background-color: #f2725e;
  }
</style>
