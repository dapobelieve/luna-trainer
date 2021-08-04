<template>
  <div>
    <div class="tail-font-semibold tail-p-2 tail-text-lg md:tail-text-xl">
      {{ data.meeting }}
    </div>
    <div class="tail-p-3">
      {{ data.address_description }}
    </div>
    <div v-if="data.status === 'happening_now'" class="tail-bg-gray-200 tail-rounded-b tail-text-gray-600 tail-mx-4 tail-py-1.5" role="alert">
      <div class="tail-flex tail-pl-3 tail-items-center">
        <div class="tail-py-1 tail-pl-1">
          <svg class="tail-fill-current tail-h-4 tail-w-4 tail-text-gray-500 tail-mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
        </div>
        <div>
          <p class="tail-text-sm">
            This meeting is happening now.
          </p>
        </div>
      </div>
    </div>
    <div v-if="data.status === 'cancelled'" class="tail-bg-gray-200 tail-rounded-b tail-text-gray-600 tail-mx-4 tail-py-1.5" role="alert">
      <div class="tail-flex tail-pl-3 tail-items-center">
        <div class="tail-py-1 tail-pl-1">
          <svg class="tail-fill-current tail-h-4 tail-w-4 tail-text-gray-500 tail-mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
        </div>
        <div>
          <p class="tail-text-sm">
            This meeting has been cancelled.
          </p>
        </div>
      </div>
    </div>
    <div class="tail-flex tail-p-2">
      <div class="tail-text-3xl tail-mr-3">
        <i class="ns-clock tail-mt-1 tail-text-gray-500"></i>
      </div>
      <div>
        <div class="tail-mb-2">
          <p>Date</p>
          <p>{{ data.schedule_info }}</p>
        </div>
        <div class="tail-mb-3">
          <p>Time</p>
          <p>{{ data.time }}</p>
        </div>
      </div>
    </div>
    <div class="tail-flex tail-p-2">
      <div class=" tail-text-3xl tail-mr-3">
        <i
          class="ns-location-alt tail-mt-1 tail-text-gray-500"
        ></i>
      </div>
      <div class="tail-mb-4">
        <p>Location</p>
        <p>{{ data.venue }}</p>
      </div>
    </div>
    <div class="tail-flex tail-p-2">
      <div class=" tail-text-3xl tail-mr-3">
        <i class="ns-user tail-mt-1 tail-text-gray-500"></i>
      </div>
      <div>
        <p>Dog Owner</p>
        <div class="tail-flex tail-mt-2">
          <ClientAvatar firstname="Get" lastname="Welp" />
          <div class="tail-ml-2">
            <p>{{ data.trainer_firstname }} {{ data.trainer_lastname }}</p>
            <div class="tail-flex">
              <img src="~/assets/img/dog-paw.svg" alt="" class="tail-bg-green-700 tail-rounded-full tail-m-1">
              <span>{{ data.dog_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.status === 'request' || data.status === 'confirmed'" class="tail-flex tail-justify-end tail-items-center">
      <button class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-py-1 tail-rounded-md tail-bg-white tail-border tail-border-gray-400 tail-m-1.5">
        Cancel
      </button>
      <button :class="[data.status === 'request' ? 'tail-bg-white tail-border tail-border-gray-400' : 'tail-bg-blue-400 tail-border tail-text-white tail-border-gray-400']" class="tail-hidden md:tail-flex tail-items-center tail-m-1.5 tail-px-2.5 tail-py-1 tail-rounded-md ">
        Re-Schedule
      </button>
      <button
        v-if="data.status ==='request'"
        class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-m-1.5 tail-py-1 tail-rounded-md tail-bg-blue-400 tail-border tail-text-white tail-border-gray-400"
      >
        Accept
      </button>
    </div>
    <div v-if="data.status === 'happening_now'" class="tail-flex tail-justify-end tail-items-center">
      <button
        class="tail-hidden md:tail-flex tail-items-center tail-px-2.5 tail-m-1.5 tail-py-1 tail-rounded-md tail-bg-blue-400 tail-border tail-text-white tail-border-gray-400"
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
