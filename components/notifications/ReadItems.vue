<template>
  <div>
    <template v-if="readNotifications.length">
      <NewNotification
        v-for="notification in readNotifications"
        :key="notification._id"
        :notification="notification"
      />
      <button
        v-if="this.readNotifications.length >= this.page * this.limit || loadingMore"
        @click.prevent="loadMore"
        class="btn block w-full py-2 font-bold text-center flex items-center">
        <SingleLoader v-if="loadingMore"> </SingleLoader>
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
  name: 'ReadItems',
  components: {
    NewNotification,
    NoNotifications,
    SingleLoader
  },
  data () {
    return {
      page: 1,
      limit: 10,
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
        status: 'READ'
      })
      this.loadingMore = false
    }
  },
  async fetch () {
    await this.fetchNotifications({
      page: this.page,
      status: 'READ',
      limit: this.limit
    })
  },
  computed: {
    ...mapGetters({
      readNotifications: 'notifications/getReadNotifications'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
