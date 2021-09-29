<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <img class="card-image" :src="require(`@/${img}`)" />

      <q-card-section>
        <div class="text-h6 font-weight-bold q-mt-sm q-mb-xs">{{ title }}</div>
        <div class="text-body1 cursor-pointer text-red-5">
          {{ shop }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    img: {
      type: String,
    },
    title: {
      type: String,
    },
    shop: {
      type: String,
      default: () => 'Shop Now',
    },
  },
  setup() {
    return {
      expanded: ref(false),
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 330px;
  overflow: hidden;
  .card-image {
    max-width: 330px;
    width: 100%;
    border-radius: 1%;
    &:hover {
      transition: all 0.7s ease;
      transform: scale3d(1.1, 1.1, 1);
      overflow: hidden;
    }
  }
}
</style>
