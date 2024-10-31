<template>
    <h1>Hello world</h1>
    <button @click="createComment(/*{name:'Joel',text:'Hello world from graphql'}*/)">Create comment</button>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import { useMutation } from '@vue/apollo-composable';
    import gql from 'graphql-tag';

    export default defineComponent({
        setup() {
            const { mutate: createComment, loading, error, onDone, onError } = useMutation(gql`
                mutation($name: String!, $text: String!){
                    createComment(name: $name, text: $text)
                    }
            `, ()=>({variables: {
                name:'Joel', 
                text:'Hello world from graphql 3'
            },
            update: (cache, {data}) => {  // Se puede actualizar diretamente le cache y recargar la data sin hacer otra peticion
                console.log(data); 
            }
            }));

            onDone(() => {
                alert("Comment created");
            });

            return {
                createComment,
                loading,
                error,
            }
        }

    });
</script>
  
<style scoped>
    .error {
        color: red;
    }
</style>
  