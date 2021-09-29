<template>
  <div class="home">
    <div class="slider">
      <q-carousel
        class="slider-q"
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          :name="1"
          :img-src="
            require($q.screen.gt.xs
              ? '../assets/Slider/01.jpg'
              : '../assets/Slider/01-min.jpg')
          "
        />
        <q-carousel-slide
          :name="2"
          :img-src="
            require($q.screen.gt.xs
              ? '../assets/Slider/02.jpg'
              : '../assets/Slider/02-min.jpg')
          "
        />
        <q-carousel-slide
          :name="3"
          :img-src="
            require($q.screen.gt.xs
              ? '../assets/Slider/03.jpg'
              : '../assets/Slider/03-min.jpg')
          "
        />
        <q-carousel-slide
          :name="4"
          :img-src="
            require($q.screen.gt.xs
              ? '../assets/Slider/04.jpg'
              : '../assets/Slider/04-min.jpg')
          "
        />
      </q-carousel>
    </div>
    <div class="row justify-center max-width categories q-my-md">
      <div class="col-xs-12 text-center full-width">
        <h4 class="q-my-sm">TOP CATEGORIES</h4>
      </div>
      <div
        :class="!$q.screen.gt.xs ? 'row justify-center' : ''"
        class="col-xs-12 col-sm-4"
      >
        <CardComponent
          title="OFFICE SUPPLIES"
          img="assets/back-to-school/03.png"
        />
      </div>
      <div
        :class="!$q.screen.gt.xs ? 'row justify-center' : ''"
        class="row justify-center col-xs-12 col-sm-4 "
      >
        <CardComponent
          title="SCHOOL SUPPLIES"
          img="assets/back-to-school/02.png"
        />
      </div>
      <div
        :class="!$q.screen.gt.xs ? 'row justify-center' : ''"
        class="row justify-center col-xs-12 col-sm-4"
      >
        <CardComponent
          title="TSC STATIONERY"
          img="assets/back-to-school/01.png"
        />
      </div>
    </div>
    <div class="row max-width justify-center best-sellers">
      <div class="col-xs-12 text-center">
        <h5 class="q-my-sm">BEST SELLERS</h5>
      </div>
      <div class="col-xs-12 product-grid">
        <CardComponent
          class="q-mx-auto"
          img="assets/images/WI00440.jpg"
          shop="Rs. 85"
          title="Signature Ball Pen Blu Blue (Dabi)"
        />
        <CardComponent
          class="q-mx-auto"
          img="assets/images/sablon/FA01073.jpg"
          shop="Rs. 375"
          title="Sablon Paint Brush # 0 Red"
        />
        <CardComponent
          class="q-mx-auto"
          img="assets/images/WI00439.jpg"
          shop="Rs. 85"
          title="Signature Ball Pen Blu Black (Dabi)"
        />
        <CardComponent
          class="q-mx-auto"
          img="assets/images/WI00442.jpg"
          shop="Rs. 85"
          title="Signature Ball Pen Blu Red (Dabi)"
        />
      </div>
      <div class="col-xs-12 text-center q-my-md">
        <q-btn class="font-weight-bolder" label="Shop More" color="primary" />
      </div>
    </div>
    <div class="row max-width brands">
      <BrandSlider :brands="brands" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CardComponent from '../components/General/Card.vue';
import BrandSlider from '../components/General/BrandSlider.vue';
export default {
  name: 'Home',
  components: {
    CardComponent,
    BrandSlider,
  },
  setup() {
    const brands = ref([
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
      brands,
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>
<style lang="scss">
.home {
  .slider-q {
    height: 550px;
    @media (max-width: 599px) {
      height: 650px;
    }
  }
  .best-sellers {
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
}
</style>
