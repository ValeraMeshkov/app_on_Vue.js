<template>
  <div class="burger">

    <div v-if="!burgerIsOpen" class="burger__ikon" @mouseover="burgerIsOpen = true">
      <font-awesome-icon class="burger__ikon__svg" icon="th"/>
    </div>
    <div v-else class="burger__open" @mouseleave="burgerIsOpen = false">
      <a @click="openWrapperBlock('wrapperBlock')">Главная</a>
      <a @click="openAddNewCarBlock('addNewCarBlock')">Добавить авто</a>
      <a href="">Новости</a>
    </div>

  </div>

</template>


<script>

  import {mapState, mapMutations} from 'Vuex';

  export default {
    name: 'Burger',
    data () {
      return {
        burgerIsOpen: false
      }
    },
    methods: {
      openWrapperBlock(value){
        this.changeOpenBlocks(value)
      },
      openAddNewCarBlock(value){
        this.changeOpenBlocks(value)
      },
      ...mapMutations({
        changeOpenBlocks: 'changeOpenBlocks'
      })
    },
    computed: {
      ...mapState([
        'openedPage'
      ])
    }
  }

</script>


<style lang="scss" scoped>
  .burger {
    display: flex;
    justify-content: center;

    &__ikon {
      width: 50px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      z-index: 3;

      &__svg:hover {
        cursor: pointer;
        transform: scale(1.2);
      }
    }

    &__open {
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: left;
      top: 0;
      left: 0;
      background-color: white;
      border: 1px solid silver;
      z-index: 10;
      height: 135px;

      a {
        white-space: nowrap;
        display: inline-block;
        cursor: pointer;
        padding: 10px 20px;
        width: 100%;
        border-bottom: 1px solid silver;
        color: grey;

        &:hover {
          color: black;
          text-decoration: none;
        }
      }
      a:last-child {
        border-bottom: 0;
      }
    }
  }

</style>
