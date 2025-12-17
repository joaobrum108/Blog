<template>
  <v-main class="bg-grey-lighten-3">

    <v-overlay
      :model-value="carregando"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="#db0e35"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-progress-linear
      v-model="progressoLeitura"
      color="#db0e35"
      height="2"
      style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000;"
      class="d-none d-md-flex"
      background-color="transparent"
    ></v-progress-linear>

    <v-app-bar
      elevation="0"
      color="transparent"
      height="72"
      class="px-4 px-md-8"
    >
      <v-btn
        variant="text"
        @click="voltar"
        class="text-grey-darken-2"
        size="large"
        :prepend-icon="isMobile ? 'mdi-arrow-left' : undefined"
        :disabled="carregando"
      >
        <template v-if="!isMobile">
          <v-icon class="mr-2">mdi-arrow-left</v-icon>
          Voltar para notícias
        </template>
      </v-btn>
      
      <v-spacer></v-spacer>

      <div v-if="!carregando && noticia" class="d-none d-md-flex align-center gap-2">
        <v-btn
          :color="curtido ? '#db0e35' : 'grey-lighten-1'"
          :class="curtido ? 'text-white' : 'text-grey-darken-2'"
          variant="flat"
          @click="curtirArtigo"
          icon
          size="small"
          class="mr-1"
        >
          <v-icon size="small">{{ curtido ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        </v-btn>
        
        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              color="grey-lighten-1"
              variant="flat"
              icon
              size="small"
              v-bind="props"
              class="text-grey-darken-2"
            >
              <v-icon size="small">mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item @click="compartilharRedeSocial('whatsapp')">
              <template v-slot:prepend>
                <v-icon color="green-darken-2">mdi-whatsapp</v-icon>
              </template>
              <v-list-item-title>WhatsApp</v-list-item-title>
            </v-list-item>
            <v-list-item @click="compartilharRedeSocial('facebook')">
              <template v-slot:prepend>
                <v-icon color="blue">mdi-facebook</v-icon>
              </template>
              <v-list-item-title>Facebook</v-list-item-title>
            </v-list-item>
            <v-list-item @click="compartilharLink">
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-link</v-icon>
              </template>
              <v-list-item-title>Copiar link</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>


    <v-container class="pa-0" fluid>
      <v-row justify="center" class="mt-0">
        <v-col cols="12" lg="8" xl="6" class="px-4 px-md-6">

          <article v-if="!carregando && noticia" class="mb-12">

            <header class="mb-8">
  
              <div class="mb-6">
                <v-chip
                  color="#db0e35"
                  text-color="white"
                  size="small"
                  class="font-weight-bold px-3"
                  label
                >
                  {{ noticia.categoria || 'Todos' }}
                </v-chip>
              </div>


              <h1 class="text-h3 text-md-h2 font-weight-bold mb-4 text-grey-darken-4 line-height-1">
                {{ noticia.titulo }}
              </h1>


              <p v-if="noticia.descricao" class="text-h6 text-grey-darken-2 mb-8">
                {{ noticia.descricao }}
              </p>


              <v-container class="d-flex flex-wrap align-center  text-grey-darken-1 mb-6" style="gap: 2rem;">
                <div v-if="noticia.autor" class="d-flex align-center">
                  <v-icon size="small" class="mr-2">mdi-account</v-icon>
                  <span class="text-body-1">{{ noticia.autor }}</span>
                </div>
                
                <div v-if="noticia.dataPublicacao" class="d-flex align-center">
                  <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-1">{{ formarData(noticia.dataPublicacao) }}</span>
                </div>
                
                <div v-if="noticia.tempoLeitura" class="d-flex align-center">
                  <v-icon size="small" class="mr-2">mdi-clock-outline</v-icon>
                  <span class="text-body-1">{{ noticia.tempoLeitura }}</span>
                </div>
              </v-container>
            </header>

            <section v-if="noticia.conteudo" class="mb-10">
              <v-container class="text-body-1 text-md-h6 line-height-2 article-content text-grey-darken-3">

                <template v-if="Array.isArray(noticia.conteudo)">
                  <v-col 
                    v-for="(paragrafo, index) in noticia.conteudo" 
                    :key="index"
                    class="mb-6"
                  >
                    <p v-if="typeof paragrafo === 'string'">
                      {{ paragrafo }}
                    </p>
                  </v-col>
                </template>
                

                <div v-else-if="noticia.conteudo" class="mb-6">
                  <p>{{ noticia.conteudo }}</p>
                </div>
              </v-container>
            </section>

            <section v-if="noticia.tags && noticia.tags.length" class="mb-8">
              <div class="d-flex flex-wrap gap-2">
                <v-chip
                  v-for="(tag, index) in noticia.tags"
                  :key="index"
                  color="grey-lighten-3"
                  variant="outlined"
                  size="small"
                  class="cursor-pointer hover-chip"
                  @click="filtrarPorTag(tag)"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </section>

            <section class="mb-10">
              <v-divider class="mb-6"></v-divider>
              
              <div class="d-flex flex-wrap align-center justify-space-between gap-4">
                <div class="d-flex align-center">
                  <span class="text-body-2 text-grey-darken-2 mr-4">
                    Este conteúdo foi útil?
                  </span>
                  <v-btn
                    :color="curtido ? '#db0e35' : 'grey-lighten-1'"
                    :class="curtido ? 'text-white' : 'text-grey-darken-2'"
                    variant="flat"
                    @click="curtirArtigo"
                    size="small"
                    :prepend-icon="curtido ? 'mdi-heart' : 'mdi-heart-outline'"
                  >
                    {{ curtido ? 'Curtido' : 'Curtir' }}
                  </v-btn>
                </div>
                
                <div class="d-flex " style="gap: 2rem;">
                  <v-btn
                    variant="outlined"
                    @click="compartilhar"
                    prepend-icon="mdi-share-variant"
                    size="small"
                  >
                    Compartilhar
                  </v-btn>
                  
                  <v-btn
                    variant="outlined"
                    color="grey-darken-2"
                    @click="voltar"
                    prepend-icon="mdi-arrow-left"
                    size="small"
                    style="background-color: #bb1e26; color: #fff !important;"
                    class="d-none d-md-flex"
                  >
                    Voltar
                  </v-btn>
                </div>
              </div>
            </section>

            <section v-if="noticia.autor" class="mb-12">
              <div class="bg-grey-lighten-4 pa-6 rounded-lg">
                <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">
                  <v-icon color="#db0e35" class="mr-2">mdi-account</v-icon>
                  Sobre o Autor
                </h3>
                <p class="text-body-1 text-grey-darken-3">
                  Artigo escrito por {{ noticia.autor }}.
                </p>
              </div>
            </section>
          </article>


          <v-alert
            v-else-if="erro"
            type="error"
            variant="tonal"
            class="my-12"
          >
            <v-alert-title>Erro ao carregar a notícia</v-alert-title>
            {{ erro }}
            <template v-slot:append>
              <v-btn
                color="error"
                variant="text"
                @click="carregarNoticia"
              >
                Tentar novamente
              </v-btn>
            </template>
          </v-alert>

 
          <div v-else-if="!carregando && !noticia && !erro" class="text-center py-16">
            <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-newspaper-remove</v-icon>
            <h3 class="text-h5 text-grey-darken-2 mb-2">Notícia não encontrada</h3>
            <p class="text-body-1 text-grey-darken-1 mb-6">
              A notícia que você está procurando não existe ou foi removida.
            </p>
            <v-btn
              color="#db0e35"
              prepend-icon="mdi-arrow-left"
              @click="voltar"
            >
              Voltar para notícias
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>


    <v-fab-transition>
      <v-btn
        v-show="showScrollButton && !carregando && noticia"
        color="#db0e35"
        dark
        fab
        small
        class="d-md-none"
        style="position: fixed; bottom: 24px; right: 24px; z-index: 1000;"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>


    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { buscarPostPorId } from '../services/blogServices'
import { useDisplay } from 'vuetify'


const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()


const noticia = ref(null)
const carregando = ref(false)
const erro = ref(null)
const curtido = ref(false)
const progressoLeitura = ref(0)
const showScrollButton = ref(false)
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success'
})

