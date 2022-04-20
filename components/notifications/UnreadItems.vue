<template>
  <div>
    <template v-if="unreadNotifications.length">
      <NewNotification
        v-for="notification in unreadNotifications"
        :key="notification._id"
        :notification="notification"
      />
      <button v-if="this.unreadNotifications.length === this.page * this.limit" @click.prevent="loadMore" class="btn block w-full py-2 font-bold">
        <single-loader  v-if="loadingMore"> </single-loader>
        <span v-else>Load More</span>
      </button>
    </template>
    <NoNotifications v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SingleLoader from '../util/SingleLoader.vue'
import NoNotifications from '~/components/notifications/NoNotifications'
import NewNotification from '~/components/notifications/NewNotification'

export default {
  name: 'UnreadItems',
  components: {
    NewNotification,
    NoNotifications,
    SingleLoader
  },
  data () {
    return {
      page: 1,
      limit: 2,
      loadingMore: false
    }
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'notifications/fetchNotifications'
    }),
    async loadMore () {
      this.page++
      this.loadingMore = true
      await this.fetchNotifications({
        page: this.page,
        limit: this.limit,
        status: 'UNREAD'
      })
      this.loadingMore = false
    }
  },
  async fetch () {
    await this.fetchNotifications({
      page: this.page,
      status: 'UNREAD',
      limit: this.limit
    })
  },
  computed: {
    ...mapGetters({
      unreadNotifications: 'notifications/getUnreadNotifications'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
