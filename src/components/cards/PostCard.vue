<template>
  <v-card class="elevation-5 h-100" hover>
    <v-img
      height="160"
      :src="post.imagem || 'https://via.placeholder.com/300x160?text=Sem+Imagem'"
      class="align-end"
    ></v-img>
    
    <v-card-title class="text-subtitle-2 font-weight-bold">
      {{ post.titulo }}
    </v-card-title>
    
    <v-card-text class="pb-2">
      <div class="d-flex justify-space-between text-caption text--secondary mb-2">
        <span>{{ formatarData(post.dataCriacao) }}</span>
      </div>
      <p class="text-body-2 line-clamp-2">
        {{ post.descricao }}
      </p>
    </v-card-text>
    
    <v-card-actions class="pt-0">
      <v-btn 
        small 
        text 
        color="primary"
        @click="$emit('edit', post)"
      >
        <v-icon small left>mdi-pencil</v-icon>
        Editar
      </v-btn>
      <v-btn 
        small 
        text 
        color="error"
        @click="$emit('delete', post)"
      >
        <v-icon small left>mdi-delete</v-icon>
        Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR')
}
</script>