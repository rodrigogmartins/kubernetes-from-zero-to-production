---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Qual problema o Kubernetes resolve

## Introdução

Quando temos um primeiro contato com o Kubernetes, é comum pensar que ele apenas gerencia containers.

Uma forma mais precisa de entendê-lo é como uma **plataforma de orquestração de aplicações containerizadas**.

Ou seja, mais do que iniciar e parar containers individualmente, o Kubernetes coordena a execução de aplicações distribuídas e oferece mecanismos para mantê-las funcionando de maneira estável e previsível.

Ele segue um **modelo declarativo**: você descreve as características da aplicação — como imagem, configuração e número de instâncias — e o sistema trabalha continuamente para provisionar e manter essa configuração ao longo do tempo.

Na prática, isso permite que o Kubernetes:

- Implante aplicações de forma consistente
- Escale réplicas com base em configuração ou métricas
- Reaja automaticamente a falhas substituindo instâncias com problema
- Realize atualizações e rollbacks de forma progressiva e controlada

Por isso, tratá-lo apenas como um gerenciador de containers acaba reduzindo a compreensão do que ele realmente entrega.

Para entender melhor isso, precisamos primeiro compreender **qual problema o Kubernetes resolve**.

---

## O problema

Containers revolucionaram a forma de empacotar aplicações.

Eles oferecem:

- Isolamento de processos
- Ambientes de execução consistentes
- Unidades de deploy leves e portáveis

No entanto, **containers sozinhos não resolvem os desafios de sistemas distribuídos**.

Quando você começa a executar múltiplas aplicações em vários nós de infraestrutura, alguns problemas aparecem rapidamente:

- Containers são efêmeros
- Endereços IP mudam constantemente
- Não existe descoberta de serviço nativa
- Containers que falham não são automaticamente substituídos
- Escalabilidade precisa ser feita manualmente
- Não existe um mecanismo nativo para declarar e manter o estado desejado

Gerenciar containers manualmente em escala rapidamente se torna **complexo e propenso a erros**.

É nesse ponto que surge a necessidade de **orquestração**.

---

## A solução

O Kubernetes resolve os desafios de executar containers em escala introduzindo **abstrações de mais alto nível**.

Em vez de gerenciar containers diretamente, o Kubernetes os gerencia **indiretamente por meio de recursos estruturados**.

Algumas das abstrações principais são:

- **Pods** — agrupam containers em unidades executáveis com rede e armazenamento compartilhados  
- **Controllers** — garantem que o número desejado de Pods esteja sempre em execução  
- **Deployments** — gerenciam atualizações progressivas e rollbacks  
- **Services** — fornecem rede estável e descoberta de serviço  
- **Ingress** — gerencia acesso HTTP/HTTPS externo ao cluster  

Você declara o **estado desejado** da aplicação.

O Kubernetes trabalha continuamente para fazer o **estado real do sistema convergir para essa declaração**.

---

## Modelo declarativo

Modelo tradicional:

- iniciar containers manualmente
- monitorar manualmente
- reiniciar manualmente
- escalar manualmente

Modelo Kubernetes:

1. Você declara o que deseja executar
2. O sistema observa o estado atual
3. Componentes do cluster reconciliam automaticamente as diferenças

Esse modelo é a base da **automação e da confiabilidade** em ambientes Kubernetes.

---

## Problemas centrais que o Kubernetes resolve

### Workloads efêmeras

Pods são efêmeros e podem ser recriados a qualquer momento.

O Kubernetes recria automaticamente novas instâncias para manter o estado desejado.

---

### Rede dinâmica

IPs de Pods mudam constantemente.

**Services** fornecem endpoints estáveis para comunicação entre aplicações.

---

### Falta de self-healing

Containers podem falhar.

**Controllers** criam novas instâncias automaticamente.

---

### Escalabilidade manual

Antes, operadores precisavam escalar containers manualmente.

Com Deployments, o número de réplicas pode ser **declarado e mantido** automaticamente pelo sistema.

---

## Modelo mental

Containers são **unidades de execução**.  
Kubernetes é um **sistema de orquestração**.

O Kubernetes não lida diretamente com containers, mas com Pods/workloads

Ou seja:

- substituíveis
- descartáveis
- gerenciados automaticamente

Você define **a intenção**.

O Kubernetes cuida **da execução**.

---

## Equívocos comuns

Algumas coisas importantes que o Kubernetes **não faz**:

- Não constrói imagens de container
- Não escreve código de aplicação
- Não elimina a necessidade de monitoramento
- Não torna aplicações automaticamente tolerantes a falhas

Ele fornece **orquestração**, não magia.

---

## Próximo passo

Mas isso levanta uma pergunta importante:

**como o Kubernetes consegue manter continuamente o estado desejado do sistema?**

Spoiler: tudo gira em torno de um mecanismo interno que **observa, compara e reconcilia o estado do cluster**.

Esse é o tema do próximo capítulo.

---

# Verifique seu conhecimento

