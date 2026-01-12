<template>
  <v-main justify="center" style="background-color: #f5f5f5;">
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      :location="snackbar.location"
      elevation="24"
      multi-line
    >
      <div class="d-flex align-center">
        <v-icon v-if="snackbar.icon" :icon="snackbar.icon" class="mr-2"></v-icon>
        {{ snackbar.message }}
      </div>
      
      <template v-slot:actions>
        <v-btn
          icon
          variant="text"
          @click="snackbar.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-container max-width="1280">
      <v-row class="mt-10">
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold" style="color: #db0e35;"> Painel de Administração</h1>
          <p class="subtitle mt-2">
            Bem vindo ao seu painel de administração! Aqui você pode gerenciar as notícias, anúncios e postagens da empresa.
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
              <v-btn 
                color="primary" 
                style="border: 1px solid #db0e35;" 
                class="text-none" 
                prepend-icon="mdi-plus" 
                @click="criarPost"
              >
                Criar Post
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" v-if="planilha === false">
          <v-card elevation="4" class="pa-4" style="border-radius: 6px;">
            <v-card-title class="text-h5 d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-file-excel-box</v-icon>
              Envie a planilha dos aniversariantes do mês
            </v-card-title>
            <v-card-subtitle class="mb-2">
              Aqui você pode fazer o upload da planilha dos aniversariantes.
            </v-card-subtitle>
            <v-card-actions>
              <v-btn 
                color="primary" 
                style="border: 1px solid #db0e35;"  
                class="text-none" 
                prepend-icon="mdi-upload" 
                @click="abrirPlanilha"
              >
                Enviar Planilha
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
              Aqui você pode fazer o upload do PDF dos aniversariantes
            </v-card-subtitle>
            <v-card-actions>
              <v-btn 
                color="primary" 
                style="border: 1px solid #db0e35;"  
                class="text-none" 
                prepend-icon="mdi-upload" 
                @click="abrirPDF"
              >
                Enviar PDF
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Modal para Criar/Editar Post -->
        <v-dialog persistent max-width="1280" v-model="modalPost">
          <v-card style="padding: 20px;">
            <v-card-actions class="d-flex justify-end">
              <v-icon 
                class="close-modal" 
                size="large" 
                @click="modalPost = false"
              >
              mdi-close-circle
              </v-icon>
            </v-card-actions>

            <v-row>
              <v-col cols="12" md="6">
                <v-img 
                  :src="flyer" 
                  alt="image" 
                  class="rounded-lg"
                  cover
                  height="100%"
                ></v-img>
              </v-col>

              <v-col cols="12" md="6" style="max-height:90vh;">
                <v-card-title style="color: #bb1e26;" class="text-h6 font-weight-bold d-flex text-center align-center">
                  <v-icon class="mr-2">
                    {{ modoEdicao ? 'mdi-pencil' : 'mdi-plus' }}
                  </v-icon>
                  {{ modoEdicao ? 'Editar Post' : 'Criar novo post' }}
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field 
                      variant="outlined"
                      v-model="form.titulo" 
                      label="Título" 
                      required
                      outlined
                      dense
                      color="error"
                      hint="Digite um título "
                    ></v-text-field>

                    <br>

                    <v-textarea 
                      variant="outlined"
                      v-model="form.descricao" 
                      label="Descrição" 
                      rows="3" 
                      auto-grow
                      outlined
                      dense
                      color="error"
                      hint="Digite uma descrição"
                    ></v-textarea>

