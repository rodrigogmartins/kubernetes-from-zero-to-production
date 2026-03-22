---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Visão Geral da Arquitetura do Kubernetes

## O problema

Orquestrar containers em escala é uma tarefa complexa.

Um sistema precisa:

- receber declarações do usuário
- armazenar o estado do cluster de forma confiável
- decidir onde workloads devem rodar
- manter a comunicação entre componentes
- se recuperar automaticamente de falhas
- escalar sem interromper aplicações

Sem uma estrutura bem definida e separação de responsabilidades, a orquestração se torna frágil e difícil de operar.

👉 é necessário um modelo arquitetural organizado

---

## A solução

O Kubernetes utiliza uma **arquitetura modular e em camadas**, projetada para:

- escalabilidade
- resiliência
- separação clara de responsabilidades
- reconciliação automatizada

A arquitetura é dividida em três camadas principais:

- **Control Plane**
- **Data Plane (Nodes)**
- **Add-ons**

Cada camada possui responsabilidades bem definidas.

---

## Control Plane

O Control Plane gerencia o cluster.

Ele:

- expõe a API
- armazena o estado do cluster
- agenda workloads
- garante que a configuração desejada seja respeitada

Componentes principais:

- API Server
- Storage
- Scheduler
- Controller Manager

É aqui que ocorre o reconciliation loop, conceito fundamental do modelo de funcionamento do Kubernetes.

O Control Plane não executa workloads diretamente.

Ele **define e coordena o comportamento do sistema**.

---

## Data Plane (Nodes)

O Data Plane é responsável pela execução.

Cada node executa:

- kubelet
- kube-proxy
- container runtime

Responsabilidades:

- executar Pods
- manter a rede no nível do node
- reportar estado ao Control Plane

Nodes executam, não decidem. Eles seguem as instruções definidas pelo Control Plane.

---

## Add-ons

Add-ons estendem as funcionalidades do cluster.

Exemplos comuns:

- DNS (CoreDNS)
- Metrics Server
- Ingress Controller

Eles não fazem parte do núcleo do Kubernetes, mas são essenciais para operação em ambientes reais.

---

## Princípios arquiteturais

### Modelo de estado desejado

O usuário declara o estado desejado do sistema.

---

### Reconciliação

Controllers comparam continuamente:

- estado desejado
- estado atual

Se houver divergência, ações corretivas são executadas.

---

### Workloads efêmeras

Pods são substituíveis.

Controllers garantem o número desejado de instâncias.

---

### Rede estável

Services fornecem endpoints estáveis para comunicação entre Pods.

---

## Modelo mental

API → estado desejado  
Controllers → reconciliação  
Nodes → execução  
Services → estabilidade  

Kubernetes é um sistema baseado em loops de controle.

---

## Equívocos comuns

- Confundir Control Plane com componentes dos nodes
- Achar que Pods são permanentes
- Ignorar o comportamento de reconciliação
- Assumir que add-ons fazem parte do núcleo do Control Plane

Entender essa separação facilita troubleshooting e decisões de arquitetura.

---

## Próximo passo

Agora que entendemos a arquitetura em alto nível, podemos aprofundar cada camada.

Começando pelo **Control Plane**, responsável por coordenar todo o sistema.

---

## Verifique seu conhecimento

<quiz>
Qual camada do Kubernetes é responsável por executar o reconciliation loop?
- [x] Control Plane
- [ ] Data Plane
- [ ] Add-ons
</quiz>

<quiz>
Qual é a principal responsabilidade do Data Plane?
- [x] Executar workloads
- [ ] Armazenar estado do cluster
- [ ] Expor a API
- [ ] Tomar decisões de agendamento
</quiz>

<quiz>
Quais componentes executam em cada node? (múltiplas corretas)
- [x] kubelet
- [x] kube-proxy
- [x] container runtime
- [ ] API Server
- [ ] Controller Manager
</quiz>

<quiz>
Qual componente é responsável por armazenar o estado do cluster?
- [x] storage
- [ ] kubelet
- [ ] scheduler
- [ ] kube-proxy
</quiz>

<quiz>
Qual componente decide onde um Pod será executado?
- [x] scheduler
- [ ] kubelet
- [ ] storage
- [ ] kube-proxy
</quiz>

<quiz>
Qual é o papel do kubelet?
- [x] Garantir que os Pods definidos estejam rodando no node
- [ ] Agendar Pods no cluster
- [ ] Armazenar estado do cluster
- [ ] Gerenciar API
</quiz>

<quiz>
Add-ons no Kubernetes são:
- [x] extensões que adicionam funcionalidades ao cluster
- [ ] componentes obrigatórios do Control Plane
- [ ] responsáveis por executar Pods
- [ ] substitutos do scheduler
</quiz>

<quiz>
Quais são exemplos de add-ons? (múltiplas corretas)
- [x] DNS
- [x] Metrics Server
- [x] Ingress Controller
- [ ] scheduler
</quiz>

<quiz>
Verdadeiro ou falso: Nodes tomam decisões globais sobre o cluster.
- [ ] Verdadeiro
- [x] Falso
</quiz>

<quiz>
Qual das opções melhor descreve o Control Plane?
- [x] Camada que coordena e toma decisões
- [ ] Camada que executa containers
- [ ] Camada de rede entre Pods
- [ ] Camada de armazenamento local
</quiz>

<quiz>
Por que a arquitetura do Kubernetes é dividida em camadas?
- [x] Para separar responsabilidades
- [x] Para melhorar escalabilidade e resiliência
- [ ] Para eliminar a necessidade de nodes
- [ ] Para evitar uso de containers
</quiz>

<quiz>
O que acontece quando o estado atual difere do estado desejado?
- [x] Controllers executam ações corretivas
- [ ] O sistema ignora a diferença
- [ ] Os nodes param de executar
- [ ] O storage é reiniciado
</quiz>

<quiz>
Qual das opções NÃO é responsabilidade do Control Plane?
- [ ] Agendar workloads
- [ ] Armazenar estado do cluster
- [x] Executar containers diretamente
- [ ] Expor a API
</quiz>

<quiz>
Qual é o papel dos Services na arquitetura?
- [x] Fornecer comunicação estável entre Pods
- [ ] Executar workloads
- [ ] Armazenar estado
- [ ] Agendar Pods
</quiz>

<quiz>
Qual das opções melhor descreve Pods?
- [x] Unidades efêmeras de execução
- [ ] Infraestrutura permanente
- [ ] Componentes do Control Plane
- [ ] Serviços de rede
</quiz>

<quiz>
Se um Pod falhar, qual camada é responsável por garantir sua substituição?
- [x] Control Plane (via controllers)
- [ ] Data Plane
- [ ] Add-ons
- [ ] Container runtime
</quiz>

<quiz>
Qual das opções melhor descreve a arquitetura do Kubernetes?
- [x] Sistema distribuído com separação entre controle e execução
- [ ] Sistema centralizado em um único node
- [ ] Plataforma de execução local
- [ ] Banco de dados distribuído
</quiz>