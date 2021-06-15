<template>
  <div v-if="isOpen" class="tail-fixed tail-z-10 tail-inset-0 tail-overflow-y-auto">
    <div id="myModal" class="tail-flex tail-items-end tail-justify-center tail-min-h-screen tail-pt-4 tail-px-4 tail-pb-20 tail-text-center sm:tail-block sm:p-0">
      <transition
        enter="tail-ease-out tail-duration-300"
        enter-from="tail-opacity-0"
        enter-to="tail-opacity-100"
        leave="tail-ease-in tail-duration-200"
        leave-from="tail-opacity-100"
        leave-to="tail-opacity-0"
      >
        <div class="tail-fixed tail-inset-0 tail-bg-gray-500 tail-bg-opacity-75 tail-transition-opacity" @click="$emit('close', false)"></div>
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
          class="tail-inline-block tail-align-bottom tail-bg-white tail-rounded-lg tail-text-left tail-overflow-hidden tail-shadow-xl tail-transform tail-transition-all sm:tail-align-middle tail-w-4/6 lg:tail-w-3/6"
        >
          <slot name="default"></slot>
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
      default: false
    }
  },
  methods: {
    // Get the modal
    // var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    // btn.onclick = function() {
    //   modal.style.display = "block";
    // }
    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //   modal.style.display = "none";
    // }
    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // }
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
</style>
