<template>
  <v-main style="background-color:#f5f5f5;" class="d-flex justify-center w-100">
    <v-container max-width="1280" class="pt-6 pt-md-10">

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
        <v-col cols="12" md="6">
          <v-card class="pa-6" color="white">
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
                @click="mostrarModalCriar = true"
                class="px-6"
              >
                <v-icon left>mdi-pencil-plus</v-icon>
                Criar Nova Publicação
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="pa-4 text-left elevation-1" color="white">
            <v-card-text>
              <span class="text-h5 text-left font-weight-medium">
                Adicione a lista de aniversariantes do mês
              </span>
              <p>Adicione os seus colaboradores que estão comemorando aniversários deste mês</p>
            </v-card-text>
            <v-card-actions>
              <v-btn 
                color="primary" 
                outlined
                @click="mostrarModalAniversariante = true"
              >
                <v-icon left>mdi-account-multiple-plus</v-icon>
                Adicionar Aniversariantes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <div v-if="carregando" class="text-center py-8">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <p class="mt-2">Carregando publicações...</p>
              </div>

              <div v-else-if="publicacoes.length === 0" class="text-center py-8">
                <v-icon size="64" color="grey lighten-2" class="mb-4">mdi-file-document-outline</v-icon>
                <h3 class="text-h6 mb-2">Nenhuma publicação encontrada</h3>
                <p class="text-body-2 text--secondary mb-4">
                  Comece criando sua primeira publicação
                </p>
                <v-btn color="primary" @click="mostrarModalCriar = true">
                  Criar Primeira Publicação
                </v-btn>
              </div>

              <v-row v-else>
                <v-col 
                  v-for="publicacao in publicacoesFiltradas" 
                  :key="publicacao.id" 
                  cols="12" 
                  md="6" 
                  lg="4"
                >
                  <v-card class="elevation-1 h-100" hover>
                    <v-img
                      height="160"
                      :src="publicacao.imagem || 'https://via.placeholder.com/300x160?text=Sem+Imagem'"
                      class="align-end"
                    >
                      <v-chip 
                        small 
                        :color="publicacao.status === 'publicado' ? 'green' : 'orange'"
                        class="ma-2"
                      >
                        {{ publicacao.status === 'publicado' ? 'Publicado' : 'Rascunho' }}
                      </v-chip>
                    </v-img>
                    
                    <v-card-title class="text-subtitle-2 font-weight-bold">
                      {{ publicacao.titulo }}
                    </v-card-title>
                    
                    <v-card-text class="pb-2">
                      <div class="d-flex justify-space-between text-caption text--secondary mb-2">
                        <span>{{ formatarData(publicacao.dataCriacao) }}</span>
                      </div>
                      <p class="text-body-2 line-clamp-2">
                        {{ publicacao.resumo }}
                      </p>
                    </v-card-text>
                    
                    <v-card-actions class="pt-0">
                      <v-btn 
                        small 
                        text 
                        color="primary"
                        @click="abrirModalEditar(publicacao)"
                      >
                        <v-icon small left>mdi-pencil</v-icon>
                        Editar
                      </v-btn>
                      <v-btn 
                        small 
                        text 
                        color="error"
                        @click="abrirModalExcluir(publicacao)"
                      >
                        <v-icon small left>mdi-delete</v-icon>
                        Excluir
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-icon 
                        v-if="publicacao.status === 'publicado'"
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


      <v-dialog v-model="mostrarModalCriar" max-width="800" persistent>
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">Criar Nova Publicação</span>
            <v-btn icon @click="fecharModalCriar">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-form ref="formularioCriar" v-model="formularioCriarValido">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="novaPublicacao.titulo"
                    variant="solo-filled"
                    label="Título da Publicação"
                    :regras="[v => !!v || 'Título é obrigatório']"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="novaPublicacao.resumo"
                    variant="solo-filled"
                    label="Resumo da Publicação"
                    :regras="[v => !!v || 'Descrição é obrigatória']"
                    rows="3"
                    outlined
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="novaPublicacao.categoria"
                    label="Categoria"
                    variant="solo-filled"
                    placeholder="Digite a categoria da publicação"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="novaPublicacao.arquivoImagem"
                    label="Imagem de Capa"
                    accept="image/*"
                    ariant="solo-filled"
                    prepend-icon="mdi-camera"
                    placeholder="Selecione uma imagem para capa"
                    outlined
                    @change="manipularUploadImagem"
                  ></v-file-input>
                  
                  <div v-if="previewImagem" class="mt-2">
                    <v-img
                      :src="previewImagem"
                      max-height="200"
                      max-width="300"
                      class="rounded"
                    ></v-img>
                    <v-btn 
                      small 
                      text 
                      color="error" 
                      @click="removerImagem"
                      class="mt-1"
                    >
                      <v-icon small>mdi-delete</v-icon>
                      Remover Imagem
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          
          <v-card-actions class="pa-6 pt-0">
            <v-spacer></v-spacer>
            <v-btn text @click="fecharModalCriar">Cancelar</v-btn>
            <v-btn 
              color="success" 
              :loading="criandoPublicacao"
              @click="criarPublicacao"
              :disabled="!formularioCriarValido"
            >
              <v-icon left>mdi-content-save</v-icon>
              {{ novaPublicacao.id ? 'Atualizar' : 'Criar' }} Publicação
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  
      <v-dialog v-model="mostrarModalEditar" max-width="500">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">Editar Publicação</span>
            <v-btn icon @click="mostrarModalEditar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <p>Tem certeza que deseja editar a publicação <strong>"{{ publicacaoSelecionada?.titulo }}"</strong>?</p>
            <v-alert v-if="publicacaoSelecionada?.status === 'publicado'" type="info" class="mt-4">
              Esta publicação está atualmente <strong>publicada</strong>. As alterações serão visíveis imediatamente.
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="mostrarModalEditar = false">Cancelar</v-btn>
            <v-btn color="primary" @click="confirmarEdicao">
              <v-icon left>mdi-pencil</v-icon>
              Editar Publicação
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

     
      <v-dialog v-model="mostrarModalExcluir" max-width="500">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">Excluir Publicação</span>
            <v-btn icon @click="mostrarModalExcluir = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" class="mb-4">
              <strong>Atenção!</strong> Esta ação não pode ser desfeita.
            </v-alert>
            <p>Tem certeza que deseja excluir permanentemente a publicação <strong>"{{ publicacaoSelecionada?.titulo }}"</strong>?</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="mostrarModalExcluir = false">Cancelar</v-btn>
            <v-btn color="error" @click="confirmarExclusao">
              <v-icon left>mdi-delete</v-icon>
              Excluir Permanentemente
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

   
      <v-dialog v-model="mostrarModalAniversariante" max-width="800" persistent>
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">Adicionar Aniversariante</span>
            <v-btn icon @click="fecharModalAniversariante">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-form ref="formularioAniversariante" v-model="formularioAniversarianteValido">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="novoAniversariante.nome"
                    label="Nome Completo"
                    variant="solo-filled"
                    :regras="[v => !!v || 'Nome é obrigatório']"
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="novoAniversariante.cargo"
                    label="Cargo/Função"
                    variant="solo-filled"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-menu
                    v-model="mostrarSeletorData"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on: attrs }">
                      <v-text-field
                        v-model="dataNascimentoFormatada"
                        label="Data de Nascimento"
                        variant="solo-filled"
                        :regras="[v => !!v || 'Data de nascimento é obrigatória']"
                        readonly
                        v-bind="attrs"
                        outlined
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="novoAniversariante.dataNascimento"
                      @input="mostrarSeletorData = false"
                      locale="pt-BR"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="novoAniversariante.departamento"
                    label="Departamento"
                    variant="solo-filled"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-file-input
                    v-model="novoAniversariante.arquivoFoto"
                    label="Foto do Aniversariante"
                    accept="image/*"
                    variant="solo-filled"
                    prepend-icon="mdi-camera"
                    placeholder="Selecione uma foto (opcional)"
                    outlined
                    @change="manipularUploadFoto"
                  ></v-file-input>
                  
                  <div v-if="previewFoto" class="mt-2">
                    <v-img
                      :src="previewFoto"
                      max-height="150"
                      max-width="150"
                      class="rounded-circle"
                    ></v-img>
                    <v-btn 
                      small 
                      text 
                      color="error" 
                      @click="removerFoto"
                      class="mt-1"
                    >
                      <v-icon small>mdi-delete</v-icon>
                      Remover Foto
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="novoAniversariante.mensagem"
                    label="Mensagem Personalizada"
                    variant="solo-filled"
                    rows="3"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          
          <v-card-actions class="pa-6 pt-0">
            <v-spacer></v-spacer>
            <v-btn text @click="fecharModalAniversariante">Cancelar</v-btn>
            <v-btn 
              color="primary" 
              :loading="adicionandoAniversariante"
              @click="adicionarAniversariante"
              :disabled="!formularioAniversarianteValido"
            >
              <v-icon left>mdi-account-plus</v-icon>
              Adicionar Aniversariante
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-container v-if="publicacoesAniversariantes">
        <v-row>
          <v-col cols="12" md="6" v-for="aniversariante in publicacoesAniversariantes" :key="aniversariante.id">
            <v-card class="mb-4">
              <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5">
                  {{ aniversariante.nome }}
                </span>
                <v-chip color="primary" size="small">
                  {{ aniversariante.cargo }}
                </v-chip>
              </v-card-title>              
              <v-card-text>
                <div class="d-flex align-center mb-4">
                  <v-avatar size="64" class="mr-4">
                    <v-img :src="aniversariante.foto || 'https://via.placeholder.com/64x64?text=Sem+Foto'"></v-img>
                  </v-avatar>
                  <div>
                    <p class="mb-1">
                      <strong>Data de Nascimento:</strong> {{ formatarData(aniversariante.dataNascimento) }}
                    </p>
                    <p v-if="aniversariante.departamento" class="mb-0">
                      <strong>Departamento:</strong> {{ aniversariante.departamento }}
                    </p>
                  </div>
                </div>
                <p v-if="aniversariante.mensagem">
                  "{{ aniversariante.mensagem }}"
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn icon @click="editarAniversariante(aniversariante)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="excluirAniversariante(aniversariante)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const roteador = useRouter()


