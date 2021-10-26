<template>
  <div>
    <div class="tail-grid tail-grid-cols-3 tail-gap-2">
      <div>
        <div
          class="tail-rounded-md tail-bg-white tail-cursor-pointer tail-p-4 tail-mb-2 tail-flex tail-items-center tail-justify-between tail-m-4"
        >
          <div>
            <p class="tail-text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam repellat aspernatur reiciendis voluptatem, voluptas mollitia.
            </p>
            <div class="tail-flex tail-my-2">
              <div v-for="n in 4" :key="n">
                <div style="padding-top: 0.1em; padding-bottom: 0.1rem" class="tail-text-xs tail-px-3 tail-bg-gray-300 tail-text-gray-800 tail-rounded-full tail-mr-1">
                  Tag
                </div>
              </div>
            </div>
            <div>
              <div class="tail-flex">
                <div class="tail-text-2xl tail-mr-3 tail-mt-3">
                  <i class="ns-clock tail-text-gray-500"></i>
                </div>
                <div>
                  <div class="tail-text-sm tail-my-3">
                    <p>Date</p>
                    <p>Friday 26 April, 2021</p>
                    <span class="tail-text-xs tail-text-gray-500">Daily</span>
                  </div>
                  <div class="tail-text-sm tail-my-3">
                    <p>Time</p>
                    <p>2pm-3pm-1hr</p>
                  </div>
                </div>
              </div>
              <div class="tail-flex tail-items-center">
                <div class="tail-text-2xl tail-mr-3">
                  <i class="ns-location-alt tail-mt-1 tail-text-gray-500"></i>
                </div>
                <div class="tail-text-sm tail-my-3">
                  <p>Location</p>
                  <p>SMV 1123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tail-col-span-2 tail-w-full">
        <p class="tail-mx-2 tail-mb-0 tail-mt-2 tail-text-gray-700 tail-font-semibold">
          6 Clients
        </p>
        <div v-for="n in 6" :key="n">
          <CardInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassCardInfo'
}
</script>

<style>

</style>
