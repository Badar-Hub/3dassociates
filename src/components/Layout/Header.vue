<template>
  <div>
    <div class="top-bar q-py-xs">
      <div class="row max-width">
        <div class="row col-xs-12 col-sm-6">
          <q-icon class="q-my-auto q-px-sm" name="phone" size="sm" />
          <p class="q-my-auto q-mr-sm">03111222295</p>
          <p class="q-mx-sm q-my-auto">|</p>
          <q-icon class="q-my-auto q-px-sm" name="mail" size="sm" />
          <p class="q-my-auto">3dassociates@gmail.com</p>
        </div>
        <div class="col-xs-12 col-sm-6 text-right q-my-auto">
          <img class="country-flag" src="@/assets/conutry-flag.png" />
        </div>
      </div>
    </div>
    <div class="row max-width header q-my-md">
      <div class="col-xs-6 col-sm-3 text-left">
        <router-link to="/">
          <img class="logo" src="@/assets/logo.jpg" />
        </router-link>
      </div>
      <div :class="!$q.screen.gt.xs ? 'hidden' : ''" class="col-sm-7 q-my-auto">
        <q-input
          @keypress.enter="submit"
          v-model="searched"
          label="Search..."
          rounded
          outlined
          class="full-width"
        >
          <template v-slot:append>
            <div class="search-icon">
              <q-icon
                @click="submit"
                class="q-pr-sm cursor-pointer"
                name="search"
              />
            </div>
          </template>
        </q-input>
      </div>
      <div class="col-xs-6 col-sm-2 q-my-auto text-right">
        <q-icon class="cursor-pointer" size="xl" name="shopping_bag" />
      </div>
    </div>
    <div class="nav">
      <div class="row justify-center max-width">
        <router-link to="/deals">
          <h6 class="q-my-sm">Deals</h6>
        </router-link>
        <h6 class="q-my-auto">|</h6>
        <router-link to="/about">
          <h6 class="q-my-sm">About Us</h6>
        </router-link>
        <h6 class="q-my-auto">|</h6>
        <router-link to="/shop/products">
          <h6 class="q-my-sm">Products</h6>
        </router-link>
        <h6 class="q-my-auto">|</h6>
        <router-link to="/school-supplies">
          <h6 class="q-my-sm">School Supplies</h6>
        </router-link>
        <h6 class="q-my-auto">|</h6>
        <router-link to="/office-supplies">
          <h6 class="q-my-sm">Office Supplies</h6>
        </router-link>
        <h6 class="q-my-auto">|</h6>
        <router-link to="/packing">
          <h6 class="q-my-sm">Packing</h6>
        </router-link>
      </div>
    </div>
    <ModalComonent
      @close="resetModal"
      v-model="isSearchModal"
      :title="`You Have Searched For ${searched}`"
      width="100%"
    >
      <div v-if="filteredProducts.length > 0" class="product-modal">
        <div
          class="prod q-pa-sm q-mx-auto"
          v-for="(product, index) in filteredProducts"
          :key="index"
        >
          <router-link to="/">
            <q-card>
              <div class="row full-width">
                <div class="col-xs-12">
                  <img
                    class="prod-image"
                    :src="require(`@/${product.image}`)"
                  />
                </div>
                <hr class="fit" />
                <div class="col-xs-12">
                  <h6 class="q-my-xs">{{ product.name }}</h6>
                </div>
                <div class="col-xs-12">
                  <p class="text-body1 q-my-xs">Rs.{{ product.price }}</p>
                </div>
              </div>
            </q-card>
          </router-link>
        </div>
      </div>
      <div v-else>
        <h6>0 results for {{ searched }}</h6>
      </div>
    </ModalComonent>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import ModalComonent from '../Layout/Modal.vue';
import ProductList from '../../assets/js/products';
export default {
  components: {
    ModalComonent,
  },
  setup() {
    const searched = ref('');
    const isSearchModal = ref(false);
    const filteredProducts = ref([]);
    const products = ref(ProductList.products);

    const resetModal = () => {
      isSearchModal.value = false;
      searched.value = '';
    };

    const searchedProducts = () => {
      if (searched.value === '') {
        isSearchModal.value = false;
      } else {
        isSearchModal.value = true;
        filteredProducts.value = products.value.filter((product) =>
          product.name.toUpperCase().includes(searched.value.toUpperCase())
        );
      }
    };

    watch(
      () => searched.value.length > 1,
      () => searchedProducts()
    );

    const submit = () => {
      searchedProducts();
    };

    onMounted(() => {
      console.log(products.value);
    });
    return {
      submit,
      searched,
      resetModal,
      isSearchModal,
      searchedProducts,
      filteredProducts,
    };
  },
};
</script>

<style lang="scss">
.top-bar {
  background-color: #414141;
  color: white;
  .country-flag {
    max-width: 40px;
    max-height: 40px;
    height: auto;
    border-radius: 6%;
  }
}
.header {
  .logo {
    max-width: 150px;
    width: 100%;
  }
}
.nav {
  background-color: red;
  color: white;
  a {
    text-decoration: none;
    &:hover {
      background-color: rgba(112, 177, 230, 0.418);
    }
  }
  h6 {
    margin: 5px;
    color: white;
    text-decoration: none;
    padding-right: 5px;
  }
}
.product-modal {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  .prod {
    max-width: 250px;
    width: 100%;
    a {
      text-decoration: none;
      color: black;
    }
  }
  .prod-image {
    max-width: 230px;
    width: 100%;
  }
}
</style>
