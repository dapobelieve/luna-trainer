<template>
  <modal name="invite-client" height="auto" :adaptive="true">
    <InviteNewClient id="clientModalInvite" class="tail-m-6" @close="$modal.hide('invite-client')" />
  </modal>
</template>

<script>
export default {
  name: 'InviteNewClientModal'
}
</script>
