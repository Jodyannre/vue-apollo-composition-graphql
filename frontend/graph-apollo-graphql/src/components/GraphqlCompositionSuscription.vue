<template>
    <h1>Notifications</h1>
    <ul>
        <li v-for="(comment,index) in comments" :key="index">
            <p><b>{{comment.name}}</b>: {{ comment.text }}</p>
        </li>

    </ul>
</template>
  
<script lang="ts">
    import { defineComponent, watch, ref, Ref } from 'vue';
    import { useSubscription } from '@vue/apollo-composable';
    import gql from 'graphql-tag';

    export default defineComponent({
        setup() {
            const comments: Ref<Array<any>> = ref([])
            const { result } = useSubscription(gql`
                subscription {
                    commentCreated {
                        name
                        text
                    }
                }
            `);

            watch(
                result, 
                data => {
                    alert("Nuevo comentario agregado")
                    comments.value.push(data.commentCreated) 
            });

            return {
                comments,
            }
        }

    });
</script>
  
<style scoped>
    .error {
        color: red;
    }
</style>
  