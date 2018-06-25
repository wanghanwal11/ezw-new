export default {
  login: {
    name: "登录接口",
    return: {
      isSucceed: true,
      message: '',
      rows: [{
        fullname: "崔大冠",
        isExpired: 0,
        isLock: 0,
        mobile: "",
        orgName: "研发部",
        userId: 100001100507712,
        userOrgId: 10000110050772,
        phone: 15293793943,
        sex: "男",
        Iconimage: "",
        email: "102342423@qq.com"
      }]
    }
  },
  work_main: {
    name: "主页面接口",
    return: {
      isSucceed: true,
      message: '',
      rows: [{
        message: [{
          imageName: "hujiaozhongxin",
          type: "呼叫中心",
          createtime: 2017 - 2 - 5,
          state: "紧急事件-已转办",
          text: "",
          content: "现在的朝阳区雾霾严重….",
          creatername: "王晗"
        },

          {
            imageName: "wanggehua",
            type: "网格化",
            createtime: 2017 - 2 - 5,
            state: "一般任务下派-已退回",
            text: "",
            content: "垃圾乱堆乱放….",
            creatername: "孙钰迪"
          }]

      }]
    }
  },


  work_list: {
    name: "主页面更多接口",
    return:
      {
        "isSucceed": true,
        "message": "",
        "rows": [[{
          "items": [{
            "imageName": "gonggao",
            "itemTitle": "公告"
          },
            {
              "imageName": "xierizhi",
              "itemTitle": "写日志"
            },
            {
              "imageName": "kaoqin",
              "itemTitle": "考勤"
            },
            {
              "imageName": "qiandao",
              "itemTitle": "签到"
            },
            {
              "imageName": "shenpi",
              "itemTitle": "审批"
            }],
          "type": "最近使用"
        }], [{
          "items": [{
            imageName: "hujiaozhongxin",
            itemTitle :"呼叫中心",
          },
            {imageName: "wanggehua",
              itemTitle :"网格化"},
            {
              imageName: "shijianduban",
              itemTitle :"事件督办"
            },
            {imageName: "renwuxiapai",
              itemTitle :"任务下派",
            }],
          "type": "业务"
        },
          {
            "items": [{
              "imageName": "qingjia",
              "itemTitle": "请假"
            },
              {
                "imageName": "chuchai",
                "itemTitle": "出差"
              },
              {
                "imageName": "gongwuwc",
                "itemTitle": "公务外出"
              },
              {
                "imageName": "jianban",
                "itemTitle": "加班"
              },
              {
                "imageName": "zhaodai",
                "itemTitle": "招待"
              },
              {
                "imageName": "daoxiu",
                "itemTitle": "倒休"
              },
              {
                "imageName": "jiekuan",
                "itemTitle": "借款"
              },
              {
                "imageName": "zhichuzm",
                "itemTitle": "支出证明"
              },
              {
                "imageName": "xiangmulix",
                "itemTitle": "项目立项"
              },
              {
                "imageName": "yijianfk",
                "itemTitle": "意见反馈"
              },
              {
                "imageName": "bgypcgsq",
                "itemTitle": "办公采购"
              },
              {
                "imageName": "yinzhangsy",
                "itemTitle": "档案使用"
              },
              {
                "imageName": "gudzicgz",
                "itemTitle": "资产购置"
              },
              {
                "imageName": "hetongsp",
                "itemTitle": "合同审批"
              },
              {
                "imageName": "gwjinssp",
                "itemTitle": "岗位晋升"
              },
              {
                "imageName": "yggwbiandong",
                "itemTitle": "岗位变动"
              },
              {
                "imageName": "ygcitui",
                "itemTitle": "员工辞退"
              },
              {
                "imageName": "sqkaipiao",
                "itemTitle": "申请开票"
              },
              {
                "imageName": "fukuantz",
                "itemTitle": "付款通知单"
              },
              {
                "imageName": "lizhisp",
                "itemTitle": "离职审批"
              },
              {
                "imageName": "ygldhtxuyue",
                "itemTitle": "员工合同续签"
              },
              {
                "imageName": "cljysq",
                "itemTitle": "车辆借用"
              },
              {
                "imageName": "yongrxuqiu",
                "itemTitle": "用人需求"
              },
              {
                "imageName": "yusuansq",
                "itemTitle": "预算申请"
              },
              {
                "imageName": "xmyuspg",
                "itemTitle": "项目预算"
              },
              {
                "imageName": "gerenjsjbz",
                "itemTitle": "电脑补助"
              },
              {
                "imageName": "clfbxsq",
                "itemTitle": "差旅报销"
              },
              {
                "imageName": "kaoqinyc",
                "itemTitle": "考勤异常"
              },
              {
                "imageName": "yinzhangsy",
                "itemTitle": "印章使用"
              },
              {
                "imageName": "xuqiubg",
                "itemTitle": "自由流程"
              },
              {
                "imageName": "qingjia",
                "itemTitle": "请假自由流程测试"
              },
              {
                "imageName": "xiangmulix",
                "itemTitle": "系统注册"
              }],
            "type": "申请"
          },
          {
            "items": [{
              "imageName": "xierizhi",
              "itemTitle": "写日志"
            },
              {
                "imageName": "xiezhoubao",
                "itemTitle": "写周报"
              },
              {
                "imageName": "xieyuebao",
                "itemTitle": "写月报"
              },
              {
                "imageName": "rizhichakan",
                "itemTitle": "日志查看"
              }],
            "type": "日志"
          },
          {
            "items": [{
              "imageName": "shenpi",
              "itemTitle": "审批"
            },
              {
                "imageName": "gonggao",
                "itemTitle": "公告"
              },
              {
                "imageName": "kaoqin",
                "itemTitle": "考勤"
              },
              {
                "imageName": "qiandao",
                "itemTitle": "签到"
              }],
            "type": "其他"
          }]],
        "footer": "",
        "total": 0,
        "newPrimaryKeys": {}
      }
      },
work_number: {
  name: "主页待办数字接口",
  return: {"isSucceed":true,"message":"","rows":[{"createtime":1523116800000,"endtime":1522944000000,"content":"这是网格化内容","id":1000,"businessid":2000,"text":"","title":"这是网格化标题","starttime":1522684800000,"creatername":"崔大冠","imageName":"wanggehua","taskid":3000,"state":"待审批","type":"网格化"},{"createtime":1523116800000,"endtime":1522944000000,"content":"这是呼叫中心内容","id":1001,"businessid":2001,"text":"","title":"这是呼叫中心标题","starttime":1522684800000,"creatername":"崔大冠","imageName":"hujiaozhongxin","taskid":3001,"state":"待审批","type":"呼叫中心"},{"createtime":1523116800000,"endtime":1522944000000,"content":"这是呼叫中心内容","id":1002,"businessid":2002,"text":"","title":"这是呼叫中心标题","starttime":1522684800000,"creatername":"崔大冠","imageName":"hujiaozhongxin","taskid":2002,"state":"待审批","type":"呼叫中心"},{"createtime":1523116800000,"endtime":1522944000000,"content":"这是申请内容","id":1003,"businessid":2003,"text":"","title":"这是申请标题","starttime":1522684800000,"creatername":"崔大冠","imageName":"shenqing","taskid":2003,"state":"待审批","type":"申请"}],"footer":"","total":0,"newPrimaryKeys":{}}
}


}
