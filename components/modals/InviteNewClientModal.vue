<template>
  <modal name="inviteClientModal" height="auto" :adaptive="true">
    <InviteNewClient class="tail-m-6" @close="$modal.hide('inviteClientModal')" />
  </modal>
</template>

<script>
export default {
  name: 'InviteNewClientModal'
}
</script>
