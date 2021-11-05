<template>
  <div class="bg-gray-100 h-full">
    <PageHeader>
      <template v-slot:title>
        <span class="font-normal">Settings</span>
      </template>
    </PageHeader>
    <div class="w-full p-4 lg:flex lg:justify-center">
      <div class="max-w-full md:max-w-4xl lg:max-w-full 2xl:max-w-7xl">
        <div class="grid lg:grid-cols-3 gap-4">
          <div class="hidden lg:block grid">
            <div class="bg-white border border-gray-200 p-1 shadow-sm rounded-xl">
              <div v-for="(menu, index) in settingsMenu" :key="index" :class="[activeRoute.path.includes(menu.name) ? 'bg-blue-50' : '']" class="p-1 flex py-4 px-3 justify-between cursor-pointer items-center rounded-lg hover:bg-blue-50" @click="$router.push({name: menu.route})">
                <div class="h-12 w-12 bg-gray-50 flex-shrink-0 flex items-center justify-center rounded-full">
                  <i :class="[menu.icon, activeRoute.path.includes(menu.name) ? 'text-blue-500' : 'text-gray-500' ]" class=" text-2xl"></i>
                </div>
                <div class="md:w-4/5 w-60 text-gray-500">
                  <h6 class="text-base">
                    {{ `${menu.name.charAt(0).toUpperCase()}${menu.name.substr(1)}` }}
                  </h6>
                  <p class="text-xs">
                    {{ menu.details }}
                  </p>
                </div>
                <div>
                  <i class="ns-angle-right text-xl text-blue-500"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-2">
            <NuxtChild />
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
      settingsMenu: [
        {
          name: 'profile',
          icon: 'ns-user',
          details: 'Your personal information will be public to your clients, kindly ensure it is as accurate as possible',
          route: 'settings-profile'
        },
        {
          name: 'services',
          icon: 'ns-circle',
          details: 'Brief description about services',
          route: 'settings-services'
        },
        {
          name: 'security',
          icon: 'ns-shield',
          details: 'Brief description about security',
          route: 'settings-security'
        },
        {
          name: 'connections',
          icon: 'ns-data-transfer',
          details: 'Brief description about connections',
          route: 'settings-connections'
        }
      ]
    }
  },
  computed: {
    activeRoute () {
      return this.$route
    }
  }
}
</script>

<style scoped>

</style>