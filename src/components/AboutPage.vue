<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-img src="https://via.placeholder.com/150x50?text=Logo" max-width="120" alt="Logo Plataforma" />
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/">Início</v-btn>
        <v-btn text to="/sobre">Sobre</v-btn>
        <v-btn text to="/aulas">Aulas</v-btn>
        <v-btn color="accent" to="/login" class="ml-4">Login</v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <!-- Menu Lateral para Mobile -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Início</v-list-item-title>
        </v-list-item>
        <v-list-item to="/sobre">
          <v-list-item-title>Sobre</v-list-item-title>
        </v-list-item>
        <v-list-item to="/aulas">
          <v-list-item-title>Aulas</v-list-item-title>
        </v-list-item>
        <v-list-item to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <!-- Seção Principal -->
      <v-container fluid class="py-12">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h3 text-md-h2 primary--text font-weight-bold">
              Sua Jornada Fitness Começa Aqui!
            </h1>
            <p class="text-h6 mt-6">
              Imagine uma aventura onde sua saúde e energia são as grandes estrelas! Nossa plataforma de treinos funcionais é como um mapa do tesouro, guiando você com professores incríveis, turmas super exclusivas e uma agenda que cabe no seu bolso (ou melhor, no seu celular!). Diferente das academias lotadas, aqui você é o foco, com treinos feitos sob medida e um time que vibra com cada conquista sua. Vamos juntos transformar seu dia a dia em uma explosão de bem-estar?
            </p>
          </v-col>
        </v-row>
      </v-container>

      <!-- Seção de Benefícios -->
      <v-container class="my-12">
        <h2 class="text-h4 text-center mb-8">O que Faz a Gente Especial?</h2>
        <v-row>
          <v-col cols="12" sm="6" md="3" v-for="benefit in benefits" :key="benefit.title">
            <v-card class="text-center pa-4 benefit-card" elevation="4">
              <v-icon x-large color="primary">{{ benefit.icon }}</v-icon>
              <h3 class="text-h6 mt-4">{{ benefit.title }}</h3>
              <p class="mt-2">{{ benefit.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Chamada para Ação -->
      <v-container fluid class="primary py-12">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h4 white--text">Pronto para a Aventura?</h2>
            <p class="text-h6 white--text mt-4">
              Experimente a diferença de treinar com quem realmente se importa com você. Agende sua primeira aula agora!
            </p>
            <v-btn color="accent" x-large class="mt-6" to="/login">Quero Começar!</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Rodapé -->
    <v-footer color="primary" dark padless>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="text-center text-md-left">
            <p class="text-body-2">© 2025 Plataforma Funcional. Todos os direitos reservados.</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-btn icon href="#" class="mx-2">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon href="#" class="mx-2">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon href="#" class="mx-2">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="4" class="text-center text-md-right">
            <v-btn text to="/sobre">Sobre</v-btn>
            <v-btn text to="/contato">Contato</v-btn>
            <v-btn text to="/politica">Política de Privacidade</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

// Estado reativo para o menu lateral
const drawer = ref(false);

// Dados dos benefícios
const benefits = ref([
  {
    title: 'Turmas Exclusivas',
    description:
      'Nada de academias lotadas! Nossas turmas têm no máximo 5 alunos, garantindo atenção total e treinos que parecem feitos só para você.',
    icon: 'mdi-account-group',
  },
  {
    title: 'Professores Dedicados',
    description:
      'Esqueça aquele professor que só dá uma olhada rápida. Nossos personais são como guias de aventura, 100% focados em cada passo seu.',
    icon: 'mdi-account-star',
  },
  {
    title: 'Agenda na Palma da Mão',
    description:
      'Agende, cancele ou reagende suas aulas pelo celular, rapidinho! Veja os horários disponíveis e organize sua semana com facilidade.',
    icon: 'mdi-cellphone',
  },
  {
    title: 'Qualidade que Transforma',
    description:
      'Com turmas pequenas e foco total, cada aula é uma oportunidade de evoluir, com exercícios pensados para seus objetivos.',
    icon: 'mdi-dumbbell',
  },
]);
</script>

<style scoped>
/* Efeito de salto nos cards */
.benefit-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.benefit-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
