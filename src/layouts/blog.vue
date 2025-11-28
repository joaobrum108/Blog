<template>
  <v-main style="background-color:#f5f5f5;" class="d-flex justify-center w-100">
    <v-container  max-width="1280" class="pt-6 pt-md-10">

      <v-col class="text-left mb-8">
        <v-chip color="primary" class="mb-3" size="small">Blog Portal RedFox</v-chip>
        <h1 class="text-h4 text-md-h2 font-weight-black mb-3 primary--text">
          Bem-vindo ao blog da RedFox
        </h1>
        <p class="text-body-1 text-grey-darken-2 max-width-600">
          Fique por dentro das últimas notícias, dicas e novidades do mundo da tecnologia e da nossa empresa.
        </p>
      </v-col>

      <article class="mb-10" v-if="posts.length > 0">
        <v-card 
          style="border-radius:20px;" 
          class="overflow-hidden featured-article elevation-4"
          ripple
          @click=""
        >
          <v-img
            :aspect-ratio="16/9"
            cover
            :src="getImageUrl(posts[0].imagem)"
            :alt="posts[0].titulo"
            loading="lazy"
            class="featured-image"
          >
            <v-card-text class="image-overlay d-flex flex-column justify-end pa-6">
              <v-chip color="white" class="mb-3 align-self-start" size="small" text-color="primary">
                {{ posts[0].categoria || 'Geral' }}
              </v-chip>

              <h2 class="text-white text-h5 text-md-h3 font-weight-bold mb-3">
                {{ posts[0].titulo }}
              </h2>

              <p class="text-white text-body-2 text-md-body-1 mb-4 opacity-90 max-width-700">
                {{ posts[0].descricao }}
              </p>
              
              <div class="d-flex align-center">
                <v-avatar size="32" class="mr-2">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </v-avatar>
                <span class="text-white text-caption mr-4">RedFox</span>
                <v-icon small color="white" class="mr-1">mdi-calendar</v-icon>
                <span class="text-white text-caption">
                  {{ formatarData(posts[0].dataPublicacao) }}
                </span>
              </div>
            </v-card-text>
          </v-img>
        </v-card>
      </article>

      <article class="mb-10" v-else>
        <v-card 
          style="border-radius:20px;" 
          class="overflow-hidden featured-article elevation-4"
        >
          <v-skeleton-loader
            type="image, article"
          ></v-skeleton-loader>
        </v-card>
      </article>

      <section class="mb-12">
        <v-row class="mb-4">
          <v-col cols="12" class="d-flex align-center justify-space-between">
            <h2 class="text-h5 text-md-h4 font-weight-bold">Posts Recentes</h2>
            <v-btn text color="primary" class="text-capitalize">
              Ver todos
              <v-icon right small>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="n in 3" 
            :key="n" 
            cols="12" 
            sm="6" 
            md="4"
            class="d-flex"
          >
            <v-card 
              elevation="2" 
              class="post-card flex-grow-1 d-flex flex-column"
              style="border-radius:12px;"
              hover
            >
              <v-img 
                :aspect-ratio="16/9" 
                cover 
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                style="border-top-left-radius:12px; border-top-right-radius:12px;"
              ></v-img>
              <v-card-title class="text-h6 font-weight-bold pb-2">
                {{ n === 1 ? 'Dicas de Produtividade' : n === 2 ? 'Novidades da Empresa' : 'Eventos da Semana' }}
              </v-card-title>
              <v-card-text class="flex-grow-1 text-grey-darken-1">
                {{ n === 1 ? 'Aprenda a aumentar sua produtividade com essas dicas simples.' : 
                   n === 2 ? 'Confira as últimas atualizações e novidades da nossa empresa.' : 
                   'Não perca os eventos que preparamos para esta semana!' }}
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn 
                  text 
                  color="primary" 
                  class="text-capitalize font-weight-medium"
                >
                  Ler mais
                  <v-icon right small>mdi-arrow-right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <span class="text-caption text-grey">5 min</span>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <section class="mb-8">
        <v-row class="mb-4">
          <v-col cols="12">
            <h2 class="text-h5 text-md-h4 font-weight-bold">Aniversariantes do Mês</h2>
            <p class="text-body-1 text-grey-darken-2 mt-1">
              Parabéns aos nossos colaboradores que estão comemorando aniversário este mês!
            </p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="n in 4" 
            :key="n" 
            cols="6" 
            sm="4" 
            md="3"
            class="d-flex"
          >
            <v-card 
              flat 
              class="birthday-card flex-grow-1 text-center pa-4"
              style="border-radius:12px;"
            >
              <v-avatar size="80" color="primary lighten-4" class="mb-3">
                <v-icon color="primary" size="40">mdi-account</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-1">
                {{ n === 1 ? 'Maria Silva' : n === 2 ? 'João Santos' : n === 3 ? 'Ana Costa' : 'Pedro Oliveira' }}
              </h3>
              <p class="text-caption text-grey-darken-1 mb-2">
                {{ n === 1 ? 'Designer' : n === 2 ? 'Desenvolvedor' : n === 3 ? 'Analista' : 'Gerente' }}
              </p>
              <v-chip small color="primary lighten-4" text-color="primary darken-2">
                {{ posts.length > 0 ? formatarData(posts[0].dataPublicacao) : '10 de Out' }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { carregarPosts } from "../services/blogServices";

const posts = ref([]);

const formatarData = (dataString) => {
  if (!dataString) return 'Data não disponível';
  
  try {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/ de /g, ' ').replace('.', '');
  } catch (error) {
    return 'Data inválida';
  }
};


const getImageUrl = (imagemNome) => {
  if (!imagemNome) return 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
  return `http://localhost:3600/uploads/${imagemNome}`;
};

const carregarDados = async () => {
  try {
    const response = await carregarPosts();
    posts.value = response.data.data;
    console.log("Posts carregados:", posts.value);
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
  }
};

onMounted(() => {
  carregarDados();
});
</script>


<style scoped>
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.85) 0%,
    rgba(0,0,0,0.5) 60%,
    transparent 100%
  );
  backdrop-filter: blur(1px);
}

:deep(.text-white) {
  text-shadow: 0 1px 3px rgba(0,0,0,0.7);
}

.max-width-600 {
  max-width: 600px;
}

.max-width-700 {
  max-width: 700px;
}

.featured-article {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-article:hover {
  transform: translateY(-5px);
}

.post-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px -8px rgba(0,0,0,0.2) !important;
}

.birthday-card {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.birthday-card:hover {
  border-color: rgba(0,0,0,0.1);
  background-color: rgba(255,255,255,0.7);
}

@media (max-width: 768px) {
  .image-overlay {
    padding: 1rem !important;
  }

  :deep(.image-overlay h2) {
    font-size: 1.25rem !important;
  }
  
  .featured-article:hover {
    transform: none;
  }
  
  .post-card:hover {
    transform: none;
  }
}
</style>