<template>
  <v-main justify="center" style="background-color: #f5f5f5;">
    <v-container max-width="1280">
      <v-row class="mt-10" justify="center">
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold" style="color: #db0e35;">Admin Dashboard</h1>
          <p class="subtitle mt-2">
            Welcome to the admin panel. Here you can manage users, view analytics, and configure settings.
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-4" style="border-radius: 6px;">
            <v-card-title class="text-h5 d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-pencil</v-icon>
              Crie um novo post
            </v-card-title>
            <v-card-subtitle class="mb-2">
              Compartilhe atualizações, notícias ou anúncios com sua comunidade.
            </v-card-subtitle>
            <v-card-text>
              <p class="text-body-2">
                Clique no botão abaixo para começar a escrever seu post.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block class="text-none" prepend-icon="mdi-plus" @click="criarPost">
                Criar Post
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-4" style="border-radius: 6px;">
            <v-card-title class="text-h5 d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-file-pdf-box</v-icon>
              Envie o PDF dos aniversariantes do mês
            </v-card-title>
            <v-card-subtitle class="mb-2">
              Aqui você pode fazer o upload do PDF dos aniversariantes.
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" block class="text-none" prepend-icon="mdi-upload" @click="editarPdf">
                Enviar PDF
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>


        <v-dialog max-width="600" v-model="modalPost">
          <v-card>
            <v-card-title class="text-h6 font-weight-bold">
              Crie um novo post
            </v-card-title>

            <v-card-text>
              <v-form>

                <v-text-field v-model="form.titulo" label="Título" required></v-text-field>

                <v-textarea v-model="form.descricao" label="Descrição" rows="3" auto-grow></v-textarea>

                <v-text-field v-model="form.categoria" label="Categoria" required></v-text-field>

                <v-text-field v-model="form.tempoLeitura" label="Tempo de Leitura (minutos)" type="number"></v-text-field>

                <v-text-field v-model="form.dataPublicacao" label="Data de Publicação" type="date"></v-text-field>

                <v-text-field v-model="form.autor" label="Autor"></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" @click="salvarPost">Salvar</v-btn>
              <v-btn color="secondary" @click="modalPost = false">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog max-width="500" v-model="modalPdf">
          <v-card>
            <v-card-title>Upload PDF</v-card-title>
            <v-card-text>
              <v-file-input label="Selecione o PDF" accept=".pdf"></v-file-input>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="modalPdf = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-divider></v-divider>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'

const modalPost = ref(false)
const modalPdf = ref(false)

const form = ref({
  titulo: '',
  descricao: '',
  categoria: '',
  tempoLeitura: '',
  dataPublicacao: '',
  autor: ''
})

function salvarPost() {
  console.log('Dados do formulário:', form.value)
  modalPost.value = false
}

const criarPost = () => {
  modalPost.value = true
}
const editarPdf = () => {
  modalPdf.value = true
}
</script>

<style scoped>
.subtitle {
  color: #555;
}
</style>