const isMobile = computed(() => mobile.value)


const carregarNoticia = async () => {

  
  carregando.value = true
  erro.value = null
  noticia.value = null
  
  try {

    const id = route.params.id
    
    if (!id) {
      throw new Error('ID da notícia não encontrado na URL')
    }
    
    const response = await buscarPostPorId(id)
    if (!response || !response.data) {
      throw new Error('Resposta vazia da API')
    }

    let dadosArray = response.data
    

    if (response.data.data && Array.isArray(response.data.data)) {
      dadosArray = response.data.data
    }

    if (!Array.isArray(dadosArray)) {
      console.log('⚠️ Dados não são um array, tentando converter...')
      

      if (dadosArray && typeof dadosArray === 'object') {

        const arrayKeys = Object.keys(dadosArray).filter(key => Array.isArray(dadosArray[key]))
        
        if (arrayKeys.length > 0) {
          console.log('🔑 Encontrado array na propriedade:', arrayKeys[0])
          dadosArray = dadosArray[arrayKeys[0]]
        } else {

          dadosArray = [dadosArray]
        }
      }
    }

    if (!Array.isArray(dadosArray) || dadosArray.length === 0) {
      throw new Error('Nenhuma notícia encontrada')
    }
    

    const primeiraNoticia = dadosArray[0]

    
    if (!primeiraNoticia) {
      throw new Error('Notícia vazia no array')
    }
    

    noticia.value = primeiraNoticia

    
  } catch (error) {
    console.error('❌ Erro ao carregar notícia:', error)
    erro.value = error.message || 'Não foi possível carregar a notícia. Tente novamente mais tarde.'
  } finally {
    carregando.value = false
  }
}


