<template>
  <div class="rounded-lg w-full hover:bg-blue-50 bg-bad-red flex items-center justify-between py-5 px-4">
    <div class="flex items-center">
      <div>
        <ClientAvatar :clientInfo="invoice.ownerId" />
      </div>
      <div class="ml-4 ">
        <h6 class="text-base text-gray-700 text-capitalize">{{invoice.ownerId.firstName}} {{invoice.ownerId.lastName}}</h6>
        <span class="text-sm text-gray-500">{{invoice.ownerId.email}}</span>
      </div>
    </div>
    <ClickOutside :do="() => { showDropDown = false }">
      <div class="relative">
      <span @click="showDropDown = !showDropDown" class="ns-menu-dots cursor-pointer font-medium text-2xl text-primary-color"></span>
        <div
          v-show="showDropDown"
          class="absolute top-[13px] absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
        >
          <div class="py-1" role="none">
            <a
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              @click.prevent="$router.push({
              name: 'edit-invoice-id',
              params: {
                id: invoice._id
              }
              });showDropDown=false">Edit
            </a>
            <a
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              @click.prevent="showDropDown=false">Delete
            </a>
          </div>
        </div>
    </div>
    </ClickOutside>
  </div>
</template>

<script>
export default {
  props: ['invoice'],
  data () {
    return {
      showDropDown: false
    }
  }
}
</script>

<style scoped>

</style>
