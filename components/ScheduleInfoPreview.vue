<template>
  <div>
    <div class="font-semibold p-2 text-lg md:text-xl">
      {{ data.meeting }}
    </div>
    <div class="p-3">
      {{ data.address_description }}
    </div>
    <div v-if="data.status === 'happening_now'" class="bg-gray-200 rounded-b text-gray-600 mx-4 py-1.5" role="alert">
      <div class="flex pl-3 items-center">
        <div class="py-1 pl-1">
          <svg class="fill-current h-4 w-4 text-gray-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
        </div>
        <div>
          <p class="text-sm">
            This meeting is happening now.
          </p>
        </div>
      </div>
    </div>
    <div v-if="data.status === 'cancelled'" class="bg-gray-200 rounded-b text-gray-600 mx-4 py-1.5" role="alert">
      <div class="flex pl-3 items-center">
        <div class="py-1 pl-1">
          <svg class="fill-current h-4 w-4 text-gray-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
        </div>
        <div>
          <p class="text-sm">
            This meeting has been cancelled.
          </p>
        </div>
      </div>
    </div>
    <div class="flex p-2">
      <div class="text-3xl mr-3">
        <i class="ns-clock mt-1 text-gray-500"></i>
      </div>
      <div>
        <div class="mb-2">
          <p>Date</p>
          <p>{{ data.schedule_info }}</p>
        </div>
        <div class="mb-3">
          <p>Time</p>
          <p>{{ data.time }}</p>
        </div>
      </div>
    </div>
    <div class="flex p-2">
      <div class=" text-3xl mr-3">
        <i
          class="ns-location-alt mt-1 text-gray-500"
        ></i>
      </div>
      <div class="mb-4">
        <p>Location</p>
        <p>{{ data.venue }}</p>
      </div>
    </div>
    <div class="flex p-2">
      <div class=" text-3xl mr-3">
        <i class="ns-user mt-1 text-gray-500"></i>
      </div>
      <div>
        <p>Dog Owner</p>
        <div class="flex mt-2">
          <ClientAvatar
            :client-info="{
              firstName: 'Get',
              lastName: 'Welp'
            }"
          />
          <div class="ml-2">
            <p>{{ data.trainer_firstname }} {{ data.trainer_lastname }}</p>
            <div class="flex">
              <img src="~/assets/img/dog-paw.svg" alt="" class="bg-green-700 rounded-full m-1">
              <span>{{ data.dog_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.status === 'request' || data.status === 'confirmed'" class="flex justify-end items-center">
      <button class="hidden md:flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-400 m-1.5">
        Cancel
      </button>
      <button :class="[data.status === 'request' ? 'bg-white border border-gray-400' : 'bg-blue-500 border text-white border-gray-400']" class="hidden md:flex items-center m-1.5 px-2.5 py-1 rounded-md ">
        Re-Schedule
      </button>
      <button
        v-if="data.status ==='request'"
        class="hidden md:flex items-center px-2.5 m-1.5 py-1 rounded-md bg-blue-500 border text-white border-gray-400"
      >
        Accept
      </button>
    </div>
    <div v-if="data.status === 'happening_now'" class="flex justify-end items-center">
      <button
        class="hidden md:flex items-center px-2.5 m-1.5 py-1 rounded-md bg-blue-400 border text-white border-gray-400"
      >
        Join Session
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleInfoPreview',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
