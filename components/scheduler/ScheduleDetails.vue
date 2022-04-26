<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-end border-b pr-4 h-[3.6rem]">
      <span class="cursor-pointer" @click="$emit('close')">
        <i class="fi-rr-cross text-primary-color"></i>
      </span>
    </div>
    <div v-if="!eventObj" class="px-3 flex-grow flex justify-center items-center">
      <SingleLoader height="40px" width="40px" />
    </div>
    <div v-else class="flex-grow px-3">
      <h4 class="text-2xl mb-2 text-gray-700 mb-3">
        {{ eventObj.title }}
      </h4>
      <p class="mb-4">
        {{ eventObj.description }}
      </p>
      <div class="mb-4">
        <EventItem :event="eventObj" />
      </div>
      <div v-if="eventObj.participants">
        <div v-for="(client, clientIndex) in eventObj.participants" :key="clientIndex">
          <div class="flex items-center content-center py-1 mb-2.5">
            <ClientAvatar
              :width="3"
              :height="3"
              :client-info="{ firstName: client.name || '?', ...client }"
            />
            <div class="ml-2">
              <p class="capitalize font-medium text-md  text-gray-700">
                {{ client.name }}
              </p>
              <span class="text-sm text-gray-400">{{ client.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="schedule-footer flex justify-around mb-4">
      <button class="text-primary-color" @click="$modal.show('scheduler-cancel-session')">
        Cancel
      </button>
      <button class="button-fill" @click="$emit('reschedule', eventObj)">
        Reschedule
      </button>
    </div>
    <CancelSessionModal :loading="loading" @close="closeModal" @cancel="deleteEvent" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventItem from '~/components/scheduler/EventItem'
import CancelSessionModal from '~/components/scheduler/CancelSessionModal'
export default {
  components: { CancelSessionModal, EventItem },
  data () {
    return {
      eventObj: null,
      loading: false
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler (val) {
        await this.getEvent(val.params.id)
      }
    }
  },
  computed: {
    ...mapGetters({
      event: 'scheduler/getActiveEvent'
    })
  },
  methods: {
    async getEvent (id) {
      try {
        this.eventObj = await this.$store.dispatch('scheduler/getSingleAppointment', { id })
      } catch (e) {

      } finally {
        this.loading = false
      }
    },
    deleteEvent () {
      this.loading = true
      try {
        this.$store.dispatch('scheduler/deleteAppointment', this.eventObj)
        this.$emit('remove-event', this.eventObj.id)
        this.closeModal()
        this.$lunaToast.success('Session Deleted')
        this.$emit('close')
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    closeModal () {
      this.$modal.hide('scheduler-cancel-session')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.button-fill {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
</style>
