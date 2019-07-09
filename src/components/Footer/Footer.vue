<template>

  <footer>
    <p style="color: #fff; padding-top: 40px">  {{ footerText }} </p>
  </footer>

</template>


<script>

  export default {
    name: 'Footer',
    data () {
      return {
        footerText: 'Footer Component'
      }
    },
    methods: {
      changeHeadText(val){
        this.footerText = val
      }
    }
  }

</script>


<style lang="scss" scoped>

  footer {
    position: relative;
    width: 100%;
    bottom: 0;
    height: 100px;
    background: #333;

    p {
      text-transform: uppercase;
      font-weight: bold;
    }
  }

</style>
