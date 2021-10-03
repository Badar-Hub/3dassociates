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
            <h6 class="q-my-sm">
              Showing all 25 Items
            </h6>
          </div>
        </div>
        <div class="products full-width">
          <div v-for="(product, index) in u" :key="index">
            <a
              :href="
                `https://shop.3dassociates.pk/product/${
                  product.permalink.split('https://3dassociates.pk/product/')[1]
                }`
              "
            >
              <CardComponent
                :height="350"
                :externalImage="true"
                class="cursor-pointer"
                :img="product.images[0].src"
                :title="product.name"
                :shop="`Rs.${product.price}`"
              />
            </a>
          </div>
        </div>
        <div>
          <h5 class="q-my-sm">Pagination</h5>
          <div class="row justify-center max-width">
            <q-btn
              class="q-mx-xs q-my-sm"
              v-for="(page, index) in 3"
              :key="index"
              size="sm"
              @click="nextPage(index)"
              :label="index + 1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <q-skeleton class="q-my-md" :height="`${$q.screen.height - 100}px`" />
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import CardComponent from '../General/Card.vue';
import { ApiService } from '../../services/ApiService';
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
    const id = ref(route.params.id);

    watch(
      () => id.value,
      () => console.log(id.value)
    );

    const getProducts = async () => {
      try {
        u.value = await ApiService.get('products');
        if (id.value) {
          u.value = u.value.filter(
            (product) => product.categories[0].name === id.value
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const nextPage = async (index) => {
      try {
        isLoading.value = true;
        if (id.value) {
          u.value = await ApiService.get('');
        } else {
          u.value = await axios.get(
            `https://shop.3dassociates.pk/wp-json/wc/store/products?page=${index +
              1}`
          );
        }
        isLoading.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    const sort = async () => {
      await getProducts();
      if (sortBy.value === 'Name: A to Z') {
        u.value.data.sort((a, b) => {
          const productA = a.name.toUpperCase();
          const productB = b.name.toUpperCase();
          if (productA < productB) {
            return -1;
          }
        });
      } else if (sortBy.value === 'Price: Low To High') {
        u.value.data.sort((a, b) => a.prices.price - b.prices.price);
      } else if (sortBy.value === 'Price: High To Low') {
        u.value.products.sort((a, b) => b.prices.price - a.prices.price);
      }
    };

    watch(
      () => sortBy.value,
      () => sort()
    );

    onMounted(async () => {
      try {
        console.log(route.params.id);
        isLoading.value = true;
        await getProducts();
        isLoading.value = false;
      } catch (error) {
        console.log(error);
      }
    });

    return {
      u,
      sortBy,
      nextPage,
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
