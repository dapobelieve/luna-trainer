<template>
  <div v-if="isOpen" class="fixed index inset-0 overflow-y-auto">
    <div id="myModal" class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <transition
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" @click="$emit('closeBackDrop', false)"></div>
      </transition>
      <span
        class="hidden sm:inline-block sm:align-middle"
        aria-hidden="true"
      >&#8203;</span>
      <transition
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          :style="{ width: width }"
          class="inline-block mt-6 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-full md:w-4/6 lg:w-2/6"
        >
          <div class="py-7 px-6">
            <div class="flex justify-between mb-6">
              <slot name="status">
              </slot>
              <div v-if="close" class="hover:cursor-pointer" @click="$emit('close', false)">
                <img
                  class="hidden md:block"
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
  name: 'GwModal',
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
