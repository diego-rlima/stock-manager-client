<template>
  <div :key="pageKey">
    <div v-if="product">
      <v-card>
        <StockList
          :product="product"
          @updateStock="updateStock"
        />
      </v-card>

      <v-dialog
        v-model="creating"
        width="500"
      >
        <UpdateStock
          v-show="creating"
          :product="product"
          @created="stockUpdated"
          @cancel="cancelActions"
        />
      </v-dialog>
    </div>

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
import StockList from '~/components/products/stock/List'
import UpdateStock from '~/components/products/stock/UpdateStock'

export default {
  components: {
    StockList,
    UpdateStock
  },
  data () {
    return {
      pageKey: 1,
      product: null,
      creating: false
    }
  },
  computed: {
    id () {
      return parseInt(this.$route.params.id)
    }
  },
  mounted () {
    this.getProductDataFromApi()
  },
  methods: {
    async makeProductRequest () {
      this.loading = true
      return await this.$axios.get(`/products/${this.id}`)
    },
    async getProductDataFromApi () {
      return await this.makeProductRequest()
        .then((data) => {
          this.product = data
        })
        .catch(() => {
          this.$router.push('/')
        })
    },
    updateStock () {
      this.creating = true
    },
    stockUpdated () {
      this.updateKey()
      this.cancelActions()
    },
    cancelActions () {
      this.creating = false
    },
    updateKey () {
      this.pageKey++
    }
  }
}
</script>
