import { createApp, h} from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()

const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/graphql",
    })
  );

const link = split(
    ({query})=>{
    const definition = getMainDefinition(query)
    return (
        definition.kind === 'OperationDefinition' && 
        definition.operation === 'subscription'
    )

}, 
wsLink, 
httpLink
)

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = createApolloProvider({
    defaultClient: link,
    /*client1: apolloClient, //Para agregar mas clientes
    client2: apolloClient,*/
})

/* Paquete = @vue/apollo-option */
/* Una solo conexión y composition API con apollo */

const app = createApp({
    render: () => h(App),
})

app.use(router).use(apolloProvider).mount('#app')

/* si son varios*/