<br>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field 
                          variant="outlined"
                          v-model="form.categoria" 
                          label="Categoria" 
                          required
                          outlined
                          dense
                          color="error"
                          hint="Digite uma categoria"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field 
                          variant="outlined"
                          v-model="form.tempoLeitura" 
                          label="Tempo de Leitura (minutos)" 
                          type="number"
                          outlined
                          dense
                          color="error"
                          hint="Digite o tempo de leitura"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-text-field 
                      variant="outlined"
                      v-model="form.autor" 
                      label="Autor"
                      outlined
                      dense
                      color="error"
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-btn 
                    style="border: 1px solid #db0e35;"
                    color="primary" 
                    @click="salvarPost"
                    :loading="loadingSalvar"
                    :prepend-icon="modoEdicao ? 'mdi-content-save-edit' : 'mdi-content-save'"
                  >
                    {{ modoEdicao ? 'Atualizar' : 'Salvar' }}
                  </v-btn>

                  <v-btn 
                    style="background-color: #bb1e26; color: #fff !important;"
                    @click="fecharModal"
                    prepend-icon="mdi-close"
                  >
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>

        <!-- Modal para Upload de Planilha -->
        <v-dialog max-width="500" v-model="modalPlanilha">
          <v-card>
            <v-card-title class="text-h6 d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-file-excel-box</v-icon>
              Upload de Planilha
            </v-card-title>
            <v-card-text>
              <v-file-input 
                v-model="planilhaFile" 
                label="Selecione a planilha" 
                accept=".xlsx,.xls,.csv"
                outlined
                dense
                prepend-icon="mdi-file"
              ></v-file-input>
              <v-alert
                v-if="planilhaFile"
                type="info"
                variant="tonal"
                class="mt-2"
              >
                Arquivo selecionado: {{ planilhaFile.name }}
              </v-alert>
            </v-card-text>
            <v-card-actions class="pa-4">
              <v-btn 
                color="primary" 
                @click="enviarPlanilhas"
                :loading="loadingPlanilha"
                :disabled="!planilhaFile"
                prepend-icon="mdi-upload"
              >
                Enviar
              </v-btn>
              <v-btn 
                @click="modalPlanilha = false"
                prepend-icon="mdi-close"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Modal para Upload de PDF (Reutilizado do modal de Planilha) -->
        <v-dialog max-width="500" v-model="modalPDF">
          <v-card>
            <v-card-title class="text-h6 d-flex align-center">
              <v-icon class="mr-2" color="error">mdi-file-pdf-box</v-icon>
              Upload de PDF
            </v-card-title>
            <v-card-text>
              <v-file-input 
                v-model="pdfFile" 
                label="Selecione o PDF" 
                accept=".pdf"
                outlined
                dense
                prepend-icon="mdi-file-pdf"
              ></v-file-input>
              <v-alert
                v-if="pdfFile"
                type="info"
                variant="tonal"
                class="mt-2"
              >
                Arquivo selecionado: {{ pdfFile.name }}
              </v-alert>
            </v-card-text>
            <v-card-actions class="pa-4">
              <v-btn 
                color="error" 
                @click="enviarPDFs"
                :loading="loadingPDF"
                :disabled="!pdfFile"
                prepend-icon="mdi-upload"
              >
                Enviar
              </v-btn>
              <v-btn 
                @click="modalPDF = false"
                prepend-icon="mdi-close"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-col 
          v-for="noticia in noticias"
          :key="noticia.id"
          cols="12"
          md="6"
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
                <span class="reading-time">🕒 {{ noticia.tempoLeitura }} min</span>
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
                @click="abrirDetalhe(noticia.id)"
              >
                Ler mais
              </v-btn>
              <v-btn 
                @click="excluirPublic(noticia.id)" 
                color="error"
                :loading="loadingExclusao === noticia.id"
                :disabled="loadingExclusao !== null"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn 
                color="primary" 
                @click="editarPost(noticia)"
                :disabled="loadingExclusao !== null"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-if="noticias.length === 0" cols="12">
          <v-alert
            type="info"
            variant="tonal"
            class="text-center"
          >
            Nenhum post encontrado. Clique em "Criar Post" para começar.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { enviarPost, carregarPosts, atualizarPost, excluirPost, enviarCsv } from '../services/blogServices'
import flyer from "../assets/flyer.jpg"

const router = useRouter()
const planilha = ref(null)
const modalPost = ref(false)
const modalPlanilha = ref(false)
const modalPDF = ref(false)
const planilhaFile = ref(null)
const pdfFile = ref(null)
const modoEdicao = ref(false)
const postIdEdicao = ref(null)
const loadingSalvar = ref(false)
const loadingPlanilha = ref(false)
const loadingPDF = ref(false)
const loadingExclusao = ref(null)
const noticias = ref([])

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000,
  location: 'top right',
  icon: null
})

const form = ref({
  titulo: '',
  descricao: '',
  categoria: '',
  tempoLeitura: '',
  autor: ''
})

const showToast = (options) => {
  snackbar.message = options.message || ''
  snackbar.color = options.color || 'success'
  snackbar.timeout = options.timeout || 3000
  snackbar.icon = options.icon || null
  snackbar.show = true
}

const limparForm = () => {
  form.value = {
    titulo: '',
    descricao: '',
    categoria: '',
    tempoLeitura: '',
    autor: ''
  }
}

