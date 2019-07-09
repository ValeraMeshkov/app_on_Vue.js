import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state(){
    return {

      firstAdvertising: {},
      secondAdvertising: {},

      openedPage: {
        wrapperBlock: true,
        openCarBlock: false
      },

      carsYearsAll: [],

      carsExtraOption: [],

      cars : {},
      carsNames: [],
      carsModels: [],
      carsYears: [],

      carsBodyes: [],
      carsEngines: [],
      carsBox: [],

      carsColors: []
    }
  },
  mutations: {
    setCars(state, value){
      state.cars = value
    },
    setCarsNames(state, value){
      state.carsNames = value
    },
    setCarsModels(state, value){
      state.carsModels = value
    },
    setCarsYears(state, value){
      state.carsYears = value
    },
    changeOpenBlocks(state, value){
      Object.keys(state.openedPage).map((el) => {
        state.openedPage[el] = el === value
      })
    },
    setAdvertising(state, value){
      state.firstAdvertising = value.first;
      state.secondAdvertising = value.second
    },
    setBodyes(state, value) {
      state.carsBodyes = value;
    },
    setEngines(state, value) {
      state.carsEngines = value;
    },
    setBox(state, value) {
      state.carsBox = value;
    },
    setColors(state, value) {
      state.carsColors = value;
    },
    setYearsAll(state, value) {
      state.carsYearsAll = value;
    },
    setCarsExtraOption(state, value) {
      state.carsExtraOption = value;
    },

  },
  actions: {
    postCars({ commit }, {cars, http}) {
      http.post('http://localhost:3000/cars', cars)
    },
    getCars({ commit }, {http}) {
      http.get('http://localhost:3000/cars')
        .then(response => response.json())
        .then(cars => commit('setCars', cars))
    },
    getCarsNames({ commit }, {http}) {
      http.get('http://localhost:3000/cars')
        .then(response => response.json())
        .then(cars => {commit('setCarsNames', Object.keys(cars))})
    },
    getCarsModels({ commit }, {carName, http}) {
      http.get('http://localhost:3000/cars')
        .then(response => response.json())
        .then(cars => {commit('setCarsModels', Object.keys(cars[carName]))})
    },
    getCarsYears({ commit }, {carName, carModel, http}) {
      http.get('http://localhost:3000/cars')
        .then(response => response.json())
        .then(cars => {commit('setCarsYears', Object.keys(cars[carName][carModel]))})
    },
    getAdvertisingServer({commit}, {http}) {
      http.get('http://localhost:3000/advertising')
        .then(response => response.json())
        .then(advertising => commit('setAdvertising', {
          first : advertising[Math.floor(Math.random() * advertising.length)],
          second : advertising[Math.floor(Math.random() * advertising.length)]
        }))
    },
    getCarsBodyes({commit}, {http}) {
       http.get('http://localhost:3000/carsBodyes')
        .then(response => response.json())
        .then(bodyes => commit('setBodyes', bodyes))
    },
    getCarsEngines({commit}, {http}) {
      http.get('http://localhost:3000/carsEngines')
        .then(response => response.json())
        .then(engines => commit('setEngines', engines))
    },
    getCarsBox({commit}, {http}) {
      http.get('http://localhost:3000/carsBox')
        .then(response => response.json())
        .then(box => commit('setBox', box))
    },
    getCarsColors({commit}, {http}) {
      http.get('http://localhost:3000/carsColors')
        .then(response => response.json())
        .then(colors => commit('setColors', colors))
    },
    getCarsYearsAll({commit}, {http}) {
      http.get('http://localhost:3000/carsYearsAll')
        .then(response => response.json())
        .then(yearsAll => commit('setYearsAll', yearsAll))
    },
    getCarsExtraOption({commit}, {http}) {
      http.get('http://localhost:3000/carsExtraOption')
        .then(response => response.json())
        .then(extraOption => commit('setCarsExtraOption', extraOption))
    }

  }
})
