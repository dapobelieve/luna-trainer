<template>
  <div class="loader" :style="style"></div>
</template>

<script>
export default {
  name: 'SingleLoader',
  props: {
    height: {
      type: String,
      required: false,
      default: '23px'
    },
    width: {
      type: String,
      required: false,
      default: '23px'
    }
  },
  computed: {
    style () {
      return `width: ${this.width}; height: ${this.height};`
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #56CCF2;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 450ms linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
