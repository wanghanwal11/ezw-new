export default {
  name: "iosHybrid",
  isBrowser () {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.match(/vitoios/i) == 'vitoios') {
      return true
    }
    return false
  },
  API: {
    start () {
      alert("start--------iosHybrid拍")
    },
    wechatLogin (back) {
      window["wechatLogin_CallBack"] = (obj)=>{
        obj=JSON.stringify(obj)
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.webkit.messageHandlers.wachatLogin.postMessage(o)
    },
    headerColor(obj){
      obj=JSON.stringify(obj)
      window.webkit.messageHandlers.setStatusBar.postMessage(obj)
    },
    openNewWebview(url){
      var obj = {};
      obj.webUrl = url;
      obj = JSON.stringify(obj);
      window.webkit.messageHandlers.presentNewWebView.postMessage(obj)
    },
    startPhotos(eva,back){
      window["wechatLogin_CallBack"] = (obj)=>{
        obj=JSON.stringify(obj)
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o.webUrl=eva.url;
      o.type=eva.state?eva.state:'';
      o=JSON.stringify(o)
      window.webkit.messageHandlers.takePhotos.postMessage(o)
    },
    viewPicture(eva){
      var o={}
      o.picAry=eva.url;
      o.currentPage=eva.number;
      o=JSON.stringify(o)
      window.webkit.messageHandlers.viewPicture.postMessage(o)
    },
    zhuce(obj){
      obj = JSON.stringify(obj);
      window.webkit.messageHandlers.NotificationSetAlias.postMessage(obj)
    },
    banben(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        obj=JSON.stringify(obj)
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.webkit.messageHandlers.getCurrentVersion.postMessage(o)
    },
    finger(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.webkit.messageHandlers.evaluateAuthenticate.postMessage(o)
    },
    facezhuce(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.webkit.messageHandlers.faceRegistration.postMessage(o)
    },
    faceshibie(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.webkit.messageHandlers.faceRecognition.postMessage(o)
    },
    dingwei(back){
      window["wechatLogin_CallBack"] = (obj)=>{
        back && back(obj)
      }
      var o={}
      o.callback="wechatLogin_CallBack";
      o=JSON.stringify(o)
      window.webkit.messageHandlers.initializeLocationService.postMessage(o)
    }
  }
}
