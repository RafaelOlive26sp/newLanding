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
      <!-- Banner Principal (Parallax) -->
      <v-parallax
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80"
        height="600"
      >
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h4 text-md-h2 white--text font-weight-bold">
              Transforme sua Saúde com Treinos Funcionais
            </h1>
            <h3 class="text-h6 text-md-h5 white--text mt-4">
              Agende suas aulas e alcance seus objetivos com treinos personalizados.
            </h3>
            <v-btn color="accent" x-large class="mt-6" to="/login">Comece Agora</v-btn>
          </v-col>
        </v-row>
      </v-parallax>

      <!-- Seção de Benefícios -->
      <v-container class="my-12">
        <h2 class="text-h4 text-center mb-8">Por que Escolher Nosso Funcional?</h2>
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

      <!-- Seção de Depoimentos -->
      <v-container fluid class="grey lighten-4 py-12">
        <h2 class="text-h4 text-center mb-8">O que Nossos Alunos Dizem</h2>
        <v-carousel hide-delimiters height="300" cycle>
          <v-carousel-item v-for="testimonial in testimonials" :key="testimonial.name">
            <v-row align="center" justify="center">
              <v-col cols="12" md="6">
                <v-card class="text-center pa-6" elevation="2">
                  <v-avatar size="80" class="mb-4">
                    <v-img :src="testimonial.image" :alt="testimonial.name" />
                  </v-avatar>
                  <p class="text-body-1 font-italic">“{{ testimonial.text }}”</p>
                  <p class="text-body-2 font-weight-bold mt-2">{{ testimonial.name }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-container>

      <!-- Chamada para Ação Final -->
      <v-container fluid class="primary py-12">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h4 white--text">Pronto para Começar?</h2>
            <p class="text-h6 white--text mt-4">
              Faça parte da nossa comunidade e agende sua primeira aula hoje.
            </p>
            <v-btn color="accent" x-large class="mt-6" to="/login">Agendar Agora</v-btn>
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
      title: 'Treinos Personalizados',
      description: 'Aulas adaptadas ao seu nível e objetivos.',
      icon: 'mdi-dumbbell',
    },
    {
      title: 'Acompanhamento Profissional',
      description: 'Instrutores qualificados para guiar você.',
      icon: 'mdi-account-star',
    },
    {
      title: 'Flexibilidade de Horários',
      description: 'Agende suas aulas quando for mais conveniente.',
      icon: 'mdi-calendar-clock',
    },
    {
      title: 'Comunidade Motivadora',
      description: 'Treine com quem te inspira e motiva.',
      icon: 'mdi-account-group',
    },
  ]);

  // Dados dos depoimentos
  const testimonials = ref([
    {
      name: 'Ana, 32 anos',
      text: 'As aulas me deram mais energia e disposição!',
      image: 'https://via.placeholder.com/80?text=Ana',
    },
    {
      name: 'Carlos, 28 anos',
      text: 'Os treinos são incríveis e os instrutores são ótimos!',
      image: 'https://via.placeholder.com/80?text=Carlos',
    },
    {
      name: 'Mariana, 40 anos',
      text: 'Consegui alcançar meus objetivos com a flexibilidade das aulas!',
      image: 'https://via.placeholder.com/80?text=Mariana',
    },
  ]);
</script>

<style scoped>
/* Overlay para legibilidade do texto no parallax */
.v-parallax__content {
  background: rgba(0, 0, 0, 0.4);
}

/* Efeito de salto nos cards */
.benefit-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.benefit-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
