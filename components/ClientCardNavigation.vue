<template>
  <ul
    role="list"
    class="relative z-0 rounded-xl border bg-white overflow-hidden p-1 hidden lg:block"
  >
    <li v-for="menu in menuItems" :key="menu.index" class="w-full">
      <button
        :class="[matchedRoute(menu) ? 'active' : '' ,`relative py-4 flex items-center rounded-lg px-3 transition-all hover:bg-gray-100 w-full`]"
        @click="gotoRoute(menu)"
      >
        <span
          class="flex items-center space-x-4 w-full"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0 h-12 w-12">
              <i
                :class="[matchedRoute(menu) ? 'text-blue-500 bg-blue-50' : 'text-gray-500 bg-gray-100', `${menu.icon}` ]"
                class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0"
              ></i>
            </div>
            <div class="flex-grow min-w-0">
              <div class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                <p
                  class="text-base text-gray-700"
                  :class="[matchedRoute(menu) ? 'font-bold' : 'font-extralight']"
                >
                  <span class="capitalize">
                    {{
                      menu.pathName
                    }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </span>
        <div
          class="relative"
        >
          <i
            :class="[{'text-blue-500' : matchedRoute(menu)}, 'fi-rr-angle-right']"
          ></i>
        </div>
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ClientCardNavigation',
  data () {
    return {
      menuItems: [
        {
          pathName: 'messages',
          icon: 'fi-rr-comment-alt'
        },
        {
          pathName: 'information',
          icon: 'fi-rr-user'
        },
        {
          pathName: 'notes',
          icon: 'fi-rr-notebook'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      clients: 'client/getAllClients'
    })
  },
  methods: {
    matchedRoute (menu) {
      return `client-id-${menu.pathName}` === this.$route.name
    },
    gotoRoute (menu) {
      const id = this.$route.params.id
      if (menu.pathName === 'messages') {
        const status = this.clients.find(c => c._id === id).status
        if (status === 'invited') {
          this.$lunaToast.warning('You can only message clients who have accepted your invite.')
          return
        } else {
          this.$router.push({ name: `client-id-${menu.pathName}`, params: { id } })
        }
      }
      this.$router.push({ name: `client-id-${menu.pathName}`, params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  @apply bg-blue-50 border-none outline-none;
}
</style>
