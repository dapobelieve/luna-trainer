<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <div class="flex items-center">
          <button @click="$router.go(-1)">
            <img src="~/assets/img/chevron-left.svg" alt="" class="h-6" />
          </button>
          <p
            v-if="classCard"
            class="text-gray-500  text-xl font-semibold"
          >
            Courses
          </p>
          <p v-else class="text-gray-500  text-xl font-semibold">
            Puppies: 26th August
          </p>
        </div>
      </template>
      <template v-slot:buttons>
        <button
          v-if="classCard"
          type="button"
          class="base-button inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          @click="newCourse = true"
        >
          <i class="ns-plus text-lg hover:text-white"></i>
        </button>
        <div>
          <button
            class=" inline-flex items-center px-4 md:px-2 py-1 mt-2  border-0 text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <i class="ns-ellipsis font-bold  text-lg"></i>
          </button>
        </div>
      </template>
    </PageHeader>
    <div v-if="classCard">
      <div v-show="meetSubMenu" v-click-outside="externalClick" class="">
        <GwOptions
          :options="[
            'Edit Course',
            'Duplicate Course',
            'Add Participant',
            'Delete Course'
          ]"
          selected=""
          @selected="courseActions"
        />
      </div>
    </div>
    <div v-else>
      <div v-show="meetSubMenu" v-click-outside="externalClick" class="">
        <GwOptions
          :options="['Reschedule Class', 'Message', 'Cancel Class']"
          selected=""
          @selected="reschedule"
        />
      </div>
    </div>
    <GwModal :is-open="openAddParticipant" @close="openAddParticipant = $event" @closeBackDrop="openAddParticipant = $event">
      <template v-slot:status>
        <div class="px-2 text-2xl font-bold">
          Add Participant
        </div>
      </template>
      <div>
        <AddParticipant @close="openAddParticipant = $event" />
      </div>
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
            Are you sure you want to delete the course Puppies? A notification
            will be sent to all participants
          </div>
        </template>
      </CancelAlert>
    </GwModal>

    <div v-if="classCard">
      <div v-for="data in group" :key="data.id">
        <ClassCard :data="data" @showInfo="showClassInfo" />
      </div>
    </div>
    <div v-else>
      <div>
        <ClassCardInfo />
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data () {
    return {
      showClass: false,
      classCard: true,
      meetSubMenu: false,
      openAddParticipant: false,
      openDeleteModal: false,
      newCourse: false,
      group: [
        {
          _id: {
            id: 1,
            title: 'Puppies',
            date: 'Tue, August 4',
            classNo: '14',
            remainder: '6',
            amount: '£600'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '4',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '4',
              time: '9am-10am-1hr',
              clients_firstname: 'Brad',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '4',
              time: '9am-10am-1hr',
              clients_firstname: 'Anna',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '4',
              time: '9am-10am-1hr',
              clients_firstname: 'Dana',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        },
        {
          _id: {
            id: 2,
            title: 'Course Title One',
            date: 'Sat, April 4',
            classNo: '10',
            remainder: '4',
            amount: '£500'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        },
        {
          _id: {
            id: 3,
            title: 'Puppies',
            date: 'Tue, August 4',
            classNo: '30',
            remainder: '4',
            amount: '£900'
          },
          courses: [
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            },
            {
              location: 'SMV 1123',
              participants: '5',
              time: '9am-10am-1hr',
              clients_firstname: 'Josh',
              clients_lastname: 'Bryan',
              dog_name: 'Shep-Hammersmith'
            }
          ]
        }
      ]
    }
  },
  methods: {
    showClassInfo () {
      this.showClass = true
      this.classCard = false
    },
    showSubMenu () {
      this.meetSubMenu = !this.meetSubMenu
    },
    courseActions (selected) {
      switch (selected) {
        case 'Add Participant':
          this.openAddParticipant = true
          this.meetSubMenu = false
          break
        case 'Delete Course':
          this.openDeleteModal = true
          this.meetSubMenu = false
          break
        case 'Edit Course':
          this.newCourse = true
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

<style></style>
