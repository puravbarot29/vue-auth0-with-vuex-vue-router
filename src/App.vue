<template>

<!--
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>

  comment -->
  <v-app>
      <v-toolbar app>
          <v-toolbar-title class="headline text-uppercase">
              <span>Auth0 - Vue - Purav B</span>
              <v-spacer></v-spacer>
              <v-btn to="/" class="mr-2"> Home </v-btn>
                <v-btn to="/aboutview" class="mr-2"> About </v-btn>
                  <v-btn to="/contact" class="mr-2"> Contacts </v-btn>
                    <v-btn to="/members" class="mr-2"> Members </v-btn>
                    <v-btn @click="logout" v-if="this.$store.state.userIsAuthorized"> Logout </v-btn>
          </v-toolbar-title>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script type="text/javascript">

export default {
  name: 'App',
  data () {
    return{

      clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID, //setting global variables using .env file
      domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN

    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth0Logout');
    }
  },
  beforeCreate(){

  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
