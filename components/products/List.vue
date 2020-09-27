<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="products"
    :options.sync="options"
    :server-items-length="totalProducts"
    :loading="loading"
    item-key="id"
    show-select
    disable-sort
    class="elevation-1"
  >
    <template v-slot:top>
      <ListHeader @submit="searchSubmitted" @createProduct="createProduct" />
    </template>
    <template v-slot:item.in_stock="{ item }">
      <span :class="getQtyClass(item)">{{ item.in_stock }}</span>
    </template>

    <template v-slot:item.price="{ item }">
      <span v-if="!item.price">Price not defined</span>

      <div v-else-if="item.promotional_price">
        <span class="text-decoration-line-through grey--text">$ {{ item.price }}</span>
        <span class="text-decoration-underline">$ {{ item.promotional_price }}</span>
      </div>

      <span v-else>$ {{ item.price }}</span>
    </template>

    <template v-slot:item.description="{ item }">
      <div class="text-truncate" style="max-width: 250px;">
        {{ item.description }}
      </div>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editProduct(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="showStockList(item)"
      >
        mdi-view-list-outline
      </v-icon>
      <v-icon
        small
        @click="removeProduct(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:footer>
      <v-btn
        v-if="totalSelected > 0"
        absolute
        text
        class="mt-3 ml-2"
        @click="selected = []"
      >
        Clear selected ({{ totalSelected }})
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import ListHeader from '~/components/products/ListHeader'

export default {
  name: 'ProductsList',
  components: {
    ListHeader
  },
  data () {
    return {
      selected: [],
      products: [],
      totalProducts: 0,
      loading: true,
      search: null,
      options: {
        page: 1,
        itemsPerPage: 10
      },
      headers: [
        {
          text: 'Title',
          align: 'start',
          value: 'title'
        },
        {
          text: 'SKU',
          value: 'sku'
        },
        {
          text: 'Qty',
          value: 'in_stock'
        },
        {
          text: 'Price',
          value: 'price'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Actions',
          value: 'actions'
        }
      ]
    }
  },
  computed: {
    totalSelected () {
      return this.selected.length
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
    },
    selected () {
      this.emitSelected()
    }
  },
  mounted () {
    this.getDataFromApi()
  },
  methods: {
    async makeRequest () {
      this.loading = true
      return await this.$axios.get('/products', {
        params: this.getParams()
      })
    },
    async getDataFromApi () {
      this.loading = true

      return await this.makeRequest()
        .then((data) => {
          this.products = data.items
          this.totalProducts = data.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    getParams () {
      return {
        s: this.search,
        limit: this.options.itemsPerPage,
        page: this.options.page
      }
    },
    getQtyClass (item) {
      if (item.in_stock <= 0) {
        return 'red--text'
      }

      if (item.in_stock <= 15) {
        return 'amber--text'
      }

      return ''
    },
    editProduct (item) {
      this.$emit('editProduct', item.id)
    },
    removeProduct (item) {
      this.$emit('removeProduct', item.id)
    },
    searchSubmitted (value) {
      this.search = value
    },
    createProduct () {
      this.$emit('createProduct')
    },
    showStockList (item) {
      this.$router.push(`/stock/${item.id}`)
    },
    emitSelected () {
      this.$emit('selected', this.selected)
    }
  }
}
</script>
