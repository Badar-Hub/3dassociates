<template>
  <div class="row max-width">
    <q-card class="q-ma-md q-pa-sm new-product">
      <q-form @submit="submit">
        <div class="row">
          <div class="col-xs-12 col-sm-6 q-pa-sm">
            <q-input label="Product Name" v-model="newProduct.name" />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-sm">
            <q-select
              label="Select Type"
              :options="['simple']"
              v-model="newProduct.type"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-sm">
            <q-input label="Price" v-model="newProduct.regular_price" />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-sm">
            <q-select
              label="Select Category"
              :options="['18', '16']"
              v-model="selectedCategory"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-sm">
            <q-file
              v-model="file"
              label="Pick one file"
              filled
              style="max-width: 300px"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-btn
              label="Upload"
              @click="uploadImage"
              color="primary"
              class="full-width"
            />
          </div>
          <div class="col-xs-12 q-pa-sm">
            <q-editor
              v-model="newProduct.description"
              :definitions="{
                bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
              }"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-sm">
            <q-btn
              type="submit"
              class="full-width"
              label="Submit"
              color="primary"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-sm">
            <q-btn class="full-width" label="Reset Form" color="red" />
          </div>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { ApiService } from '../services/ApiService';

export default {
  setup() {
    const file = ref(null);
    const $q = useQuasar();
    const newProduct = ref({
      name: '',
      type: '',
      regular_price: '',
      description: '',
      categories: [],
      images: [],
    });

    const selectedCategory = ref([]);

    const resetForm = () => {
      newProduct.value.name = '';
      newProduct.value.type = ''; newProduct.value.regular_price = '';
      newProduct.value.description = [];
      newProduct.value.categories = [];
      newProduct.value.images = [];
      selectedCategory.value = '';
    };

    const submit = async () => {
      newProduct.value.categories = [];
      newProduct.value.images = [];
      newProduct.value.categories.push({ id: selectedCategory.value });
      newProduct.value.images.push({
        src: `${file.value.name}`,
      });
      console.log(newProduct.value);
      try {
        const data = await ApiService.post('products', newProduct.value);
        console.log(data);
        resetForm();
        $q.notify({
          message: 'Successfully Added New Product',
        });
      } catch (error) {
        console.log(error);
        $q.notify({
          message: 'An Error Occoured',
        });
      }
    };

    return {
      file,
      submit,
      newProduct,
      selectedCategory,
    };
  },
};
</script>

<style lang="scss">
.new-product {
  border: 1px solid black;
}
</style>
