<template>

  <div class="main">

    <div class="main__back" @click="openWrapperBlock({value: 'wrapperBlock'})">
      <font-awesome-icon class="main__back__ikon" icon="arrow-circle-left"/>
    </div>

    <div class="main__left">

      <div class="main__left__car" style="opacity: 1;">
        <div v-if="checkCar.images.length > 0" class="main__left__car__images">

          <div class="main__left__car__images__first">
            <img :src="checkCar.images[imageNumber]">
          </div>

          <div class="main__left__car__images__all" id="allImg">
            <div class="main__left__car__images__all__inner" id="allImgInner">

              <img
                v-for="img, index in checkCar.images"
                :src="img"
                @click="imageNumber = index"
              >
            </div>
          </div>
        </div>

        <div v-if="checkCar.images.length === 0" class="main__left__car__images">
          <div class="main__left__car__images__svg">
            <car-body-svg :body="checkCar.body" :color="checkCar.color"/>
          </div>
        </div>
      </div>

      <div class="main__left__description">
        <div class="main__left__description__blocks main__left__description__blocks__top">
          <p>{{checkCar.name}}</p>
          <p>{{checkCar.price}}$</p>
        </div>

        <div v-if="checkCar.description" class="main__left__description__blocks main__left__description__blocks__description">
          <p id="descriptionHeight">описание : {{checkCar.description}}</p>
          <button v-if="descriptionFullButton" @click="descriptionFullOpen('click')">{{descriptionFull ? 'Показать полностью' : 'Скрыть'}}</button>
        </div>

        <div class="main__left__description__blocks">
          <p>название : {{checkCar.name}}</p>
          <p>модель : {{checkCar.model}}</p>
          <p>год : {{checkCar.year}}</p>
          <p>пробег : {{checkCar.run}}</p>
        </div>


        <div class="main__left__description__blocks">
          <p>кузов : {{checkCar.body}}</p>
          <p>цвет : {{checkCar.color}}</p>
          <p>топливо : {{checkCar.engine}}</p>
          <p>коробка : {{checkCar.box}}</p>
        </div>


        <div class="main__left__description__blocks">
          <p>email : {{checkCar.email || 'не указан'}}</p>
          <p>телефон : {{checkCar.telephone}}</p>
          <p>vin : {{checkCar.vin || 'не указан'}}</p>
        </div>

        <div class="main__left__description__blocks">
          <p>область : {{checkCar.region}}</p>
          <p>регион : {{checkCar.subregion}}</p>
        </div>
      </div>

      <div class="main__left__options">

        <h4 class="main__left__options__description">Дополнительные параметры</h4>
        <div class="main__left__options__block">
          <ul v-if="checkCar[carExtraOption.shortName].length" v-for="carExtraOption in carsExtraOption">
            <p>{{carExtraOption.name}}</p>

            <li v-for="option in checkCar[carExtraOption.shortName]">
              {{option}}
            </li>
          </ul>
        </div>

      </div>

    </div>

    <div class="main__right">

      <div class="main__right__advertising">
        <a :title="firstAdvertising.name" class="main__right__advertising__block main__right__advertising__first">
          <p>{{firstAdvertising.name}}</p>
          <img :src="firstAdvertising.url" :alt="firstAdvertising.name">
        </a>
        <a :title="secondAdvertising.name" class="main__right__advertising__block main__right__advertising__second">
          <p>{{secondAdvertising.name}}</p>
          <img :src="secondAdvertising.url" :alt="secondAdvertising.name">
        </a>

      </div>

    </div>
  </div>

</template>

<script>

  import carBodySvg from '../carBodySvg/carBodySvg.vue';
  import { mapState, mapActions, mapMutations } from 'Vuex';

  export default {
    name: 'openCar',
    props: ['checkCar'],
    components: {
      carBodySvg
    },
    data () {
      return {
        imageNumber: 0,
        descriptionFull: true,
        descriptionFullButton: false,
      }
    },
    methods: {
      ...mapActions({
        getAdvertisingServer: 'getAdvertisingServer'
      }),
      descriptionFullOpen(click){
        let p = document.getElementById('descriptionHeight');
        if (click === 'click') {
          if (this.descriptionFull) {
            p.style.webkitLineClamp = 'inherit';
            this.descriptionFull = false
          } else {
            p.style.webkitLineClamp = '7';
            this.descriptionFull = true
          }
        }
        if ( p && click === 'load') {
          if (p.offsetHeight < 250) {
            return false
          } else {
            p.style.webkitLineClamp = '7';
            return true
          }
        }
      },
      handleResize(){
        let div = document.getElementById('allImg');
        let divInner = document.getElementById('allImgInner').offsetWidth;
        div.style.justifyContent = divInner > div.offsetWidth ? 'flex-start' : 'center';
      },
      openWrapperBlock({value}){
        this.changeOpenBlocks(value);
      },
      ...mapMutations({
        changeOpenBlocks: 'changeOpenBlocks',
      }),
    },
    mounted() {
      this.descriptionFullButton = this.descriptionFullOpen('load');
      if (this.checkCar.images.length > 0){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }

      this.getAdvertisingServer({http : this.$http})
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },

    computed: {
      ...mapState([
        'carsExtraOption',
        'openedPage',
        'firstAdvertising',
        'secondAdvertising'
      ]),
    }
  }

