<template>
  <Form
    :product="product"
    :loading="loading"
    :errors="errors"
    @submit="createProduct"
    @cancel="cancel"
  />
</template>

<script>
import Form from '~/components/products/Form'

export default {
  name: 'CreateProduct',
  components: {
    Form
  },
  data () {
    return {
      loading: false,
      product: {},
      errors: {}
    }
  },
  methods: {
    async makeRequest () {
      this.loading = true
      return await this.$axios.post('/products', this.product)
    },
    async createProduct (product) {
      this.loading = true
      this.product = product
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
    cancel () {
      this.$emit('cancel')
    },
    created (data) {
      this.$emit('created', data || this.product)
    }
  }
}
</script>
