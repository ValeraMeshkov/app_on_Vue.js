<template>
  <div class="car">
    <h3>Введите необходимые параметры для добавления новой машины</h3>

    <div class="car__option">

      <div class="car__option__block true false" :style="{border: carName ? '1px solid green' : '2px solid red'}">
        <p>name</p>
        <select v-model="carName">
          <option v-for="carName in carsNames"> {{ carName }} </option>
        </select>
      </div>

      <div v-if="carName" class="car__option__block" :style="{border: carModel ? '1px solid green' : '2px solid red'}">
        <p> {{ getCarsModelsFunc }}model</p>
        <select v-model="carModel">
          <option v-for="carModel in carsModels"> {{ carModel }} </option>
        </select>
      </div>

      <div v-if="carModel" class="car__option__block" :style="{border: carYear ? '1px solid green' : '2px solid red'}">
        <p> {{ getCarsYearsFunc }}year</p>
        <select v-model="carYear">
          <option v-for="carYear in carsYears"> {{ carYear }} </option>
        </select>
      </div>

      <div class="car__option__block" :style="{border: carBody ? '1px solid green' : '2px solid red'}">
        <p>body</p>
        <select v-model="carBody">
          <option v-for="carBody in carsBodyes"> {{ carBody}} </option>
        </select>
      </div>

      <div v-if="carBody" class="car__option__block" :style="{border: carRun ? '1px solid green' : '2px solid red'}">
        <p>run/km</p>
        <vue-numeric separator="," v-model="carRun" :max="1000000" placeholder="add run"></vue-numeric>
      </div>

      <div v-if="carRun" class="car__option__block" :style="{border: carPrice ? '1px solid green' : '2px solid red'}">
        <p>price/usd</p>
        <vue-numeric currency="$" separator="," v-model="carPrice" :max="1000000" placeholder="add price in usd"></vue-numeric>
      </div>

      <div v-if="carPrice" class="car__option__block" :style="{border: carEngine ? '1px solid green' : '2px solid red'}">
        <p>engine</p>
        <select v-model="carEngine">
          <option v-for="carEngine in carsEngines"> {{ carEngine }} </option>
        </select>
      </div>

      <div v-if="carEngine" class="car__option__block" :style="{border: carBox ? '1px solid green' : '2px solid red'}">
        <p>box</p>
        <select v-model="carBox">
          <option v-for="carBox in carsBox"> {{ carBox }} </option>
        </select>
      </div>

      <div v-if="carBox" class="car__option__block" :style="{border: carVin ? '1px solid green' : '1px solid orange'}">
        <p>vin</p>
        <input type="text" v-model="carVin" placeholder="if you want add vin cod">
      </div>

      <div v-if="carBox" class="car__option__block car__option__block__color" :style="{background: carColor, border: carColor ? '' : '2px solid red'}">
        <p>color</p>
        <select v-model="carColor"
                :style="{
                  background: carColor,
                  color: carColor === 'white' || carColor === 'cyan' || carColor === 'gold' || carColor === 'yellow' || carColor === 'lime' || !carColor ? 'black' : 'white' }">
          <option v-for="carColor in carsColors">{{ carColor }}</option>
        </select>
      </div>

      <div class="car__option__line"></div>
      <div
        v-if="carColor"
        class="car__option__block car__option__block__checkbox"
        style="flex-direction: column"
        v-for="list in carsExtraOption"
        :style="{border: carExtraOption[list.vmodel].length > 0 ? '1px solid green' : '1px solid orange'}"
      >
        <div class="car__option__block__checkbox__name">
          <input :id="list.vmodel" :value="list.vmodel" @click="selectAll(list.vmodel, list)" type="checkbox">
          <label :for="list.vmodel" style="width: 100%; border: 0">{{list.name}}</label>
        </div>
        <div v-for="(option, index) in list.options">
          <input type="checkbox" :id="list.vmodel + index" :value="list.options[index]" v-model="carExtraOption[list.vmodel]">
          <label :for="list.vmodel + index">{{option}}</label>
        </div>
          <span>{{carExtraOption[list]}}</span>
      </div>
      <div class="car__option__line"></div>

      <map-belarus-svg v-if="carColor" @carRegion="getCarRegion"/>

    </div>

    <div class="car__image">

      <div class="car__image__choose" v-for="(emptyNull, index) in inputImageCount">

          <input v-if="!carImages[index] && inputImageCount < 11"
                 type="file"
                 id="files"
                 name="files[]"
                 @change="addCarImages($event)"
                 class="car__image__choose__input"
                 multiple
          >

        <div class="car__image__choose__cars" v-if="carImages[index]">
          <img class="car__image__choose__cars__car" :src="carImages[index]" :alt="''">

          <font-awesome-icon class="car__image__choose__cars__ikon" icon="times" @click="deleteCarImage(index)"/>
        </div>

      </div>
      <div class="car__option__line"></div>
      <p v-if="inputImageCount > 11 || inputImageCountFlag === false">Max photo files 10</p>
    </div>
    <div style="width: 100%;"></div>
    <router-link to="/" v-if="carSubregion">
      <button class="car__add" @click="addCar">add car</button>
    </router-link>

  </div>

