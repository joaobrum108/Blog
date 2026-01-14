<template>
  <v-main style="background-color: #fafafa;">
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top right"
      elevation="8"
    >
      <div class="d-flex align-center">
        <v-icon v-if="snackbar.icon" :icon="snackbar.icon" class="mr-2"></v-icon>
        <span>{{ snackbar.message }}</span>
      </div>
      
      <template v-slot:actions>
        <v-btn
          icon
          variant="text"
          size="small"
          @click="snackbar.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-container class="py-8" max-width="1280">
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="d-flex align-center mb-2">
            <v-icon color="primary" size="x-large" class="mr-3">mdi-view-dashboard</v-icon>
            <h1 class="text-h4 font-weight-bold text-primary">Painel Administrativo</h1>
          </div>
          <p class="text-body-1 text-medium-emphasis">
            Gerencie notícias e aniversariantes da empresa.
          </p>
        </v-col>
      </v-row>

      <v-row class="mb-8">
        <v-col cols="12" md="6">
          <v-card 
            class="action-card h-100"
            variant="outlined"
            @click="criarPost"
            :ripple="true"
          >
            <v-card-item class="pa-6">
              <div class="d-flex align-start mb-4">
                <v-avatar color="primary" size="48" class="mr-4">
                  <v-icon icon="mdi-plus" color="white"></v-icon>
                </v-avatar>
                <div>
                  <v-card-title class="pa-0 mb-2 text-h6 font-weight-bold">
                    Novo Post
                  </v-card-title>
                  <v-card-subtitle class="pa-0 text-body-2 text-medium-emphasis">
                    Crie uma nova notícia ou anúncio
                  </v-card-subtitle>
                </div>
              </div>
              <v-card-text class="pa-0 text-body-2">
                Compartilhe atualizações importantes com sua comunidade.
              </v-card-text>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-actions class="pa-4">
              <v-btn 
                color="primary" 
                variant="text"
                class="text-none"
                prepend-icon="mdi-pencil"
              >
                Criar agora
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card 
            class="action-card h-100"
            variant="outlined"
            @click="abrirFormAniversariante"
            :ripple="true"
          >
            <v-card-item class="pa-6">
              <div class="d-flex align-start mb-4">
                <v-avatar color="success" size="48" class="mr-4">
                  <v-icon icon="mdi-cake-variant" color="white"></v-icon>
                </v-avatar>
                <div>
                  <v-card-title class="pa-0 mb-2 text-h6 font-weight-bold">
                    Aniversariante do Mês
                  </v-card-title>
                  <v-card-subtitle class="pa-0 text-body-2 text-medium-emphasis">
                    Adicionar novo aniversariante
                  </v-card-subtitle>
                </div>
              </div>
              <v-card-text class="pa-0 text-body-2">
                Preencha os dados do colaborador que está aniversariando.
              </v-card-text>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-actions class="pa-4">
              <v-btn 
                color="success" 
                variant="text"
                class="text-none"
                prepend-icon="mdi-account-plus"
              >
                Adicionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-4">
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mb-6">
            <h2 class="text-h5 font-weight-bold">Posts Recentes</h2>
            <v-chip 
              color="primary" 
              variant="outlined"
              size="small"
            >
              {{ noticias.length }} {{ noticias.length === 1 ? 'post' : 'posts' }}
            </v-chip>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col 
          v-for="noticia in noticias"
          :key="noticia.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card 
            class="post-card h-100"
            variant="outlined"
            :loading="loadingExclusao === noticia.id"
          >
            <v-card-item class="pa-4 pb-2">
              <div class="d-flex align-center justify-space-between mb-3">
                <v-chip 
                  size="small"
                  :color="getCategoriaColor(noticia.categoria)"
                  class="text-white font-weight-medium"
                >
                  {{ noticia.categoria }}
                </v-chip>
                <span class="text-caption text-medium-emphasis">
                  <v-icon size="small" class="mr-1">mdi-clock-outline</v-icon>
                  {{ noticia.tempoLeitura }} min
                </span>
              </div>
              
              <v-card-title class="pa-0 mb-2 text-h6 line-clamp-2">
                {{ noticia.titulo }}
              </v-card-title>
              
              <div class="d-flex align-center text-caption text-medium-emphasis mb-3">
                <v-icon size="small" class="mr-1">mdi-account</v-icon>
                {{ noticia.autor }}
                <v-divider vertical class="mx-2"></v-divider>
                <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                {{ formarData(noticia.dataPublicacao) }}
              </div>
              
              <p class="text-body-2 text-medium-emphasis line-clamp-3 mb-0">
                {{ noticia.descricao }}
              </p>
            </v-card-item>
            
            <v-card-actions class="pa-4 pt-2">
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                size="small"
                color="primary"
                @click="abrirDetalhe(noticia.id)"
                class="text-none"
              >
                Ler mais
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="grey"
                @click="editarPost(noticia)"
                :disabled="loadingExclusao !== null"
              >
                <v-icon>mdi-pencil-outline</v-icon>
                <v-tooltip activator="parent" location="bottom">Editar</v-tooltip>
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="error"
                @click="excluirPublic(noticia.id)"
                :disabled="loadingExclusao !== null"
              >
                <v-icon>mdi-delete-outline</v-icon>
                <v-tooltip activator="parent" location="bottom">Excluir</v-tooltip>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-if="noticias.length === 0" cols="12">
          <v-card
            class="text-center py-8"
            variant="outlined"
          >
            <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-newspaper-variant-outline</v-icon>
            <h3 class="text-h6 font-weight-medium mb-2">Nenhum post encontrado</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Comece criando seu primeiro post.
            </p>
            <v-btn
              color="primary"
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="criarPost"
            >
              Criar primeiro post
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog
        v-model="modalPost"
        max-width="800"
        scrollable
        persistent
      >
        <v-card>
          <v-toolbar :color="modoEdicao ? 'warning' : 'primary'" density="compact">
            <v-toolbar-title class="text-white">
              <v-icon class="mr-2">{{ modoEdicao ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
              {{ modoEdicao ? 'Editar Post' : 'Novo Post' }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              variant="text"
              @click="fecharModal"
              class="text-white"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" md="5">
                <div class="image-upload-area pa-6" @click="$refs.fileInput.click()">
                  <v-img
                    :src="flyer"
                    alt="Imagem do post"
                    class="rounded-lg mb-4"
                    cover
                    height="200"
                  ></v-img>
                  <p class="text-caption text-center text-medium-emphasis">
                    Clique para alterar a imagem
                  </p>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="handleImageUpload"
                  />
                </div>
              </v-col>

              <v-col cols="12" md="7">
                <v-form @submit.prevent="salvarPost" class="pa-6">
                  <v-text-field
                    v-model="form.titulo"
                    label="Título"
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Título é obrigatório']"
                    class="mb-4"
                    autofocus
                  ></v-text-field>

                  <v-textarea
                    v-model="form.descricao"
                    label="Descrição"
                    variant="outlined"
                    density="comfortable"
                    rows="3"
                    auto-grow
                    :rules="[v => !!v || 'Descrição é obrigatória']"
                    class="mb-4"
                  ></v-textarea>

                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.categoria"
                        label="Categoria"
                        variant="outlined"
                        density="comfortable"
                        :rules="[v => !!v || 'Categoria é obrigatória']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.tempoLeitura"
                        label="Tempo de leitura (min)"
                        variant="outlined"
                        density="comfortable"
                        type="number"
                        min="1"
                        :rules="[v => !!v || 'Tempo é obrigatório']"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="form.autor"
                    label="Autor"
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Autor é obrigatório']"
                    class="mb-6"
                  ></v-text-field>

                  <div class="d-flex justify-end gap-2">
                    <v-btn
                      variant="outlined"
                      @click="fecharModal"
                      class="text-none"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      :color="modoEdicao ? 'warning' : 'primary'"
                      type="submit"
                      :loading="loadingSalvar"
                      :prepend-icon="modoEdicao ? 'mdi-content-save-edit' : 'mdi-content-save'"
                      class="text-none"
                    >
                      {{ modoEdicao ? 'Atualizar' : 'Salvar' }}
                    </v-btn>
                  </div>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="modalAniversariante"
        max-width="500"
        persistent
      >
        <v-card>
          <v-toolbar color="success" density="compact">
            <v-toolbar-title class="text-white">
              <v-icon class="mr-2">mdi-cake-variant</v-icon>
              Novo Aniversariante
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              variant="text"
              @click="fecharModalAniversariante"
              class="text-white"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="pa-6">
            <v-form @submit.prevent="salvarAniversariante" ref="formAniversariante">
         
              <v-text-field
                v-model="formAniversariante.nome"
                label="Nome do Colaborador"
                variant="outlined"
                density="comfortable"
                :rules="[v => !!v || 'Nome é obrigatório']"
                class="mb-4"
                autofocus
                prepend-inner-icon="mdi-account"
              ></v-text-field>

              <v-menu
                v-model="menuDataAniversario"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="formAniversariante.dataAniversario"
                    label="Data de Aniversário"
                    variant="outlined"
                    density="comfortable"
                    readonly
                    v-bind="props"
                    :rules="[v => !!v || 'Data de aniversário é obrigatória']"
                    prepend-inner-icon="mdi-calendar-heart"
                    class="mb-4"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formAniversariante.dataAniversario"
                  @update:model-value="menuDataAniversario = false"
                  locale="pt-BR"
                ></v-date-picker>
              </v-menu>

              <v-textarea
                v-model="formAniversariante.mensagem"
                label="Mensagem de Parabéns"
                variant="outlined"
                density="comfortable"
                rows="3"
                auto-grow
                :rules="[v => !!v || 'Mensagem é obrigatória']"

                prepend-inner-icon="mdi-message-text"
                class="mb-6"
                hint="Esta mensagem será exibida para todos os colaboradores"
              ></v-textarea>

              <v-alert
                type="info"
                variant="tonal"
                class="mb-6"
                density="compact"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-lightbulb-on" size="small" class="mr-2"></v-icon>
                </template>
                <span class="text-caption">
                  <strong>Exemplo:</strong> "Parabéns, [Nome]! Que seu dia seja repleto de alegrias e conquistas. Desejamos muito sucesso e felicidade!"
                </span>
              </v-alert>

              <div class="d-flex justify-end gap-2">
                <v-btn
                  variant="outlined"
                  @click="fecharModalAniversariante"
                  class="text-none"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="success"
                  type="submit"
                  :loading="loadingAniversariante"
                  prepend-icon="mdi-content-save"
                  class="text-none"
                >
                  Salvar Aniversariante
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { enviarPost, carregarPosts, atualizarPost, excluirPost, enviarAniversariante } from '../services/blogServices'
import flyer from "../assets/flyer.jpg"

const router = useRouter()
const modalPost = ref(false)
const modalAniversariante = ref(false)
const modoEdicao = ref(false)
const postIdEdicao = ref(null)
const loadingSalvar = ref(false)
const loadingAniversariante = ref(false)
const loadingExclusao = ref(null)
const noticias = ref([])

const menuDataAniversario = ref(false)
const formAniversariante = ref({
  nome: '',
  dataAniversario: '',
  mensagem: ''
})

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
  timeout: 4000,
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
  snackbar.timeout = options.timeout || 4000
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

const limparFormAniversariante = () => {
  formAniversariante.value = {
    nome: '',
    dataAniversario: '',
    mensagem: ''
  }
}

const carregarNoticias = async () => {
  try {
    const response = await carregarPosts()
    noticias.value = response.data.data || response.data
  } catch (error) {
    console.error("Erro ao carregar posts:", error)
    showToast({
      message: 'Erro ao carregar posts.',
      color: 'error'
    })
  }
}

onMounted(() => {
  carregarNoticias()
})

const getCategoriaColor = (categoria) => {
  const colors = {
    'Notícia': '#db0e35',
    'Anúncio': '#2196F3',
    'Evento': '#4CAF50',
    'Atualização': '#FF9800'
  }
  return colors[categoria] || '#757575'
}


const salvarPost = async () => {
  if (!form.value.titulo || !form.value.categoria || !form.value.descricao || !form.value.tempoLeitura || !form.value.autor) {
    showToast({
      message: 'Preencha todos os campos obrigatórios.',
      color: 'warning',
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
        color: 'success'
      })
    } else {
      await enviarPost(form.value)
      await carregarNoticias()
      
      showToast({
        message: 'Post criado com sucesso!',
        color: 'success'
      })
    }
    
    fecharModal()
  } catch (error) {
    console.error('Erro ao salvar post:', error)
    showToast({
      message: 'Erro ao salvar post. Tente novamente.',
      color: 'error'
    })
  } finally {
    loadingSalvar.value = false
  }
}

const abrirFormAniversariante = () => {
  limparFormAniversariante()
  modalAniversariante.value = true
}

const fecharModalAniversariante = () => {
  modalAniversariante.value = false
  limparFormAniversariante()
}

const salvarAniversariante = async () => {
  const { nome, dataAniversario, mensagem } = formAniversariante.value
  
  if (!nome || !dataAniversario || !mensagem) {
    showToast({
      message: 'Preencha todos os campos obrigatórios.',
      color: 'warning',
      icon: 'mdi-alert'
    })
    return
  }

  if (nome.trim() === '' || mensagem.trim() === '') {
    showToast({
      message: 'Preencha todos os campos corretamente.',
      color: 'warning',
      icon: 'mdi-alert'
    })
    return
  }

  loadingAniversariante.value = true
  
  try {
    let dataFormatada;
    
    if (typeof dataAniversario === 'string') {
      dataFormatada = dataAniversario;
    } else if (dataAniversario instanceof Date) {
      dataFormatada = dataAniversario.toISOString().split('T')[0];
    } else {

      const data = new Date(dataAniversario);
      if (isNaN(data.getTime())) {
        throw new Error('Data inválida');
      }
      dataFormatada = data.toISOString().split('T')[0];
    }

    console.log('Data formatada para envio:', dataFormatada); 
    
    const response = await enviarAniversariante({
      nome: nome.trim(),
      dataAniversario: dataFormatada,
      mensagem: mensagem.trim()
    })

    const data = response.data;

    if (data.status === 'error') {
      showToast({
        message: data.message || 'Erro ao salvar aniversariante. Tente novamente.',
        color: 'error',
        icon: 'mdi-alert-circle'
      })
      return
    }

    showToast({
      message: data.message || 'Aniversariante salvo com sucesso!',
      color: 'success',
      icon: 'mdi-check-circle'
    })
    
    fecharModalAniversariante()
    
  } catch (error) {
    console.error('Erro ao salvar aniversariante:', error)
    
    let userMessage = 'Erro ao salvar aniversariante. Tente novamente.'
    
    if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
      userMessage = 'Erro de conexão. Verifique sua internet e tente novamente.'
    } else if (error.message.includes('401') || error.message.includes('403')) {
      userMessage = 'Acesso não autorizado. Faça login novamente.'
    } else if (error.message.includes('Data inválida')) {
      userMessage = 'Data de aniversário inválida. Selecione uma data válida.'
    } else {
      userMessage = error.message
    }
    
    showToast({
      message: userMessage,
      color: 'error',
      icon: 'mdi-alert-circle',
      timeout: 5000
    })
  } finally {
    loadingAniversariante.value = false
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
      color: 'success'
    })
  } catch (error) {
    console.error('Erro ao excluir post:', error)
    showToast({
      message: 'Erro ao excluir post. Tente novamente.',
      color: 'error'
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

const handleImageUpload = (event) => {
  showToast({
    message: 'Upload de imagem em desenvolvimento',
    color: 'info'
  })
}

const abrirDetalhe = (id) => {
  router.push({ name: 'NoticiaDetalhe', params: { id } })
}

const formarData = (data) => {
  if (!data) return 'Data não disponível'
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace('.', '')
}
</script>

<style scoped>
.action-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border-color: rgba(0, 0, 0, 0.12);
}

.action-card:hover {
  border-color: var(--v-primary-base);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-card {
  transition: all 0.2s ease;
  border-color: rgba(0, 0, 0, 0.08);
}

.post-card:hover {
  border-color: rgba(0, 0, 0, 0.16);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.image-upload-area {
  background: linear-gradient(135deg, #f5f5f5 25%, #e0e0e0 25%, #e0e0e0 50%, #f5f5f5 50%, #f5f5f5 75%, #e0e0e0 75%, #e0e0e0);
  background-size: 20px 20px;
  cursor: pointer;
  border-radius: 8px;
  margin: 16px;
}

.image-upload-area:hover {
  background-color: #f0f0f0;
}

.gap-2 {
  gap: 8px;
}
</style>