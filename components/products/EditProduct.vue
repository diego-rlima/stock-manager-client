<template>
  <div>
    <Form
      v-if="loaded"
      :product="product"
      :loading="loading"
      :errors="errors"
      @submit="updateProduct"
      @cancel="cancel"
    />

    <v-card v-else>
      <v-card-text class="text-center">
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Form from '~/components/products/Form'

export default {
  name: 'EditProduct',
  components: {
    Form
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      loaded: false,
      product: {},
      errors: {}
    }
  },
  computed: {
    getUrl () {
      return `/products/${this.id}`
    }
  },
  mounted () {
    this.fetchProduct()
  },
  methods: {
    async fetchProductRequest () {
      return await this.$axios.get(this.getUrl)
    },
    async fetchProduct () {
      return await this.fetchProductRequest()
        .then((data) => {
          this.product = data
          this.loaded = true
        })
        .catch(() => {
          this.cancel()
        })
    },
    async makeUpdateRequest () {
      this.loading = true
      return await this.$axios.patch(this.getUrl, this.product)
    },
    async updateProduct (product) {
      this.loading = true
      this.product = product
      this.errors = {}

      return await this.makeUpdateRequest()
        .then((data) => {
          this.edited(data)
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
    edited (data) {
      this.$emit('edited', data || this.product)
    }
  }
}
</script>
