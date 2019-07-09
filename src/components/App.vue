<template>

  <div id="app">

    <Header/>
    <router-view></router-view>

    <Footer/>

  </div>

</template>

<script>
  import Header from './Header/Header.vue';
  import Wrapper from './Wrapper/Wrapper.vue';
  import Footer from './Footer/Footer.vue';

  export default {
    name: 'App',
    components: {
      Header,
      Wrapper,
      Footer
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    }
  }

</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
