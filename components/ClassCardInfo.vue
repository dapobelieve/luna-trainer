<template>
  <div>
    <div class="grid grid-cols-3 gap-2">
      <div>
        <div
          class="rounded-md bg-white cursor-pointer p-4 mb-2 flex items-center justify-between m-4"
        >
          <div>
            <p class="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam repellat aspernatur reiciendis voluptatem, voluptas mollitia.
            </p>
            <div class="flex my-2">
              <div v-for="n in 4" :key="n">
                <div style="padding-top: 0.1em; padding-bottom: 0.1rem" class="text-xs px-3 bg-gray-300 text-gray-800 rounded-full mr-1">
                  Tag
                </div>
              </div>
            </div>
            <div>
              <div class="flex">
                <div class="text-2xl mr-3 mt-3">
                  <i class="ns-clock text-gray-500"></i>
                </div>
                <div>
                  <div class="text-sm my-3">
                    <p>Date</p>
                    <p>Friday 26 April, 2021</p>
                    <span class="text-xs text-gray-500">Daily</span>
                  </div>
                  <div class="text-sm my-3">
                    <p>Time</p>
                    <p>2pm-3pm-1hr</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="text-2xl mr-3">
                  <i class="ns-location-alt mt-1 text-gray-500"></i>
                </div>
                <div class="text-sm my-3">
                  <p>Location</p>
                  <p>SMV 1123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 w-full">
        <p class="mx-2 mb-0 mt-2 text-gray-700 font-semibold">
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
