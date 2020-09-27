<template>
  <v-form
    @submit="submitForm"
    @keyup.native.enter="submit"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="productData.title"
                label="Title"
                :autofocus="!exists"
                aria-required="true"
                :error-messages="getErrors('title')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :sm="exists ? 12 : 6">
              <v-text-field
                v-model="productData.sku"
                label="SKU"
                :error-messages="getErrors('sku')"
              />
            </v-col>
            <v-col v-if="!exists" cols="12" sm="6">
              <v-text-field
                v-model="productData.qty"
                label="Initial qty"
                type="number"
                :error-messages="getErrors('qty')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="productData.price"
                label="Normal price"
                prefix="$"
                type="number"
                :error-messages="getErrors('price')"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="productData.promotional_price"
                label="Promotional price"
                prefix="$"
                type="number"
                :error-messages="getErrors('promotional_price')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="productData.description"
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
          @click="submit"
        >
          {{ saveButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'ProductForm',
  props: {
    product: {
      type: Object,
      default: null,
      required: false
    },
    errors: {
      type: Object,
      default: () => ({}),
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      productData: {
        id: null,
        title: null,
        sku: null,
        description: null,
        qty: null,
        price: null,
        promotional_price: null
      }
    }
  },
  computed: {
    exists () {
      return !!this.productData.id
    },
    formTitle () {
      return this.exists ? 'Edit Product' : 'Add Product'
    },
    saveButtonText () {
      return this.exists ? 'Save' : 'Add'
    }
  },
  mounted () {
    if (this.product !== null) {
      this.productData = this.product
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$emit('submit', this.productData)
    },
    submitForm (event) {
      event.preventDefault()

      this.submit()
    },
    getErrors (input) {
      return this.errors[input] || []
    }
  }
}
</script>
