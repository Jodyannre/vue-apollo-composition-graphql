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
  
<script lang="ts" setup>
    import { useQuery } from '@vue/apollo-composable';
    import gql from 'graphql-tag';

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

            onResult((queryResult)=>{
                console.log(queryResult);
            });
            
            onError((errors)=>{
                console.log(errors.graphQLErrors);
            });

</script>
  
<style scoped>
    .error {
        color: red;
    }
</style>
  