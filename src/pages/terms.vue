<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Termos de Uso</h1>
    
    <div class="prose max-w-none">
      <p class="mb-4">Última atualização: {{ formatDate(lastUpdated) }}</p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">1. Aceitação dos Termos</h2>
      <p>Ao acessar ou utilizar o serviço NFe Fácil ("Serviço"), fornecido pela Tera Solutions ("Empresa", "nós" ou "nosso"), você concorda em estar vinculado a estes Termos de Uso ("Termos"). Se você não concordar com alguma parte destes Termos, não poderá acessar ou utilizar o Serviço.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">2. Descrição do Serviço</h2>
      <p>O NFe Fácil é uma plataforma que oferece serviços relacionados ao processamento, armazenamento e gerenciamento de Notas Fiscais Eletrônicas (NFe) e outros documentos fiscais.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">3. Cadastro e Conta</h2>
      <p>Para utilizar determinadas funcionalidades do Serviço, você pode ser solicitado a criar uma conta. Você é responsável por:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Fornecer informações precisas, atuais e completas.</li>
        <li>Manter a confidencialidade de sua senha e restringir o acesso à sua conta.</li>
        <li>Todas as atividades que ocorrem sob sua conta.</li>
        <li>Notificar-nos imediatamente sobre qualquer violação de segurança ou uso não autorizado de sua conta.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">4. Licença de Uso</h2>
      <p>Sujeito ao cumprimento destes Termos, concedemos a você uma licença limitada, não exclusiva, não transferível e revogável para usar o Serviço de acordo com estes Termos e conforme permitido pela funcionalidade do Serviço.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">5. Propriedade Intelectual</h2>
      <p>O Serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da Tera Solutions e seus licenciadores. O Serviço é protegido por direitos autorais, marcas registradas e outras leis de propriedade intelectual do Brasil e de outros países.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">6. Conteúdo do Usuário</h2>
      <p>Ao enviar conteúdo para o Serviço, você concede à Tera Solutions o direito de usar esse conteúdo apenas para fornecer e melhorar o Serviço. Você é o único responsável por todo o conteúdo que enviar e pelas consequências de seu envio.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">7. Uso Proibido</h2>
      <p>Você concorda em não utilizar o Serviço para:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Violar qualquer lei ou regulamento aplicável.</li>
        <li>Infringir direitos de propriedade intelectual de terceiros.</li>
        <li>Transmitir malware ou outros códigos maliciosos.</li>
        <li>Interferir ou interromper a integridade ou o desempenho do Serviço.</li>
        <li>Tentar obter acesso não autorizado ao Serviço ou a sistemas ou redes relacionados.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">8. Limitação de Responsabilidade</h2>
      <p>Em nenhuma circunstância a Tera Solutions será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso ou qualquer outro dano intangível, resultantes de:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Seu uso ou incapacidade de usar o Serviço.</li>
        <li>Qualquer acesso não autorizado ou alteração de suas transmissões ou dados.</li>
        <li>Declarações ou conduta de terceiros no Serviço.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">9. Isenção de Garantias</h2>
      <p>O Serviço é fornecido "como está" e "conforme disponível" sem garantias de qualquer tipo, expressas ou implícitas. Não garantimos que o Serviço atenderá aos seus requisitos específicos, que será ininterrupto, seguro ou livre de erros.</p>
      <p class="mt-2">
        Adicionalmente, o Serviço pode empregar tecnologias de inteligência artificial (IA) para otimizar funcionalidades, como a extração e conversão de dados. Apesar de nossos esforços para garantir a alta precisão, a natureza da IA implica que podem ocorrer imprecisões ou erros. O usuário reconhece e concorda que é sua exclusiva responsabilidade verificar a exatidão, completude e adequação de qualquer informação ou dado gerado ou processado pelo Serviço com auxílio de IA antes de sua utilização para quaisquer fins.
      </p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">10. Rescisão</h2>
      <p>Podemos encerrar ou suspender sua conta e o acesso ao Serviço imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes Termos. Após a rescisão, seu direito de usar o Serviço cessará imediatamente.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">11. Alterações nos Termos</h2>
      <p>Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso com pelo menos 30 dias de antecedência. O uso continuado do Serviço após as alterações constituirá seu consentimento com os novos termos.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">12. Lei Aplicável</h2>
      <p>Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, independentemente de conflitos de disposições legais.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">13. Resolução de Disputas</h2>
      <p>Qualquer disputa decorrente ou relacionada a estes Termos será submetida à jurisdição exclusiva dos tribunais da Comarca de São Paulo, Estado de São Paulo.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-4">14. Contato</h2>
      <p>Se você tiver dúvidas sobre estes Termos, entre em contato conosco:</p>
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
