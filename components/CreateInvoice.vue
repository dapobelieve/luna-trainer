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
          <div class="tail-border tail-rounded tail-p-4">
            <div>
              <h1>Customer</h1>
              <span class="tail-text-gray-500">A short description about this section</span>
            </div>
            <div>
              <form>
                <label>Name</label>
              <input type="text" name="name">
              </form>
              
            </div>
          </div>
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
}
.left-card {
  width: 26.25rem;
}
.right-card {
  width: 26.25rem;
  background-color: #f0f5fa;
}
</style>
