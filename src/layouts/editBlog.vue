<template>
  <v-main style="background-color:#f5f5f5;" class="d-flex justify-center w-100">
    <v-container max-width="1280" class="pt-6 pt-md-10">
      
      <PageHeader />
      
      <v-row class="mb-6">
        <v-col cols="12" md="6">
          <CreatePostCard @create-post="mostrarModalCriar = true" />
        </v-col>
        <v-col cols="12" md="6">
          <BirthdayCard @add-birthday="mostrarModalAniversariante = true" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <PostsList 
            :posts="publicacoesFiltradas"
            :loading="carregando"
            @edit-post="abrirModalEditar"
            @delete-post="abrirModalExcluir"
          />
        </v-col>
      </v-row>

  
      <CreatePostModal 
        v-model="mostrarModalCriar"
        :loading="criandoPublicacao"
        @create="criarPublicacao"
        @close="fecharModalCriar"
      />

      <EditPostModal 
        v-model="mostrarModalEditar"
        :post="publicacaoSelecionada"
        @confirm="confirmarEdicao"
      />

      <DeletePostModal 
        v-model="mostrarModalExcluir"
        :post="publicacaoSelecionada"
        @confirm="confirmarExclusao"
      />

      <BirthdayModal 
        v-model="mostrarModalAniversariante"
        :loading="adicionandoAniversariante"
        @add="adicionarAniversariante"
        @close="fecharModalAniversariante"
      />

      <!-- Birthday List -->
      <BirthdayList 
        :birthdays="publicacoesAniversariantes"
        @edit-birthday="editarAniversariante"
        @delete-birthday="excluirAniversariante"
      />

    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { carregarPosts, enviarPost } from '../services/blogServices'

import PageHeader from '../components/pageLayout/PageHeader.vue'
import CreatePostCard from '../components/cards/CreatePostCard.vue'
import BirthdayCard from '../components/cards/BirthdayCard.vue'
import PostsList from '../components/cards/PostsList.vue'
import BirthdayList from '../components/cards/BirthdayList.vue'
import CreatePostModal from '../components/modals/CreatePostModal.vue'
import EditPostModal from '../components/modals/EditPostModal.vue'
import DeletePostModal from '../components/modals/DeletePostModal.vue'
import BirthdayModal from '../components/modals/BirthdayModal.vue'

const roteador = useRouter()

const mostrarModalCriar = ref(false)
const mostrarModalEditar = ref(false)
const mostrarModalExcluir = ref(false)
const mostrarModalAniversariante = ref(false)

const criandoPublicacao = ref(false)
const adicionandoAniversariante = ref(false)
const carregando = ref(false)
const pesquisa = ref('')

const publicacoes = ref([])
const publicacaoSelecionada = ref(null)
const publicacoesAniversariantes = ref([])

const publicacoesFiltradas = computed(() => {
  if (!pesquisa.value) return publicacoes.value
  return publicacoes.value.filter(publicacao => 
    publicacao.titulo.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
    publicacao.descricao.toLowerCase().includes(pesquisa.value.toLowerCase())
  )
})

const abrirModalEditar = (publicacao) => {
  publicacaoSelecionada.value = publicacao
  mostrarModalEditar.value = true
}

const abrirModalExcluir = (publicacao) => {
  publicacaoSelecionada.value = publicacao
  mostrarModalExcluir.value = true
}

const fecharModalCriar = () => {
  mostrarModalCriar.value = false
}

const fecharModalAniversariante = () => {
  mostrarModalAniversariante.value = false
}

const criarPublicacao = async (postData) => {
  criandoPublicacao.value = true
  try {
    const formData = new FormData()
    formData.append('titulo', postData.titulo)
    formData.append('descricao', postData.descricao)
    formData.append('conteudo', postData.conteudo)
    formData.append('categoria', postData.categoria)
    
    if (postData.arquivoImagem) {
      formData.append('imagem', postData.arquivoImagem)
    }

    await enviarPost(formData)
    fecharModalCriar()
    await carregarOsPosts()
    
  } catch (erro) {
  } finally {
    criandoPublicacao.value = false
  }
}

const confirmarEdicao = () => {
  if (publicacaoSelecionada.value) {
    roteador.push(`/editar-publicacao/${publicacaoSelecionada.value.id}`)
  }
  mostrarModalEditar.value = false
}

const confirmarExclusao = async () => {
  if (publicacaoSelecionada.value) {
    try {
      publicacoes.value = publicacoes.value.filter(
        publicacao => publicacao.id !== publicacaoSelecionada.value.id
      )
    } catch (erro) {
    }
  }
  mostrarModalExcluir.value = false
}

const adicionarAniversariante = async (aniversarianteData) => {
  adicionandoAniversariante.value = true
  try {
    await new Promise(resolver => setTimeout(resolver, 1000))
    mostrarModalAniversariante.value = false
  } catch (erro) {
  } finally {
    adicionandoAniversariante.value = false
  }
}

const editarAniversariante = (aniversariante) => {
}

const excluirAniversariante = (aniversariante) => {
  publicacoesAniversariantes.value = publicacoesAniversariantes.value.filter(
    a => a.id !== aniversariante.id
  )
}

const carregarOsPosts = async () => {
  try {
    const response = await carregarPosts()
    let dadosPublicacoes = []
    
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      dadosPublicacoes = response.data.data
    } else if (Array.isArray(response.data)) {
      dadosPublicacoes = response.data
    }

    publicacoes.value = dadosPublicacoes.map(publicacao => ({
      id: publicacao.id,
      titulo: publicacao.titulo,
      descricao: publicacao.descricao,
      categoria: publicacao.categoria,
      imagem: publicacao.imagem ? `http://localhost:3600/uploads/${publicacao.imagem}` : 'https://via.placeholder.com/300x160?text=Sem+Imagem',
      dataCriacao: publicacao.dataPublicacao,
      dataPublicacao: publicacao.dataPublicacao
    }))
  } catch (error) {
    publicacoes.value = []
  }
}

onBeforeMount(async () => {
  carregando.value = true
  await carregarOsPosts()
  carregando.value = false

  publicacoesAniversariantes.value = [
    {
      id: 1,
      nome: 'Ana Silva',
      cargo: 'Desenvolvedora Frontend',
      dataNascimento: '1990-02-20',
      departamento: 'Tecnologia',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7QDxdPUJrphv3FzWyVCw1uvO5jOMhTyNZQ&s',
      mensagem: 'Feliz aniversário! Que seu dia seja repleto de alegria e sucesso.'
    }
  ]
})
</script>