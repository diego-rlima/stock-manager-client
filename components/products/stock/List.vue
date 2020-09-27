<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      items-per-page-all-text="false"
      item-key="id"
      disable-sort
      class="elevation-1"
    >
      <template v-slot:top>
        <ListHeader
          :product="product"
          @updateFilter="updateFilter"
          @updateStock="updateStock"
        />
      </template>

      <template v-slot:item.type="{ item }">
        <v-chip
          class="ma-2"
          :color="getTypeColor(item)"
          text-color="white"
        >
          {{ item.type }}
        </v-chip>
      </template>

      <template v-slot:item.description="{ item }">
        <div class="text-truncate" style="max-width: 250px;">
          {{ item.description }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ListHeader from '~/components/products/stock/ListHeader'

export default {
  name: 'StockList',
  components: {
    ListHeader
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      items: [],
      totalItems: 0,
      loading: true,
      filter: {
        start: null,
        end: null
      },
      options: {
        page: 1,
        itemsPerPage: 10
      },
      headers: [
        {
          text: 'Type',
          align: 'start',
          value: 'type'
        },
        {
          text: 'Qty',
          value: 'qty'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Date',
          value: 'created_at'
        }
      ]
    }
  },
  watch: {
    search () {
      this.getDataFromApi()
    },
    options: {
      handler () {
        this.getDataFromApi()
      },
      deep: true
    }
  },
  mounted () {
    this.getDataFromApi()
  },
  methods: {
    async makeRequest () {
      this.loading = true
      return await this.$axios.get(`/products/${this.product.id}/stock`, {
        params: this.getParams()
      })
    },
    async getDataFromApi () {
      this.loading = true

      return await this.makeRequest()
        .then((data) => {
          this.items = data.items
          this.totalItems = data.total
        })
        .catch(() => {
          this.$router.push('/')
        })
        .finally(() => {
          this.loading = false
        })
    },
    getParams () {
      return {
        sf_Start: this.filter.start,
        sf_End: this.filter.end,
        limit: this.options.itemsPerPage,
        page: this.options.page
      }
    },
    getTypeColor (item) {
      return item.type === 'increase' ? 'green' : 'red'
    },
    updateStock () {
      this.$emit('updateStock')
    },
    updateFilter (filter) {
      this.filter = filter
    }
  }
}
</script>
