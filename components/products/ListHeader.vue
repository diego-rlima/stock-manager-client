<template>
  <v-form
    @submit="submitForm"
  >
    <v-toolbar flat color="white" class="pt-4 mb-4">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-divider
        class="mx-4"
        inset
        vertical
      />

      <v-btn
        icon
        @click="clickedButton"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-text-field
        v-show="searching"
        ref="search"
        v-model="search"
        placeholder="Search products"
        hide-details
        single-line
      />

      <v-spacer />

      <v-btn
        color="primary"
        dark
        class="mb-2"
      >
        New Product
      </v-btn>
    </v-toolbar>
  </v-form>
</template>

<script>
export default {
  name: 'ListHeader',
  props: {
    title: {
      type: String,
      default: 'Products'
    }
  },
  data () {
    return {
      search: null,
      searching: false
    }
  },
  methods: {
    emitSearch () {
      this.$emit('submit', this.search)
    },
    submitForm (event) {
      event.preventDefault()

      this.emitSearch()
    },
    focusInput () {
      if (!this.searching) {
        return
      }

      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    clickedButton () {
      if (this.search === null) {
        this.searching = !this.searching

        this.focusInput()
        return
      }

      if (this.searching) {
        this.emitSearch()
      }
    }
  }
}
</script>
