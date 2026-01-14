<template>
  <v-main style="background-color: #f5f5f5;">
    <v-container max-width="1280">
      <v-row  class="mt-10" justify="center">
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold">Últimas Notícias</h1>
          <br>
          <p class="subtitle">Fique por dentro das novidades e comunicados da empresa</p>
          <br>
          <div class="btn-group">
            <v-btn 
                v-for="categoria in categorias" 
                :key="categoria" 
                class="filter-btn" 
                :class="{ active: categoriaSelecionada === categoria }"
                @click="categoriaSelecionada = categoria"
            >
                {{ categoria }}
            </v-btn>
            </div>

        </v-col>
        
      </v-row>
      <v-row class="mt-6" justify="start" align="stretch">
        <v-col 
          v-for="(noticia, index) in noticiasFiltradas" 
          :key="index"
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
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { carregarPosts } from '../services/blogServices' 

const noticias = ref([])
const categoriaSelecionada = ref('Todos')
const categorias = ref([])

onMounted(async () => {
  try {
    const response = await carregarPosts()
    noticias.value = response.data.data || response.data

    const categoriasUnicas = [...new Set(noticias.value.map(n => n.categoria))]
    categorias.value = ['Todos', ...categoriasUnicas]
  } catch (error) {
    console.error("Erro ao carregar posts:", error)
  }
})

const formarData = (dataString) => {
  const opcoes = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dataString).toLocaleDateString('pt-BR', opcoes)
}

const noticiasFiltradas = computed(() => {
  if (categoriaSelecionada.value === 'Todos') {
    return noticias.value
  }
  return noticias.value.filter(noticia => noticia.categoria === categoriaSelecionada.value)
})
</script>




<style scoped>

.card-noticia {
  padding: 1.5rem;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-noticia:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #db0e35;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.badge {
  background-color: rgba(219, 14, 53, 0.1);
  color: #db0e35;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.reading-time {
  font-size: 0.8rem;
  color: #666;
}

.titulo-noticia {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
}

.card-noticia:hover .titulo-noticia {
  color: #db0e35;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: #666;
}

.divider {
  color: #ccc;
}

.author {
  color: #444;
  font-weight: 500;
}

.descricao {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.read-more-btn {
  border-color: #db0e35;
  color: #db0e35 !important;
  border-radius: 20px;
  font-weight: 600;
  text-transform: none;
  padding: 0.25rem 1.5rem;
  transition: all 0.2s ease;
}

.read-more-btn:hover {
  background-color: #db0e35 !important;
  color: white !important;
}


.interactions {
  display: flex;
  gap: 1.25rem;
}

.reaction {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.reaction:hover {
  background-color: #f5f5f5;
}

.reaction-icon {
  font-size: 1.1rem;
}

.reaction-count {
  font-size: 0.85rem;
  color: #555;
  font-weight: 500;
}

.btn-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  border-radius: 20px !important;
  text-transform: none;
  font-weight: 500;
  padding: 0.5rem 1.25rem !important;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background-color: #db0e35 !important;
  color: white !important;
}

.filter-btn:not(.active) {
  background-color: white !important;
  border: 1px solid #ddd !important;
  color: #555 !important;
}

.filter-btn:not(.active):hover {
  border-color: #db0e35 !important;
  color: #db0e35 !important;
}

h1 {
  color: #db0e35;
}

.subtitle {
  color: #555555;
  font-size: 1.1rem;
}
</style>