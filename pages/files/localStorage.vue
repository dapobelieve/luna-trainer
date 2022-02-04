<template>
  <div>
    <div class="flex mt-1 mb-5">
      <div class="actions flex justify-end items-center w-full">
        <div class="flex">
          <invoices-search-dropdown :fields="searchFields" :options="options" @field-selected="searchField=$event" @selected="searchInvoice">
            <template v-slot:selected-option="{selected}">
              <span v-if="searchField === 'Name'">
                <span class="text-xs text-gray-700 ml-2">
                  {{ selected.title }}
                </span>
              </span>
              <span v-else>
                hi
                <!-- <InvoiceStatusComponent v-if="searchField === 'Status'" class="my-0.5" :status="selected" /> -->
              </span>
            </template>
            <template v-slot:option="{option}">
              <div class="flex client items-center client py-2 px-5 border border-b-0 border-r-0 border-l-0 border-gray-200 border-t hover:bg-gray-50 cursor-pointer">
                <div v-if="searchField === 'Name'" class="d-flex">
                  <ClientAvatar :height="1" :width="1" :client-info="option" />
                  <span class="text-xs text-gray-700 ml-2">
                    {{ option.firstName }}  {{ option.lastName }}
                  </span>
                </div>
                <InvoiceStatusComponent v-if="searchField === 'Status'" class="my-0.5" :status="option" />
              </div>
            </template>
          </invoices-search-dropdown>
        </div>
      </div>
    </div>
    <GwPagination v-if="filteredRecords && filteredRecords.length" :total-items="filteredRecords.length">
      <template v-slot:content>
        {{ quickSearchQuery }}
        <div class="overflow-scroll lg:overflow-hidden">
          <table class="table-auto table bg-white w-full text-xs rounded-md">
            <thead class="">
              <tr class="uppercase tracking-wider text-capitalise text-gray-500">
                <th class="py-4 font-medium text-left px-6 w-3/6">
                  Name
                </th>
                <th class="py-4 font-medium px-6">
                  owner
                </th>
                <th class="py-4 font-medium px-6">
                  last modified
                </th>
                <th class="py-4 font-medium px-6">
                  file size
                </th>
                <th class="py-4 font-medium px-6">
                  file type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data) in filteredRecords" :key="data._id" class="text-center relative text-gray-500 hover-row hover:cursor-pointer">
                <td class="py-4 text-left px-6 w-3/6">
                  <div class="flex items-center">
                    <i class="fi-rr-folder"></i>
                    <div class="ml-4">
                      <h6 class="text-base text-gray-700 text-capitalize">
                        {{ data.title }}
                      </h6>
                    </div>
                  </div>
                </td>
                <td class="py-4  px-6">
                  <div class="text-base text-gray-700">
                    {{ data.owner }}
                  </div>
                </td>
                <td class="py-4  px-6">
                  <div class="text-xs md:text-base text-gray-700">
                    {{ data.dateModified | date }}
                  </div>
                </td>
                <td class="py-4 px-6">
                  <div class="text-sm md:text-base text-gray-700">
                    {{ data.size }}
                  </div>
                </td>
                <td class="py-4 px-1">
                  <span class="bg-blue-50 py-0.5 px-2.5 rounded-full text-sm text-blue-400">
                    {{ data.type }}
                  </span>
                </td>
                <td class="py-4 pr-6">
                  <files-drop-down @sending="$modal.show('sending-options')" @moving="$modal.show('moving-options')" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </GwPagination>
    <div v-else class="flex justify-around">
      <div class="mt-5 text-center">
        <h4 class="font-bold text-gray-700 mb-1">
          Nothing saved in local storage.
        </h4>
        <p class="text-sm text-gray-500 mb-4">
          We want to make your world easier by connecting and <br> managing your storage.
        </p>
        <button class="primary-color rounded-lg px-4 py-2" type="button">
          <i class="fi-rr-plus text-white"></i>
          <span class="text-font-medium text-white text-base ml-2">New Storage</span>
        </button>
      </div>
    </div>

    <modal
      name="sending-options"
      width="512px"
      height="552px"
      :adaptive="true"
    >
      <files-sending-options @close="$modal.hide('sending-options')" />
    </modal>

    <modal
      name="moving-options"
      width="512px"
      height="360px"
      :adaptive="true"
    >
      <files-moving-options @close="$modal.hide('moving-options')" />
    </modal>
  </div>
</template>

<script>
export default {
  name: 'LocalStorage',
  data () {
    return {
      showOptions: false,
      quickSearchQuery: '',
      searchField: 'Name',
      searchFields: ['Name'],
      options: this.filteredRecords,
      filteredRecords: [
        {
          _id: 1,
          title: 'Course videos',
          owner: 'me',
          dateModified: new Date(),
          size: '6kb',
          type: 'folder'
        },
        {
          _id: 2,
          title: 'Puppy Course 1, Learning to walk on lead',
          owner: 'me',
          dateModified: new Date(),
          size: '60MB',
          type: 'mp4'
        },
        {
          _id: 3,
          title: 'Course videos',
          owner: 'me',
          dateModified: new Date(),
          size: '6kb',
          type: 'PDF'
        },
        {
          _id: 4,
          title: 'Course videos',
          owner: 'me',
          dateModified: new Date(),
          size: '6kb',
          type: 'mp4'
        },
        {
          _id: 5,
          title: 'Course videos',
          owner: 'me',
          dateModified: new Date(),
          size: '6kb',
          type: 'xsl'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
