<template>
  <div>
    <div>
      <div class="w-full mb-2">
        <div
          :class="[
            data.session === true
              ? 'border-green-400'
              : 'border-yellow-400'
          ]"
          class="rounded-md bg-white border-l-4 cursor-pointer flex justify-between items-center flex-col md:flex-row text-gray-700 p-2 md:p-4 w-full"
        >
          <div class="flex " @click="openModal = true">
            <ClientAvatar
              :client-info="{
                firstName: 'Get',
                lastName: 'Welp'
              }"
            />
            <div class="pl-2">
              <p class="font-bold">
                {{ data.meeting }} with {{ data.trainer_firstname }}.
              </p>
              <div>
                <span
                  style="padding-top: 0.1em; padding-bottom: 0.1rem"
                  class="text-xs px-3 bg-gray-200 text-gray-800 rounded-full"
                >
                  {{ data.time }}</span>
                <span
                  class="text-xs md:text-sm"
                >- {{ data.venue }}</span>
              </div>
            </div>
          </div>
          <div>
            <div v-if="data.join">
              <button
                class="base-button inline-flex items-center my-2 text-white px-6 md:px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                @click="openModal = true"
              >
                {{ data.join }}
              </button>
            </div>
            <div v-if="data.actions">
              <button
                class=" inline-flex items-center px-4 md:px-2 py-1 mt-2  border-0 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                @click.prevent="showSubMenu"
              >
                <i class="ns-ellipsis font-bold  text-lg"></i>
              </button>
            </div>
            <div v-if="data.cancelled">
              <button
                class=" inline-flex items-center px-4 md:px-2 py-1 mt-2  border-0 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                @click.prevent="showSubMenu"
              >
                <i class="ns-ellipsis font-bold  text-lg"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          v-show="meetSubMenu"
          v-click-outside="externalClick"
          class=""
        >
          <GwOptions
            :options="['Cancel Session', 'Edit Session']"
            selected=""
            @selected="selectSession"
          />
        </div>
        <GwModal
          :is-open="openEditModal"
          :input-width="40"
          @close="openEditModal = $event"
          @closeBackDrop="openEditModal = $event"
        >
          <CreateSchedule :data="data" @close="openEditModal = $event" />
        </GwModal>
        <GwModal
          :is-open="openModal"
          :input-width="30"
          @close="openModal = $event"
          @closeBackDrop="openModal = $event"
        >
          <template v-slot:status>
            <div
              :class="[
                data.status === 'cancelled'
                  ? 'text-red-500'
                  : 'text-gray-500'
              ]"
              class="bg-gray-100  px-2 rounded-3xl"
            >
              {{ data.status }}
            </div>
          </template>
          <ScheduleInfoPreview :data="data" @close="openModal = $event" />
        </GwModal>
        <GwModal
          :is-open="openDeleteModal"
          :input-width="30"
          @close="openDeleteModal = $event"
          @closeBackDrop="openDeleteModal = $event"
        >
          <CancelAlert @close="openDeleteModal = $event">
            <template v-slot:text>
              <div class="text-base font-medium text-left">
                Are you sure you want to cancel the appointment?
              </div>
            </template>
          </CancelAlert>
        </GwModal>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'ScheduleCard',
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
      openModal: false,
      openDeleteModal: false,
      openEditModal: false
    }
  },
  methods: {
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    },
    selectSession (selected) {
      if (selected === 'Cancel Session') {
        this.openDeleteModal = true
        this.meetSubMenu = false
      } else {
        this.openEditModal = true
        this.meetSubMenu = false
      }
    },
    externalClick (e) {
      this.meetSubMenu = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
