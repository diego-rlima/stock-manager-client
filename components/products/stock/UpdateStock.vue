<template>
  <v-form
    @submit="updateStock"
    @keyup.native.enter="updateStock"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="stock.type"
                :items="types"
                label="Type"
                :error-messages="getErrors('type')"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="stock.qty"
                label="Qty"
                type="number"
                :error-messages="getErrors('qty')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="stock.description"
                label="Description"
                :error-messages="getErrors('description')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          :loading="loading"
          @click="updateStock"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'UpdateStock',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      types: [
        {
          text: 'Increase',
          value: 'increase'
        },
        {
          text: 'Decrease',
          value: 'decrease'
        }
      ],
      stock: {
        type: null,
        qty: null,
        description: null
      },
      errors: {}
    }
  },
  computed: {
    formTitle () {
      return `Update the stock for product '${this.product.title}'`
    }
  },
  methods: {
    async makeRequest () {
      this.loading = true
      return await this.$axios.post(`/products/${this.product.id}/stock`, this.stock)
    },
    async updateStock () {
      this.loading = true
      this.errors = {}

      return await this.makeRequest()
        .then((data) => {
          this.created(data)
        })
        .catch((error) => {
          this.errors = error.errors
        })
        .finally(() => {
          this.loading = false
        })
    },
    getErrors (input) {
      return this.errors[input] || []
    },
    cancel () {
      this.$emit('cancel')
    },
    created (data) {
      this.$emit('created', data || this.stock)
    }
  }
}
</script>
