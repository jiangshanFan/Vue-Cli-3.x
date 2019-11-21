
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ // ============ decoration is inject to Vue example
  props: {
    propMessage: String
  },

  computed: {
    computedMsg () {
      return 'computeds ' + this.msg
    }
  },

  data () {
    return {
      msg: 678
    }
  }
})

class VueClassComponent extends Vue {
  // initial data
  // msg = 123

  // use prop values for initial data
  helloMsg = 'Hello, ' + this.propMessage

  // lifecycle hook
  mounted () {
    this.greet()
  }

  // route cycle hook

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  greet () {
    alert('greeting: ' + this.msg)
  }

  render (h) { // ================= Note: syntax is different, h is required
    return (
      <div>
        <label htmlFor="hello">标题：</label>
        <input id="hello" vModel={this.msg} />
        <p>prop: {this.propMessage}</p>
        <p>msg: {this.msg}</p>
        <p>helloMsg: {this.helloMsg}</p>
        <p>computed msg: {this.computedMsg}</p>
        <button onClick={this.greet}>Greet</button>
      </div>
    )
  }
}

export default VueClassComponent
</script>
