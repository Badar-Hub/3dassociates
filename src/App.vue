<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import { ref, defineComponent, onMounted } from 'vue';
import HeaderComponent from './components/Layout/Header.vue';
import FooterComponent from './components/Layout/Footer.vue';

export default defineComponent({
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    const products = ref([]);

    onMounted(async () => {
      try {
        products.value = axios.get(
          'https://shop.3dassociates.pk/wp-json/wc/v3'
        );
        const data = await axios.get(
          'https://shop.3dassociates.pk/wp-json/wc/v3/products/categories',
          {
            params: {
              consumer_key: 'ck_eae55b428917649345f163ae70a490f4da5cd090',
              consumer_secret: 'cs_48280fa37373391243dbaf5faae25ac799afaa28',
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.max-width {
  max-width: 1200px;
  margin: auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
