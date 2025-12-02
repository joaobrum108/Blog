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
              {{ modoEdicao ? 'Editar Post' : 'Criar novo post' }}
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
              <v-btn color="primary" @click="salvarPost">
                {{ modoEdicao ? 'Atualizar' : 'Salvar' }}
              </v-btn>
              <v-btn color="secondary" @click="fecharModal">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog max-width="500" v-model="modalPdf">
          <v-card>
            <v-card-title>Upload PDF</v-card-title>
            <v-card-text>
              <v-file-input v-model="pdfFile" label="Selecione o PDF" accept=".pdf"></v-file-input>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="modalPdf = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-col 
          v-for="noticia in noticias"
          :key="noticia.id"
          cols="12"
          md="6"
          lg="6"
        >
          <v-card 
            class="card-noticia h-100 d-flex flex-column" 
            elevation="2" 
            hover
          >
            <v-card-text class="flex-grow-1">
              <div class="card-header">
                <v-chip class="chip" color="#db0e35" text-color="white">
                  {{ noticia.categoria }}
                </v-chip>
                <span class="reading-time">🕒 {{ noticia.tempoLeitura }}</span>
              </div>

              <h3 class="titulo-noticia">
                {{ noticia.titulo }}
              </h3>

              <div class="meta-info">
                <span class="date">📅 {{ formarData(noticia.dataPublicacao) }}</span>
                <span class="divider">•</span>
                <span class="author">Por {{ noticia.autor }}</span>
              </div>

              <p class="descricao">
                {{ noticia.descricao }}
              </p>
            </v-card-text>

            <v-card-actions class="pt-0">
              <v-btn
                variant="outlined"
                class="read-more-btn ml-2 mb-2"
                @click="$router.push({ name: 'NoticiaDetalhe', params: { id: noticia.id } })"
              >
                Ler mais
              </v-btn>
              <v-btn @click="excluirPublic(noticia.id)" color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn color="primary" @click="editarPost(noticia)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { enviarPost, carregarPosts, atualizarPost, excluirPost } from '../services/blogServices'

const modalPost = ref(false)
const modalPdf = ref(false)
const pdfFile = ref(null)
const modoEdicao = ref(false)
const postIdEdicao = ref(null)

const form = ref({
  titulo: '',
  descricao: '',
  categoria: '',
  tempoLeitura: '',
  dataPublicacao: '',
  autor: ''
})

const limparForm = () => {
  form.value = {
    titulo: '',
    descricao: '',
    categoria: '',
    tempoLeitura: '',
    dataPublicacao: '',
    autor: ''
  }
}

const salvarPost = async () => {
  try {
    if (modoEdicao.value) {

      await atualizarPost(postIdEdicao.value, form.value)
      console.log('Post atualizado com sucesso!', form.value)

      noticias.value = noticias.value.map(noticia =>
        noticia.id === postIdEdicao.value ? { ...noticia, ...form.value } : noticia
      )
    } else {
      await enviarPost(form.value)
      console.log('Post criado com sucesso!', form.value)

      const response = await carregarPosts()
      noticias.value = response.data.data || response.data
    }
    
    fecharModal()
  } catch (error) {
    console.error('Erro ao salvar post:', error)
    alert('Erro ao salvar post. Por favor, tente novamente.')
  }
}

const noticias = ref([])

onMounted(async () => {
  try {
    const response = await carregarPosts()
    noticias.value = response.data.data || response.data
  } catch (error) {
    console.error("Erro ao carregar posts:", error)
  }
})

const excluirPublic = async (id) => {
  if (confirm('Tem certeza que deseja excluir este post?\nEsta ação não pode ser desfeita.')) {
    try {
      await excluirPost(id)
      console.log('Post excluído com sucesso!')
      noticias.value = noticias.value.filter(noticia => noticia.id !== id)
    } catch (error) {
      console.error('Erro ao excluir post:', error)
      alert('Erro ao excluir post. Por favor, tente novamente.')
    }
  }
}

const editarPost = (noticia) => {

  form.value = {
    titulo: noticia.titulo,
    descricao: noticia.descricao,
    categoria: noticia.categoria,
    tempoLeitura: noticia.tempoLeitura,
    dataPublicacao: noticia.dataPublicacao,
    autor: noticia.autor
  }

  postIdEdicao.value = noticia.id
  
  modoEdicao.value = true

  modalPost.value = true
}

const criarPost = () => {
  limparForm()

  modoEdicao.value = false
  postIdEdicao.value = null

  modalPost.value = true
}

const fecharModal = () => {
  modalPost.value = false
  limparForm()
  modoEdicao.value = false
  postIdEdicao.value = null
}

const editarPdf = () => {
  modalPdf.value = true
}

const formarData = (data) => {
  if (!data) return ''
  return new Date(data).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.card-noticia {
  transition: transform 0.3s ease;
}

.card-noticia:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chip {
  font-weight: bold;
}

.reading-time {
  font-size: 0.875rem;
  color: #666;
}

.titulo-noticia {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #333;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #666;
}

.divider {
  color: #999;
}

.descricao {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.read-more-btn {
  border-color: #db0e35;
  color: #db0e35;
}

.read-more-btn:hover {
  background-color: rgba(219, 14, 53, 0.1);
}
</style>