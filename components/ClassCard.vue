<template>
  <div>
    <div
      class="rounded-md bg-white cursor-pointer p-4 mb-4 flex items-center justify-between m-4"
    >
      <div class="w-full hover:bg-gray-100">
        <div @click="$emit('showInfo', false)">
          <h3 class="font-semibold text-base text-gray-800">
            {{ data._id.title }} :  {{ data._id.date }}
          </h3>
          <p class="text-sm truncate text-gray-500">
            Location ({{ data.courses[0].location }})
          </p>
          <p class="text-sm truncate text-gray-500">
            {{ data.courses[0].participants }} participants - {{ data.courses[0].time }}
          </p>
        </div>
      </div>
      <div>
        <button
          class=" inline-flex items-center px-4 md:px-2 py-1 mt-2  border-0 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          @click.prevent="showSubMenu"
        >
          <i class="ns-ellipsis font-bold  text-lg"></i>
        </button>
      </div>
    </div>
    <div v-show="meetSubMenu" v-click-outside="externalClick" class="">
      <GwOptions
        :options="['Reschedule Class', 'Message', 'Cancel Class']"
        selected=""
        @selected="classActions"
      />
    </div>

    <GwModal :is-open="openReschedule" :input-width="30" @close="openReschedule = $event" @closeBackDrop="openReschedule = $event">
      <template v-slot:status>
        <div class="px-2 text-2xl font-bold">
          Reschedule Class
        </div>
      </template>
      <div>
        <Reschedule @close="openReschedule = $event" />
      </div>
    </GwModal>
    <GwModal :is-open="openDeleteModal" :input-width="30" @close="openDeleteModal = $event" @closeBackDrop="openDeleteModal = $event">
      <CancelAlert @close="openDeleteModal = $event">
        <template v-slot:text>
          <div class="text-base font-medium text-left">
            Are you sure you want to cancel the class Puppies : August 26?
          </div>
        </template>
      </CancelAlert>
    </GwModal>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'ClassCard',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      meetSubMenu: false,
      openReschedule: false,
      openDeleteModal: false
    }
  },
  methods: {
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    },
    classActions (selected) {
      switch (selected) {
        case 'Reschedule Class':
          this.openAddParticipant = true
          this.meetSubMenu = false
          break
        case 'Cancel Class':
          this.openDeleteModal = true
          this.meetSubMenu = false
          break
        default:
          break
      }
    },
    externalClick (e) {
      this.meetSubMenu = false
    }
  }

}
</script>

<style>

</style>
