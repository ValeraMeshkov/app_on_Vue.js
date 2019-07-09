<template>

  <div class="main">

    <div v-if="openedPage.wrapperBlock" class="cars">

      <div class="cars__search">

        <div class="cars__search__option">
          <p>name</p>
          <select v-model="carName" @change="changeCarName()">
            <option value="">all</option>
            <option v-for="carName in carsNames"> {{ carName }} </option>
          </select>
        </div>

        <div v-if="carName" class="cars__search__option">
          <p>model</p>
          <select v-model="carModel" >
            <option value="">{{ getCarsModelsFunc }} all</option>
            <option v-for="carModel in carsModels"> {{ carModel }} </option>
          </select>
        </div>

        <div class="cars__search__option">
          <p>body</p>
          <select v-model="carBody">
            <option value="">all</option>
            <option v-for="carBody in carsBodyes"> {{ carBody }} </option>
          </select>
        </div>

        <div class="cars__search__option">
          <p>year</p>

          <span>c</span>
          <select v-model="carYearBefore">
            <option v-for="carYearBefore in carsYearsAll"> {{ carYearBefore }} </option>
          </select>

          <span>по</span>
          <select v-model="carYearAfter">
            <option v-for="carYearAfter in carsYearsAll"> {{ carYearAfter }} </option>
          </select>
        </div>

        <div class="cars__search__option">
          <p>price $</p>

          <span>c</span>
          <vue-numeric separator="," v-model="priceStart" :min="0" :value="120"></vue-numeric>
          <span>по</span>
          <vue-numeric separator="," v-model="priceEnd" :min="1000" :max="1000000"></vue-numeric>
        </div>

        <div class="cars__search__option">
          <span style="width: 100%; color: limegreen">найдено {{ counterFindCars }}</span>
          <button @click="resetParametrs">Сбросить</button>
        </div>

        <div class="cars__search__option">
          <button @click="openAdditionalParametrs()">Дополнительные параметры</button>
        </div>

        </div>

      <div v-if="additionalParametrs" class="cars__search cars__search__extra">

        <div class="cars__search__option">
          <p>engine</p>
          <select v-model="carEngine">
            <option value="">all</option>
            <option v-for="carEngine in carsEngines"> {{ carEngine }} </option>
          </select>
        </div>

        <div class="cars__search__option">
          <p>box</p>
          <select v-model="carBox">
            <option value="">all</option>
            <option v-for="carBox in carsBox"> {{ carBox }} </option>
          </select>
        </div>

        <div class="cars__search__option">
          <p>color</p>
          <select v-model="carColor">
            <option value="">all</option>
            <option v-for="carsColor in carsColors">{{carsColor}}</option>
          </select>
        </div>

        <div class="cars__search__option">
          <p>max run/km</p>
          <vue-numeric separator="," v-model="maxRunCar" :min="1000" :max="3000000"></vue-numeric>
        </div>


        <div class="cars__search__option cars__search__option__checkbox" style="flex-direction: column" v-for="list in carsExtraOption">
          <div class="cars__search__option__checkbox__name">
            <input :id="list.vmodel" :value="list.vmodel" @click="selectAllExtraOption(list.vmodel, list)" type="checkbox">
            <label :for="list.vmodel" style="width: 100%; border: 0">{{list.name}}</label>
          </div>
          <div v-if="carExtraOption[list.vmodel + 'Open']" v-for="(option, index) in list.options">
            <input type="checkbox" :id="list.vmodel + index" :value="list.options[index]" v-model="carExtraOption[list.vmodel]">
            <label :for="list.vmodel + index">{{option}}</label>
          </div>
        </div>

      </div>

      <div class="cars__block">
        <li
          class="cars__block__car"
          v-for="car in transformObjCarsToArr"
          @click="openCarBlock({obj: car, value: 'openCarBlock'})"
        >

          <div v-if="car.images.length < 1" class="cars__block__car__body">
            <car-body-svg class="cars__block__car__body__image" :body="car.body" :color="car.color"/>
            <p class="cars__block__car__body__text" v-model="carBody"> {{ car.body }}</p>
          </div>

          <div v-else class="cars__block__car__img" :style="{ backgroundImage: 'url(' + car.images[0] + ')' } "></div>

          <div class="cars__block__car__top">
            <p class="cars__block__car__name">{{ car.name }}</p>
            <p class="cars__block__car__model">{{ car.model }}</p>
          </div>

          <div class="cars__block__car__bottom">
            <p class="cars__block__car__year">{{ car.year }}г</p>
            <p class="cars__block__car__year">{{ car.price }} $</p>
          </div>
        </li>
      </div>

      <button v-if="showCarsLength < counterFindCars"
              class="cars__show"
              @click="showCarsLength += 10"
      >
        Загрузить ещё
      </button>

    </div>

    <opened-car v-if="openedPage.openCarBlock" :checkCar="checkCar"/>

  </div>

</template>


