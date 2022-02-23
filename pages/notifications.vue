<template>
  <div
    style="height: calc(100vh - 2px)"
    :class="[
      'fixed w-full lg:left-56 xl:left-64 left-0 z-10']"
  >
    <div class="relative p-0 sm:p-3 h-full  flex justify-center lg:justify-start" @click.stop="$router.go(-1)">
      <transition
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="sm:border border-none bg-white rounded-none sm:rounded-xl overflow-y-auto shadow-xl sm:max-w-md lg:max-w-sm w-full h-full"
          @click.stop=""
        >
          <div
            class="opacity-50 w-full h-full absolute left-0 top-0 -z-10"
          ></div>

          <div class="sticky top-0">
            <div class="flex justify-between items-center bg-white p-4">
              <h5 class="text-xl text-gray-700">
                Notifications
              </h5>
              <div class="hover:bg-blue-50 h-8 w-8 flex items-center justify-center rounded-full">
                <i class="fi-rr-cross text-base text-blue-500" role="button" @click.stop="$router.go(-1)"></i>
              </div>
            </div>
            <slot name="search" />
          </div>
          <div v-if="notifications && notifications.length" class="px-1 pb-20 lg:pb-1">
            <div v-for="n in notifications" :key="n.index" class="mb-2 last:mb-0">
              <CalendarSync v-if="n.type === 'CALENDAR_SYNC'" :notification="n" />
              <NewNotifications v-else :notification="n" />
            </div>
            <div class="mb-2 last:mb-0">
              <CalendarSync />
            </div>
          </div>
          <div v-else class="text-center py-8 px-4 flex w-full justify-center">
            <div class="max-w-xs flex gap-3 flex-col">
              <h5 class="font-bold text-lg text-gray-700">
                No Notifications.
              </h5>
              <p class="text-sm">
                We will notify you when something arrives
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewNotifications from '~/components/notifications/NewNotifications'
import CalendarSync from '~/components/notifications/CalendarSync'
export default {
  name: 'NavigationSubMenu',
  components: { CalendarSync, NewNotifications },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/getAllNotifications'
    })
  },
  async beforeMount () {
    try {
      await this.$store.dispatch('notifications/fetchNotifications')
    } catch (e) {
      console.log({ e })
    }
  }
}
</script>
