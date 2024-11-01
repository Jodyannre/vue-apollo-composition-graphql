<template>
    <div v-if="$apollo.queries.comments.loading"> Loading...</div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import { gql} from '@apollo/client/core';

    export default defineComponent({
        name: 'GraphqlOptionApi',

        methods: {
            addComment() {
                this.$apollo.mutate({
                    mutation: gql`
                    mutation($name: String!, $text: String!) {
                        addComment(name: $name, text: $text) {
                            name
                            text
                        }
                    }
                    `,
                    variables() {
                        return {
                            name: 'John',
                            text: 'Hello World'
                        }
                    },
                    update: (cache, { data: { createComment } }) => {
                        let data = cache.readQuery({query:comments})
                        data = [
                            ...data.getCommentsFromUser,
                            createComment
                        ]
                        cache.writeQuery({query:comments,data})
                    }
                })
            }
        }
    })

</script>
  
<style scoped>
</style>
  