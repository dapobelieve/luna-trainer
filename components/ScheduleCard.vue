<template>
  <div>
    <div>
      <div class="tail-w-full tail-mb-2">
        <div
          :class="[
            data.session === true
              ? 'tail-border-green-400'
              : 'tail-border-yellow-400'
          ]"
          class="tail-rounded-md tail-bg-white tail-border-l-4 tail-cursor-pointer tail-flex tail-justify-between tail-items-center tail-flex-col md:tail-flex-row tail-text-gray-700 tail-p-2 md:tail-p-4 tail-w-full"
        >
          <div class="tail-flex " @click="openModal = true">
            <ClientAvatar
              :client-info="{
                firstName: 'Get',
                lastName: 'Welp'
              }"
            />
            <div class="tail-pl-2">
              <p class="tail-font-bold">
                {{ data.meeting }} with {{ data.trainer_firstname }}.
              </p>
              <div>
                <span
                  style="padding-top: 0.1em; padding-bottom: 0.1rem"
                  class="tail-text-xs tail-px-3 tail-bg-gray-200 tail-text-gray-800 tail-rounded-full"
                >
                  {{ data.time }}</span>
                <span
                  class="tail-text-xs md:tail-text-sm"
                >- {{ data.venue }}</span>
              </div>
            </div>
          </div>
          <div>
            <div v-if="data.join">
              <button
                class="base-button tail-inline-flex tail-items-center tail-my-2 tail-text-white tail-px-6 md:tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
                @click="openModal = true"
              >
                {{ data.join }}
              </button>
            </div>
            <div v-if="data.actions">
              <button
                class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
                @click.prevent="showSubMenu"
              >
                <i class="ns-ellipsis tail-font-bold  tail-text-lg"></i>
              </button>
            </div>
            <div v-if="data.cancelled">
              <button
                class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
                @click.prevent="showSubMenu"
              >
                <i class="ns-ellipsis tail-font-bold  tail-text-lg"></i>
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
                  ? 'tail-text-red-500'
                  : 'tail-text-gray-500'
              ]"
              class="tail-bg-gray-100  tail-px-2 tail-rounded-3xl"
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
              <div class="tail-text-base tail-font-medium tail-text-left">
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