const mostrarModalCriar = ref(false)
const mostrarModalEditar = ref(false)
const mostrarModalExcluir = ref(false)
const mostrarModalAniversariante = ref(false)
const mostrarSeletorData = ref(false)


const formularioCriar = ref(null)
const formularioAniversariante = ref(null)
const formularioCriarValido = ref(false)
const formularioAniversarianteValido = ref(false)


const criandoPublicacao = ref(false)
const adicionandoAniversariante = ref(false)

const novaPublicacao = ref({
  titulo: '',
  resumo: '',
  categoria: '',
  conteudo: '',
  arquivoImagem: null
})


const novoAniversariante = ref({
  nome: '',
  cargo: '',
  dataNascimento: null,
  departamento: '',
  arquivoFoto: null,
  mensagem: ''
})


const previewImagem = ref(null)
const previewFoto = ref(null)

const publicacaoSelecionada = ref(null)

const categorias = ref([
  'Tecnologia',
  'Design',
  'Marketing',
  'Desenvolvimento',
  'Negócios',
  'Liderança',
  'Inovação'
])

const opcoesStatus = ref([
  { texto: 'Rascunho', valor: 'rascunho' },
  { texto: 'Publicado', valor: 'publicado' }
])

const pesquisa = ref('')
const carregando = ref(false)
const publicacoes = ref([])
const publicacoesAniversariantes = ref([])

