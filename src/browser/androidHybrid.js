export default {
  name: "androidHybrid",
  isBrowser () {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.match(/vitoandroid/i) == 'vitoandroid') {
      return true
    }
    return false
  },
  API: {
    start () {
      alert("start--------androidHybrid拍")
    },
    wechatLogin (back) {
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      self.login.WXlogin(o)
    },
    headerColor(obj){
      obj=JSON.stringify(obj)
      window.color.setTopColor(obj)
    },
    openNewWebview(url){
      window.openNewWebview.open(url);
    },
    startPhotos(eva,back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o.webUrl=eva.url;
      o.type=eva.state?eva.state:'';
      o=JSON.stringify(o)
      window.camera.open(o)
    },
    viewPicture(eva){
      var o={}
      o.picAry=eva.url;
      o.currentPage=eva.number;
      o=JSON.stringify(o)
      window.photoView.viewPicture(o)
    },
    zhuce(obj){
      obj = JSON.stringify(obj);
      window.alias.NotificationSetAlias(obj)
    },
    banben(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.versionName.getCurrentVersion(o)
    },
    finger(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.finger.FingerPrint(o)
    },
    facezhuce(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.register.start(o)
    },
    faceshibie(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.detect.start(o)
    },
    dingwei(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        var obj=JSON.parse(obj)
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.loc.location(o)
    }
  }
}

