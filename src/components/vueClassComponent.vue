<template>
  <div>
    <label for="hello">标题：</label>
    <input id="hello" v-model="msg">
    <p>prop: {{propMessage}}</p>
    <p>msg: {{msg}}</p>
    <p>helloMsg: {{helloMsg}}</p>
    <p>computed msg: {{computedMsg}}</p>
    <button @click="greet">Greet</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
      propMessage: String
    }
  })
  export default class VueClassComponent extends Vue {
    // initial data
    msg = 123

    // use prop values for initial data
    helloMsg = 'Hello, ' + this.propMessage

    // lifecycle hook
    mounted () {
      this.greet()
    }

    // computed
    get computedMsg () {
      return 'computed ' + this.msg
    }

    // method
    greet () {
      alert('greeting: ' + this.msg)
    }
  }
</script>