<quiz>
Quais dos seguintes problemas o Kubernetes resolve? (múltiplas corretas)
- [x] Escalabilidade de workloads
- [x] Self-healing de aplicações
- [x] Descoberta de serviços em ambiente dinâmico
- [ ] Construção de imagens de container
- [ ] Escrita de código da aplicação
</quiz>

<quiz>
O que melhor descreve o modelo declarativo do Kubernetes?
- [x] O usuário define o estado desejado e o sistema trabalha para mantê-lo
- [ ] O usuário executa comandos passo a passo manualmente
- [ ] O sistema executa containers sem configuração
- [ ] O usuário define apenas o estado atual
</quiz>

<quiz>
O que significa dizer que Pods são efêmeros?
- [x] Podem ser criados e destruídos a qualquer momento
- [x] Não possuem identidade permanente
- [ ] Sempre mantêm o mesmo IP
- [ ] Nunca são recriados automaticamente
</quiz>

<quiz>
Sem Kubernetes, qual problema é comum ao rodar containers em escala?
- [x] Substituição manual de containers que falham
- [x] Falta de descoberta de serviço
- [ ] Execução automática de rollbacks
- [ ] Estado desejado mantido automaticamente
</quiz>

<quiz>
Qual recurso fornece um endpoint estável para acessar Pods?
- [x] Service
- [ ] Pod
- [ ] Node
- [ ] Deployment
</quiz>

<quiz>
Qual recurso é responsável por garantir o número desejado de Pods?
- [x] Controller
- [ ] Service
- [ ] Ingress
- [ ] Container runtime
</quiz>

<quiz>
Qual é o principal benefício do uso de Deployments?
- [x] Gerenciar atualizações e manter o estado desejado
- [ ] Criar imagens de container
- [ ] Gerenciar rede entre nodes
- [ ] Executar containers diretamente
</quiz>

<quiz>
O que acontece quando um Pod falha em um Deployment?
- [x] Um novo Pod é criado automaticamente
- [ ] O cluster para
- [ ] O Pod é ignorado
- [ ] O Service é removido
</quiz>

<quiz>
Qual das opções representa melhor um sistema sem orquestração?
- [x] Containers precisam ser monitorados e reiniciados manualmente
- [ ] O sistema corrige automaticamente falhas
- [ ] O estado desejado é mantido continuamente
- [ ] Há reconciliação automática
</quiz>

<quiz>
Qual das alternativas descreve corretamente um Service?
- [x] Fornece um ponto de acesso estável para um conjunto de Pods
- [ ] Executa containers
- [ ] Armazena estado do cluster
- [ ] Decide onde Pods serão executados
</quiz>

<quiz>
Qual problema o Kubernetes resolve em relação à rede?
- [x] IPs dinâmicos de Pods
- [x] Descoberta de serviços
- [ ] Criação de DNS externo automaticamente sempre
- [ ] Eliminação de latência de rede
</quiz>

<quiz>
Qual das opções NÃO é responsabilidade do Kubernetes?
- [x] Construir imagens de container
- [ ] Orquestrar workloads
- [ ] Gerenciar estado desejado
- [ ] Automatizar recuperação de falhas
</quiz>

<quiz>
O que significa “estado desejado”?
- [x] A configuração que define como o sistema deve estar
- [ ] O estado atual dos nodes
- [ ] Métricas de uso de CPU
- [ ] Logs do sistema
</quiz>

<quiz>
Qual das opções descreve melhor o papel do Kubernetes?
- [x] Orquestrar a execução de aplicações containerizadas
- [ ] Executar apenas containers isolados
- [ ] Gerenciar código da aplicação
- [ ] Substituir o sistema operacional
</quiz>

<quiz>
Qual das opções representa um benefício direto da orquestração?
- [x] Automação de tarefas operacionais
- [ ] Redução de latência de rede automaticamente
- [ ] Eliminação de falhas de hardware
- [ ] Execução mais rápida de código
</quiz>

<quiz>
O que acontece com o IP de um Pod ao ser recriado?
- [x] Ele pode mudar
- [ ] Ele permanece o mesmo sempre
- [ ] Ele é compartilhado com outros Pods
- [ ] Ele é fixo por padrão
</quiz>

<quiz>
Qual é o principal problema de tratar containers como “pets”?
- [x] Dependência de instâncias específicas
- [ ] Melhor controle de estado
- [ ] Facilidade de escala
- [ ] Alta automação
</quiz>

<quiz>
Qual conceito está diretamente ligado ao funcionamento do Kubernetes?
- [x] Reconciliação de estado
- [ ] Execução sequencial de tarefas
- [ ] Processamento batch
- [ ] Computação offline
</quiz>

<quiz>
Qual das opções melhor descreve “self-healing”?
- [x] O sistema substitui automaticamente instâncias com falha
- [ ] O sistema impede falhas
- [ ] O sistema remove logs antigos
- [ ] O sistema reduz uso de CPU
</quiz>

<quiz>
Por que gerenciar containers manualmente não escala bem?
- [x] Aumenta complexidade e risco de erro humano
- [ ] Melhora a consistência
- [ ] Reduz necessidade de automação
- [ ] Garante alta disponibilidade
</quiz>