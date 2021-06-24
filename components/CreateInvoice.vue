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
              <div class="tail-border tail-p-4 tail-rounded">
                <div class="tail-flex tail-justify-between tail-p-2">
                  <div>
                    <input type="checkbox" class="tail-p-2">
                    <span class="tail-text-sm">Behaviour Consuming</span>
                  </div>
                  <div>
                    <span>£60</span>
                  </div>
                </div>
                <div class="tail-flex tail-justify-between tail-p-2">
                  <div>
                    <input type="checkbox" class="tail-p-2">
                    <span class="tail-text-sm">Milage</span>
                  </div>
                  <div>
                    <span>£40</span>
                  </div>
                </div>
                <div class="tail-flex tail-p-2">
                  <div>
                    <i class="ns-plus tail-text-blue-600" />
                  </div>
                  <div>
                    <span class="tail-text-sm tail-text-blue-600">Add new item</span>
                  </div>
                </div>
              </div>
              <div class="tail-border tail-rounded tail-mt-4">
                <div class="tail-p-2">
                  <div class="tail-flex tail-justify-between tail-py-2">
                    <div>
                      <p><bold>Behaviour Consuming</bold></p>
                      <p class="tail-text-gray-500">
                        Qty <span>1</span>
                      </p>
                    </div>
                    <div class="tail-p-3">
                      <span>£60</span>
                      <span class="tail-border-2 tail-rounded tail-text-center tail-p-1"><i class="ns-menu-dots" /></span>
                    </div>
                  </div>
                  <div class="tail-flex tail-justify-between">
                    <div>
                      <p><bold>Milage</bold></p>
                      <p class="tail-text-gray-500">
                        Qty <span>1</span>
                      </p>
                    </div>
                    <div class="tail-p-3">
                      <span>£10</span>
                      <span class="tail-border-2 tail-rounded tail-text-center tail-p-1"><i class="ns-menu-dots" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tail-pt-5">
                <hr />
              </div>
              <div class="tail-py-3">
                <input type="checkbox" class="tail-p-2">
                <span>Value Added Tax (VAT)</span>
              </div>
              <div class="">
                <label for="dueDate" class="">Due date</label>
                <input type="date" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
              </div>
              <div class="">
                <label for="options" class="">Payment Options</label>
                <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
              </div>
            </div>
            <button class="primary-color tail-border tail-rounded tail-text-white tail-p-2">
              Send Invoice
            </button>
          </form>
        </div>
        <div class="right-card tail-p-4 tail-rounded">
          <h1>Preview</h1>
          <span class="tail-text-gray-500">A short description about this section</span>
          <div class="tail-flex">
            <div class="">
              <span>Email</span>
            </div>
            <div class="tail-px-5">
              <span>Invoice PDF</span>
            </div>
          </div>
          <div class="tail-bg-white tail-rounded tail-p-4">
            <h1>Getwelp Limited</h1>
            <div class="tail-p-3">
              <div class="tail-border tail-rounded">
                <div class="tail-grid tail-grid-cols-2 tail-gap-4 tail-p-5">
                  <div>
                    <span>From</span>
                    <p>Brand Name</p>
                  </div>
                  <div>
                    <span>To</span>
                    <p>Client's Name</p>
                  </div>
                </div>
                <div class=" tail-p-3">
                  <div class="tail-bg-gray-300 tail-rounded">
                    <div class="tail-p-3">
                      <p>Amount</p>
                      <p class="tail-text-2xl">
                        £0.00
                      </p>
                      <p class="tail-text-sm">
                        Due on May 25, 2021
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tail-p-1">
                  <hr />
                </div>
                <div class="tail-p-3">
                  <div class="tail-flex tail-justify-between">
                    <div>
                      <p><bold>Behaviour Consuming</bold></p>
                      <p class="tail-text-gray-500">
                        Qty <span>1</span>
                      </p>
                    </div>
                    <div class="tail-p-3">
                      <span>£60</span>
                    </div>
                  </div>
                  <div class="tail-flex tail-justify-between">
                    <div>
                      <p><bold>Milage</bold></p>
                      <p class="tail-text-gray-500">
                        Qty <span>1</span>
                      </p>
                    </div>
                    <div class="tail-p-3">
                      <span>£10</span>
                    </div>
                  </div>
                  <div class="tail-p-1">
                    <hr />
                  </div>
                  <div class="tail-flex tail-justify-between">
                    <div>
                      <p><bold>Amount Due</bold></p>
                    </div>
                    <div class="tail-pr-2">
                      <span>£70</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  padding: 10px;
}
.left-card {
  width: 26.25rem;
}
.right-card {
  width: 26.25rem;
  height: 51.25rem;
  background-color: #f0f5fa;
}
</style>
