<template>
  <div class="home">
    <GraphqlCompositionSuscription />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GraphqlComposition from '@/components/GraphqlComposition.vue';
import GraphqlCompositionSetup from '@/components/GraphqlCompositionSetup.vue';
import GraphqlCompositionMutation from '@/components/GraphqlCompositionMutation.vue';
import GraphqlCompositionSuscription from '@/components/GraphqlCompositionSuscription.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    GraphqlCompositionSuscription,
  },
});
</script>
