<template>
  <div class="tail-grid tail-gap-8 tail-grid-cols-1">
    <div class="left-card">
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div class="tail-border tail-rounded tail-p-4">
          <div>
            <div class="tail-py-2">
              <h1>Customer</h1>
            </div>
            <div class="tail-pb-4">
              <span class="tail-text-gray-500">A short description about this section</span>
            </div>
          </div>
          <div class="tail-pb-8">
            <label for="email" class="">Name</label>
            <SearchComponent />
          </div>
          <div class="">
            <label for="email" class="">Email Address</label>
            <input type="email" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
        <div class="tail-border tail-rounded tail-p-4">
          <div>
            <div class="tail-py-2">
              <h1>Items</h1>
            </div>
            <div class="tail-pb-8">
              <span class="tail-text-gray-500">A short description about this section</span>
            </div>
          </div>
          <div class="tail-pb-4">
            <label for="item" class="">Add Item</label>
            <SearchComponent />
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
            <div class="tail-flex tail-justify-between tail-p-2 tail-py-4">
              <div class="">
                <input type="checkbox" class="tail-p-2">
                <span class="tail-text-sm">Milage</span>
              </div>
              <div>
                <span>£40</span>
              </div>
            </div>
            <button @click.prevent="addItem = true">
              <div class="tail-flex tail-p-2">
                <div>
                  <i class="ns-plus tail-text-blue-600" />
                </div>
                <div>
                  <span class="tail-text-sm tail-text-blue-600">Add new item</span>
                </div>
              </div>
            </button>
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
                <button @click.prevent="editItem = true">
                  <div class="tail-p-3">
                    <span>£60</span>
                    <span class="tail-border-2 tail-rounded tail-text-center tail-p-1"><i class="ns-menu-dots" /></span>
                  </div>
                </button>
              </div>
              <div class="tail-flex tail-justify-between tail-py-4">
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
          <div class="tail-py-4">
            <input type="checkbox" class="tail-p-2">
            <span>Value Added Tax (VAT)</span>
          </div>
          <div class="">
            <label for="dueDate" class="">Due date</label>
            <input type="date" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
          <div class="tail-py-8">
            <label for="options" class="">Payment Options</label>
            <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
        <button class="primary-color tail-border tail-rounded tail-text-white tail-p-2">
          Send Invoice
        </button>
      </form>
    </div>
    <Modal :is-open="addItem" @close="addItem = $event">
      <AddItem @close="addItem = $event" />
    </Modal>
    <Modal :is-open="editItem" @close="editItem = $event">
      <EditItem @close="editItem = $event" />
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      addItem: false,
      editItem: false
    }
  }
}
</script>
<style scoped>
.left-card {
  width: 26.25rem;
}
</style>
