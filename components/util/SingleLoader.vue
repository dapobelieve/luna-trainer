<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'SingleLoader'
//   props: {
//     height: {
//       type: Number,
//       default: 20
//     },
//     width: {
//       type: Number,
//       default: 20
//     }
//   }
}
</script>

<style lang="scss" scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #56CCF2;
  width: 23px;
  height: 23px;
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
