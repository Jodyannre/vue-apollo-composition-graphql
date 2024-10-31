import { createApp, provide, h} from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

const apolloPrivider = createApolloProvider({
    defaultClient: apolloClient,
    /*client1: apolloClient, //Para agregar mas clientes
    client2: apolloClient,*/
})

/* Paquete = @vue/apollo-option */
/* Una solo conexión y composition API con apollo */

const app = createApp({
    render: () => h(App),
})

app.use(router).use(apolloPrivider).mount('#app')

/* si son varios*/

