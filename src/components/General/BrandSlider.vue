<template>
  <div class="row full-width brand-slider">
    <div class="col-sm-1">
      <p>Prev</p>
    </div>
    <div
      class="col-xs-6 col-sm-3"
      v-for="(brand, i) in brandsArrModified"
      :key="i"
    >
      <img :src="require(`@/assets/brands/${brand}`)" />
    </div>
    <div class="col-sm-1">
      <p @click="nextSlides()">Next</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  props: {
    brands: {
      type: Array,
    },
  },
  setup(props) {
    const brandsArr = ref(props.brands);
    const brandsArrModified = ref();

    const nextSlides = () => {
      const totalSlides = brandsArr.value.length;
      console.log(totalSlides);
      brandsArrModified.value = brandsArr.value.splice(3, 7);
    };

    const prevSlides = () => {
      brandsArrModified.value = brandsArr.value.splice(3, 7);
    };

    onMounted(() => {
      brandsArrModified.value = brandsArr.value.splice(0, 3);
    });
    return {
      nextSlides,
      brandsArr,
      brandsArrModified,
      prevSlides,
    };
  },
});
</script>

<style lang="scss">
.brand-slider {
}
</style>
