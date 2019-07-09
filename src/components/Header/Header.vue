<template>

  <header class="head">
    <div class="head__max">
      <router-link tag="a" to="/" exact active-class="activeButton">Главная</router-link>
      <router-link tag="a" to="/create" exact active-class="activeButton">Добавить</router-link>
    </div>

    <div class="head__min">
      <Burger class="head__min__burger"/>
      <div class="head__min__link">
        <a @click="openWrapperBlock('wrapperBlock')">Auto.by</a>
      </div>
    </div>
  </header>

</template>

<script>

  import {mapState, mapMutations} from 'Vuex';
  import Burger from '../Burger/Burger';

  export default {
    name: 'Header',
    components: {
      Burger
    },
    data () {
      return {
        routerMain: true,
        headerText: 'auto.by',
        showHeaderX: 0,
      }
    },
    methods: {
      ...mapMutations({
        changeOpenBlocks: 'changeOpenBlocks'
      }),
    },
    computed: {
      ...mapState([
        'openedPage'
      ]),
    },
    mounted() {
      window.onscroll = function() {

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let header = document.querySelector('.head').style;
        if (this.showHeaderX > scrollTop || scrollTop < 100) {
          header.transition = 'all 1s';
          header.height = '150px';
          header.opacity = '1';
          header.top = '-100px';
        } else {
          header.transition = 'all 2s';
          header.height = '0';
          header.opacity = '0';
          header.top = '-200px';
        };
        this.showHeaderX = scrollTop;
      }
    }
  }

</script>


<style lang="scss" scoped>

  .head {
    position: fixed;
    top: -100px;
    left: 0;
    height: 150px;
    padding-top: 100px;
    width: 100%;
    background: #333;
    display: flex;
    align-items: center;
    z-index: 10;

    &__max {
      display: flex;
      width: 100%;
      justify-content: space-around;

      a {
        color: #fff;
        padding: 5px 15px;
        font-weight: 600;
        cursor: pointer;
      }

      a:hover {
        color: white;
        text-decoration: none;
        transform: scale(1.3);
      }
    }

    &__min {
      display: none;
      width: 100%;
      height: 100%;

      &__link {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        a {
          color: #fff;
          font-weight: 600;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        a:hover {
          text-decoration: none;
          transform: scale(1.3);
        }
      }
    }

    @media (max-width: 400px){
      &__max {
        display: none;
      }
      &__min {
        display: flex;
      }
    }

    .activeButton {
      color: greenyellow;
      position: relative;
      text-decoration: none;
      &::after {
        position: absolute;
        bottom: 3px;
        left: 0;
        content: '';
        width: 100%;
        height: 2px;
        background-color: greenyellow;
      }
      &:hover {
        color: greenyellow;
      }
    }
  }

</style>
