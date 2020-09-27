<template>
  <v-toolbar flat color="white" class="pt-4 mb-4">
    <v-icon
      class="mr-2"
      @click="showProductsList"
    >
      mdi-arrow-left
    </v-icon>

    <v-toolbar-title>
      {{ `Historic of stock from '${product.title}'` }}
    </v-toolbar-title>

    <v-spacer />

    <v-btn
      color="primary"
      dark
      class="mb-2"
      @click="updateStock"
    >
      Update Stock
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ListHeader',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      filter: {
        start: null,
        end: null
      }
    }
  },
  methods: {
    updateFilter () {
      this.$emit('updateFilter')
    },
    updateStock () {
      this.$emit('updateStock', this.filter)
    },
    showProductsList () {
      this.$router.push('/')
    }
  }
}
</script>
