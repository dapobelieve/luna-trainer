<template>
  <div>
    <PageHeader>
      <template v-slot:back-button>
        <button type="button" @click="$router.go(-1)">
          <img src="~/assets/img/svgs/chevron-back.svg" alt="" srcset="">
        </button>
      </template>
      <template v-slot:avatar>
        <span
          class="tail-rounded-full tail-border-2 tail-border-red-400 tail-p-1 tail-mr-1 tail-ml-4"
        >
          <ClientAvatar
            :firstname="clientInfo && clientInfo.firstName"
            :lastname="clientInfo && clientInfo.lastName"
            :width="1.5"
            :height="1.5"
          />
        </span>
      </template>
      <template v-slot:title>
        <span class="tail-capitalize">
          {{ clientInfo && clientInfo.firstName }} {{ clientInfo && clientInfo.lastName }}
        </span>
      </template>
      <template v-slot:buttons>
        <button
          type="button"
          class="tail-bg-white tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border-none tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
        >
          <img src="~/assets/img/svgs/ellipsis.svg" alt="" srcset="">
        </button>
      </template>
    </PageHeader>

    <div class="tail-overflow-hidden tail-flex tail-space-x-6 tail-px-5 tail-py-4" style="height: calc(100vh - 52px)">
      <!-- Static sidebar for desktop viewing -->
      <div class="tail-flex tail-flex-shrink-0 tail-w-1/3">
        <div class="tail-w-full">
          <!-- Sidebar contents-->
          <client-sidbar-content />
        </div>
      </div>

      <!-- Main Content area -->
      <div class="tail-flex-1 tail-bg-white tail-rounded-lg">
        <main class="tail-flex-1 tail-overflow-y-auto">
          <div class="tail-relative tail-max-w-4xl tail-mx-auto md:tail-px-8 xl:tail-px-0">
            <div class="tail-p-5">
              <div class="">
                <nuxt-child @clientName="clientInfo = $event" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Client',
  data () {
    return {
      clientInfo: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