</template>

<script>

  import VueNumeric from 'vue-numeric';
  import mapBelarusSvg from '../mapBelarusSvg/mapBelarusSvg.vue';
  import { mapState, mapActions, mapMutations } from 'Vuex';

  export default {
    name: 'NewCar',
    components: {
      VueNumeric,
      mapBelarusSvg
    },
    data(){
      return {
        item: {
          name: 'files[]',
          quantity: 0,
          price: 0,
          image:''
        },

        emptyNull: 0,
        inputImageCount: 1,
        inputImageCountFlag: true,

        carName: '',
        carModel: '',
        carBody: '',
        carYear: '',
        carRun: '',
        carDescription: '',
        carPrice: '',
        carEngine: '',
        carBox: '',
        carVin: '',
        carColor: '',
        carImages: [],
        carRegion: '',
        carSubregion: '',

        carExtraOption: {
          carSecurity: [],
          carInterior: [],
          carClimate: [],
          carComfort: [],
          carMusic: [],
          carLight: [],
          carHelp: [],
          carExterior: []
        },
      }
    },
    methods: {
      addCarImages(e){

        var files = e.target.files;
        for (var i = 0; i < files.length; i++) {
          var filereader = new FileReader();
          filereader.readAsDataURL(files[i]);
          filereader.onload = (e) => {
            if (this.inputImageCount < 11) {
              console.log(this.inputImageCount);
              this.inputImageCount += 1;
              this.inputImageCountFlag = true;
              this.item.image = e.target.result;
              this.carImages.push(this.item.image);
              return this.item.image
            } else {
              this.inputImageCountFlag = false
            }
          }
        }
      },

      deleteCarImage(index){
        this.carImages.splice(index, 1);
        this.inputImageCount -=1 ;
      },

      addCar(){
        this.cars[this.carName][this.carModel][this.carYear].push({
          "name": this.carName,
          "model": this.carModel,
          "year": this.carYear,
          "body": this.carBody,
          "email": "",
          "telephone": "",
          "description": this.carDescription,
          "run": this.carRun,
          "color": this.carColor,
          "vin": this.carVin,
          "price": this.carPrice,
          "engine": this.carEngine,
          "box": this.carBox,
          "region": this.carRegion,
          "subregion": this.carSubregion,
          "images": this.carImages,

          "security": this.carExtraOption.carSecurity,
          "interior": this.carExtraOption.carInterior,
          "climate": this.carExtraOption.carClimate,
          "comfort": this.carExtraOption.carComfort,
          "music": this.carExtraOption.carMusic,
          "light": this.carExtraOption.carLight,
          "help": this.carExtraOption.carHelp,
          "exterior": this.carExtraOption.carExterior
        });

        this.postCars({
          cars: this.cars,
          http: this.$http
        });

        this.changeOpenBlocks('wrapperBlock')
      },
      selectAll(id, list){
        this.carExtraOption[list.vmodel] = document.getElementById(id).checked ? list.options : [];
      },
      getCarRegion({region, subregion}){
        this.carRegion = region;
        this.carSubregion = subregion;
      },
      ...mapActions({
        getCarsModels : 'getCarsModels',
        getCarsYears : 'getCarsYears',
        postCars: 'postCars',

        getCarsBodyes: 'getCarsBodyes',
        getCarsEngines: 'getCarsEngines',
        getCarsBox: 'getCarsBox',
        getCarsColors: 'getCarsColors',
        getCarsExtraOption: 'getCarsExtraOption'
      }),

      ...mapMutations({
        changeOpenBlocks: 'changeOpenBlocks'
      }),
    },
    created() {
      this.carsBodyes.length < 1 ? this.getCarsBodyes({http : this.$http}): '';
      this.carsEngines.length < 1 ? this.getCarsEngines({http : this.$http}) : '';
      this.carsBox.length < 1 ? this.getCarsBox({http : this.$http}) : '';
      this.carsColors.length < 1 ? this.getCarsColors({http : this.$http}) : '';
      this.carsExtraOption.length < 1 ? this.getCarsExtraOption({http : this.$http}) : '';
    },
    computed: {
      getCarsModelsFunc(){
        this.carModel = '';
        this.getCarsModels({carName: this.carName, http: this.$http});
      },
      getCarsYearsFunc(){
        this.carYear = '';
        this.getCarsYears({carName: this.carName, carModel: this.carModel, http: this.$http});
      },

      ...mapState([
        'cars',
        'carsNames',
        'carsModels',
        'carsYears',

        'carsColors',
        'carsBox',
        'carsEngines',
        'carsBodyes',
        'carsExtraOption',
      ])
    },
  }
