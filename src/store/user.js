export default {
  state: {
    userid: 0,
    obj:{},
    tables:{}
  },
  mutations: {
      changeuserid(state, id){
        state.userid=id
        localStorage.userid=id
      },
      tuisong (state,obj) {
        if(typeof  obj == "string"){
          obj=JSON.parse(obj)
        }
        state.obj=obj
      },
      tables(state,obj){
        state.tables[obj.key]=obj.value
      },
      cleartables(state){
        state.tables={}
      }
  }
}
