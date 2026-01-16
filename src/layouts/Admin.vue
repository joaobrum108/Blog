<template>
  <v-main style="background-color: #fafafa;">
    <!-- Snackbar para feedback -->
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

    <!-- Container principal -->
    <v-container class="py-8" max-width="1280">
      <!-- Cabeçalho -->
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

      <!-- Cards de ação -->
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
            @click="abrirModalAniversariante()"
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

      <!-- Seção de Posts -->
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

      <!-- Seção de Aniversariantes -->
      <v-row class="mt-8">
        <!-- Mantenha a estrutura atual, apenas ajuste: -->
        <v-col cols="12">
          <div class="aniversariantes-section">
            <div class="d-flex align-center justify-space-between mb-4">
              <h2 class="text-h5 font-weight-bold">Aniversariantes do Mês</h2>
              <v-chip 
                color="error" 
                variant="outlined"
                size="small"
                prepend-icon="mdi-cake-variant"
              >
                {{ listAniversariantes.length }} {{ listAniversariantes.length === 1 ? 'aniversariante' : 'aniversariantes' }}
              </v-chip>
            </div>
            
            <!-- Lista de aniversariantes -->
            <v-list lines="three" class="aniversariantes-list">
              <v-list-item
                v-for="(colaborador, index) in paginatedItems"
                :key="index"
                :title="colaborador.nome"
                :subtitle="formatarDataAniversario(colaborador.dataAniversario)"
              >
                <template v-slot:append>
                  <v-icon
                    size="20"
                    color="red-700"
                    class="mr-2"
                    @click="abrirModalAniversariante(colaborador)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    size="20"
                    color="error"
                    @click="excluirColaborador(colaborador)"
                  >
                    mdi-delete
                  </v-icon>
                </template>

                <span>
                  {{ colaborador.mensagem }}
                </span>
              </v-list-item>
            </v-list>

            <!-- Estado vazio -->
            <div v-if="listAniversariantes.length === 0" class="aniversariantes-empty-state">
              <v-icon>mdi-cake-variant-outline</v-icon>
              <h3>Nenhum aniversariante cadastrado</h3>
              <p>Adicione os colaboradores que estão comemorando aniversário este mês</p>
              <v-btn
                color="success"
                variant="outlined"
                prepend-icon="mdi-account-plus"
                @click="abrirModalAniversariante()"
              >
                Adicionar primeiro aniversariante
              </v-btn>
            </div>

            <v-pagination
              v-if="listAniversariantes.length > 0"
              v-model="page"
              :length="pageCount"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>

      <!-- Modal para Posts (Criar/Editar) -->
      <v-dialog
        v-model="modalPost"
        max-width="800"
        scrollable
        persistent
      >
        <v-card>
          <v-toolbar :color="modoEdicaoPost ? 'warning' : 'primary'" density="compact">
            <v-toolbar-title class="text-white">
              <v-icon class="mr-2">{{ modoEdicaoPost ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
              {{ modoEdicaoPost ? 'Editar Post' : 'Novo Post' }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              variant="text"
              @click="fecharModalPost"
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
                    v-model="formPost.titulo"
                    label="Título"
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Título é obrigatório']"
                    class="mb-4"
                    autofocus
                  ></v-text-field>

                  <v-textarea
                    v-model="formPost.descricao"
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
                        v-model="formPost.categoria"
                        label="Categoria"
                        variant="outlined"
                        density="comfortable"
                        :rules="[v => !!v || 'Categoria é obrigatória']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formPost.tempoLeitura"
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
                    v-model="formPost.autor"
                    label="Autor"
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Autor é obrigatório']"
                    class="mb-6"
                  ></v-text-field>

                  <div class="d-flex justify-end gap-2">
                    <v-btn
                      variant="outlined"
                      @click="fecharModalPost"
                      class="text-none"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      :color="modoEdicaoPost ? 'warning' : 'primary'"
                      type="submit"
                      :loading="loadingSalvarPost"
                      :prepend-icon="modoEdicaoPost ? 'mdi-content-save-edit' : 'mdi-content-save'"
                      class="text-none"
                    >
                      {{ modoEdicaoPost ? 'Atualizar' : 'Salvar' }}
                    </v-btn>
                  </div>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Modal Unificado para Aniversariantes (Criar/Editar) -->
      <v-dialog
        v-model="modalAniversariante"
        max-width="500"
        persistent
      >
        <v-card>
          <v-toolbar :color="modoEdicaoAniversariante ? 'warning' : 'success'" density="compact">
            <v-toolbar-title class="text-white">
              <v-icon class="mr-2">{{ modoEdicaoAniversariante ? 'mdi-pencil' : 'mdi-cake-variant' }}</v-icon>
              {{ modoEdicaoAniversariante ? 'Editar Aniversariante' : 'Novo Aniversariante' }}
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
                  :color="modoEdicaoAniversariante ? 'warning' : 'success'"
                  type="submit"
                  :loading="loadingAniversariante"
                  :prepend-icon="modoEdicaoAniversariante ? 'mdi-content-save-edit' : 'mdi-content-save'"
                  class="text-none"
                >
                  {{ modoEdicaoAniversariante ? 'Atualizar' : 'Salvar' }}
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
import { ref, onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  enviarPost, 
  carregarPosts, 
  atualizarPost, 
  excluirPost, 
  enviarAniversariante, 
  getAniversariantes
  // atualizarAniversariante, // COMETADO: função ainda não implementada no service
  // excluirAniversariante   // COMETADO: função ainda não implementada no service
} from '../services/blogServices'
import flyer from "../assets/flyer.jpg"
const router = useRouter()
// Paginação
const page = ref(1)
const itemsPerPage = ref(10)
const listAniversariantes = ref([])
const noticias = ref([])
const pageCount = computed(() => Math.ceil(listAniversariantes.value.length / itemsPerPage.value))
const paginatedItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return listAniversariantes.value.slice(start, end)
})
// Estados dos modais
const modalPost = ref(false)
const modalAniversariante = ref(false)
const modoEdicaoPost = ref(false)
const modoEdicaoAniversariante = ref(false)
const postIdEdicao = ref(null)
const aniversarianteIdEdicao = ref(null)
// Estados de loading
const loadingSalvarPost = ref(false)
const loadingAniversariante = ref(false)
const loadingExclusao = ref(null)
// Menu de data
const menuDataAniversario = ref(false)
// Formulários
const formPost = ref({
  titulo: '',
  descricao: '',
  categoria: '',
  tempoLeitura: '',
  autor: ''
})
const formAniversariante = ref({
  nome: '',
  dataAniversario: '',
  mensagem: ''
})
// Snackbar
const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
  timeout: 4000,
  icon: null
})
// Métodos utilitários
const showToast = (options) => {
  snackbar.message = options.message || ''
  snackbar.color = options.color || 'success'
  snackbar.timeout = options.timeout || 4000
  snackbar.icon = options.icon || null
  snackbar.show = true
}
const limparFormPost = () => {
  formPost.value = {
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
// Carregar dados
const carregarNoticias = async () => {
  try {
    const response = await carregarPosts()
    noticias.value = response.data.data || response.data
  } catch (error) {
    showToast({ message: 'Erro ao carregar posts.', color: 'error' })
  }
}
const carregarListAniversariantes = async () => {
  try {
    const response = await getAniversariantes()
    listAniversariantes.value = response.data.data || response.data
  } catch (error) {
    showToast({ message: 'Erro ao carregar aniversariantes.', color: 'error' })
  }
}
onMounted(() => {
  carregarNoticias()
  carregarListAniversariantes()
})
// Métodos para posts
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
  if (!formPost.value.titulo || !formPost.value.categoria || !formPost.value.descricao || !formPost.value.tempoLeitura || !formPost.value.autor) {
    showToast({ message: 'Preencha todos os campos obrigatórios.', color: 'warning', icon: 'mdi-alert' })
    return
  }
  loadingSalvarPost.value = true
  try {
    if (modoEdicaoPost.value) {
      await atualizarPost(postIdEdicao.value, formPost.value)
      noticias.value = noticias.value.map(noticia =>
        noticia.id === postIdEdicao.value ? { ...noticia, ...formPost.value } : noticia
      )
      showToast({ message: 'Post atualizado com sucesso!', color: 'success' })
    } else {
      await enviarPost(formPost.value)
      await carregarNoticias()
      showToast({ message: 'Post criado com sucesso!', color: 'success' })
    }
    fecharModalPost()
  } catch {
    showToast({ message: 'Erro ao salvar post. Tente novamente.', color: 'error' })
  } finally {
    loadingSalvarPost.value = false
  }
}
// Métodos para aniversariantes
const abrirModalAniversariante = (colaborador = null) => {
  if (colaborador) {
    // Modo edição
    modoEdicaoAniversariante.value = true
    aniversarianteIdEdicao.value = colaborador.id
    formAniversariante.value = {
      nome: colaborador.nome || '',
      dataAniversario: colaborador.dataAniversario || '',
      mensagem: colaborador.mensagem || ''
    }
  } else {
    // Modo criação
    modoEdicaoAniversariante.value = false
    aniversarianteIdEdicao.value = null
    limparFormAniversariante()
  }
  modalAniversariante.value = true
}
const fecharModalAniversariante = () => {
  modalAniversariante.value = false
  modoEdicaoAniversariante.value = false
  aniversarianteIdEdicao.value = null
  limparFormAniversariante()
}
const formatarDataParaAPI = (data) => {
  if (!data) return ''
  if (typeof data === 'string') {
    return data
  }
  if (data instanceof Date) {
    return data.toISOString().split('T')[0]
  }
  try {
    const dataObj = new Date(data)
    if (isNaN(dataObj.getTime())) {
      throw new Error('Data inválida')
    }
    return dataObj.toISOString().split('T')[0]
  } catch {
    throw new Error('Data inválida')
  }
}
const salvarAniversariante = async () => {
  const { nome, dataAniversario, mensagem } = formAniversariante.value
  if (!nome || !dataAniversario || !mensagem || nome.trim() === '' || mensagem.trim() === '') {
    showToast({ message: 'Preencha todos os campos corretamente.', color: 'warning', icon: 'mdi-alert' })
    return
  }
  loadingAniversariante.value = true
  try {
    const dataFormatada = formatarDataParaAPI(dataAniversario)
    const dadosAniversariante = {
      nome: nome.trim(),
      dataAniversario: dataFormatada,
      mensagem: mensagem.trim()
    }
    let response
    if (modoEdicaoAniversariante.value) {
      // COMETADO: Atualizar aniversariante existente - função ainda não implementada
      // response = await atualizarAniversariante(aniversarianteIdEdicao.value, dadosAniversariante)
      showToast({ 
        message: 'Funcionalidade de edição em desenvolvimento. Use o botão "Adicionar" para criar novos.', 
        color: 'warning', 
        icon: 'mdi-alert',
        timeout: 5000
      })
      loadingAniversariante.value = false
      return
    } else {
      // Criar novo aniversariante
      response = await enviarAniversariante(dadosAniversariante)
      showToast({ message: 'Aniversariante salvo com sucesso!', color: 'success', icon: 'mdi-check-circle' })
    }
    await carregarListAniversariantes()
    fecharModalAniversariante()
  } catch (error) {
    let userMessage = 'Erro ao salvar aniversariante. Tente novamente.'
    if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
      userMessage = 'Erro de conexão. Verifique sua internet.'
    } else if (error.message.includes('401') || error.message.includes('403')) {
      userMessage = 'Acesso não autorizado.'
    } else if (error.message.includes('Data inválida')) {
      userMessage = 'Data de aniversário inválida.'
    } else if (error.response?.data?.message) {
      userMessage = error.response.data.message
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
const excluirColaborador = async (colaborador) => {
  if (!confirm('Tem certeza que deseja excluir este aniversariante?\nEsta ação não pode ser desfeita.')) {
    return
  }
  try {
    // COMETADO: função ainda não implementada no service
    // await excluirAniversariante(colaborador.id)
    
    // Solução temporária: remover da lista local
    listAniversariantes.value = listAniversariantes.value.filter(a => a.id !== colaborador.id)
    showToast({ 
      message: 'Aniversariante removido localmente. A funcionalidade de exclusão completa está em desenvolvimento.', 
      color: 'warning',
      icon: 'mdi-alert',
      timeout: 5000
    })
  } catch (error) {
    showToast({ message: 'Erro ao excluir aniversariante.', color: 'error' })
    console.error(error)
  }
}
// Métodos para posts (mantidos da versão anterior)
const excluirPublic = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este post?\nEsta ação não pode ser desfeita.')) return
  loadingExclusao.value = id
  try {
    await excluirPost(id)
    noticias.value = noticias.value.filter(noticia => noticia.id !== id)
    showToast({ message: 'Post excluído com sucesso!', color: 'success' })
  } catch {
    showToast({ message: 'Erro ao excluir post. Tente novamente.', color: 'error' })
  } finally {
    loadingExclusao.value = null
  }
}
const editarPost = (noticia) => {
  formPost.value = {
    titulo: noticia.titulo,
    descricao: noticia.descricao,
    categoria: noticia.categoria,
    tempoLeitura: noticia.tempoLeitura,
    autor: noticia.autor
  }
  postIdEdicao.value = noticia.id
  modoEdicaoPost.value = true
  modalPost.value = true
}
const criarPost = () => {
  limparFormPost()
  modoEdicaoPost.value = false
  postIdEdicao.value = null
  modalPost.value = true
}
const fecharModalPost = () => {
  modalPost.value = false
  limparFormPost()
  modoEdicaoPost.value = false
  postIdEdicao.value = null
}
// Outros métodos
const handleImageUpload = () => {
  showToast({ message: 'Upload de imagem em desenvolvimento', color: 'info' })
}
const abrirDetalhe = (id) => {
  router.push({ name: 'NoticiaDetalhe', params: { id } })
}
const formarData = (data) => {
  if (!data) return 'Data não disponível'
  return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
}
const formatarDataAniversario = (data) => {
  if (!data) return 'Data não informada'
  return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })
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
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
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
.aniversariantes-list {
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-bottom: 24px;
}
.aniversariantes-list .v-list-item {
  padding: 20px 24px;
  transition: all 0.25s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
}
.aniversariantes-list .v-list-item:last-child {
  border-bottom: none;
}
.aniversariantes-list .v-list-item:hover {
  background: linear-gradient(90deg, rgba(219, 14, 53, 0.03) 0%, rgba(255, 64, 129, 0.02) 100%);
  padding-left: 28px;
}
.aniversariantes-list .v-list-item-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.aniversariantes-list .v-list-item-title::before {
  content: "👤";
  font-size: 1rem;
  opacity: 0.7;
}
.aniversariantes-list .v-list-item-subtitle {
  font-size: 0.875rem;
  color: #db0e35 !important;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(219, 14, 53, 0.08);
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;
  margin-top: 4px;
}
.aniversariantes-list .v-list-item-subtitle::before {
  content: "🎂";
  font-size: 1rem;
}
.aniversariantes-list span {
  font-size: 0.9375rem;
  color: #424242;
  line-height: 1.6;
  display: block;
  margin-top: 12px;
  padding: 14px 16px;
  background: rgba(33, 150, 243, 0.05);
  border-radius: 10px;
  border-left: 3px solid #2196F3;
  position: relative;
}
.aniversariantes-list span::before {
  content: '"';
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 1.5rem;
  color: rgba(33, 150, 243, 0.3);
  font-family: serif;
  font-weight: bold;
}
.aniversariantes-list span::after {
  content: '"';
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 1.5rem;
  color: rgba(33, 150, 243, 0.3);
  font-family: serif;
  font-weight: bold;
}
.aniversariantes-list .v-list-item__append {
  display: flex;
  gap: 8px;
}
.aniversariantes-list .v-icon {
  transition: all 0.2s ease;
}
.aniversariantes-list .mr-2 {
  margin-right: 12px;
}
.aniversariantes-list .v-list-item:hover .v-icon {
  transform: scale(1.1);
}
.aniversariantes-list .v-icon[color="red-700"] {
  color: #FF9800 !important;
}
.aniversariantes-list .v-icon[color="red-700"]:hover {
  color: #FF5722 !important;
  background: rgba(255, 87, 34, 0.1);
  padding: 6px;
  border-radius: 50%;
}
.aniversariantes-list .v-icon[color="error"]:hover {
  color: #f44336 !important;
  background: rgba(244, 67, 54, 0.1);
  padding: 6px;
  border-radius: 50%;
}
.aniversariantes-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.aniversariantes-section h2::before {
  content: "🎉";
  font-size: 1.75rem;
}

.aniversariantes-section .d-flex {
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(219, 14, 53, 0.1);
}
.aniversariantes-section .v-chip {
  background: linear-gradient(135deg, #db0e35 0%, #ff4081 100%) !important;
  color: white !important;
  font-weight: 600;
  border: none !important;
  box-shadow: 0 2px 8px rgba(219, 14, 53, 0.2);
}
.aniversariantes-section .v-pagination {
  margin-top: 24px;
  justify-content: center;
}
.aniversariantes-section .v-pagination .v-btn {
  border-radius: 8px;
}
.aniversariantes-section .v-pagination .v-btn--active {
  background: linear-gradient(135deg, #db0e35 0%, #ff4081 100%) !important;
  color: white !important;
}
.aniversariantes-empty-state {
  text-align: center;
  padding: 48px 24px;
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  margin: 24px 0;
}
.aniversariantes-empty-state .v-icon {
  font-size: 64px;
  color: #db0e35;
  opacity: 0.3;
  margin-bottom: 16px;
}
.aniversariantes-empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #424242;
  margin-bottom: 8px;
}
.aniversariantes-empty-state p {
  color: #757575;
  max-width: 400px;
  margin: 0 auto 20px;
}
@media (max-width: 960px) {
  .aniversariantes-list .v-list-item {
    padding: 16px 20px;
  }
  
  .aniversariantes-list span {
    padding: 12px 14px;
    font-size: 0.875rem;
  }
}

@media (max-width: 600px) {
  .aniversariantes-list .v-list-item {
    padding: 14px 16px;
  }
  
  .aniversariantes-section h2 {
    font-size: 1.25rem;
  }
  
  .aniversariantes-list span {
    padding: 10px 12px;
    font-size: 0.8125rem;
  }
  
  .aniversariantes-list .v-list-item-title {
    font-size: 1rem;
  }
  
  .aniversariantes-list .v-list-item-subtitle {
    font-size: 0.75rem;
    padding: 3px 8px;
  }
}
</style>