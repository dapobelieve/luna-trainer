<template>
  <modal
    name="luna-search-modal"
    class="luna-search"
    :click-to-close="false"
    height="auto"
    :adaptive="true"
  >
    <div class="">
      <div class="search-header rounded-t-lg px-4">
        <form role="search" novalidate class="flex items-center justify-center">
          <label class="mt-1"><i class="fi-rr-search text-md text-gray-700"></i></label>
          <input autofocus class="flex-grow text-base ml-3 mr-4 h-14 focus:outline-none" autocomplete="off" placeholder="Search" spellcheck="false">
          <button class="cancel text-sm leading-5 px-1 py-0.5 border text-gray-600 text-xs" style="font-size: 10px">ESC</button>
        </form>
      </div>
      <div class="search-body h-full max-h-[28rem] md:max-h-[35rem] overflow-y-auto">
        <div class="search-items">
          <ul class="list-none">
            <li class="relative mb-2" v-for="x in 12">
              <a class="py-4 px-6 mx-4 block bg-gray-200 rounded-lg hover:text-white hover:bg-sky-500 cursor-pointer">
                <div class="flex items-center">
                  <div class="flex-grow">Search Item</div>
                  <i class="fi-rr-angle-small-right mt-1.5"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="h-36 flex items-center justify-center">
          <h3>No recent searches</h3>
        </div>
      </div>
      <div class="search-footer flex rounded-t-lg">
        <div class="ml-auto px-4 py-3"><img class="h-3" src="~/assets/img/logo-v2.svg" /></div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'LunaSearch',
  data () {
    return {
      search: ''
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.luna-search {
  ::v-deep .vm--modal {
    border-radius: 0.5rem !important;
  }
}
</style>