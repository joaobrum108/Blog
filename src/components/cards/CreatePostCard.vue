<template>
  <v-card class="pa-6" color="white">
    <v-card-title class="d-flex align-center pb-3">
      <v-icon color="success" large class="mr-3">mdi-plus-circle</v-icon>
      <span class="text-h5 font-weight-medium">Criar Nova Publicação</span>
    </v-card-title>
    <v-card-text>
      <p class="text-body-1 mb-4">
        Comece uma nova publicação para compartilhar seus conhecimentos e ideias
      </p>
      <v-btn 
        color="success" 
        large
        @click="$emit('create-post')"
        class="px-6"
      >
        <v-icon left>mdi-pencil-plus</v-icon>
        Criar Nova Publicação
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineEmits(['create-post'])
</script>