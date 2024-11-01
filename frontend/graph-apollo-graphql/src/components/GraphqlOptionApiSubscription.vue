<template>
    <div></div>
</template>
  
<script lang="ts">
import gql from 'graphql-tag';
import { defineComponent } from 'vue'

export default defineComponent({
        data() {
            return {
                comments: [],
            }
        },
        apollo: {
            $subscribe: {
                comments: {
                    query: gql`
                        subscription {
                            comments: commentCreated {
                                name
                                text
                            }
                        }
                    `,
                },
                results({data}){
                    this.comments.push(data.commentCreated)
                }
            }
        }
    })
</script>
  
<style scoped>
</style>
  