</script>


<style lang="scss" scoped>

  .main {
    z-index: 20;
    position: relative;
    background-color: #fff;
    padding-top: 250px;
    margin-top: -310px;
    left: 0;
    display: flex;
    justify-content: space-around;

    &__back {
      position: fixed;
      width: 50px;
      height: 50px;
      top: 5px;
      left: 5px;
      z-index: 10;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      &__ikon {
        cursor: pointer;
        opacity: 0.4;
        width: 80%;
        height: 80%;
        color: blueviolet;

        &:hover {
          transform: scale(1.2);
          color: #65028b;
          opacity: 1;
        }
      }
    }

    &__left {
      position: relative;
      width: 60vw;
      height: auto;
      &__car {
        position: relative;
        min-width: 350px;
        &__images {
          display: flex;
          flex-direction: column;
          /*opacity: 0.01;*/

          &__first {
            min-height: 200px;
            height: 35vw;

            img {
              height: 100%;
              width: auto;
              border-radius: 10px;
            }
          }
          &__svg {
            height: 35vw;
            max-height: 200px;
            width: 100%;
            opacity: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            div {
              transform: scale(2);
            }
          }

          &__all {
            display: flex;
            justify-content: center;
            height: 8vw;
            min-height: 60px;
            overflow-x: scroll;
            padding: 5px 0;
            margin: 0 2vw 0 1vw;

            &__inner {
              display: flex;
              justify-content: flex-start;
              height: 100%;

              img {
                cursor: pointer;
                padding: 0 1vw;
                height: 100%;
              }
            }
          }
        }
      }

      &__description {
        position: relative;
        display: flex;
        width: 100%;
        min-width: 350px;
        flex-wrap: wrap;
        justify-content: space-around;

        p {
          margin: 5px;
        }

        &__blocks {
          margin: 10px 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          text-align: left;
          width: auto;

          &__top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            margin: 0 20px;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 30px;
          }

          &__description {
            width: 100%;
            padding: 5px;
            margin-bottom: 20px;
            align-items: center;

            p {
              margin: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: inherit;
              -webkit-box-orient: vertical;
            }

            button {
              display: flex;
              justify-content: center;
              border-radius: 5px;
              width: 200px;
            }
          }
        }
      }

      &__options {
        position: relative;
        width: 100%;
        min-width: 350px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;

        &__description {
          margin: 20px;
        }

        &__block {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        ul {
          float: left;
          width: 280px;
          margin: 10px;
          padding: 10px;
          border-radius: 5px;

          p {
            font-weight: 600;
          }

          li {
            text-align: left;
            margin-left: 25px;
            list-style: disc;
            display: list-item;
          }
        }
      }
    }

    &__right {
      position: relative;
      top: 0;
      width: 30vw;
      max-width: 350px;
      height: auto;
      opacity: 1;
      padding: 10px 10px 0;

      &__advertising {
        position: sticky;
        top: 0;
        bottom: 0;
        width: 100%;
        &__block {
          display: block;
          border: 1px solid black;
          border-radius: 5px;
          box-sizing: border-box;
          width: 100%;
          height: auto;
          position: relative;
          text-align: center;
          cursor: pointer;
          overflow: hidden;

          p {
            color: black;
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            padding: 10px;
            margin: 0;
            z-index: 2;
          }

          img {
            background-size: contain;
            width: 100%;
          }
        }

        &__second {
          margin-top: 10px;
        }
      }
    }
  }

  @media (max-width: 400px) {
    .main {
      &__back {
        &__ikon {
          opacity: 1;
        }
      }
    }
  }
  @media (max-width: 900px) {
    .main {
      display: flex;
      justify-content: center;
      &__left {
        width: 90vw;
      }
      &__right {
        display: none;
      }
    }
  }


</style>
