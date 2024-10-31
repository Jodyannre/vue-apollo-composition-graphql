<template>
    <h1>Comments</h1>
    <div v-if="loading">
        <h1>Loading...</h1>
    </div>
    <div v-else>
        <ul>
            <li v-for="(comment,index) in result.getCommentsFromUser" :key ="index">
                <p><b>{{comment.name}}</b>: {{ comment.text }}</p>
            </li>
        </ul>
    </div>
    <div v-if="error" class="error">
        <h1>Error: {{error.message}}</h1>
    </div>
    <button @click="refetch">Refetch</button>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import { useQuery } from '@vue/apollo-composable';
    import gql from 'graphql-tag';

    export default defineComponent({
        setup() {
            /*
            const {result,loading,error} = useQuery(gql`
                query {
                    getAllComments {
                        name
                        text
                    }
                }
            `);
            */

            /* Existe tambien la posibilidad de utilizar useLazyQuery*/
           const { result, loading, error, refetch, onResult, onError } = useQuery(gql`
                query($name: String!) {
                    getCommentsFromUser(name: $name) {
                        name
                        text
                    }
                }
            `, 
            ()=>({name:'Joel'}),
            {
                fetchPolicy: 'cache-and-network',
                pollInterval: 5000,
            })


            /* Posibilidades en fetchPolicy
                cache-first -- primero busca en cache y si no lo encuentra hace la consulta
                cache-and-network -- primero busca en cache y luego hace la consulta
                network-only -- hace la consulta sin importar si ya esta en cache
                cache-only -- solo muestra lo que hay en cache
                no-cache -- no muestra lo que hay en cache
            */

            onResult((queryResult)=>{
                console.log(queryResult);
            });
            
            onError((errors)=>{
                console.log(errors.graphQLErrors);
            });

            return {
                result,
                loading,
                error,
                refetch
            }
        }
    })
</script>
  
<style scoped>
    .error {
        color: red;
    }
</style>
  