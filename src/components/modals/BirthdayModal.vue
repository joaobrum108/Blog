<template>
  <v-dialog :model-value="modelValue" max-width="800" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Adicionar Aniversariante</span>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-card-text class="pa-6">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="birthdayData.nome"
                label="Nome Completo"
                variant="solo-filled"
                :rules="[v => !!v || 'Nome é obrigatório']"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="birthdayData.cargo"
                label="Cargo/Função"
                variant="solo-filled"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-menu
                v-model="mostrarSeletorData"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on: attrs }">
                  <v-text-field
                    v-model="dataNascimentoFormatada"
                    label="Data de Nascimento"
                    variant="solo-filled"
                    :rules="[v => !!v || 'Data de nascimento é obrigatória']"
                    readonly
                    v-bind="attrs"
                    outlined
                    required
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="birthdayData.dataNascimento"
                  @input="mostrarSeletorData = false"
                  locale="pt-BR"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="birthdayData.departamento"
                label="Departamento"
                variant="solo-filled"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-file-input
                v-model="birthdayData.arquivoFoto"
                label="Foto do Aniversariante"
                accept="image/*"
                variant="solo-filled"
                prepend-icon="mdi-camera"
                placeholder="Selecione uma foto (opcional)"
                outlined
                @change="manipularUploadFoto"
              ></v-file-input>
              
              <div v-if="previewFoto" class="mt-2">
                <v-img
                  :src="previewFoto"
                  max-height="150"
                  max-width="150"
                  class="rounded-circle"
                ></v-img>
                <v-btn 
                  small 
                  text 
                  color="error" 
                  @click="removerFoto"
                  class="mt-1"
                >
                  <v-icon small>mdi-delete</v-icon>
                  Remover Foto
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="birthdayData.mensagem"
                label="Mensagem Personalizada"
                variant="solo-filled"
                rows="3"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">Cancelar</v-btn>
        <v-btn 
          color="primary" 
          :loading="loading"
          @click="adicionar"
          :disabled="!valid"
        >
          <v-icon left>mdi-account-plus</v-icon>
          Adicionar Aniversariante
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'add', 'close'])

const form = ref(null)
const valid = ref(false)
const mostrarSeletorData = ref(false)
const previewFoto = ref(null)

const birthdayData = ref({
  nome: '',
  cargo: '',
  dataNascimento: null,
  departamento: '',
  arquivoFoto: null,
  mensagem: ''
})

const dataNascimentoFormatada = computed(() => {
  if (!birthdayData.value.dataNascimento) return ''
  const data = new Date(birthdayData.value.dataNascimento)
  return data.toLocaleDateString('pt-BR')
})

const manipularUploadFoto = (event) => {
  const arquivos = event.target.files
  if (arquivos && arquivos.length > 0) {
    const arquivo = arquivos[0]
    birthdayData.value.arquivoFoto = arquivo
    
    const leitor = new FileReader()
    leitor.onload = (e) => {
      previewFoto.value = e.target.result
    }
    leitor.readAsDataURL(arquivo)
  } else {
    birthdayData.value.arquivoFoto = null
    previewFoto.value = null
  }
}

const removerFoto = () => {
  previewFoto.value = null
  birthdayData.value.arquivoFoto = null
}

const adicionar = () => {
  emit('add', birthdayData.value)
}

const reset = () => {
  birthdayData.value = {
    nome: '',
    cargo: '',
    dataNascimento: null,
    departamento: '',
    arquivoFoto: null,
    mensagem: ''
  }
  previewFoto.value = null
  if (form.value) {
    form.value.resetValidation()
  }
}

watch(() => props.modelValue, (valor) => {
  if (!valor) {
    reset()
  }
})
</script>