</script>


<style lang="scss" scoped>

  .car {
    margin-top: 100px;
    min-height: 80vh;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;

    &__option {
      width: 80%;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 10px;

      &__block {
        height: 40px;
        width: 350px;
        display: flex;
        justify-content: space-between;
        margin: 5px;
        border-radius: 5px;
        border: 1px solid grey;
        overflow: hidden;

        &__true {
          border: 2px solid green;
        }
        &__false {
          border: 2px solid red;
        }

        p {
          width: 120px;
          background-color: aliceblue;
          margin: 0;
          padding: 5px;
          border-right: 1px solid grey;
          z-index: 2;
        }

        select, input {
          border: 0;
          width: 100%;
          background-color: white;
          text-align: center;
          text-align-last:center
        }
        &option__color {
          border-radius: 10px;
          width: 500px;

        }
      }

      &__block__color {
        select {
        }
      }

      &__line {
        width: 100%;
      }
      &__block__checkbox {
        width: 350px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: min-content;
        div {
          position: relative;
          width: 350px;
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

    &__image {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      &__choose {
        display: flex;
        flex-wrap: wrap;

        &__input {
          border: 1px solid orange;
          border-radius: 10px;
          padding: 10px;
          margin: 10px;
          width: 300px;
          height: 200px;
          position: relative;
          &::after {
            content: 'Добавить фото';
            position: absolute;
            border-radius: 10px;
            top: 0;
            left: 0;
            background-color: white;
            width: 100%;
            height: 100%;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }

        &__cars {
          margin: 10px;
          border-radius: 10px;
          position: relative;
          border: 1px solid green;
          &__car {
            height: 200px;
            width: 300px;
          }
          &__ikon {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            color: rebeccapurple;
          }
        }
      }
    }

    &__add {
      min-width: 300px;
      width: 300px;
      border-radius: 5px;
      padding: 5px;
      background-color: limegreen;
      color: #fff;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 22px;
      border: 1px solid limegreen;
      box-shadow: 0 0 25px rgba(0,0,0,0.2);
    }
  }


</style>

