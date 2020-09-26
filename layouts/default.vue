<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      light
      :fixed="fixed"
      elevate-on-scroll
    >
      <v-btn
        v-for="(item, n) in items"
        :key="n"
        :to="item.to"
        text
      >
        {{ item.title }}
      </v-btn>

      <v-spacer />

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-menu
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="36">
              <img
                :src="user.avatar"
                :alt="user.name"
              >
            </v-avatar>
          </v-btn>
        </template>

        <v-list light>
          <v-list-item
            v-for="(item, n) in userMenu"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <ErrorMessage />
    <SuccessMessage />

    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ErrorMessage from '~/components/messages/Error'
import SuccessMessage from '~/components/messages/Success'

export default {
  components: {
    ErrorMessage,
    SuccessMessage
  },
  data () {
    return {
      fixed: true,
      items: [
        {
          title: 'Products',
          to: '/'
        }
      ],
      user: {
        name: 'John',
        avatar: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&h=40&q=80'
      },
      userMenu: [
        {
          title: 'My account'
        },
        {
          title: 'Log out'
        }
      ],
      title: 'Stock Manager'
    }
  }
}
</script>
