<template>
  <v-dialog :model-value="modelValue" max-width="800" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Criar Nova Publicação</span>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-card-text class="pa-6">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="postData.titulo"
                label="Título"
                :rules="[v => !!v || 'Título é obrigatório']"
                required
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-textarea
                v-model="postData.descricao"
                label="Descrição"
                :rules="[v => !!v || 'Descrição é obrigatória']"
                rows="3"
                required
              ></v-textarea>
            </v-col>
            
            <v-col cols="12">
              <v-textarea
                v-model="postData.conteudo"
                label="Conteúdo"
                :rules="[v => !!v || 'Conteúdo é obrigatório']"
                rows="6"
                required
              ></v-textarea>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="postData.categoria"
                label="Categoria"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="6">
              <!-- SIMPLIFICADO - SÓ ISSO AQUI -->
              <v-file-input
                v-model="postData.arquivoImagem"
                label="Imagem de Capa"
                accept="image/*"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">Cancelar</v-btn>
        <v-btn 
          color="success" 
          :loading="loading"
          @click="criar"
          :disabled="!valid"
        >
          Criar Publicação
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean
})

const emit = defineEmits(['update:modelValue', 'create', 'close'])

const valid = ref(false)
const postData = ref({
  titulo: '',
  descricao: '',
  conteudo: '',
  categoria: '',
  arquivoImagem: null
})

const criar = () => {
  emit('create', postData.value)
}

watch(() => props.modelValue, (valor) => {
  if (!valor) {
    postData.value = { titulo: '', descricao: '', conteudo: '', categoria: '', arquivoImagem: null }
  }
})
</script>