<template>
  <div class="tail-rounded-lg tail-w-full hover:tail-bg-blue-50 bg-bad-red tail-flex tail-items-center tail-justify-between tail-py-5 tail-px-4">
    <div class="tail-flex tail-items-center">
      <div>
        <ClientAvatar :clientInfo="client.ownerId" />
      </div>
      <div class="tail-ml-4 ">
        <h6 class="tail-text-base tail-text-gray-700 tail-text-capitalize">{{client.ownerId.firstName}} {{client.ownerId.lastName}}</h6>
        <span class="tail-text-sm tail-text-gray-500">{{client.ownerId.email}}</span>
      </div>
    </div>
    <ClickOutside :do="() => { showDropDown = false }">
      <div class="tail-relative">
      <span @click="showDropDown = !showDropDown" class="ns-menu-dots cursor-pointer tail-font-medium tail-text-2xl text-primary-color"></span>
        <div
          v-show="showDropDown"
          class="tail-absolute tail-origin-top-right tail-absolute tail-right-0 tail-mt-2 tail-w-44 tail-rounded-lg tail-shadow-lg tail-bg-white tail-ring-1 tail-ring-black tail-ring-opacity-5 focus:tail-outline-none tail-z-40"
        >
          <div class="tail-py-1" role="none">
            <a
              class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
              @click.prevent="$router.push({name: 'Invoices-sent'}); showDropDown=false">Edit
            </a>
            <a
              class="tail-text-gray-700 tail-block tail-px-4 tail-py-2 tail-text-sm hover:tail-bg-gray-100"
              @click.prevent="$router.push({name: 'Invoices-drafts'}); showDropDown=false">Delete
            </a>
          </div>
        </div>
    </div>
    </ClickOutside>
  </div>
</template>

<script>
export default {
  props: ['client'],
  data () {
    return {
      showDropDown: false
    }
  }
}
</script>

<style scoped>

</style>
