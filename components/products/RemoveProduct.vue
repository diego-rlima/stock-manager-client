<template>
  <v-dialog
    v-model="removing"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Attention!</span>
      </v-card-title>

      <v-card-text>
        You are about to remove a product and this action cannot be undone.

        <strong>Are you sure you want to continue?</strong>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="red"
          text
          :loading="loading"
          @click="deleteProduct"
        >
          Remove product
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'RemoveProduct',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      removing: true
    }
  },
  computed: {
    getUrl () {
      return `/products/${this.id}`
    }
  },
  methods: {
    ...mapMutations({
      setSuccess: 'messages/setSuccess'
    }),
    async makeRequest () {
      return await this.$axios.delete(this.getUrl)
    },
    async deleteProduct () {
      this.loading = true
      return await this.makeRequest()
        .then(() => {
          this.removed()
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    cancel () {
      this.removing = false
      this.$emit('cancel')
    },
    removed () {
      this.removing = false
      this.setSuccess('The product has been removed.')
      this.$emit('removed')
    }
  }
}
</script>
