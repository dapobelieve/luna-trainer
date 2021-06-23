<template>
  <div class="card">
    <div class="tail-flex tail-justify-between tail-p-5">
      <div>
        <span>Create Invoice</span>
      </div>
      <div>
        <i class="ns-cross" />
      </div>
    </div>
    <div class="tail-flex tail-justify-center tail-align-center">
      <div class="tail-grid tail-gap-8 tail-grid-cols-2">
        <div class="left-card">
          <form autocomplete="off" class="tail-grid tail-gap-6">
            <div class="tail-border tail-rounded tail-p-4">
              <div>
                <h1>Customer</h1>
                <span class="tail-text-gray-500">A short description about this section</span>
              </div>
              <div class="">
                <label for="email" class="">Name</label>
                <input type="email" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
              </div>
              <div class="">
                <label for="email" class="">Email Address</label>
                <input type="email" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
              </div>
            </div>
            <div class="tail-border tail-rounded tail-p-4">
              <div>
                <h1>Items</h1>
                <span class="tail-text-gray-500">A short description about this section</span>
              </div>
              <div class="tail-pb-1">
                <label for="item" class="">Add Item</label>
                <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
              </div>
              <div class="left-card tail-border tail-p-4 tail-flex">
                <div class="tail-flex">
                  <input type="checkbox" class="tail-p-2">
                  <span class="tail-text-gray-500">Behaviour Consuming</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="right-card">
          <div class="tail-border tail-rounded">
            <span>Preview</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  height: 100vh;
}
.left-card {
  width: 26.25rem;
}
.right-card {
  width: 26.25rem;
  background-color: #f0f5fa;
}
</style>
