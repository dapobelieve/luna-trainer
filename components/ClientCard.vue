<template>
  <div>
    <div
      v-for="(client, index) in clientsData"
      :key="index"
      class="tail-rounded-md tail-bg-white tail-p-4 tail-mb-4 tail-flex tail-items-center"
    >
      <div class="tail-flex tail-mr-auto">
        <ClientAvatar :firstname="client.firstName" :lastname="client.lastName" />
        <div class="tail-ml-4 tail-truncate tail-mr-2 md:tail-mr-0">
          <h3 class="tail-capitalize tail-font-semibold">
            {{ client.firstName }} {{ client.lastName }}
          </h3>
          <div class="tail-flex tail-items-center">
            <div>
              <img
                class="tail-bg-green-700 tail-rounded-full"
                src="~/assets/img/dog-paw.svg"
                alt="dog paw"
              />
            </div>
            <span class="tail-capitalize tail-ml-1 tail-text-gray-500 tail-truncate">
              {{ client.address }}, {{ client.city }}.
            </span>
          </div>
          <div>
            <div class="tail-flex tail-items-center">
              <span class="tail-text-gray-500">2 new updates</span>
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <div class="tail-flex tail-gap-3">
          <button
            class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          >
            <i class="ns-comment-alt"></i>
            <span class="tail-capitalize tail-ml-1">message</span>
          </button>
          <!-- <button
            class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          >
            <i class="ns-calendar"></i>
            <span class="tail-capitalize tail-ml-1">create session</span>
          </button> -->
          <button
            class="tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400"
          >
            <i class="ns-menu-dots"></i>
          </button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'ClientCard',
  computed: {
    clientsData () {
      return JSON.parse(localStorage.getItem('clientsInfo'))
    }
  }
}
</script>

<style lang="scss" scoped></style>
