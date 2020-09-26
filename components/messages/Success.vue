<template>
  <v-snackbar
    v-model="hasMessage"
    color="success"
  >
    {{ getMessage }}

    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="emptyMessage"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SuccessMessage',
  computed: {
    ...mapState(['messages']),
    getMessage () {
      return this.messages.success || ''
    },
    hasMessage: {
      get () {
        return this.getMessage.length > 0
      },
      set () {
        this.emptyMessage()
      }
    }
  },
  methods: {
    emptyMessage () {
      this.setSuccess('')
    },
    ...mapMutations({
      setSuccess: 'messages/setSuccess'
    })
  }
}
</script>
