<template>
  <div v-if="!isLoading" class="shop">
    <div class="row justify-between max-width">
      <div :class="!$q.screen.gt.xs ? 'hidden' : ''" class="col-sm-3 q-my-md">
        <q-card>
          <div class="row full-width justify-center q-ma-sm">
            <h5 class="q-my-sm">Categories</h5>
          </div>
          <hr />
          <div class="row full-width">
            <router-link to="/shop/deals">
              <h6 class="q-my-sm">Deals</h6>
            </router-link>
            <hr class="full-width" />
          </div>
          <div class="row full-width">
            <router-link to="/shop/back-to-school">
              <h6 class="q-my-sm">Back To School</h6>
            </router-link>
            <hr class="full-width" />
          </div>
          <div class="row full-width">
            <router-link to="/shop/office-supplies">
              <h6 class="q-my-sm">Office Supplies</h6>
            </router-link>
            <hr class="full-width" />
          </div>
          <div class="row full-width">
            <router-link to="/shop/packing">
              <h6 class="q-my-sm">Packing</h6>
            </router-link>
          </div>
        </q-card>
      </div>
      <div
        :class="$q.screen.gt.xs ? ' q-pl-xl' : ''"
        class="col-xs-12 col-sm-9"
      >
        <div class="row full-width">
          <h4 class="q-my-lg">{{ headingTitle }}</h4>
        </div>
        <div class="row justify-between full-width filter-section q-pa-sm">
          <div
            :class="!$q.screen.gt.xs ? 'hidden' : ''"
            class="col-sm-6 q-my-auto"
          >
            <q-select
              outlined
              rounded
              v-model="sortBy"
              label="Sort By"
              :options="[
                'Name: A to Z',
                'Price: Low To High',
                'Price: High To Low',
              ]"
            />
          </div>
          <div class="col-sm-6 q-my-auto text-right">
            <h6 class="q-my-sm">Showing all {{ u.products.length }} Items</h6>
          </div>
        </div>
        <div class="products full-width">
          <div v-for="(product, index) in u.products" :key="index">
            <CardComponent
              class="cursor-pointer"
              :img="product.image"
              :title="product.name"
              :shop="`Rs.${product.price}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Loading ...</h1>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CardComponent from '../General/Card.vue';
import products from '../../assets/js/products';
export default {
  components: {
    CardComponent,
  },
  setup() {
    const route = useRoute();
    const u = ref({});
    const headingTitle = route.meta.heading;
    const sortBy = ref('');
    const isLoading = ref(true);

    const getProducts = async () => {
      try {
        u.value = await products;
      } catch (error) {
        console.log(error);
      }
    };

    const sort = async () => {
      await getProducts();
      if (sortBy.value === 'Name: A to Z') {
        u.value.products.sort((a, b) => {
          const productA = a.name.toUpperCase();
          const productB = b.name.toUpperCase();
          if (productA < productB) {
            console.log(productA, productB);
            return -1;
          }
        });
      } else if (sortBy.value === 'Price: Low To High') {
        u.value.products.sort((a, b) => a.price - b.price);
      } else if (sortBy.value === 'Price: High To Low') {
        u.value.products.sort((a, b) => b.price - a.price);
      }
    };

    watch(
      () => sortBy.value,
      () => (u.value = products)
    );

    watch(
      () => sortBy.value,
      () => sort()
    );

    onMounted(async () => {
      try {
        isLoading.value = true;
        await getProducts();
        isLoading.value = false;
        console.log(u.value);
      } catch (error) {
        console.log(error);
      }
    });

    return {
      u,
      sortBy,
      isLoading,
      headingTitle,
    };
  },
};
</script>

<style lang="scss">
.shop {
  a {
    text-decoration: none;
    color: black;
    margin-left: 30px;
  }
  .filter-section {
    background-color: #f5f5f5;
    border-radius: 3%;
  }
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
