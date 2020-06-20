import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Firebase from 'firebase'

Vue.use(Vuex)

// Empty doll function to reset currentDoll
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

// Base URL for Firebase cloudfunctions
const baseURL = 'https://us-central1-animadamente-73568.cloudfunctions.net/products'

// SHOPPING CART FUNCTIONS:
// Saves items on storage (like users and shopping cart items)
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
// Gets items from storage (like users and shopping cart items)
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
// Calculates shopping cart total
function getCartTotal(productsList) {
  let price = 0.0
  productsList.forEach(p => {
    price += p.data.price * p.qty
  })
  return price
}
// Sets shopping cart empty
function newCart() {
  return {
    list: [],
    total: 0.0,
  }
}

// STORE
export default new Vuex.Store({
  state: {
    // All dolls
    dolls: [],
    temporaryImageFile: null, 
    // State toggles
    loading: false,
    edit: false,
    messageModal: false,
    // Saves temporarily new doll data or when editing one
    currentDoll: defaultDoll(),
    // Saves temporarily user info when logged-in
    currentUser: getFromStorage('user') || undefined,
    // Stocks information about shopping cart list items
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
    // Errors
    inputError: ''
  },
  mutations: {
    // Toggles loading state
    SHOW_LOADING(state){ state.loading = true },
    HIDE_LOADING(state){ state.loading = false },
    // Toggles edit state when editing or deleting a doll
    TRUE_EDIT(state){ state.edit = true },
    FALSE_EDIT(state){ state.edit = false },
    // Toggles message modal states when deleting a doll
    SHOW_MESSAGE_FORM(state){ state.messageModal = true },
    HIDE_MESSAGE_FORM(state){ state.messageModal = false },
    // Sets dolls into an state array and adds them a quantity default number
    GET_DOLLS(state, dolls){
      state.dolls = []
      dolls.forEach( prod => {
        prod['qty'] = 1
        state.dolls.push(prod)
      })
    },
    // Sets current doll info into state
    SET_CURRENT_DOLL(state, doll){ state.currentDoll = doll },
    // Resets current doll info into an empty object
    RESET_CURRENT_DOLL(state){
      state.currentDoll.id = null
      const empty = defaultDoll();
      Object.keys(empty.data).forEach(key => {
        state.currentDoll.data[key] = empty.data[key]
      });
    },
    // Updates doll info from inputs to state
    UPDATE_NAME(state, name){ state.currentDoll.data.name = name },
    UPDATE_STOCK(state, stock){ state.currentDoll.data.stock = stock },
    UPDATE_PRICE(state, price){ state.currentDoll.data.price = price },
    UPDATE_TEXT(state, text){ state.currentDoll.data.text = text },
    UPDATE_IMAGE(state, img){ state.currentDoll.data.img = img },
    UPDATE_SKU(state, sku){ state.currentDoll.data.sku = sku },
    // Updates temporary image file from input
    UPDATE_TEMPORARY_FILE(state, file){ state.temporaryImageFile = file },
    // Updates user info into state and storage
    UPDATE_CURR_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },
    // Adds item to cart when selected 
    ADD_TO_CART(state, product) {
      // Adds default quantity if not defined
      if (product.qty === undefined ) { product['qty'] = 1 }
      // Increases quantity if product already exists on cart, else add to cart as new
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
      if (pidx >= 0) {
        state.shoppingCart.list[pidx].qty++
      } else {
        state.shoppingCart.list.push(product)
      }
      // Updates total price
      state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
      // Updates cart on storage
      setInStorage('cart', state.shoppingCart)
    },
    // Removes selected item from shopping cart
    REMOVE_FROM_CART(state, product_id) {
      // Finds on cart doll by id
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
      if (pidx >= 0) {
        // Deletes selected item 
        state.shoppingCart.list.splice(pidx, 1)
        // Updates total price
        state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        // Updates in storage
        setInStorage('cart', state.shoppingCart)
      } else {
        throw new Error("Product not found in cart")
      }
    },
    // Resets shopping cart to empty
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      // Updates in storage
      setInStorage('cart', state.shoppingCart)
    },
    // Toggles shopping cart display
    UPDATE_SHOW_CART(state, value) {
      state.showCart = value
    },
  },
  actions: {
    // CRUD: interacting with Firebase
    // Gets all dolls from Firebase
    getDolls({commit}){
      // Displays loading spinner while getting items
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/products`, { headers: { "Content-type": "text/plain"}})
      .then((accept) => {
        // Saves info into state and hide spinner
        let data = accept.data
        commit('GET_DOLLS', data)
        commit('HIDE_LOADING')
        commit('RESET_CURRENT_DOLL')
      })
    },
    // Uploads image to Firebase Storage
    async uploadImage({state, dispatch, commit}){
      try {
        commit('SHOW_LOADING')
        // Creates file on Firebase Storage (image name equals sku product code)
        const refImage = Firebase.storage().ref().child('ProductImages').child(state.currentDoll.data.sku)
        // Uploads file
        await refImage.put(state.temporaryImageFile)
        // Gets image url
        const downloadUrl = await refImage.getDownloadURL()
        // Sets image url in currentDoll
        await dispatch('updateImage', downloadUrl)
        // Posts or updates a doll into Firebase
        dispatch('postDoll')
      } catch (error) {
        console.log(error)
      }
    },
    // Post a doll into Firebase
    postDoll({dispatch, commit, state}){
      // If editing
      if(state.currentDoll.id!=null){
        axios.put(`${baseURL}/product/${state.currentDoll.id}`, state.currentDoll.data)
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getDolls')
        })
      }else{
        // If it's a new doll
        axios.post(`${baseURL}/product`, state.currentDoll.data )
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getDolls')
        })
      }

    },
    // Gets info about selected doll for editing
    editDoll({commit}, id){
      // When has to get it from Firebase
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/product/${id}`, { headers:{'Context-type': 'application/json'} })
      .then((response) => {
        commit('HIDE_LOADING')
        commit('SET_CURRENT_DOLL', response.data)
      })
    },
    // Ask for confirmation when deleting option selected
    deleteConfirmation({commit, state}, id, name){
      state.currentDoll.id = id
      commit('UPDATE_NAME', name)
      commit('SHOW_MESSAGE_FORM')
    },
    // Deletes doll information from Firebase
    deleteDoll({commit, dispatch, state}){
      commit('HIDE_MESSAGE_FORM')
      commit('SHOW_LOADING')
       axios.delete(`${baseURL}/product/${state.currentDoll.id}`, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('TRUE_EDIT')
          dispatch('getDolls')
          commit('HIDE_LOADING')
          commit('SHOW_MESSAGE_FORM')
        })
    },
    // Closes informative message when doll is deleted
    closeMessage({commit}){
      commit('HIDE_MESSAGE_FORM')
      commit('FALSE_EDIT')
      commit('RESET_CURRENT_DOLL')
    },
    // Updates data from inputs to state
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
    // Updates temporary image file from input
    updateTemporaryImageFile({commit}, file){ commit('UPDATE_TEMPORARY_FILE', file) },
    // Resets form inputs when not saved
    emptyDollform({commit}){ 
      commit('RESET_CURRENT_DOLL')
      commit('UPDATE_TEMPORARY_FILE', null)
    },
    // Updates user from state
    updateUser({commit}, user){
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    // Adds selected items to cart
    addToCart({commit}, product){
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Removes selected items from cart
    removeFromCart({commit}, product_id){
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Resets cart into empty
    clearCart({commit}){
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Toggles and updates shopping cart modal state
    updateShowCart({commit}, val) {
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val) // !! double-negation for Boolen casting
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
  },
  getters: {
    // Gets log-in state from storage
    isLoggedIn: state => !!state.currentUser,
    // Gets current logged-in user from storage 
    currentUser: state => state.currentUser,
    // Gets shopping cart items from storage
    shoppingCart: state => state.shoppingCart,
    // Gets shopping cart display state from storage
    showCart: state => state.showCart,
    // Searches doll by id on storage when editing
    searchDollById: (state) => (id) => {
      return state.dolls.find(doll => doll.id === id)
    },
    // Searches doll by id on storage when editing
    searchDollBySKU: (state) => (sku) => {
      return state.dolls.find(doll => doll.data.sku === sku)
    }
  }
})