publicacoes.value = [
  {
    id: 1,
    titulo: 'Como Melhorar a UX do seu Blog',
    resumo: 'Dicas práticas para melhorar a experiência do usuário no seu blog...',
    status: 'publicado',
    dataCriacao: new Date('2024-01-15'),
    visualizacoes: 342,
    imagem: 'https://via.placeholder.com/300x160'
  },
  {
    id: 2,
    titulo: 'Introdução ao Vue.js',
    resumo: 'Aprenda os conceitos básicos do Vue.js framework...',
    status: 'rascunho',
    dataCriacao: new Date('2024-01-10'),
    visualizacoes: 0,
    imagem: 'https://via.placeholder.com/300x160'
  },
  {
    id: 3,
    titulo: 'Introdução ao React.js',
    resumo: 'Aprenda os conceitos básicos do React.js framework...',
    status: 'rascunho',
    dataCriacao: new Date('2024-01-10'),
    visualizacoes: 0,
    imagem: 'https://via.placeholder.com/300x160'
  }
]

publicacoesAniversariantes.value = [
    {
        id: 1,
        nome: 'Ana Silva',
        cargo: 'Desenvolvedora Frontend',
        dataNascimento: '1990-02-20',
        departamento: 'Tecnologia',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7QDxdPUJrphv3FzWyVCw1uvO5jOMhTyNZQ&s',
        mensagem: 'Feliz aniversário! Que seu dia seja repleto de alegria e sucesso.'
    },
    {
        id: 2,
        nome: 'Carlos Pereira',
        cargo: 'Analista de Marketing',
        dataNascimento: '1985-02-25',
        departamento: 'Marketing',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7QDxdPUJrphv3FzWyVCw1uvO5jOMhTyNZQ&s',
        mensagem: 'Parabéns! Que este novo ano de vida traga muitas conquistas.'
    }
]


const publicacoesFiltradas = computed(() => {
  if (!pesquisa.value) return publicacoes.value
  return publicacoes.value.filter(publicacao => 
    publicacao.titulo.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
    publicacao.resumo.toLowerCase().includes(pesquisa.value.toLowerCase())
  )
})

