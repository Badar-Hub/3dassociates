import { createStore } from 'vuex';

export default createStore({
  state: {
    productList: [],
  },
  getters: {
    getProducts(state) {
      return state.productList;
    },
  },
  mutations: {
    setProduct: (state, product) => {
      state.productList = product;
    },
  },
  actions: {
    setProduct: (context) => {
      context.commit('setProduct');
    },
  },
  modules: {},
});
