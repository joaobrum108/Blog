<template>
  <v-container v-if="birthdays.length > 0">
    <v-row>
      <v-col cols="12" md="6" v-for="birthday in birthdays" :key="birthday.id">
        <v-card class="mb-4">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">
              {{ birthday.nome }}
            </span>
            <v-chip color="primary" size="small">
              {{ birthday.cargo }}
            </v-chip>
          </v-card-title>              
          <v-card-text>
            <div class="d-flex align-center mb-4">
              <v-avatar size="64" class="mr-4">
                <v-img :src="birthday.foto || 'https://via.placeholder.com/64x64?text=Sem+Foto'"></v-img>
              </v-avatar>
              <div>
                <p class="mb-1">
                  <strong>Data de Nascimento:</strong> {{ formatarData(birthday.dataNascimento) }}
                </p>
                <p v-if="birthday.departamento" class="mb-0">
                  <strong>Departamento:</strong> {{ birthday.departamento }}
                </p>
              </div>
            </div>
            <p v-if="birthday.mensagem">
              "{{ birthday.mensagem }}"
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn icon @click="$emit('edit-birthday', birthday)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('delete-birthday', birthday)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  birthdays: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit-birthday', 'delete-birthday'])

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR')
}
</script>