<template>
  <v-dialog :model-value="modelValue" max-width="500" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Editar Publicação</span>
        <v-btn icon @click="$emit('update:modelValue', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p>Tem certeza que deseja editar a publicação <strong>"{{ post?.titulo }}"</strong>?</p>
        <v-alert v-if="post?.status === 'publicado'" type="info" class="mt-4">
          Esta publicação está atualmente <strong>publicada</strong>. As alterações serão visíveis imediatamente.
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="primary" @click="$emit('confirm')">
          <v-icon left>mdi-pencil</v-icon>
          Editar Publicação
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  post: {
    type: Object,
    default: null
  }
})

defineEmits(['update:modelValue', 'confirm'])
</script>