const mostrarSnackbar = (message, color = 'success') => {
  snackbar.value = {
    visible: true,
    message,
    color
  }
}


onMounted(() => {

  

  if (route.params.id) {
    carregando.value = true
    setTimeout(() => {
      carregarNoticia()
    }, 100) 
  } else {
    erro.value = 'ID da notícia não especificado na URL'
    carregando.value = false
  }
  
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('scroll', atualizarProgressoLeitura)
})


watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log('🔄 ID da rota mudou:', oldId, '->', newId)
    if (newId && newId !== oldId) {
      carregarNoticia()
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', atualizarProgressoLeitura)
})


const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formarData = (dataString) => {
  if (!dataString) return ''
  
  try {
    const data = new Date(dataString)
    
    if (isNaN(data.getTime())) {
      return dataString
    }
    
    const opcoes = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    
    return data.toLocaleDateString('pt-BR', opcoes)
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return dataString
  }
}

const atualizarProgressoLeitura = () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  
  if (docHeight > 0) {
    const scrollPercent = (scrollTop / docHeight) * 100
    progressoLeitura.value = Math.min(100, Math.round(scrollPercent))
  }
}


const voltar = () => {
  router.back()
}

const curtirArtigo = () => {
  curtido.value = !curtido.value
  mostrarSnackbar(curtido.value ? 'Notícia curtida!' : 'Curtida removida')
}

const compartilhar = () => {
  if (navigator.share && noticia.value) {
    navigator.share({
      title: noticia.value.titulo,
      text: noticia.value.descricao || '',
      url: window.location.href,
    }).then(() => {
      mostrarSnackbar('Compartilhado com sucesso!')
    }).catch((error) => {
      console.error('Erro ao compartilhar:', error)
      compartilharLink()
    })
  } else {
    compartilharLink()
  }
}

const compartilharLink = () => {
  navigator.clipboard.writeText(window.location.href)
  mostrarSnackbar('Link copiado para a área de transferência!')
}

const compartilharRedeSocial = (rede) => {
  if (!noticia.value) return
  
  const url = encodeURIComponent(window.location.href)
  const titulo = encodeURIComponent(noticia.value.titulo)
  const texto = encodeURIComponent(noticia.value.descricao || '')
  
  const urls = {
    whatsapp: `https://wa.me/?text=${titulo}%0A%0A${texto}%0A%0A${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${titulo}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${titulo}`
  }
  
  if (urls[rede]) {
    window.open(urls[rede], '_blank', 'noopener,noreferrer')
    mostrarSnackbar(`Compartilhando no ${rede}...`)
  }
}

const filtrarPorTag = (tag) => {
  router.push(`/blog?tag=${encodeURIComponent(tag)}`)
}
</script>

<style scoped>

.line-height-1 {
  line-height: 1.2;
}

.line-height-2 {
  line-height: 1.8;
}

.article-content {
  font-size: 1.125rem;
}

.article-content h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}


.hover-chip:hover {
  background-color: #db0e35 !important;
  color: white !important;
  transition: all 0.2s ease;
}


.text-grey-darken-4 {
  color: #1a1a1a !important;
}

.text-grey-darken-3 {
  color: #404040 !important;
}

.text-grey-darken-2 {
  color: #666666 !important;
}


@media (max-width: 960px) {
  .article-content {
    font-size: 1rem;
  }
  
  h1.text-h3 {
    font-size: 2rem !important;
  }
  
  h2.text-h5 {
    font-size: 1.25rem !important;
  }
  
  .text-h6 {
    font-size: 1.125rem !important;
  }
}

@media (max-width: 600px) {
  h1.text-h3 {
    font-size: 1.75rem !important;
  }
  
  .px-4 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}


html {
  scroll-behavior: smooth;
}


::selection {
  background-color: rgba(219, 14, 53, 0.15);
  color: #1a1a1a;
}

::-moz-selection {
  background-color: rgba(219, 14, 53, 0.15);
  color: #1a1a1a;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeIn 0.3s ease-out;
}

.v-icon {
  opacity: 0.7;
}
</style>