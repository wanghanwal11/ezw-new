<template>
  <div>
    <scroller :on-infinite="infinite" ref="my_scroller">
      <div style="height: 44px;"></div>
      <div v-for="(item, index) in items"
           class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </scroller>
  </div>
</template>
<script>
  export default {
    components: {

    },
    data () {
      return {
        items: []
      }
    },
    mounted() {
      for (let i = 1; i <= 10; i++) {
        this.items.push(i + ' - keep walking, be 2 with you.')
      }
      this.top = 1
      this.bottom = 10
      var promise1 = new Promise(function(resolve, reject) {
        for(let i=0;i<5;i++){
          setTimeout(function () {
            alert(i)
          },1000)
        }
      });
    },
    methods: {
      infinite(done) {
        console.log('infinite..')
        if (this.bottom >= 10) {
          setTimeout(() => {
            done(true)
            this.infinite = undefined
          }, 1500)
          return;
        }
        setTimeout(() => {
          let start = this.bottom + 1
          for (let i = start; i < start + 5; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          this.bottom = this.bottom + 5;
          setTimeout(() => {
            done()
          })
        }, 1500)
      }
    }
  }
</script>
