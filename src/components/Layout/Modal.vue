<template>
  <div class="custom-dialog">
    <q-card v-show="modelValue" class="modal q-px-md">
      <div
        :style="`max-width: ${width}; width: 100%;`"
        class="row items-center q-pb-none modal-content"
      >
        <q-card-section class="full-width">
          <div class="row full-width justify-between">
            <div class="text-h6 q-my-none">{{ title }}</div>
            <q-btn icon="close" flat round dense @click="$emit('close')" />
          </div>
        </q-card-section>
      </div>

      <div
        :style="`max-width: ${width}; width: 100%;`"
        class="row items-center q-pb-none modal-content"
      >
        <q-card-section class="full-width">
          <slot></slot>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
      default: () => '650px',
    },
    modelValue: {
      type: Boolean,
    },
  },
  emits: ['close'],
});
</script>

<style lang="scss">
.custom-dialog {
  .modal {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    z-index: 3000;

    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .q-card__section--vert {
    padding: 0;
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 0 auto; /* 15% from the top and centered */
    padding: 20px;
    max-height: 500px;
    overflow: auto;
    border: 1px solid #888;
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
