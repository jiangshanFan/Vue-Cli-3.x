<!-- ======================= can't be anything of template -->
<script>
// @ is an alias to /src
import Anchored from '../components/HelloWorld.js'
import VueClassComponent from '../components/vueClassComponent'

export default {
  name: 'Home',
  methods: {
    hello() {
      console.log('hello');
    },
  },
  render (h) {  //=============== vOn:click={self.hello} 必须放在当前的组件环境下才能生效，如果放在引用的组件中，必须通过props传递，触发响应组件的方法
    let self = this;
    const attr = {
      level: self.level,
      class: 'bg'
    }

    return (
      <div vOn:click={self.hello}>
        {
          Array.apply(null, { length: 3 }).map(function () {
            return (
              <Anchored {...{ attrs: attr }}>
                <p>Hello, <span>{ self.message }</span> right? <span domPropsInnerHTML={self.html}>nice!</span></p>
                <header slot="header">header</header>
                <footer slot="footer">footer</footer>
              </Anchored>
            )
          })
        }
        <VueClassComponent propMessage="vueClassComponentTest" />
      </div>
    )
  },

  data() {
    return {
      level: 1,
      html: 'a rainy day!',
      message: 'a message!'
    }
  }
}
</script>

<style lang="scss">
  .bg {
    background-color: #f5f5f5;
  }
</style>
