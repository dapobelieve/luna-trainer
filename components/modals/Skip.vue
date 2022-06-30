<template>
  <span id="skip" onclick="document.getElementsByClassName('introjs-overlay')[0].click()" class="underline cursor-pointer fixed right-3 top-2 opacity-0 text-white" style="z-index: 100000000">
    Skip
    <i class="fi fi-rr-arrow-small-right"></i>
  </span>
</template>

<script>
export default ({
  name: 'Skip'
})
</script>
