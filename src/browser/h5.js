export default {
  name: "h5",
  base:true,
  isBrowser() {
    return true
  },
  API: {
    start () {
      alert("start--------h5拍")
    },
    headerColor(obj){

    },
    zhuce(){

    },
    banben(){

    },
    FormatDate(time,format){
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? "0" :"") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
            break;

          case "MM":
            return tf(t.getMonth() + 1);
            break;

          case "mm":
            return tf(t.getMinutes());
            break;

          case "dd":
            return tf(t.getDate());
            break;

          case "HH":
            return tf(t.getHours());
            break;

          case "ss":
            return tf(t.getSeconds());
            break;
        }
      });
    },
    responseFun(name) {
      if(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var path = decodeURI(window.location.href);
        var r = path.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
      }else{
        return window.location.href;
      }
    },
    setParameter (name, json) {
      localStorage.setItem(name, JSON.stringify(json));
    },
    getParameter (name) {
      if (localStorage.getItem(name)) {
        var json = localStorage.getItem(name);
        return JSON.parse(json);
      } else {
        return null;
      }
    },
    huanChong(a, b, time, type, centerFun, backFun) {
      if(t)  clearInterval(t)
      a = parseInt(a);
      b = parseInt(b);
      var zheng = true;
      if (a < b) {
        zheng = true;
      } else if (a > b) {
        zheng = false;
      } else {
        return;
      }
      var t;
      var pl = 5;
      var cs = Math.ceil(time / pl);
      var an = (b - a) * 2 / cs - 1;
      var d = (an - 1) / (cs - 1);
      if (type == "yunsu") {
        var vv = Math.abs(a - b) / cs;
        t = setInterval(function() {
          if (zheng) {
            a += vv;
          } else {
            a -= vv;
          }
          if (zheng && Math.ceil(a) >= b) {
            a = b;
            clearInterval(t);
            if (backFun) {
              backFun(Math.ceil(a));
            }
          }
          if (!zheng && Math.ceil(a) <= b) {
            a = b;
            clearInterval(t);
            if (backFun) {
              backFun(Math.ceil(a));
            }
          }
          centerFun(Math.ceil(a));
        }, pl);
        return t;
      } else {
        if (type == "jiansu") {
          var ak = an;
        } else {
          var ak = 1;
        }
        t = setInterval(function() {
          a += ak;
          if (type == "jiansu") {
            ak -= d;
          } else {
            ak += d;
          }
          if (zheng && Math.ceil(a) >= b) {
            a = b;
            clearInterval(t);
            if (backFun) {
              backFun(Math.ceil(a));
            }
          }
          if (!zheng && Math.ceil(a) <= b) {
            a = b;
            clearInterval(t);
            if (backFun) {
              backFun(Math.ceil(a));
            }
          }
          centerFun(Math.ceil(a));
        }, pl);
        return t;
      }
    },
    toTree(data) {
          // 删除 所有 children,以防止多次调用
          data.forEach(function (item) {
            delete item.children;
          });

          // 将数据存储为 以 id 为 KEY 的 map 索引数据列
          var map = {};
          data.forEach(function (item) {
            map[item.orgid] = item;
          });
        //        console.log(map);

          var val = [];
          data.forEach(function (item) {

            // 以当前遍历项，的pid,去map对象中找到索引的id
            var parent = map[item.orgsupid];

            // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
            if (parent) {

              (parent.children || ( parent.children = [] )).push(item);

            } else {
              //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
              val.push(item);
            }
          });

          return val;
     }

}
}
