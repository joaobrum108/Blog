<template>
  <v-card-text>
    <div v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-2">Carregando publicações...</p>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-8">
      <v-icon size="64" color="grey lighten-2" class="mb-4">mdi-file-document-outline</v-icon>
      <h3 class="text-h6 mb-2">Nenhuma publicação encontrada</h3>
      <p class="text-body-2 text--secondary mb-4">
        Comece criando sua primeira publicação
      </p>
      <v-btn color="primary" @click="$emit('create-first-post')">
        Criar Primeira Publicação
      </v-btn>
    </div>

    <v-row v-else>
      <v-col 
        v-for="post in posts" 
        :key="post.id" 
        cols="12" 
        md="6" 
        lg="4"
      >
        <PostCard 
          :post="post" 
          @edit="(post) => $emit('edit-post', post)"
          @delete="(post) => $emit('delete-post', post)"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
import PostCard from './PostCard.vue'

defineProps({
  posts: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit-post', 'delete-post', 'create-first-post'])
</script>