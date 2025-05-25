<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2">
      Perguntas Frequentes
    </h1>
    <p class="text-muted-foreground mb-6">
      Respostas para as principais dúvidas sobre a API NFe-Fácil
    </p>
    <Separator class="mb-8" />
    
    <div class="max-w-4xl mx-auto">
      <Tabs
        default-value="general"
        class="mb-8"
      >
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            Geral
          </TabsTrigger>
          <TabsTrigger value="credits">
            Créditos
          </TabsTrigger>
          <TabsTrigger value="nfe">
            Processamento de NFe (API)
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            Webhooks
          </TabsTrigger>
        </TabsList>
        
        <!-- Seção Geral -->
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>
                Informações básicas sobre a API NFe-Fácil e sua utilização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                class="w-full"
              >
                <AccordionItem value="q1">
                  <AccordionTrigger>O que é a API NFe-Fácil?</AccordionTrigger>
                  <AccordionContent>
                    <p>A API NFe-Fácil foi projetada para extrair dados de Notas Fiscais Eletrônicas de Serviço (NFe). Ela permite processar, consultar e gerenciar lotes de NFe, suportando operações síncronas e assíncronas.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q2">
                  <AccordionTrigger>Quais tipos de arquivos são suportados para a extração de NFe?</AccordionTrigger>
                  <AccordionContent>
                    <p>A API suporta o processamento de arquivos PDF individuais e arquivos ZIP que contêm PDFs.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q3">
                  <AccordionTrigger>Como faço para me autenticar na API?</AccordionTrigger>
                  <AccordionContent>
                    <p>Você deve usar a API Key e o Secret gerados no Dashboard da NFe-Fácil. A autenticação é realizada utilizando o esquema Basic. Você precisa fornecer sua API Key e Secret codificados em Base64 no cabeçalho Authorization, no formato <code>Basic {base64(API_KEY:SECRET)}</code>.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q4">
                  <AccordionTrigger>Onde consigo minha API Key e Secret?</AccordionTrigger>
                  <AccordionContent>
                    <p>Suas credenciais de API podem ser obtidas no painel de controle da NFe-Fácil, na seção "Perfil". Se você ainda não possui uma conta, será necessário criar uma para acessar estas credenciais.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q5">
                  <AccordionTrigger>A API NFe-Fácil é gratuita?</AccordionTrigger>
                  <AccordionContent>
                    <p>A API NFe-Fácil oferece um modelo de uso baseado em créditos, não há limites de uso ou prazo de expiração, créditos são acumuláveis e podem ser reabastecidos a qualquer momento. Consulte a página de preços para mais detalhes.</p>
                    <Button
                      variant="outline"
                      class="mt-4"
                      as-child
                    >
                      <RouterLink to="/products">
                        Ver planos e preços
                      </RouterLink>
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q7">
                  <AccordionTrigger>Como posso obter suporte técnico?</AccordionTrigger>
                  <AccordionContent>
                    <p>Oferecemos suporte técnico por email e também através da nossa página de suporte. Para questões urgentes relacionadas à produção.</p>
                    <Button
                      variant="outline"
                      class="mt-4"
                      as-child
                    >
                      <RouterLink to="/support">
                        Ir para Suporte
                      </RouterLink>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Seção Créditos -->
        <TabsContent value="credits">
          <Card>
            <CardHeader>
              <CardTitle>Créditos e Pagamentos</CardTitle>
              <CardDescription>
                Informações sobre como funcionam os créditos e como adquiri-los
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                class="w-full"
              >
                <AccordionItem value="cr1">
                  <AccordionTrigger>O que são créditos e como eles funcionam?</AccordionTrigger>
                  <AccordionContent>
                    <p>Créditos são a forma de pagamento da plataforma NFe-Fácil. Cada crédito permite processar 1 operação de NFSe (Nota Fiscal de Serviço Eletrônica). Ao adquirir um pacote de créditos, você pode utilizá-los para processar o mesmo número de documentos.</p>
                    <p class="mt-2">
                      Por exemplo, se você adquirir 100 créditos, poderá processar até 100 NFSe através da nossa API.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cr2">
                  <AccordionTrigger>Os créditos expiram?</AccordionTrigger>
                  <AccordionContent>
                    <p>Não, os créditos adquiridos na plataforma NFe-Fácil <strong>não expiram</strong>. Você pode utilizá-los a qualquer momento, conforme sua necessidade, sem preocupação com prazos de validade.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cr3">
                  <AccordionTrigger>Como posso adquirir créditos?</AccordionTrigger>
                  <AccordionContent>
                    <p>Você pode adquirir créditos de forma simples através da nossa página de produtos. Oferecemos três pacotes diferentes:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>Pacote Básico:</strong> 100 créditos</li>
                      <li><strong>Pacote Padrão:</strong> 200 créditos</li>
                      <li><strong>Pacote Mega:</strong> 500 créditos</li>
                    </ul>
                    <p class="mt-2">
                      Após a compra, os créditos são adicionados automaticamente à sua conta e ficam disponíveis para uso imediato.
                    </p>
                    <Button
                      variant="outline"
                      class="mt-4"
                      as-child
                    >
                      <RouterLink to="/products">
                        Ver pacotes disponíveis
                      </RouterLink>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cr4">
                  <AccordionTrigger>Como visualizo meu saldo de créditos?</AccordionTrigger>
                  <AccordionContent>
                    <p>Seu saldo de créditos está sempre visível no painel principal do seu Dashboard. Além disso, você pode acessar o histórico detalhado de uso na seção "Créditos" do seu perfil, onde é possível verificar:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                      <li>Saldo atual de créditos</li>
                      <li>Histórico de compras de créditos</li>
                      <li>Histórico de uso de créditos</li>
                      <li>Relatórios de consumo</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cr5">
                  <AccordionTrigger>O que acontece se meus créditos acabarem durante um processamento?</AccordionTrigger>
                  <AccordionContent>
                    <p>Se seus créditos acabarem durante o processamento de um lote, o sistema irá:</p>
                    <ol class="list-decimal pl-6 mt-2 space-y-1">
                      <li>Processar apenas os documentos para os quais você tem créditos suficientes</li>
                      <li>Pausar o processamento do restante dos documentos</li>
                      <li>Notificar você sobre a necessidade de adquirir mais créditos</li>
                    </ol>
                    <p class="mt-2">
                      Após adquirir mais créditos, você pode retomar o processamento dos documentos restantes sem perder o trabalho já realizado.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cr6">
                  <AccordionTrigger>Posso comprar créditos para uso futuro?</AccordionTrigger>
                  <AccordionContent>
                    <p>Sim! Muitos clientes preferem adquirir créditos antecipadamente para garantir melhor custo-benefício aproveitando nossos pacotes com preços escalonados. Como os créditos não expiram, você pode adquirir uma quantidade maior e utilizá-los conforme sua necessidade ao longo do tempo.</p>
                    <p class="mt-2">
                      Quanto maior o pacote adquirido, menor o preço por crédito individual.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cr7">
                  <AccordionTrigger>Posso transferir créditos entre contas?</AccordionTrigger>
                  <AccordionContent>
                    <p>Atualmente, não oferecemos a possibilidade de transferência de créditos entre contas diferentes. Os créditos são associados especificamente à conta que os adquiriu.</p>
                    <p class="mt-2">
                      Se você precisar de uma solução específica para sua empresa ou equipe, entre em contato com nosso suporte para discutir opções personalizadas.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cr8">
                  <AccordionTrigger>Recebo nota fiscal pela compra de créditos?</AccordionTrigger>
                  <AccordionContent>
                    <p>Sim, para todas as compras de créditos emitimos automaticamente uma nota fiscal de serviço que será enviada para o e-mail cadastrado em sua conta. A nota é geralmente emitida em até 24 horas após a confirmação do pagamento.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <!-- Seção NFe -->
        <TabsContent value="nfe">
          <Card>
            <CardHeader>
              <CardTitle>Processamento de NFe</CardTitle>
              <CardDescription>
                Informações sobre como processar e gerenciar Notas Fiscais de Serviço
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                class="w-full"
              >
                <AccordionItem value="nfe1">
                  <AccordionTrigger>Qual a diferença entre o processamento síncrono e assíncrono de NFe?</AccordionTrigger>
                  <AccordionContent>
                    <p><strong>Síncrono:</strong> Processa um único arquivo de NFe imediatamente. A resposta da API conterá os dados extraídos diretamente. Isso é adequado para processar um arquivo por vez, onde um resultado imediato é necessário.</p>
                    <p class="mt-2">
                      <strong>Assíncrono:</strong> Projetado para processar múltiplos arquivos (lotes) de forma eficiente. Você cria um lote, adiciona arquivos a ele e, em seguida, inicia o processamento. A API responde imediatamente após iniciar o processo em segundo plano, e você pode acompanhar o status ou receber notificações via webhooks ao final do processamento.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe2">
                  <AccordionTrigger>Como faço para processar um único arquivo de NFe rapidamente?</AccordionTrigger>
                  <AccordionContent>
                    <p>Use o endpoint de processamento síncrono. Você envia um único arquivo PDF, e a API retorna os dados extraídos na resposta. Este método é ideal para integrações que precisam processar notas uma a uma.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe3">
                  <AccordionTrigger>Como faço para processar um grande volume de arquivos NFe?</AccordionTrigger>
                  <AccordionContent>
                    <p>A abordagem recomendada é usar o processamento assíncrono em lote. O processo envolve três etapas:</p>
                    <ol class="list-decimal pl-6 mt-2 space-y-1">
                      <li>Crie um novo lote usando o endpoint apropriado</li>
                      <li>Adicione seus arquivos a este lote (você pode adicionar múltiplos arquivos ou ZIPs)</li>
                      <li>Acione o processamento assíncrono para o lote</li>
                    </ol>
                    <p class="mt-2">
                      Para monitorar o progresso, você pode verificar o status do lote periodicamente ou configurar webhooks para receber notificações automáticas.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe4">
                  <AccordionTrigger>Que informações posso obter após processar uma NFe?</AccordionTrigger>
                  <AccordionContent>
                    <p>A API extrai um conjunto abrangente de dados estruturados da NFe, incluindo:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                      <li>Data de emissão e competência</li>
                      <li>Informações do prestador de serviço (CNPJ/CPF, inscrição municipal, nome, endereço, etc.)</li>
                      <li>Informações do tomador de serviço</li>
                      <li>Código e descrição do serviço</li>
                      <li>Valor total da NFe</li>
                      <li>Valores aproximados dos tributos</li>
                      <li>Dados de retenção, quando aplicáveis</li>
                      <li>Alíquotas de impostos</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe5">
                  <AccordionTrigger>Como posso verificar o status do processamento de um lote assíncrono?</AccordionTrigger>
                  <AccordionContent>
                    <p>Você pode usar o endpoint para "Obter informações de um lote extração de NFe", fornecendo o ID do lote. A resposta incluirá o status atual (por exemplo, PROCESSING), o número total de arquivos e o número de arquivos processados.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe6">
                  <AccordionTrigger>Posso adicionar mais arquivos a um lote após criá-lo?</AccordionTrigger>
                  <AccordionContent>
                    <p>Sim, você pode usar o endpoint "Adicionar arquivos a um lote existente", fornecendo o ID do lote e os arquivos adicionais. Isto é possível desde que o lote ainda não tenha iniciado o processamento.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe7">
                  <AccordionTrigger>Posso cancelar o processamento de um lote depois que ele começou?</AccordionTrigger>
                  <AccordionContent>
                    <p>Sim, você pode usar o endpoint "Cancelar processamento de lote de NFe" com o ID do lote. A API tentará interromper as operações em andamento. Note que os arquivos já processados dentro do lote não podem ser desfeitos.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe8">
                  <AccordionTrigger>Qual o tamanho máximo de arquivo suportado?</AccordionTrigger>
                  <AccordionContent>
                    <p>O tamanho máximo para arquivos PDF individuais é de 10MB. Para arquivos ZIP, o limite é de 50MB. Estes limites podem variar de acordo com o plano contratado.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="nfe9">
                  <AccordionTrigger>O que acontece se a API não conseguir extrair dados de um PDF?</AccordionTrigger>
                  <AccordionContent>
                    <p>Se a API não conseguir extrair dados de um PDF, ela retornará um erro específico indicando o problema. Causas comuns incluem:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                      <li>O arquivo não é uma NFe válida</li>
                      <li>O arquivo está corrompido ou protegido por senha</li>
                      <li>O formato da NFe não é suportado atualmente</li>
                    </ul>
                    <p class="mt-2">
                      Para processamento em lote, a falha em um arquivo não afeta o processamento dos demais arquivos no lote.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <!-- Seção Webhooks -->
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Informações sobre como configurar e utilizar webhooks para receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                class="w-full"
              >
                <AccordionItem value="wh1">
                  <AccordionTrigger>Para que servem os Webhooks na API NFe-Fácil?</AccordionTrigger>
                  <AccordionContent>
                    <p>Webhooks permitem que você receba notificações automáticas da API sobre eventos relacionados ao processamento de NFe. Em vez de consultar a API constantemente por atualizações, a API enviará informações para um endpoint URL que você fornecer.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wh2">
                  <AccordionTrigger>A quais eventos posso me inscrever via Webhooks?</AccordionTrigger>
                  <AccordionContent>
                    <p>Você pode se inscrever nos seguintes eventos:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>DOCUMENT_PROCESSED:</strong> Notifica quando um único arquivo NFe foi processado com sucesso.</li>
                      <li><strong>DOCUMENT_FAILED:</strong> Notifica quando o processamento de um único arquivo NFe falhou.</li>
                      <li><strong>BATCH_FINISHED:</strong> Notifica quando um lote inteiro de arquivos NFe concluiu o processamento (seja com sucesso ou com falhas).</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wh3">
                  <AccordionTrigger>Como configuro um Webhook?</AccordionTrigger>
                  <AccordionContent>
                    <p>Você usa o endpoint "Criar um novo webhook para NFe", fornecendo um nome para o seu webhook, a URL onde deseja receber as notificações e a lista de eventos aos quais deseja se inscrever. Você também pode configurar autenticação e cabeçalhos personalizados para o seu endpoint de webhook.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wh4">
                  <AccordionTrigger>Posso atualizar ou excluir um Webhook?</AccordionTrigger>
                  <AccordionContent>
                    <p>Sim, a API oferece endpoints para "Atualizar webhook" e "Excluir webhook" usando o ID exclusivo do webhook. Você pode modificar a URL, eventos inscritos, cabeçalhos personalizados e outras configurações a qualquer momento.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wh5">
                  <AccordionTrigger>Como posso testar meu endpoint de Webhook?</AccordionTrigger>
                  <AccordionContent>
                    <p>A API oferece um endpoint para "Acionar notificações de webhook" que permite acionar manualmente notificações de teste para os diferentes tipos de eventos (DOCUMENT_PROCESSED, DOCUMENT_FAILED, BATCH_FINISHED) com payloads de exemplo.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wh6">
                  <AccordionTrigger>Que formato de dados é enviado pelos webhooks?</AccordionTrigger>
                  <AccordionContent>
                    <p>Os webhooks enviam dados no formato JSON. O conteúdo específico varia de acordo com o tipo de evento, mas geralmente inclui:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                      <li>ID do evento</li>
                      <li>Timestamp do evento</li>
                      <li>Tipo do evento</li>
                      <li>Dados específicos do evento (IDs de documentos, status, mensagens de erro quando aplicável, etc.)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wh7">
                  <AccordionTrigger>O que acontece se meu endpoint de webhook estiver indisponível?</AccordionTrigger>
                  <AccordionContent>
                    <p>Se seu endpoint estiver indisponível quando a API tentar enviar uma notificação, a API implementará uma política de retry com backoff exponencial. Tentaremos enviar a notificação várias vezes ao longo de um período de 24 horas antes de considerar a entrega como falha.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wh8">
                  <AccordionTrigger>Como garantir a segurança das notificações webhook?</AccordionTrigger>
                  <AccordionContent>
                    <p>Recomendamos as seguintes práticas para garantir a segurança das notificações webhook:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-1">
                      <li>Use HTTPS para seu endpoint</li>
                      <li>Configure autenticação para seu webhook (Basic Auth, Bearer Token, etc.)</li>
                      <li>Verifique a assinatura das requisições usando o cabeçalho X-Webhook-Signature que enviamos</li>
                      <li>Valide que o conteúdo recebido está no formato esperado antes de processá-lo</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <!-- Seção de links úteis -->
      <Card class="mt-8">
        <CardHeader>
          <CardTitle>Links Úteis</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              class="justify-start"
              as-child
            >
              <a
                href="https://docs.nfe-facil.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText class="mr-2 h-4 w-4" />
                Documentação Completa da API
              </a>
            </Button>
            
            <Button
              variant="outline"
              class="justify-start"
              as-child
            >
              <RouterLink to="/support">
                <LifeBuoy class="mr-2 h-4 w-4" />
                Suporte Técnico
              </RouterLink>
            </Button>
            
            <Button
              variant="outline"
              class="justify-start"
              as-child
            >
              <RouterLink to="/">
                <LayoutDashboard class="mr-2 h-4 w-4" />
                Acessar Dashboard
              </RouterLink>
            </Button>
            
            <Button
              variant="outline"
              class="justify-start"
              as-child
            >
              <RouterLink to="/privacy">
                <Lock class="mr-2 h-4 w-4" />
                Privacidade
              </RouterLink>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <!-- CTA de Contato -->
      <div class="mt-8 bg-muted p-6 rounded-lg">
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2">
            Não encontrou o que procurava?
          </h3>
          <p class="mb-4">
            Nossa equipe de suporte está pronta para ajudar com suas dúvidas específicas.
          </p>
          <Button as-child>
            <RouterLink to="/support">
              Entrar em contato
            </RouterLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
import { 
  FileText, 
  LifeBuoy, 
  LayoutDashboard, 
  Lock 
} from 'lucide-vue-next';
</script>
