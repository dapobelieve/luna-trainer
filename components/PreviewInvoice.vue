<template>
  <div >
    <div>
      <h1 class="tail-capitalize tail-text-black tail-font-medium tail-text-lg">
        preview
      </h1>
      <small class="tail-text-gray-500">
        A short description about this section
      </small>
    </div>
    <section>
      <ul class="tabs tail-flex tail-space-x-3">
        <button id="defaultOpen" class="tablinks" @click.prevent="switchTabs($event, 'Email')">
          Email
        </button>
        <button class="tablinks" @click.prevent="switchTabs($event, 'PDF')">
          Invoice PDF
        </button>
      </ul>
      <!-- Tab contents -->
      <div id="Email" class="tabcontent">
        <InvoiceEmail :invoice="this.invoice"/>
      </div>
      <div id="PDF" class="tabcontent">
        <InvoicePDF :invoice="this.invoice"/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PreviewInvoice',
  props: {
    invoice: Object
  }, 
  mounted () {
    document.getElementById('defaultOpen').click()
  },
 
  methods: {
    switchTabs (evt, cityName) {
      // Declare all variables
      let i, tabcontent, tablinks

      // Get all elements with class="tabcontent" and hide them
      // eslint-disable-next-line prefer-const
      tabcontent = document.getElementsByClassName('tabcontent')
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
      }

      // Get all elements with class="tablinks" and remove the class "active"
      // eslint-disable-next-line prefer-const
      tablinks = document.getElementsByClassName('tablinks')
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = 'block'
      evt.currentTarget.className += ' active'
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  color: rgb(128, 123, 123)
}
.tabs button {
  transition: 0.3s;;
}
.tabs button.active {
  color: #000;
  font-weight: 500;
}
.tabcontent {
  display: none;
}
</style>
