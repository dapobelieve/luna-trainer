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
              <div
                v-for="(menu, index) in filteredMenu"
                :key="index"
                :class="[activeRoute.path.includes(menu.name) ? 'bg-blue-50' : '']"
                class="p-1 flex py-4 px-3 justify-between cursor-pointer items-center rounded-lg hover:bg-blue-50"
                @click="$router.push({name: menu.route})"
              >
                <div class="h-12 w-12 bg-gray-50 flex-shrink-0 flex items-center justify-center rounded-full">
                  <i :class="[menu.icon, activeRoute.path.includes(menu.name) ? 'text-blue-500' : 'text-gray-500' ]" class=" text-lg"></i>
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
                  <i class="fi-rr-angle-right text-base text-blue-500"></i>
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
          icon: 'fi-rr-user',
          details: 'Some of your information will be shown to your clients. Try and be as accurate as possible',
          route: 'settings-profile'
        },
        {
          name: 'services',
          icon: 'fi-rr-hand-holding-heart',
          details: 'What type of things do you offer?',
          route: 'settings-services'
        },
        {
          name: 'security',
          icon: 'fi-rr-shield',
          details: 'We keep your data as secure as possible',
          route: 'settings-security'
        },
        {
          name: 'connections',
          icon: 'fi-rr-data-transfer',
          details: 'Integrate with multiple other services platforms',
          route: 'settings-connections'
        }
      ]
    }
  },
  computed: {
    filteredMenu () {
      return this.settingsMenu.filter((item) => {
        if (this.socialAuth && item.name !== 'security') {
          return item
        } else {
          return item
        }
      })
    },
    socialAuth () {
      return this.$auth.user.authProvider !== 'local'
    },
    activeRoute () {
      return this.$route
    }
  }
}
</script>
