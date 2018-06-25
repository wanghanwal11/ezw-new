<template>
    <div class="addressCenter">

      <div class="parentH box box_i_center">
        <div class="parentIcon" style="background-color: #3399ff; border: 1px solid #0b85ff"></div>
        <div class="box_f1">所有联系人</div>
      </div>

      <div class="parentH parentH_bm box box_i_center">
        <div class="parentIcon" style="background-color: #17c295; border: 1px solid #02b381"></div>
        <div class="box_f1">部门联系人</div>
      </div>

      <div class="parentH box box_i_center">
        <div class="parentIcon" style="background-color: #f2725e; border: 1px solid #f05942"></div>
        <div class="box_f1">联系人分组</div>
        <div class="parentEdit box box_i_center">
          <div class="eIcon">@</div>
          <span>创建组</span>
        </div>
      </div>
      <div class="childH">
        <a-peolple :table="table"></a-peolple>
      </div>

      <div class="parentH box box_i_center">
        <div class="parentIcon" style="background-color: #f7b55e; border: 1px solid #f1a541"></div>
        <div class="box_f1">最近联系人</div>
      </div>
      <div class="childH">
        <a-peolple :table="table2" @d-click="delPeolpleClick" @a-click="peolpleClick"></a-peolple>
      </div>


    </div>
</template>

<script>
    import APeolple from './components/APeolple.vue'
    import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    export default {
        mounted() {
            self = this;
        },
        data() {
            return {
              table: [{
                icon: "",
                name: "张三"
              },{
                texticon: ["赵","钱","孙","李"],
                icon: "",
                name: "李四"
              }],
              table2: [{
                icon: "",
                name: "0张三"
              },{
                icon: "",
                name: "1张三"
              },{
                icon: "",
                name: "2张三"
              },{
                name: "3张三"
              },{
                name: "4张三"
              }]
            }
        },
        components: {
          APeolple,
          Swipeout,
          SwipeoutItem,
          SwipeoutButton
        },
        methods: {
          peolpleClick(item, index) {
            alert(JSON.stringify(item))
            alert(index)
          },
          delPeolpleClick(item, index) {
            //alert("删除："+JSON.stringify(item))
            this.table2.splice(index, 1)

          }
        }
    }
</script>

<style scoped>
  .childH {
    background-color: #fff;
    padding-left: 10px;
  }
  .addressCenter {
    box-sizing: border-box;
    height: auto;
  }
  .parentH {
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 0 10px 15px;
    margin-top: 10px;
  }
  .parentH_bm {
    margin-top: 0;
    border-top: 1px solid #dedede;
  }
  .parentIcon {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    overflow: hidden;
    background-color: #5fcaf8;
    margin-right: 15px;
  }
  .eIcon {
    width: 40px;
    text-align: center;
  }
  .parentEdit {
    width: 100px;
    border-left: 1px solid #dedede;
    color: #3399ff;
    font-size: .9rem;
  }
</style>
