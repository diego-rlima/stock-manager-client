<template>
  <v-dialog
    v-model="hasError"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Ops...
      </v-card-title>

      <v-card-text>
        {{ getError }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          text
          @click="emptyMessage()"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ErrorMessage',
  computed: {
    ...mapState(['messages']),
    getError () {
      return this.messages.error || ''
    },
    hasError: {
      get () {
        return this.getError.length > 0
      },
      set () {
        this.emptyMessage()
      }
    }
  },
  methods: {
    emptyMessage () {
      this.setError('')
    },
    ...mapMutations({
      setError: 'messages/setError'
    })
  }
}
</script>
