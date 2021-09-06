<template>
  <div>
    <div
      class="tail-rounded-md tail-bg-white tail-cursor-pointer tail-p-4 tail-mb-2 tail-flex tail-items-center tail-justify-between tail-m-4"
    >
      <div class="tail-flex tail-items-center">
        <ClientAvatar
          :client-info="{
            firstName: 'Get',
            lastName: 'Welp'
          }"
        />
        <div class="tail-ml-2">
          <h3 class="tail-font-semibold tail-text-base tail-text-gray-800">
            Liz Rumble
          </h3>
          <div class="tail-flex tail-items-center">
            <img
              class="tail-bg-green-400 tail-p-1 tail-rounded-full"
              src="~/assets/img/dog-paw.svg"
              alt="dog paw"
            />
            <span class="tail-ml-1 tail-text-gray-500 tail-truncate">
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
