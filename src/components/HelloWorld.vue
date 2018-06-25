<script>
export default {
  data () {
    return {
      msg: 'myApp'
    }
  },
  render:function (h) {
   return h('div', {
     // 和`v-bind:class`一样的 API
     'class': {
       foo: true,
       bar: false
     },
     // 和`v-bind:style`一样的 API
     style: {
       color: 'red',
       fontSize: '14px'
     },
     // 正常的 HTML 特性
     attrs: {
       id: 'foo'
     },
     // 组件 props
     props: {
       myProp: 'bar'
     },
     // DOM 属性
     domProps: {
       innerHTML: 'baz'
     },
     // Scoped slots in the form of
     // { name: props => VNode | Array<VNode> }
     scopedSlots: {
       default: props => createElement('span', props.text)
     },
     // 如果组件是其他组件的子组件，需为插槽指定名称
     slot: 'name-of-slot',
     // 其他特殊顶层属性
     key: 'myKey',
     ref: 'myRef'
   })
  }
}
</script>
