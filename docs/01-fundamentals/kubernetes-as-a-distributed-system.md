---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Kubernetes como um Sistema Distribuído

## O problema

Executar aplicações em uma única máquina traz limitações claras:

- ponto único de falha
- escalabilidade limitada
- ausência de tolerância a falhas
- recuperação manual em caso de problemas

Sistemas modernos exigem:

- alta disponibilidade
- recuperação automática
- escalabilidade horizontal
- gerenciamento coordenado de estado

Para atender a esses requisitos, é necessário adotar uma **arquitetura distribuída**.

---

## A solução

O Kubernetes foi projetado como um **sistema distribuído**.

Ele:

- executa workloads em múltiplos nodes
- armazena o estado do cluster de forma consistente
- substitui recursos com falha automaticamente
- escala horizontalmente com a adição de novos nodes

Em vez de uma única máquina centralizando tudo, as responsabilidades são distribuídas entre os componentes do cluster.

---

## Componentes distribuídos centrais

### Storage — Armazenamento de estado

- banco de dados distribuído do tipo key-value
- armazena o estado desejado e atual do cluster
- projetado para alta disponibilidade e consistência

Se o Storage ficar indisponível, o Control Plane perde a capacidade de operar corretamente.

---

### Nodes

Os nodes:

- executam workloads (Pods)
- rodam kubelet e kube-proxy
- reportam seu estado ao Control Plane

Os nodes **não armazenam o estado desejado**.

Eles apenas executam instruções definidas pelo Control Plane.

---

## Princípios de sistemas distribuídos no Kubernetes

### Replicação

- workloads podem rodar em múltiplos nodes
- controllers mantêm o número de réplicas
- aumenta a disponibilidade

---

### Descentralização

- múltiplos nodes compartilham a execução
- componentes do Control Plane podem ser replicados
- nenhum node individual controla o cluster

---

### Resiliência

- Pods com falha são recriados automaticamente
- nodes com problema são detectados
- controllers restauram o estado desejado

O sistema é auto-recuperável (self-healing)

---

### Escalabilidade

- nodes podem ser adicionados para aumentar capacidade
- nodes podem ser removidos para reduzir capacidade
- workloads são redistribuídos automaticamente

A escala é horizontal

---

## Modelo mental

Storage = fonte da verdade  
Control Plane = camada de coordenação  
Nodes = camada de execução distribuída  

O Kubernetes não é uma única máquina, mas sim um sistema coordenado de múltiplas máquinas.

---

## Equívocos comuns

- Achar que um único node executa tudo
- Confundir nodes com componentes do Control Plane
- Assumir que Pods são permanentes
- Ignorar o papel do Storage na disponibilidade

Entender esses conceitos facilita muito o troubleshooting.

---

## Próximo passo

Se o Kubernetes é um sistema distribuído que depende de um estado compartilhado, surge uma pergunta:

- Como esse estado é mantido consistente e acessado por todos os componentes?

Para responder, vamos explorar o **Control Plane**.

---

## Verifique seu conhecimento

<quiz>
Qual é o principal banco de dados utilizado pelo Kubernetes?
- [x] Storage
- [ ] MySQL
- [ ] kubelet
- [ ] container runtime
</quiz>

<quiz>
Qual é o papel do Storage no cluster?
- [x] Armazenar o estado do cluster
- [ ] Executar containers
- [ ] Agendar Pods
- [ ] Gerenciar rede
</quiz>

<quiz>
Se o Storage ficar indisponível, o que pode acontecer?
- [x] O cluster pode parar de aceitar mudanças
- [ ] Todos os Pods param imediatamente
- [ ] Os nodes são desligados
- [ ] O scheduler assume o controle total
</quiz>

<quiz>
Qual das opções descreve melhor um node?
- [x] Máquina responsável por executar Pods
- [ ] Componente que armazena estado do cluster
- [ ] Responsável por agendar Pods
- [ ] Responsável por expor a API
</quiz>

<quiz>
Quais são responsabilidades dos nodes? (múltiplas corretas)
- [x] Executar workloads
- [x] Reportar status ao Control Plane
- [ ] Armazenar estado desejado
- [ ] Gerenciar o API Server
</quiz>

<quiz>
Qual princípio garante que workloads possam rodar em múltiplos nodes?
- [x] Replicação
- [ ] Serialização
- [ ] Virtualização
- [ ] Centralização
</quiz>

<quiz>
O que significa escalabilidade horizontal?
- [x] Adicionar ou remover nodes do cluster
- [ ] Aumentar CPU de um node
- [ ] Reiniciar containers
- [ ] Reduzir número de Pods
</quiz>

<quiz>
Como o Kubernetes demonstra resiliência?
- [x] Recriando Pods com falha automaticamente
- [x] Redistribuindo workloads quando necessário
- [ ] Evitando qualquer falha de hardware
- [ ] Eliminando necessidade de monitoramento
</quiz>

<quiz>
Qual das opções melhor descreve descentralização no Kubernetes?
- [x] Responsabilidades distribuídas entre múltiplos componentes
- [ ] Um único node controla todo o cluster
- [ ] Apenas o scheduler toma decisões
- [ ] O kubelet gerencia todo o sistema
</quiz>

<quiz>
Os nodes armazenam o estado desejado do cluster?
- [ ] Sim
- [x] Não
</quiz>

<quiz>
Qual componente é considerado a fonte da verdade do cluster?
- [x] Storage
- [ ] kubelet
- [ ] scheduler
- [ ] container runtime
</quiz>

<quiz>
Qual das opções melhor descreve o Kubernetes?
- [x] Um sistema distribuído coordenado
- [ ] Uma única máquina com containers
- [ ] Um banco de dados distribuído
- [ ] Um sistema operacional
</quiz>

<quiz>
O que acontece quando um node falha?
- [x] Workloads podem ser redistribuídos
- [ ] O cluster inteiro para
- [ ] O Storage é removido
- [ ] O scheduler deixa de funcionar
</quiz>

<quiz>
Qual é o papel do Control Plane em um sistema distribuído Kubernetes?
- [x] Coordenar o estado e comportamento do cluster
- [ ] Executar workloads diretamente
- [ ] Armazenar logs
- [ ] Gerenciar containers localmente
</quiz>

<quiz>
Qual das opções NÃO é um benefício de sistemas distribuídos?
- [ ] Alta disponibilidade
- [ ] Escalabilidade
- [ ] Resiliência
- [x] Eliminação total de falhas
</quiz>

<quiz>
Qual das afirmações é verdadeira sobre Pods em um sistema distribuído?
- [x] Podem ser movidos ou recriados em diferentes nodes
- [ ] Sempre rodam no mesmo node
- [ ] Possuem IP fixo permanente
- [ ] Nunca são recriados
</quiz>

<quiz>
Por que sistemas distribuídos são necessários?
- [x] Para lidar com escala e falhas
- [ ] Para eliminar a necessidade de rede
- [ ] Para rodar apenas uma aplicação
- [ ] Para simplificar completamente o sistema
</quiz>