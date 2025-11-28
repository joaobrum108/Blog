<template>
  <v-row class="mb-4">
    <v-col cols="12" md="8" class="d-flex flex-column justify-center">
      <h1 class="text-h4 text-md-h3 font-weight-bold primary--text mb-2">
        Painel de Publicações
      </h1>
      <p class="text-body-1 text--secondary">
        Gerencie e crie conteúdo para o seu blog de forma simples e organizada
      </p>
    </v-col>
    <v-col cols="12" md="4" class="d-flex align-center justify-end">
      <v-btn 
        color="primary" 
        outlined
        class="mb-2"
        @click="$router.push('/')"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        Voltar ao Blog
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>