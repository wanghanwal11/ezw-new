<template>

</template>

<script>
  var vm;
    export default {
        created(){
          vm=this;
          let person=vm.$browser.getParameter('person'+localStorage.userid);
          if(person){
            this.zhanghao=person[0].username
            this.mima=person[0].password
            this.login()
          }
        },
        mounted(){
           vm=this;
        },
        data () {
            return {
              zhanghao: '',
              mima:'',
              password:true,
              show2:false
            }
        },
        components: {

        },
        methods: {
          login(){
            let aqzx=this.$browser.getParameter('aqzx'+localStorage.userid)
            this.show2=true
            this.$ajax("login",{
              username: this.zhanghao,
              password: this.mima
            }).then(function(res){
              vm.show2=false
              var rows=res.rows;
              vm.$browser.zhuce({alias:rows[0].userId})
              vm.$store.commit('changeuserid',rows[0].userId)
              //vm.$store.state.user.userid
              vm.$browser.setParameter('person'+vm.$store.state.user.userid,rows)
              vm.$router.replace({
                path:'/admin/shouye'
              })
              return
              if(!aqzx){
                vm.$router.replace({
                  path:'/admin/shouye'
                })
              }
              if(!aqzx[0].value&&!aqzx[1].value){
                vm.$router.replace({
                  path:'/admin/shouye'
                })
              }else{
                    if(aqzx[0].value&&!aqzx[1].value){
                      vm.$browser.finger(function (obj) {
                          alert(obj)
                          if(obj.error){
                            vm.$store.commit('changeuserid','')
                            vm.$router.push({path: '/'})
                          }else{
                            vm.$router.replace({
                              path:'/admin/shouye'
                            })
                          }
                      })
                  }
                if(aqzx[1].value&&!aqzx[0].value){
                  vm.$browser.faceshibie(function (obj) {
                    if(obj.error){
                      vm.$store.commit('changeuserid','')
                      vm.$router.push({path: '/'})
                    }else{
                      vm.$router.replace({
                        path:'/admin/shouye'
                      })
                    }
                  })
                }
                if(aqzx[1].value&&aqzx[0].value){
                  vm.$browser.finger(function (obj) {
                    if(obj.error){
                      vm.$store.commit('changeuserid','')
                      vm.$router.push({path: '/'})
                    }else{
                      vm.$browser.faceshibie(function (obj) {
                        if(obj.error){
                          vm.$store.commit('changeuserid','')
                          vm.$router.push({path: '/'})
                        }else{
                          vm.$router.replace({
                            path:'/admin/shouye'
                          })
                        }
                      })
                    }
                  })
                }
              }
            },function(res){
              vm.$router.replace({
                path:'/',
                query:{
                    login:true
                }
              })
            })
          }
        }
    }
</script>

<style>
  .input .weui-cell:before{
    border: none;
  }
  .ezw{
    background: url("../assets/ezw.png");
    background-size: cover;
  }
</style>
