<template>
  <v-dialog :model-value="modelValue" max-width="500" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Excluir Publicação</span>
        <v-btn icon @click="$emit('update:modelValue', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-alert type="error" class="mb-4">
          <strong>Atenção!</strong> Esta ação não pode ser desfeita.
        </v-alert>
        <p>Tem certeza que deseja excluir permanentemente a publicação <strong>"{{ post?.titulo }}"</strong>?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="error" @click="$emit('confirm')">
          <v-icon left>mdi-delete</v-icon>
          Excluir Permanentemente
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