<script>

  import VueNumeric from 'vue-numeric'
  import { mapState, mapActions, mapMutations } from 'Vuex';

  import openedCar from '../openedCar/openedCar.vue';
  import carBodySvg from '../carBodySvg/carBodySvg.vue';

  export default {
    name: 'Wrapper',
    components: {
      openedCar,
      carBodySvg,
      VueNumeric
    },
    data () {
      return {
        carName: '',
        carModel: '',
        carBody: '',
        carYearBefore: '1990',
        carYearAfter: '2020',
        priceStart: '0',
        priceEnd: '9999999',

        carColor: '',
        carEngine: '',
        carBox: '',
        maxRunCar: 1000000,

        checkCar: {},

        allCars: [],
        allCarsShow: [],
        counterFindCars: 0,
        counterFindCarsOld: 0,
        additionalParametrs: false,
        showCarsLength: 10,

        carExtraOption: {
          carSecurity: [],
          carInterior: [],
          carClimate: [],
          carComfort: [],
          carMusic: [],
          carLight: [],
          carHelp: [],
          carExterior: [],
          carSecurityOpen: false,
          carInteriorOpen: false,
          carClimateOpen: false,
          carComfortOpen: false,
          carMusicOpen: false,
          carLightOpen: false,
          carHelpOpen: false,
          carExteriorOpen: false,
        },
      }
    },
    methods : {
      selectAllExtraOption(id, list){
        this.carExtraOption[id + 'Open'] = this.carExtraOption[id + 'Open'] ? false : true;
        this.carExtraOption[list.vmodel] = document.getElementById(id).checked ? list.options : []
      },

      resetParametrs(){
        this.carName = this.carModel = this.carBody = '';

        this.openAdditionalParametrs();
        this.additionalParametrs = false;

        this.priceStart = '0';
        this.priceEnd = '1000000';

        this.carYearBefore = this.carsYearsAll[0];
        this.carYearAfter = this.carsYearsAll[this.carsYearsAll.length-1];
      },

      changeCarName() {
        this.carModel = ''
      },

      showCars(allCars, allCarsLength){
        for (let i = 0; i < allCarsLength; i++){
          let extraOptionVar = true;

          function deleteElementInArr(showCarsLength) {
            allCars.splice(i, 1);
            allCarsLength--;
            i--;
            extraOptionVar = false;
          }

            if (allCars[i].name !== this.carName && this.carName !== ''){
              deleteElementInArr(this.showCarsLength)
            } else if (allCars[i].model !== this.carModel && this.carModel !== ''){
              deleteElementInArr()
            } else if (allCars[i].body !== this.carBody && this.carBody !== ''){
              deleteElementInArr()
            } else if ( !(allCars[i].year >= this.carYearBefore && allCars[i].year <= this.carYearAfter)) {
              deleteElementInArr()
            } else if ( !(allCars[i].price >= +this.priceStart && allCars[i].price <= +this.priceEnd)) {
              deleteElementInArr()
            } else if ( !(allCars[i].run <= +this.maxRunCar)) {
              deleteElementInArr()
            } else if (allCars[i].engine !== this.carEngine && this.carEngine !== ''){
              deleteElementInArr()
            } else if (allCars[i].box !== this.carBox && this.carBox !== ''){
              deleteElementInArr()
            } else if ( (allCars[i].color !== this.carColor && this.carColor !== '')) {
              deleteElementInArr()
            }

            for (let j in this.carExtraOption) {
              if (Array.isArray(this.carExtraOption[j])){
                if (extraOptionVar) {
                  for (let k = 0; k < this.carExtraOption[j].length; k++){
                    if (!(allCars[i][j.slice(3).toLowerCase()].indexOf(this.carExtraOption[j][k]) > -1)) {
                      deleteElementInArr();
                      break;
                    }
                  }
                }
              }
            }
          }


        this.counterFindCars = allCars.length;
        this.counterFindCarsOld !== this.counterFindCars ? this.showCarsLength = 10 : '';
        this.counterFindCarsOld = this.counterFindCars;
        return allCars.slice(0, this.showCarsLength);
      },

      openAdditionalParametrs(){
        this.additionalParametrs = !this.additionalParametrs;
        if(this.additionalParametrs === false){

          this.carColor = '';
          this.carEngine = '';
          this.carBox = '';
          this.maxRunCar = 1000000;


          for (let i in this.carExtraOption) {
            if (Array.isArray(this.carExtraOption[i])) {
              this.carExtraOption[i] = []
              document.getElementById(i).checked = false
            } else {
              this.carExtraOption[i] = false
            }
          }
        }
      },

      openCarBlock({obj, value}){
        this.checkCar = obj;
        this.changeOpenBlocks(value);
      },

      ...mapMutations({
        changeOpenBlocks: 'changeOpenBlocks',
      }),

      ...mapActions({
        getCars : 'getCars',
        getCarsNames : 'getCarsNames',
        getCarsModels : 'getCarsModels',

        getCarsBodyes: 'getCarsBodyes',
        getCarsEngines: 'getCarsEngines',
        getCarsBox: 'getCarsBox',
        getCarsColors: 'getCarsColors',
        getCarsYearsAll: 'getCarsYearsAll',
        getCarsExtraOption: 'getCarsExtraOption'
      }),
    },

    mounted(){
      this.getCars({http: this.$http});
      this.getCarsNames({http: this.$http});

      this.carsBodyes.length < 1 ? this.getCarsBodyes({http : this.$http}): '';
      this.carsEngines.length < 1 ? this.getCarsEngines({http : this.$http}) : '';
      this.carsBox.length < 1 ? this.getCarsBox({http : this.$http}) : '';
      this.carsColors.length < 1 ? this.getCarsColors({http : this.$http}) : '';
      this.carsYearsAll.length < 1 ? this.getCarsYearsAll({http : this.$http}) : '';
      this.carsExtraOption.length < 1 ? this.getCarsExtraOption({http : this.$http}) : '';
    },

    computed: {
      transformObjCarsToArr(){
        this.allCarsShow = [];

        if (this.allCars.length < 1){
         for (let carsName in this.cars){
           for (let carsModel in this.cars[carsName]) {
             for (let carsYears in this.cars[carsName][carsModel]){
               if (this.cars[carsName][carsModel][carsYears].length > 0){
                 for (let i = 0; i < this.cars[carsName][carsModel][carsYears].length; i++){
                   this.allCars.push(this.cars[carsName][carsModel][carsYears][i])
                 }
               }
             }
           }
         }
        }

        this.allCarsShow = JSON.parse(JSON.stringify(this.allCars))
        return this.showCars(this.allCarsShow, this.allCarsShow.length)
      },
      getCarsModelsFunc(){
        this.carModel = '';
        this.getCarsModels({carName: this.carName, http: this.$http});
      },
      ...mapState([
        'cars',
        'carsNames',
        'carsModels',
        'carsYearsAll',
        'carsEngines',
        'carsBodyes',
        'carsColors',
        'carsBox',
        'carsExtraOption',
        'openedPage',
      ])
    },
  }