const dataNascimentoFormatada = computed(() => {
  if (!novoAniversariante.value.dataNascimento) return ''
  const data = new Date(novoAniversariante.value.dataNascimento)
  return data.toLocaleDateString('pt-BR')
})


watch(mostrarModalCriar, (valor) => {
  if (!valor) {
    resetarFormularioCriar()
  }
})

watch(mostrarModalAniversariante, (valor) => {
  if (!valor) {
    resetarFormularioAniversariante()
  }
})


const manipularUploadImagem = (arquivo) => {
  if (arquivo) {
    const leitor = new FileReader()
    leitor.onload = (e) => {
      previewImagem.value = e.target.result
    }
    leitor.readAsDataURL(arquivo)
  }
}

const manipularUploadFoto = (arquivo) => {
  if (arquivo) {
    const leitor = new FileReader()
    leitor.onload = (e) => {
      previewFoto.value = e.target.result
    }
    leitor.readAsDataURL(arquivo)
  }
}

const removerImagem = () => {
  previewImagem.value = null
  novaPublicacao.value.arquivoImagem = null
}

const removerFoto = () => {
  previewFoto.value = null
  novoAniversariante.value.arquivoFoto = null
}


const resetarFormularioCriar = () => {
  novaPublicacao.value = {
    titulo: '',
    resumo: '',
    categoria: '',
    status: 'rascunho',
    conteudo: '',
    tags: '',
    arquivoImagem: null
  }
  previewImagem.value = null
  if (formularioCriar.value) {
    formularioCriar.value.resetValidation()
  }
}

const resetarFormularioAniversariante = () => {
  novoAniversariante.value = {
    nome: '',
    cargo: '',
    dataNascimento: null,
    departamento: '',
    arquivoFoto: null,
    mensagem: ''
  }
  previewFoto.value = null
  if (formularioAniversariante.value) {
    formularioAniversariante.value.resetValidation()
  }
}


const fecharModalCriar = () => {
  mostrarModalCriar.value = false
  resetarFormularioCriar()
}

const fecharModalAniversariante = () => {
  mostrarModalAniversariante.value = false
  resetarFormularioAniversariante()
}


const criarPublicacao = async () => {
  if (!formularioCriarValido.value) return
  criandoPublicacao.value = true
  try {
    console.log('Criando publicação:', novaPublicacao.value)
    await new Promise(resolver => setTimeout(resolver, 1000))
    const publicacao = {
      id: Date.now(),
      titulo: novaPublicacao.value.titulo,
      resumo: novaPublicacao.value.resumo,
      categoria: novaPublicacao.value.categoria,
      dataCriacao: new Date(),
      imagem: previewImagem.value || 'https://via.placeholder.com/300x160'
    }
    publicacoes.value.unshift(publicacao)
    fecharModalCriar()
    console.log('Publicação criada com sucesso!')
  } catch (erro) {
    console.error('Erro ao criar publicação:', erro)
  } finally {
    criandoPublicacao.value = false
  }
}

const adicionarAniversariante = async () => {
  if (!formularioAniversarianteValido.value) return
  adicionandoAniversariante.value = true
  try {
    console.log('Adicionando aniversariante:', novoAniversariante.value)
    await new Promise(resolver => setTimeout(resolver, 1000))    
    fecharModalAniversariante()
    console.log('Aniversariante adicionado com sucesso!')
  } catch (erro) {
    console.error('Erro ao adicionar aniversariante:', erro)
  } finally {
    adicionandoAniversariante.value = false
  }
}


const abrirModalEditar = (publicacao) => {
  publicacaoSelecionada.value = publicacao
  mostrarModalEditar.value = true
}

const abrirModalExcluir = (publicacao) => {
  publicacaoSelecionada.value = publicacao
  mostrarModalExcluir.value = true
}


const confirmarEdicao = () => {
  if (publicacaoSelecionada.value) {
    console.log('Editando publicação:', publicacaoSelecionada.value.id)

    roteador.push(`/editar-publicacao/${publicacaoSelecionada.value.id}`)
  }
  mostrarModalEditar.value = false
}

const confirmarExclusao = () => {
  if (publicacaoSelecionada.value) {
    console.log('Excluindo publicação:', publicacaoSelecionada.value.id)

    publicacoes.value = publicacoes.value.filter(publicacao => publicacao.id !== publicacaoSelecionada.value.id)
  }
  mostrarModalExcluir.value = false
}

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR')
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

.cursor-pointer {
  cursor: pointer;
}

.rounded-circle {
  border-radius: 50%;
}




</style>