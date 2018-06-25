<template>
  <div style="position: absolute;top: 0;width: 100%;height: 100%" v-show="show" @touchmove.prevent>
    <div style="position: absolute;width: 100%;height: 100%;background: black;opacity: 0.5;z-index: 2"  @click="hide()"></div>
    <div style="position: absolute;z-index: 500;width: 100%">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){

    },
    props:{

    }
    ,
    data () {
      return {
        show: false
      }
    },
    components: {},
    methods: {
      hide(){
        this.show=false
        this.$emit('hides',this.show)
      },
      shows(){
        this.show=true
      }

    }
  }
</script>

<style>
</style>
