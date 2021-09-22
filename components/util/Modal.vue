<template>
  <div v-if="isOpen" class="tail-fixed index tail-inset-0 tail-overflow-y-auto">
    <div id="myModal" class="tail-flex tail-items-end tail-justify-center tail-min-h-screen tail-pt-4 tail-px-4 tail-pb-20 tail-text-center sm:tail-block sm:p-0">
      <transition
        enter="tail-ease-out tail-duration-300"
        enter-from="tail-opacity-0"
        enter-to="tail-opacity-100"
        leave="tail-ease-in tail-duration-200"
        leave-from="tail-opacity-100"
        leave-to="tail-opacity-0"
      >
        <div class="tail-fixed tail-inset-0 tail-bg-gray-500 tail-bg-opacity-50 tail-transition-opacity" @click="$emit('closeBackDrop', false)"></div>
      </transition>
      <span
        class="tail-hidden sm:tail-inline-block sm:tail-align-middle"
        aria-hidden="true"
      >&#8203;</span>
      <transition
        enter="tail-ease-out tail-duration-300"
        enter-from="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
        enter-to="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave="tail-ease-in tail-duration-200"
        leave-from="tail-opacity-100 tail-translate-y-0 sm:tail-scale-100"
        leave-to="tail-opacity-0 tail-translate-y-4 sm:tail-translate-y-0 sm:tail-scale-95"
      >
        <div
          :style="{ width: width }"
          class="tail-inline-block tail-mt-6 tail-align-bottom tail-bg-white tail-rounded-lg tail-text-left tail-overflow-hidden tail-shadow-xl tail-transform tail-transition-all sm:tail-align-middle tail-w-full md:tail-w-4/6 lg:tail-w-2/6"
        >
          <div class="tail-py-7 tail-px-6">
            <div class="tail-flex tail-justify-between tail-mb-6">
              <slot name="status">
              </slot>
              <div v-if="close" class="hover:tail-cursor-pointer" @click="$emit('close', false)">
                <img
                  class="tail-hidden md:tail-block"
                  src="~/assets/img/cross-small.png"
                  alt="cancel"
                >
              </div>
            </div>
            <slot name="default">
              <!-- this is the area where content will be replaced -->
              Replace me with content
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: true
    },
    closeBackDrop: {
      type: Boolean,
      default: false
    },
    // status: {
    //   type: String,
    //   default: 'draft'
    // },
    inputWidth: {
      type: Number,
      default: 40
    }
  },
  computed: {
    width () {
      return `${this.inputWidth}%`
    }
  }
}
</script>

<style lang="scss" scoped>
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.index{
  z-index: 100;
}
</style>
