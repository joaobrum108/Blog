<template>
    <v-main class="d-flex justify-center w-100">
        <v-container style="background-color:#f5f5f5;" max-width="1280" class="pt-6 pt-md-10">

            <v-row class="mb-4">
                <v-col cols="12" md="8" class="d-flex flex-column justify-center">
                    <h1 class="text-h4 text-md-h3 font-weight-bold primary--text mb-2">
                        Painel de Publicações
                    </h1>
                    <p class="text-body-1 text--secondary">
                        Gerencie e crie conteúdo para o seu blog de forma simples e organizada
                    </p>
                </v-col>
                <v-col cols="12" md="4" class="d-flex align-center justify-end">
                    <v-btn 
                        color="primary" 
                        outlined
                        class="mb-2"
                        @click="$router.push('/Blog-para-voce')"
                    >
                        <v-icon left>mdi-arrow-left</v-icon>
                        Voltar ao Blog
                    </v-btn>
                </v-col>
            </v-row>


            <v-row class="mb-6">
                <v-col cols="12">
                    <v-card class="pa-6 elevation-2" color="white">
                        <v-card-title class="d-flex align-center pb-3">
                            <v-icon color="success" large class="mr-3">mdi-plus-circle</v-icon>
                            <span class="text-h5 font-weight-medium">Criar Nova Publicação</span>
                        </v-card-title>
                        <v-card-text>
                            <p class="text-body-1 mb-4">
                                Comece uma nova publicação para compartilhar seus conhecimentos e ideias
                            </p>
                            <v-btn 
                                color="success" 
                                large
                                @click="$router.push('/criar-publicacao')"
                                class="px-6"
                            >
                                <v-icon left>mdi-pencil-plus</v-icon>
                                Criar Nova Publicação
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mb-6">
                <v-col cols="12" sm="6" md="3">
                    <v-card class="pa-4 text-center elevation-1" color="white">
                        <v-icon color="primary" large class="mb-2">mdi-file-document-multiple</v-icon>
                        <h3 class="text-h5 font-weight-bold">12</h3>
                        <p class="text-caption text--secondary">Publicações Totais</p>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-card class="pa-4 text-center elevation-1" color="white">
                        <v-icon color="green" large class="mb-2">mdi-check-circle</v-icon>
                        <h3 class="text-h5 font-weight-bold">8</h3>
                        <p class="text-caption text--secondary">Publicadas</p>
                    </v-card>
                </v-col>
                                
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-card class="elevation-2">
                        
                        <v-card-text>
                            <div v-if="loading" class="text-center py-8">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                <p class="mt-2">Carregando publicações...</p>
                            </div>

                            <div v-else-if="posts.length === 0" class="text-center py-8">
                                <v-icon size="64" color="grey lighten-2" class="mb-4">mdi-file-document-outline</v-icon>
                                <h3 class="text-h6 mb-2">Nenhuma publicação encontrada</h3>
                                <p class="text-body-2 text--secondary mb-4">
                                    Comece criando sua primeira publicação
                                </p>
                                <v-btn color="primary" @click="$router.push('/criar-publicacao')">
                                    Criar Primeira Publicação
                                </v-btn>
                            </div>

                      
                            <v-row v-else>
                                <v-col 
                                    v-for="post in filteredPosts" 
                                    :key="post.id" 
                                    cols="12" 
                                    md="6" 
                                    lg="4"
                                >
                                    <v-card class="elevation-1 h-100" hover>
                                        <v-img
                                            height="160"
                                            :src="post.image || 'https://via.placeholder.com/300x160?text=Sem+Imagem'"
                                            class="align-end"
                                        >
                                            <v-chip 
                                                small 
                                                :color="post.status === 'published' ? 'green' : 'orange'"
                                                class="ma-2"
                                            >
                                                {{ post.status === 'published' ? 'Publicado' : 'Rascunho' }}
                                            </v-chip>
                                        </v-img>
                                        
                                        <v-card-title class="text-subtitle-2 font-weight-bold">
                                            {{ post.title }}
                                        </v-card-title>
                                        
                                        <v-card-text class="pb-2">
                                            <div class="d-flex justify-space-between text-caption text--secondary mb-2">
                                                <span>{{ formatDate(post.createdAt) }}</span>
                                            </div>
                                            <p class="text-body-2 line-clamp-2">
                                                {{ post.excerpt }}
                                            </p>
                                        </v-card-text>
                                        
                                        <v-card-actions class="pt-0">
                                            <v-btn 
                                                small 
                                                text 
                                                color="primary"
                                                @click="editPost(post.id)"
                                            >
                                                <v-icon small left>mdi-pencil</v-icon>
                                                Editar
                                            </v-btn>
                                            <v-btn 
                                                small 
                                                text 
                                                color="error"
                                                @click="deletePost(post.id)"
                                            >
                                                <v-icon small left>mdi-delete</v-icon>
                                                Excluir
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-icon 
                                                v-if="post.status === 'published'"
                                                small 
                                                color="green"
                                            >
                                                mdi-check-circle
                                            </v-icon>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'


const search = ref('')
const loading = ref(false)
const posts = ref([])


posts.value = [
    {
        id: 1,
        title: 'Como Melhorar a UX do seu Blog',
        excerpt: 'Dicas práticas para melhorar a experiência do usuário no seu blog...',
        status: 'published',
        createdAt: new Date('2024-01-15'),
        views: 342,
        image: 'https://via.placeholder.com/300x160'
    },
    {
        id: 2,
        title: 'Introdução ao Vue.js',
        excerpt: 'Aprenda os conceitos básicos do Vue.js framework...',
        status: 'draft',
        createdAt: new Date('2024-01-10'),
        views: 0,
        image: 'https://via.placeholder.com/300x160'
    }
]


const filteredPosts = computed(() => {
    if (!search.value) return posts.value
    return posts.value.filter(post => 
        post.title.toLowerCase().includes(search.value.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.value.toLowerCase())
    )
})


const editPost = (id) => {
    
    console.log('Editar post:', id)
}

const deletePost = (id) => {
    
    if (confirm('Tem certeza que deseja excluir esta publicação?')) {
        console.log('Excluir post:', id)
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.h-100 {
    height: 100%;
}

.v-card:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease-in-out;
}

.primary--text {
    color: #1976d2 !important;
}
</style>