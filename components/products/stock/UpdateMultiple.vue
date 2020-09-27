<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-form
          @submit="updateStock"
          @keyup.native.enter="updateStock"
        >
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="cancel"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>
              Mass update of stock
            </v-toolbar-title>

            <v-spacer />

            <v-toolbar-items>
              <v-btn
                dark
                text
                :loading="loading"
                @click="updateStock"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

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
                  v-model="stock.description"
                  label="Description"
                  :error-messages="getErrors('description')"
                />
              </v-col>
            </v-row>
          </v-container>

          <v-divider />

          <v-virtual-scroll
            :items="products"
            :item-height="100"
            height="400"
          >
            <template v-slot="{ item, index }">
              <v-container v-if="stock.products.length > 0">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="item.title"
                      label="Product"
                      :prefix="`#${index + 1}`"
                      readonly
                      :error-messages="getErrors(`products.${index}.id`)"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="stock.products[index].qty"
                      label="Qty"
                      type="number"
                      :error-messages="getErrors(`products.${index}.qty`)"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-virtual-scroll>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'UpdateMultiple',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      dialog: true,
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
        description: null,
        products: []
      },
      errors: {}
    }
  },
  mounted () {
    this.prepareProductsData()
  },
  methods: {
    async makeRequest () {
      this.loading = true
      return await this.$axios.post('/products/stock', this.stock)
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
      this.dialog = false
      this.$emit('cancel')
    },
    created (data) {
      this.dialog = false
      this.$emit('created', data || this.stock)
    },
    prepareProductsData () {
      this.stock.products = this.products.map(product => ({
        id: product.id,
        qty: null
      }))
    }
  }
}
</script>
