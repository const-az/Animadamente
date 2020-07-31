import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Firebase from 'firebase'

Vue.use(Vuex)

function defaultDoll(){
  return {
    id: null,
    data:{
      sku: '',
      name: '',
      stock: null,
      price: null,
      text: '',
      img: ''
    }
  }
}

const baseURL = 'https://us-central1-animadamente-73568.cloudfunctions.net/products'

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
    dolls: [],
    temporaryImageFile: null, 
    loading: false,
    edit: false,
    messageModal: false,
    currentDoll: defaultDoll(),
    deletingDoll: { id: null, name: ""},
    currentUser: getFromStorage('user') || undefined,
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
    inputError: '',
    search: ''
  },
  mutations: {
    SHOW_LOADING(state){ state.loading = true },
    HIDE_LOADING(state){ state.loading = false },
    TRUE_EDIT(state){ state.edit = true },
    FALSE_EDIT(state){ state.edit = false },
    SHOW_MESSAGE_FORM(state){ state.messageModal = true },
    HIDE_MESSAGE_FORM(state){ state.messageModal = false },
    GET_DOLLS(state, dolls){
      state.dolls = []
      dolls.forEach( prod => {
        prod['qty'] = 1
        state.dolls.push(prod)
      })
    },
    SET_CURRENT_DOLL(state, doll){ state.currentDoll = doll },
    RESET_CURRENT_DOLL(state){
      state.currentDoll.id = null
      const empty = defaultDoll();
      Object.keys(empty.data).forEach(key => {
        state.currentDoll.data[key] = empty.data[key]
      });
    },
    RESET_DELETING_DOLL(state){
      state.deletingDoll.id = null
      state.deletingDoll.name = ""
    }, 
    UPDATE_NAME(state, name){ state.currentDoll.data.name = name },
    UPDATE_STOCK(state, stock){ state.currentDoll.data.stock = stock },
    UPDATE_PRICE(state, price){ state.currentDoll.data.price = price },
    UPDATE_TEXT(state, text){ state.currentDoll.data.text = text },
    UPDATE_IMAGE(state, img){ state.currentDoll.data.img = img },
    UPDATE_SKU(state, sku){ state.currentDoll.data.sku = sku },
    UPDATE_SEARCH(state, search){ state.search = search },
    UPDATE_TEMPORARY_FILE(state, file){ state.temporaryImageFile = file },
    UPDATE_CURR_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },
    ADD_TO_CART(state, product) {
      if (product.qty === undefined ) { product['qty'] = 1 }
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
      if (pidx >= 0) {
        state.shoppingCart.list[pidx].qty++
      } else {
        state.shoppingCart.list.push(product)
      }
      state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
      setInStorage('cart', state.shoppingCart)
    },
    REMOVE_FROM_CART(state, product_id) {
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
      if (pidx >= 0) {
        state.shoppingCart.list.splice(pidx, 1)
        state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        setInStorage('cart', state.shoppingCart)
      } else {
        throw new Error("Product not found in cart")
      }
    },
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      setInStorage('cart', state.shoppingCart)
    },
    UPDATE_SHOW_CART(state, value) {
      state.showCart = value
    },
  },
  actions: {
    getDolls({commit}){
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/products`, { headers: { "Content-type": "text/plain"}})
      .then((accept) => {
        let data = accept.data
        commit('GET_DOLLS', data)
        commit('HIDE_LOADING')
        commit('RESET_CURRENT_DOLL')
      })
    },
    async uploadImage({state, dispatch, commit}){
      try {
        commit('SHOW_LOADING')
        const refImage = Firebase.storage().ref().child('ProductImages').child(state.currentDoll.data.sku)
        await refImage.put(state.temporaryImageFile)
        const downloadUrl = await refImage.getDownloadURL()
        await dispatch('updateImage', downloadUrl)
        dispatch('postDoll')
      } catch (error) {
        console.log(error)
      }
    },
    postDoll({dispatch, commit, state}){
      if(state.currentDoll.id!=null){
        axios.put(`${baseURL}/product/${state.currentDoll.id}`, state.currentDoll.data)
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getDolls')
        })
      }else{
        axios.post(`${baseURL}/product`, state.currentDoll.data )
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getDolls')
        })
      }

    },
    scrollToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'})
    },
    editDoll({commit, dispatch}, id){
      dispatch('scrollToTop')
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/product/${id}`, { headers:{'Context-type': 'application/json'} })
      .then((response) => {
        commit('HIDE_LOADING')
        commit('SET_CURRENT_DOLL', response.data)
      })
    },
    deleteConfirmation({commit, state}, doll){
      state.deletingDoll.id = doll.id
      state.deletingDoll.name = doll.data.name
      commit('SHOW_MESSAGE_FORM')
    },
    deleteDoll({commit, dispatch, state}){
      commit('HIDE_MESSAGE_FORM')
      commit('SHOW_LOADING')
       axios.delete(`${baseURL}/product/${state.deletingDoll.id}`, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('TRUE_EDIT')
          dispatch('getDolls')
          commit('HIDE_LOADING')
          commit('SHOW_MESSAGE_FORM')
          commit('RESET_DELETING_DOLL')
        })
    },
    closeMessage({commit}){
      commit('HIDE_MESSAGE_FORM')
      commit('FALSE_EDIT')
      commit('RESET_DELETING_DOLL')
    },
    updateName({commit}, name){ commit('UPDATE_NAME', name) },
    updateStock({commit}, stock){ commit('UPDATE_STOCK', stock) },
    updatePrice({commit}, price){ commit('UPDATE_PRICE', price) },
    updateText({commit}, text){ commit('UPDATE_TEXT', text) },
    updateImage({commit}, img){ commit('UPDATE_IMAGE', img) },
    updateSKU({commit, getters, state}, newsku){
      let targetSKU = getters.searchDollBySKU(newsku)
      if(targetSKU){
        state.inputError = '* SKU no disponible.'
      }else{
        commit('UPDATE_SKU', newsku)
        state.inputError = ''
      } 
    },
    updateSearch({commit}, search){ commit('UPDATE_SEARCH', search) },
    updateTemporaryImageFile({commit}, file){ commit('UPDATE_TEMPORARY_FILE', file) },
    emptyDollform({commit}){ 
      commit('RESET_CURRENT_DOLL')
      commit('UPDATE_TEMPORARY_FILE', null)
    },
    updateUser({commit}, user){
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    addToCart({commit}, product){
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    removeFromCart({commit}, product_id){
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    clearCart({commit}){
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    updateShowCart({commit}, val) {
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    shoppingCart: state => state.shoppingCart,
    showCart: state => state.showCart,
    searchDollById: (state) => (id) => {
      return state.dolls.find(doll => doll.id === id)
    },
    searchDollBySKU: (state) => (sku) => {
      return state.dolls.find(doll => doll.data.sku === sku)
    }
  }
})