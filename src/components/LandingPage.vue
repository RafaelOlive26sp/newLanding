<template>
  <v-app>
    <v-main>
      <!-- Hero Section com Parallax -->
      <v-parallax
        height="500"
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1470&q=80"
      >
        <div class="d-flex flex-column align-center justify-center text-dark text-center" style="height: 100%">
          <h1 class="text-4xl font-bold mb-4">Funcional é mais que treino, é qualidade de vida</h1>
          <p class="text-lg mb-6">Agende suas aulas com facilidade e tenha acompanhamento de verdade.</p>
          <v-btn color="white" text="Entrar" class="text-primary font-bold" @click="goToLogin" />
        </div>
      </v-parallax>

      <!-- Benefícios -->
      <section class="benefits-section py-16 px-4 text-center">
        <h2 class="text-3xl font-semibold mb-10">Benefícios do Treinamento Funcional</h2>
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="12" md="3" v-for="(benefit, i) in benefits" :key="i">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  class="pa-4 transition-transform"
                  :class="{ 'hover-scale': isHovering }"
                  elevation="2"
                >
                  <v-icon color="primary" class="mb-2" size="40">{{ benefit.icon }}</v-icon>
                  <h3 class="text-xl font-medium mb-2">{{ benefit.title }}</h3>
                  <p class="text-gray-600">{{ benefit.text }}</p>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Profissionais -->
      <section class="trainers-section py-16 px-4 text-center bg-gray-100">
        <h2 class="text-3xl font-semibold mb-10">Profissionais Capacitados</h2>
        <p class="max-w-xl mx-auto text-gray-700 mb-8">
          Nossa equipe é formada por especialistas com experiência comprovada em treinamento funcional, comprometidos em oferecer atenção personalizada a cada aluno.
        </p>
        <v-avatar size="100" class="mx-auto mb-4">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Professor" />
        </v-avatar>
        <p class="text-lg font-medium">Professor João Silva</p>
        <p class="text-gray-600">Especialista em Mobilidade e Funcional</p>
      </section>

      <!-- Diferencial -->
      <section class="differential-section py-16 px-4 text-center">
        <h2 class="text-3xl font-semibold mb-6">Mais do que uma academia</h2>
        <p class="text-gray-700 max-w-2xl mx-auto">
          Aqui você encontra acompanhamento real, com turmas de no máximo 5 alunos. Mais foco, mais atenção, mais resultado.
        </p>
      </section>

      <!-- Depoimentos -->
      <section class="testimonials-section py-16 px-4 text-center bg-gray-50">
        <h2 class="text-3xl font-semibold mb-10">O que nossos alunos dizem</h2>
        <v-container>
          <v-carousel cycle hide-delimiters height="300">
            <v-carousel-item v-for="(testimonial, i) in testimonials" :key="i">
              <v-card class="pa-6 mx-auto" max-width="400" elevation="1">
                <p class="italic mb-4">"{{ testimonial.feedback }}"</p>
                <v-avatar size="60" class="mx-auto mb-2">
                  <img :src="testimonial.avatar" :alt="testimonial.name" />
                </v-avatar>
                <p class="font-medium">{{ testimonial.name }}</p>
                <p class="text-gray-600 text-sm">{{ testimonial.description }}</p>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'

  const router = useRouter()

  const goToLogin = () => {
    router.push('/login')
  }

  const benefits = ref([
    {
      icon: 'mdi-run-fast',
      title: 'Melhora da Mobilidade',
      text: 'Movimente-se com mais liberdade e conforto.',
    },
    {
      icon: 'mdi-heart-pulse',
      title: 'Condicionamento Físico',
      text: 'Aumente sua resistência e saúde cardiovascular.',
    },
    {
      icon: 'mdi-shield-check',
      title: 'Prevenção de Lesões',
      text: 'Exercícios pensados para proteger seu corpo.',
    },
    {
      icon: 'mdi-emoticon-happy-outline',
      title: 'Qualidade de Vida',
      text: 'Viva com mais disposição e bem-estar.',
    },
  ])

  const testimonials = ref([
    {
      name: 'Ana Souza',
      feedback: 'Me sinto muito melhor desde que comecei! O atendimento é incrível e a atenção que recebo fez toda a diferença.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      description: 'Aluna desde 2023',
    },
    {
      name: 'Carlos Henrique',
      feedback: 'Nunca consegui manter uma rotina de treinos como agora. As turmas pequenas realmente fazem diferença.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      description: 'Aluno desde 2022',
    },
    {
      name: 'Luciana Dias',
      feedback: 'Treinar aqui é diferente. Me sinto acolhida e motivada. Recomendo a todos!',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      description: 'Aluna desde 2021',
    },
    {
      name: 'Marcos Lima',
      feedback: 'A qualidade do atendimento e os exercícios são personalizados de verdade. Me sinto evoluindo a cada semana.',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      description: 'Aluno desde 2023',
    },
    {
      name: 'Fernanda Alves',
      feedback: 'Já tinha tentado de tudo, mas aqui encontrei o que precisava. Os professores são muito atenciosos.',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      description: 'Aluna desde 2022',
    },
    {
      name: 'Ricardo Mendes',
      feedback: 'Ambiente acolhedor, treinos eficazes e muita atenção aos detalhes. Superou minhas expectativas!',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      description: 'Aluno desde 2024',
    },
  ])
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
}

.hover-scale {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>
