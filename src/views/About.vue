<template>
  <div class="about max-width">
    <h6 class="q-my-sm">
      We are proud distributors of famous stationary companies which includes:
    </h6>
    <div class="about-list">
      <img
        :class="$q.screen.gt.xs ? 'q-mx-auto  q-ma-md' : 'q-mx-auto q-my-md'"
        v-for="(brand, index) in about"
        :key="index"
        :src="require(`@/assets/brands/${brand}`)"
        :alt="brand"
      />
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const about = ref([
      'canson.png',
      'cretacolor.png',
      'daler-rowney.jpg',
      'faber-castell.jpg',
      'maries.jpg',
      'mont-marte.jpg',
      'mungyo.png',
      'sakura.png',
      'william-mitchell.png',
    ]);

    return {
      about,
    };
  },
});
</script>

<style lang="scss">
.about {
  .about-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>
