<template>
  <div>
    <div
      class="rounded-md bg-white cursor-pointer p-4 mb-2 flex items-center justify-between m-4"
    >
      <div class="flex items-center">
        <ClientAvatar
          :client-info="{
            firstName: 'Get',
            lastName: 'Welp'
          }"
        />
        <div class="ml-2">
          <h3 class="font-semibold text-base text-gray-800">
            Liz Rumble
          </h3>
          <div class="flex items-center">
            <img
              class="bg-green-400 p-1 rounded-full"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
            <span class="ml-1 text-gray-500 truncate">
              Shep-Hammersmith
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardInfo'
}
</script>

<style></style>
