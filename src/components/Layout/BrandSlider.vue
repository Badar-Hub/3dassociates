<template>
  <div class="slider">
    <div class="brands-images">
      <img
        class="q-ma-md"
        v-for="(brand, index) in brands"
        :key="index"
        :src="require(`@/assets/brands/${brand}`)"
      />
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue';

export default defineComponent({
  props: {
    brandList: {
      type: Array,
    },
  },
  setup(props) {
    const brands = ref(props.brandList);

    onMounted(() => {
      console.log(brands.value);
    });

    return {
      brands,
    };
  },
});
</script>

<style lang="scss">
.brand-slider {
  .brands-images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
