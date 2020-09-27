<template>
  <div :key="pageKey">
    <v-card>
      <ProductsList
        @createProduct="createProduct"
        @editProduct="editProduct"
        @removeProduct="removeProduct"
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
  </div>
</template>

<script>
import ProductsList from '~/components/products/List'
import CreateProduct from '~/components/products/CreateProduct'
import EditProduct from '~/components/products/EditProduct'
import RemoveProduct from '~/components/products/RemoveProduct'

export default {
  components: {
    ProductsList,
    CreateProduct,
    EditProduct,
    RemoveProduct
  },
  data () {
    return {
      pageKey: 1,
      creating: false,
      editing: false,
      removing: false,
      productId: null
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
    updateKey () {
      this.pageKey++
    }
  }
}
</script>
