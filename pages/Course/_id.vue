<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <div class="tail-flex tail-items-center">
          <button @click="$router.go(-1)">
            <img src="~/assets/img/chevron-left.svg" alt="" class="tail-h-6" />
          </button>
          <p
            v-if="classCard"
            class="tail-text-gray-500  tail-text-xl tail-font-semibold"
          >
            Courses
          </p>
          <p v-else class="tail-text-gray-500  tail-text-xl tail-font-semibold">
            Puppies: 26th August
          </p>
        </div>
      </template>
      <template v-slot:buttons>
        <button
          v-if="classCard"
          type="button"
          class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          @click="newCourse = true"
        >
          <i class="ns-plus tail-text-lg hover:tail-text-white"></i>
        </button>
        <div>
          <button
            class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          >
            <i class="ns-ellipsis tail-font-bold  tail-text-lg"></i>
          </button>
        </div>
      </template>
    </PageHeader>
    <div v-if="classCard">
      <div v-show="meetSubMenu" class="">
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
      <div v-show="meetSubMenu" class="">
        <GwOptions
          :options="['Reschedule Class', 'Message', 'Cancel Class']"
          selected=""
          @selected="reschedule"
        />
      </div>
    </div>
    <Modal :is-open="openAddParticipant" @close="openAddParticipant = $event">
      <template v-slot:status>
        <div class="tail-px-2 tail-text-2xl tail-font-bold">
          Add Participant
        </div>
      </template>
      <div>
        <AddParticipant @close="openAddParticipant = $event" />
      </div>
    </Modal>
    <Modal
      :is-open="openDeleteModal"
      :input-width="30"
      @close="openDeleteModal = $event"
    >
      <CancelAlert @close="openDeleteModal = $event">
        <template v-slot:text>
          <div class="tail-text-base tail-font-medium tail-text-left">
            Are you sure you want to delete the course Puppies? A notification
            will be sent to all participants
          </div>
        </template>
      </CancelAlert>
    </Modal>

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
export default {
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
    }
  }
}
</script>

<style></style>
