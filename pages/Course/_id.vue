<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        <div class="tail-flex tail-items-center">
          <svg class="tail-w-6 tail-h-6 tail-mr-2 tail-text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <p v-if="classCard" class="tail-text-gray-500  tail-text-xl tail-font-semibold">
            Courses
          </p>
          <p v-else class="tail-text-gray-500  tail-text-xl tail-font-semibold">
            Puppies: 26th August
          </p>
        </div>
      </template>
      <template v-slot:buttons>
        <button
          type="button"
          class="base-button tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border tail-border-gray-300 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          @click="openCourseModal = true"
        >
          <i class="ns-plus tail-text-lg hover:tail-text-white"></i>
        </button>
        <div>
          <button
            class=" tail-inline-flex tail-items-center tail-px-4 md:tail-px-2 tail-py-1 tail-mt-2  tail-border-0 tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
            @click.prevent="showSubMenu"
          >
            <i class="ns-ellipsis tail-font-bold  tail-text-lg"></i>
          </button>
        </div>
      </template>
    </PageHeader>
    <div v-if="classCard">
      <div v-show="meetSubMenu" class="">
        <GwOptions
          :options="['Edit Course', 'Duplicate Course', 'Add Participant', 'Delete Course']"
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

    <div v-if="classCard">
      <div v-for="data in group" :key="data.id">
        <ClassCard :data="data" @showInfo="showClassInfo" />
      </div>
    </div>
    <div v-if="showClass">
      something here
      <!-- <div v-for="data in group" :key="data.id">
        <ClassCardInfo :data="data" @showInfo="showClassInfo" />
      </div> -->
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
    courseActions () {
      console.log('clicked')
    },
    reschedule () {
      console.log('clicked')
    }
  }

}
</script>

<style>

</style>
