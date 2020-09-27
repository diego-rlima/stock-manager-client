<template>
  <div :key="pageKey">
    <v-card>
      <ProductsList
        @createProduct="createProduct"
        @editProduct="editProduct"
        @removeProduct="removeProduct"
        @selected="updateSelected"
      />
    </v-card>

    <v-dialog
      v-model="creating"
      width="500"
    >
      <CreateProduct
        v-show="creating"
        @created="productCreated"
        @cancel="cancelActions"
      />
    </v-dialog>

    <v-dialog
      v-model="editing"
      width="500"
    >
      <EditProduct
        v-show="editing"
        :id="productId"
        :key="productId"
        @edited="productEdited"
        @cancel="cancelActions"
      />
    </v-dialog>

    <RemoveProduct
      v-if="removing"
      :id="productId"
      :key="productId"
      @removed="productRemoved"
      @cancel="cancelActions"
    />

    <div v-if="hasSelected">
      <v-fab-transition>
        <v-btn
          fab
          large
          dark
          bottom
          left
          fixed
          color="primary"
          @click="updatingMultiple = !updatingMultiple"
        >
          <v-badge
            color="pink"
            :content="selectedTotal"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-badge>
        </v-btn>
      </v-fab-transition>

      <UpdateMultiple
        v-if="updatingMultiple"
        :key="selectedTotal"
        :products="selectedProducts"
        @cancel="updatingMultiple = false"
        @created="updateKey"
      />
    </div>
  </div>
</template>

<script>
import ProductsList from '~/components/products/List'
import CreateProduct from '~/components/products/CreateProduct'
import EditProduct from '~/components/products/EditProduct'
import RemoveProduct from '~/components/products/RemoveProduct'
import UpdateMultiple from '~/components/products/stock/UpdateMultiple'

export default {
  components: {
    ProductsList,
    CreateProduct,
    EditProduct,
    RemoveProduct,
    UpdateMultiple
  },
  data () {
    return {
      pageKey: 1,
      creating: false,
      editing: false,
      removing: false,
      updatingMultiple: false,
      productId: null,
      selectedProducts: []
    }
  },
  computed: {
    selectedTotal () {
      return this.selectedProducts.length
    },
    hasSelected () {
      return this.selectedTotal > 0
    }
  },
  methods: {
    createProduct () {
      this.creating = true
    },
    productCreated () {
      this.creating = false
      this.updateKey()
    },
    editProduct (id) {
      this.productId = id
      this.editing = true
    },
    productEdited () {
      this.editing = false
      this.productId = null
      this.updateKey()
    },
    removeProduct (id) {
      this.productId = id
      this.removing = true
    },
    productRemoved () {
      this.removing = false
      this.productId = null
      this.updateKey()
    },
    cancelActions () {
      this.creating = false
      this.editing = false
    },
    updateSelected (products) {
      // eslint-disable-next-line no-console
      console.log(products)
      this.selectedProducts = products
    },
    updateKey () {
      this.pageKey++
    }
  }
}
</script>
