<template>
  <div class="bg-gray-100 h-full">
    <PageHeader>
      <template
        v-if="[
          'settings-profile',
          'settings-services',
          'settings-billing-setup',
          'settings-calendar',
          'settings-security',
        ].includes($route.name)"
        v-slot:back-button
      >
        <button
          type="button"
          class="button-text w-10 md:hidden"
          @click="$router.push({ name: 'settings' })"
        >
          <i
            class="fi-rr-angle-left font-bold text-blue-500 text-lg"
            style="margin-top: 5px"
          ></i>
        </button>
      </template>
      <template v-slot:title>
        <span class="font-normal">Settings</span>
      </template>
    </PageHeader>
    <div class="w-full p-4 lg:flex lg:justify-center">
      <div class="max-w-full md:max-w-4xl lg:max-w-full 2xl:max-w-7xl">
        <div class="grid lg:grid-cols-3 gap-4">
          <div v-if="$route.name === 'settings'" class="block md:grid">
            <div
              class="bg-white border border-gray-200 p-1 shadow-sm rounded-xl"
            >
              <div
                v-for="(menu, index) in filteredMenu"
                :key="index"
                :class="[
                  activeRoute.path.includes(menu.name) ? 'bg-blue-50' : '',
                ]"
                class="p-1 flex py-4 px-3 justify-between cursor-pointer items-center rounded-lg hover:bg-blue-50"
                @click="$router.push({ name: menu.route })"
              >
                <div
                  class="h-12 w-12 bg-gray-50 flex-shrink-0 flex items-center justify-center rounded-full"
                >
                  <i
                    :class="[
                      menu.icon,
                      activeRoute.path.includes(menu.name)
                        ? 'text-blue-500'
                        : 'text-gray-500',
                    ]"
                    class="text-lg"
                  ></i>
                </div>
                <div class="md:w-4/5 w-60 text-gray-500">
                  <h6 class="text-base">
                    {{
                      `${menu.name.charAt(0).toUpperCase()}${menu.name.substr(
                        1
                      )}`
                    }}
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
          <div v-else class="hidden md:block">
            <div
              class="bg-white border border-gray-200 p-1 shadow-sm rounded-xl"
            >
              <div
                v-for="(menu, index) in filteredMenu"
                :key="index"
                :class="[
                  activeRoute.path.includes(menu.name) ? 'bg-blue-50' : '',
                ]"
                class="p-1 flex py-4 px-3 justify-between cursor-pointer items-center rounded-lg hover:bg-blue-50"
                @click="$router.push({ name: menu.route })"
              >
                <div
                  class="h-12 w-12 bg-gray-50 flex-shrink-0 flex items-center justify-center rounded-full"
                >
                  <i
                    :class="[
                      menu.icon,
                      activeRoute.path.includes(menu.name)
                        ? 'text-blue-500'
                        : 'text-gray-500',
                    ]"
                    class="text-lg"
                  ></i>
                </div>
                <div class="md:w-4/5 w-60 text-gray-500">
                  <h6 v-if="menu.name !== 'billing'" class="text-base">
                    {{
                      `${menu.name.charAt(0).toUpperCase()}${menu.name.substr(
                        1
                      )}`
                    }}
                  </h6>
                  <h6 v-else>
                    Payment options
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
          details:
            'Information about you and your business.',
          route: 'settings-profile'
        },
        {
          name: 'services',
          icon: 'fi-rr-hand-holding-heart',
          details: 'A list of the services you offer.',
          route: 'settings-services'
        },
        {
          name: 'calendar',
          icon: 'fi-rr-calendar',
          details: 'Connect your calendars to Luna.',
          route: 'settings-calendar'
        },
        {
          name: 'billing',
          icon: 'fi-rr-credit-card',
          details: 'Add new payment options. Integrate with your payment platforms.',
          route: 'settings-billing-setup'
        },
        {
          name: 'security',
          icon: 'fi-rr-shield',
          details: 'Set your security settings and privacy.',
          route: 'settings-security'
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