const carregarNoticias = async () => {
  try {
    const response = await carregarPosts()
    noticias.value = response.data.data || response.data
    
    showToast({ 
      message: 'Posts carregados com sucesso!',
      color: 'success',
      timeout: 2000
    })
  } catch (error) {
    console.error("Erro ao carregar posts:", error)
    showToast({
      message: 'Erro ao carregar posts.',
      color: 'error',
      timeout: 5000
    })
  }
}

onMounted(() => {
  carregarNoticias()
})

const salvarPost = async () => {
  if (!form.value.titulo || !form.value.categoria || !form.value.descricao || !form.value.tempoLeitura || !form.value.autor) {
    showToast({
      message: 'Preencha pelo todos os campos.',
      color: 'warning',
      timeout: 4000,
      icon: 'mdi-alert'
    })
    return
  }

  loadingSalvar.value = true
  
  try {
    if (modoEdicao.value) {
      await atualizarPost(postIdEdicao.value, form.value)

      noticias.value = noticias.value.map(noticia =>
        noticia.id === postIdEdicao.value ? { ...noticia, ...form.value } : noticia
      )
      
      showToast({
        message: 'Post atualizado com sucesso!',
        color: 'success',
        icon: 'mdi-check-circle'
      })
    } else {
      await enviarPost(form.value)
      await carregarNoticias()
      
      showToast({
        message: 'Post criado com sucesso!',
        color: 'success',
        icon: 'mdi-check-circle'
      })
    }
    
    fecharModal()
  } catch (error) {
    console.error('Erro ao salvar post:', error)
    showToast({
      message: 'Erro ao salvar post. Por favor, tente novamente.',
      color: 'error',
      timeout: 5000,
      icon: 'mdi-alert-circle'
    })
  } finally {
    loadingSalvar.value = false
  }
}

const excluirPublic = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este post?\nEsta ação não pode ser desfeita.')) {
    return
  }

  loadingExclusao.value = id
  
  try {
    await excluirPost(id)

    noticias.value = noticias.value.filter(noticia => noticia.id !== id)
    
    showToast({
      message: 'Post excluído com sucesso!',
      color: 'success',
      icon: 'mdi-check-circle'
    })
  } catch (error) {
    console.error('Erro ao excluir post:', error)
    showToast({
      message: 'Erro ao excluir post. Por favor, tente novamente.',
      color: 'error',
      timeout: 5000,
      icon: 'mdi-alert-circle'
    })
  } finally {
    loadingExclusao.value = null
  }
}

const editarPost = (noticia) => {
  form.value = {
    titulo: noticia.titulo,
    descricao: noticia.descricao,
    categoria: noticia.categoria,
    tempoLeitura: noticia.tempoLeitura,
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

const abrirPlanilha = () => {
  modalPlanilha.value = true
}

const abrirPDF = () => {
  modalPDF.value = true
}

const enviarPlanilhas = async () => {
  if (!planilhaFile.value) {
    showToast({
      message: 'Selecione uma planilha.',
      color: 'warning',
      timeout: 4000
    })
    return
  }

  loadingPlanilha.value = true
  
  try {
    await enviarCsv(planilhaFile.value)
    
    showToast({
      message: 'Planilha enviada com sucesso!',
      color: 'success',
      icon: 'mdi-check-circle'
    })
    
    planilhaFile.value = null
    modalPlanilha.value = false
  } catch (error) {
    showToast({
      message: 'Erro ao enviar planilha. Tente novamente.',
      color: 'error',
      timeout: 5000,
      icon: 'mdi-alert-circle'
    })
  } finally {
    loadingPlanilha.value = false
  }
}

const enviarPDFs = async () => {
  if (!pdfFile.value) {
    showToast({
      message: 'Selecione um arquivo PDF.',
      color: 'warning',
      timeout: 4000
    })
    return
  }

  loadingPDF.value = true
  
  try {
    await fetch("http://localhost:3600/api/enviarPDFs", {
      method: "POST",
      body: pdfFile.value
    })
    
    showToast({
      message: 'PDF enviado com sucesso!',
      color: 'success',
      icon: 'mdi-check-circle'
    })
    
    pdfFile.value = null
    modalPDF.value = false
  } catch (error) {
    showToast({
      message: 'Erro ao enviar PDF. Tente novamente.',
      color: 'error',
      timeout: 5000,
      icon: 'mdi-alert-circle'
    })
  } finally {
    loadingPDF.value = false
  }
}

const abrirDetalhe = (id) => {
  router.push({ name: 'NoticiaDetalhe', params: { id } })
}

const formarData = (data) => {
  if (!data) return 'Data não disponível'
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
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