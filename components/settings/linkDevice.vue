<template>
  <div class="mx-4 mt-5">
    <div class="flex justify-between mb-5">
      <h3 class="text-lg font-medium text-gray-700">
        Link to a Device
      </h3>
      <i role="button" class="fi-rr-cross text-blue-500" @click="$emit('close')"></i>
    </div>
    <p class="text-sm font-normal text-gray-500 mb-20">
      Scan the code from your mobile app to login to your account.
    </p>
    <img
      class="mx-auto"
      :src="imgSrc"
      alt="qr code"
    />
  </div>
</template>

<script>
export default {
  name: 'LinkDevice',
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
