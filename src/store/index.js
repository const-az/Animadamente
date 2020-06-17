import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// FORM FUNCTIONS
function defaultToy(){
  return {
    id: null,
    data:{
      name: '',
      stock: 0,
      price: 0,
      text: '',
      img: ''
    }
  }
}

// SHOPPING CART FUNCTIONS
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
function getCartTotal(productsList) {
  let price = 0.0
  productsList.forEach(p => {
    price += p.data.price * p.qty
  })
  return price
}
function newCart() {
  return {
    list: [],
    total: 0.0,
  }
}

export default new Vuex.Store({
  state: {
    toys: [],
    loading: false,
    edit: false,
    showForm: false,
    messageModal: false,
    currentToy: defaultToy(),
    // User
    currentUser: getFromStorage('user') || undefined,
    // Cart
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
  },
  mutations: {
    SHOW_LOADING(state){
      state.loading = true
    },
    HIDE_LOADING(state){
      state.loading = false
    },
    // TOYS
    GET_TOYS(state, toys){
      state.toys = []
      toys.forEach( prod => {
        prod['qty'] = 1
        state.toys.push(prod)
      })
    },
    // EDIT
    TRUE_EDIT(state){
      state.edit = true
    },
    FALSE_EDIT(state){
      state.edit = false
    },
    // MODAL
    DISPLAY_TOY_FORM(state){
      state.showForm = true
    },
    HIDE_TOY_FORM(state){
      state.showForm = false
    },
    // RESET
    RESET_CURRENT_TOY(state){
      state.currentToy.id = null
      const empty = defaultToy();
      Object.keys(empty.data).forEach(key => {
        state.currentToy.data[key] = empty.data[key]
      });
    },
    // UPDATE DATA
    UPDATE_NAME(state, name){
      state.currentToy.data.name = name
    },
    UPDATE_STOCK(state, stock){
      state.currentToy.data.stock = stock
    },
    UPDATE_PRICE(state, price){
      state.currentToy.data.price = price
    },
    UPDATE_TEXT(state, text){
      state.currentToy.data.text = text
    },
    UPDATE_IMAGE(state, img){
      state.currentToy.data.img = img
    },
    // MESSAGE MODAL
    SHOW_MESSAGE_FORM(state){
      state.messageModal = true
    },
    HIDE_MESSAGE_FORM(state){
      state.messageModal = false
    },
    // User
    UPDATE_CURR_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },
    // Cart
    ADD_TO_CART(state, product) {
      // add def qty if not defined
      if (product.qty === undefined ) { product['qty'] = 1 }
      // increase qty if exists, else add to cart as new
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
      if (pidx >= 0) {
        state.shoppingCart.list[pidx].qty++
      } else {
        state.shoppingCart.list.push(product)
      }
      // update total price
      state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    REMOVE_FROM_CART(state, product_id) {
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
      if (pidx >= 0) {
        state.shoppingCart.list.splice(pidx, 1)
        // update total price
        state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        // update in storage
        setInStorage('cart', state.shoppingCart)
      } else {
        throw new Error("Product not found in cart")
      }
    },
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    UPDATE_SHOW_CART(state, value) {
      state.showCart = value
    },
  },
  actions: {
    // CRUD
    getToys({commit}){
      commit('SHOW_LOADING')
      axios.get('https://us-central1-animadamente-73568.cloudfunctions.net/products/products', { headers: { "Content-type": "text/plain"}})
      .then((accept) => {
        let data = accept.data
        commit('GET_TOYS', data)
        commit('HIDE_LOADING')
        commit('RESET_CURRENT_TOY')
      })
    },
    postToy({dispatch, commit, state}){
      if(state.currentToy.id!=null){
        commit('SHOW_LOADING')
        axios.put(`https://us-central1-animadamente-73568.cloudfunctions.net/products/product/${state.currentToy.id}`, state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getToys')
        })
      }else{
        commit('SHOW_LOADING')
        axios.post('https://us-central1-animadamente-73568.cloudfunctions.net/products/product', state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getToys')
        })
      }
    },
    editToy({dispatch, commit, state}, id){
      commit('SHOW_LOADING')
      axios.get(`https://us-central1-animadamente-73568.cloudfunctions.net/products/product/${id}`, { headers:{'Context-type': 'application/json'} })
      .then((response) => {
        commit('HIDE_LOADING')
        state.currentToy = response.data
        dispatch('displayToyform')
      })
    },
    deleteConfirmation({commit, state}, id, name){
      state.currentToy.id = id
      commit('UPDATE_NAME', name)
      commit('SHOW_MESSAGE_FORM')
    },
    deleteToy({commit, dispatch, state}){
      commit('HIDE_MESSAGE_FORM')
      commit('SHOW_LOADING')
       axios.delete(`https://us-central1-animadamente-73568.cloudfunctions.net/products/product/${state.currentToy.id}`, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('TRUE_EDIT')
          dispatch('getToys')
          commit('HIDE_LOADING')
          commit('SHOW_MESSAGE_FORM')
        })
    },
    closeMessage({commit}){
      commit('HIDE_MESSAGE_FORM')
      commit('FALSE_EDIT')
      commit('RESET_CURRENT_TOY')
    },
    // UPDATING DATA
    updateName({commit}, name){
      commit('UPDATE_NAME', name)
    },
    updateStock({commit}, stock){
      commit('UPDATE_STOCK', stock)
    },
    updatePrice({commit}, price){
      commit('UPDATE_PRICE', price)
    },
    updateText({commit}, text){
      commit('UPDATE_TEXT', text)
    },
    updateImage({commit}, img){
      commit('UPDATE_IMAGE', img)
    },
    // MODAL
    displayToyform({commit}){
      commit('DISPLAY_TOY_FORM')
    },
    hideToyform({commit}){
      commit('HIDE_TOY_FORM')
    },
    hideEmptyToyform({commit}){
      commit('HIDE_TOY_FORM')
      commit('RESET_CURRENT_TOY')
    },
    // User
    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    addToCart ({commit}, product) {
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    removeFromCart ({commit}, product_id) {
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    clearCart ({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    updateShowCart({commit}, val) {
      console.log('setting showCart to ', val)
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val) // !! double-negation for Boolen casting
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
  },
  getters: {
    // User
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    // Cart
    shoppingCart: state => state.shoppingCart,
    showCart: state => state.showCart,
  }
})