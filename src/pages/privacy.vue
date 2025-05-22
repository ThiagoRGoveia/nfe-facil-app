<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Política de Privacidade</h1>
    
    <div class="prose max-w-none">
      <p class="mb-4">Última atualização: {{ formatDate(lastUpdated) }}</p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">1. Introdução</h2>
      <p>Bem-vindo à Política de Privacidade da Tera Solutions. Esta política descreve como coletamos, usamos, processamos e protegemos suas informações pessoais quando você utiliza nossos serviços, incluindo o aplicativo NFe Fácil.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">2. Informações que Coletamos</h2>
      <p>Podemos coletar os seguintes tipos de informações:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Informações pessoais: nome, endereço de e-mail.</li>
        <li>Informações de conta: dados de login, senha (sempre criptografada).</li>
        <li>Informações de uso: como você interage com nossos serviços.</li>
        <li>Informações do dispositivo: tipo de dispositivo, sistema operacional, navegador.</li>
        <li>Informações fiscais: dados relacionados às notas fiscais processadas pelo serviço.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">3. Como Usamos Suas Informações</h2>
      <p>Utilizamos suas informações para:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Fornecer, manter e melhorar nossos serviços.</li>
        <li>Processar transações e gerenciar sua conta.</li>
        <li>Enviar notificações importantes sobre nossos serviços.</li>
        <li>Personalizar sua experiência.</li>
        <li>Análise de dados para melhorar nossos serviços.</li>
        <li>Cumprir obrigações legais.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">4. Compartilhamento de Informações</h2>
      <p>Podemos compartilhar suas informações com:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Prestadores de serviços que nos auxiliam na operação do serviço.</li>
        <li>Parceiros comerciais, com seu consentimento.</li>
        <li>Autoridades governamentais, quando exigido por lei.</li>
      </ul>
      <p>Não vendemos suas informações pessoais a terceiros.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">5. Segurança de Dados</h2>
      <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda acidental ou alteração. Isso inclui criptografia, firewalls e controles de acesso.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">6. Seus Direitos</h2>
      <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Confirmar a existência de tratamento de seus dados.</li>
        <li>Acessar seus dados.</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
        <li>Solicitar a portabilidade de seus dados.</li>
        <li>Revogar seu consentimento.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">7. Retenção de Dados</h2>
      <p>Mantemos suas informações pelo tempo necessário para fornecer nossos serviços ou conforme exigido por lei, especialmente para fins fiscais e contábeis.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">8. Cookies e Tecnologias Semelhantes</h2>
      <p>Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar o tráfego e personalizar o conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">9. Alterações nesta Política</h2>
      <p>Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças significativas por e-mail ou através de um aviso em nosso site.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">10. Contato</h2>
      <p>Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre o tratamento de seus dados, entre em contato conosco:</p>
      <p>E-mail: contact@wearetera.com</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const lastUpdated = ref(new Date('2025-01-15'));

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
</script>
