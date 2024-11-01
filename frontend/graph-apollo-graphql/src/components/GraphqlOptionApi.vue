<template>
    <div v-if="$apollo.queries.comments.loading"> Loading...</div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import { gql} from '@apollo/client/core';

    export default defineComponent({
        name: 'GraphqlOptionApi',
        apollo: {
            comments: {
                query: gql`
                query($name: String!) {
                    getCommentsFromUser(name: $name) {
                        name
                        text
                    }
                } 
                `,
                variables()  {
                    return  {
                        name: 'John'
                    }
                },
                fetchPolicy: 'cache-and-network',
            }
        },
        data() {
            return {
                comments: []
            }
        },
        methods: {

        }
    })

</script>
  
<style scoped>
</style>
  