</script>


<style lang="scss" scoped>
  .main{
    min-height: 100vh;
    position: relative;
    margin-top: 110px;
    width: 100%;
  }

  .cars {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    &__search {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      align-items: flex-start;

      &__option {
        display: flex;
        height: auto;
        margin: 5px;
        border: 1px solid grey;
        border-radius: 5px;
        width: 320px;
        overflow: hidden;
        box-sizing: border-box;

        p {
          background-color: aliceblue;
          min-width: 100px;
          width: 100px;
          border-right: 1px solid silver;
          margin: 0;
          height: 100%;
        }
        span {
          display: block;
          min-width: 20px;
          width: 20px;
          height: 100%;
          padding: 2px 0 0;
          margin: 0 5px;
        }

        select, input, button, vue-numeric {
          border-radius: 0;
          width: 100%;
          text-align-last:center;
          background-color: whitesmoke;
          height: 100%;
          margin: 0;
          padding: 0;
          border: 0;
        }
        button {
          background-color: lightblue;
          border: 2px solid powderblue;
          box-sizing: border-box;
          border-radius: 4px;
          height: 100%;
        }

        &__checkbox {
          height: auto;

          div {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
          }
          input {
            position: absolute;
            margin: 0 10px;
            width: auto;
            height: auto;
            z-index: 4;
          }
          input:after {
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
          }

          label {
            width: 100%;
            border-top: 1px solid silver;
            text-align: left;
            font-size: 15px;
            margin: 0;
            padding: 5px;
            padding-left: 35px;
          }
          &__name {
            label {
              background-color: aliceblue;
              text-align: center;
            }
          }
        }
      }

      &__option__check {
        display: flex;
        align-items: center;
        button {
          width: 120px;
        }
      }

    }

    &__block {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      &__car {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 250px;
        height: 180px;
        margin: 10px;
        border-radius: 10px;
        cursor: pointer;
        overflow: hidden;
        box-shadow: 0 0 300px 15px rgba(0,0,0, 0.35) inset;


        &__body {
           display: flex;
           flex-direction: column;
           position: absolute;
           justify-content: center;
           align-items: center;
           width:100%;
           height: 100%;

          &__image {
            width: 200px;
            height: 120px;
            background-repeat: no-repeat;
            background-size: 100px auto;
            margin: 0 0 -25px;
            /*opacity: 0.03;*/
            transform: scale(1.5);
          }

           &__text {
             margin: -20px 0 0;
             padding: 0;
             opacity: 0.05;
           }
         }

        &__img {
          position: absolute;
          z-index: -1;
          height: 100%;
          width: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          /*opacity: 0.03;*/
          background-position: 50% 50%;
        }

        &__top, &__bottom {
          display: flex;
          justify-content: space-between;
          padding: 10px;

          p {
            color: white;
            margin: 0;
          }
        }
      }
    }

    &__show {
      width: 200px;
      margin: 10px 0 20px;
      cursor: pointer;
      padding: 5px 10px;
      background-color: rebeccapurple;
      border-radius: 5px;
      color: #fff;
    }
  }

</style>
