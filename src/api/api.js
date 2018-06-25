const IP = 'http://192.168.0.20:8088/vito'
export default {
  login: {
    name: "登录",
    url: IP + "/loginMobile.ht"
  },
  work_more:{
    name: "主页面更多接口",
    url: IP + "/oa/sysmolile/work_more.ht"
  },
  work_list:{
    name: "主页面接口",
    url: IP + "/oa/procedure/list.ht"
  },
  work_listxq:{
    name: "详情",
    url: IP + "/oa/procedure/connectInsideWeb.ht"
  },
  work_number:{
    name: "主页待办数字接口",
    url: IP + "/oa/procedure/number.ht"
  },
  shenqingtj:{
    name: "申请添加",
    url: IP + "/bpm/BPM_FORM_DEF/getByserviceId.ht"
  },
  getJiabanDays:{
    name:'加班时间',
    url: IP + "/acceptance/SLPT_Service/getJiabanDays.ht",
  },
  getByOrgPath:{
    name:'组织列表',
    url: IP + "/sys/vitoorg/list.ht",
  },
  vitouser:{
    name:'人员列表',
    url: IP + "/sys/vitouser/getByOrgPath.ht",
  },
  phoneStartFlow:{
    name:'提交申请',
    url: IP + "/bpm/BPM_TASK_OPINION/task/phoneStartFlow.ht",
  },
  getbpmformbtn:{
    name:'提交申请按钮',
    url: IP + "/dispute/mobile/getbpmformbtn.ht",
  },
  connectInsideWeb:{
    name:'呼叫中心详情',
    url: IP + "/oa/procedure/connectInsideWeb.ht",
  },
  mobileupdate:{
    name:'上传头像',
    url: IP + "/sys/vitoperson/mobileupdate.ht",
  },
  getbpmformbtn:{
    name:'获取按钮',
    url: IP + "/dispute/mobile/getbpmformbtn.ht",
  },
  complete:{
    name:'完成',
    url: IP + "/bpm/BPM_TASK_OPINION/task/complete.ht",
  },
  phoneBlForOA:{
    name:'申请详情',
    url: IP + "/acceptance/SLPT_App/phoneBlForOA.ht",
  },
  saveByList:{
    name:'申请上传图片',
    url: IP + "/acceptance/SLPT_AcceptanceAnnex/saveByList.ht",
  },
  listforphone:{
    name:'公告列表',
    url: IP + "/oa/mqlog/listforphone.ht",
  },
  getforphone:{
    name:'公告详情',
    url: IP + "/oa/mqlog/getforphone.ht",
  },
  saveforphone:{
    name:'写公告',
    url: IP + "/oa/mqlog/saveforphone.ht",
  },
  rizhitijiao:{
    name:'日志提交',
    url: IP + "/oa/mobilelog/save.ht",
  },
  rizhilist:{
    name:'日志列表',
    url: IP + "/oa/mobilelog/list.ht",
  },
  rizhilistxq:{
    name:'日志详情',
    url: IP + "/oa/mobilelog/get.ht",
  },
  rizhipl:{
    name:'日志评论',
    url: IP + "/oa/information/commentlog.ht",
  },
  dingwei:{
    name:'获取定位',
    url: IP + "/dispute/location/getCurrUserGpsData.ht",
  },
  newlist:{
    name:'签到列表',
    url: IP + "/oa/sign/newlist.ht",
  },
  newsave:{
    name:'签到提交',
    url: IP + "/oa/sign/newsave.ht",
  },
  get:{
    name:'签到详情',
    url: IP + "/oa/sign/get.ht",
  },
  getCheckattendance:{
    name:'考勤',
    url: IP + "/oa/equipmentManagement/getCheckattendance.ht",
  },
  getAttendanceByRights:{
    name:'考勤1',
    url: IP + "/oa/equipmentManagement/getAttendanceByRights.ht",
  }
}
