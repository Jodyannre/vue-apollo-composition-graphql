import { createApp, provide, h} from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { DefaultApolloClient, ApolloClients } from '@vue/apollo-composable'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()
/*
const wsLink = new GraphQLWsLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true
    }
})
*/
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
    link,
    cache
})


/* Paquete = @vue/apollo-composable */
/* Una solo conexión y composition API con apollo */

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(router).mount('#app')

/* si son varios*/
/*
const app = createApp({
    setup() {
        provide(ApolloClients, {
            default: apolloClient,
            cliente1: apolloClient,
            cliente2: apolloClient2
            cliente3: apolloClient3
        })
    },
    render: () => h(App),
})
*/
