---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Modelo Declarativo e Reconciliation Loop

## Contexto

No capítulo anterior vimos que o Kubernetes utiliza um **modelo declarativo**: o operador descreve o estado desejado do sistema, e o cluster trabalha continuamente para manter essa configuração.

Esse modelo resolve um problema fundamental de sistemas distribuídos.

Aplicações modernas são executadas em múltiplos nós, containers podem encerrar inesperadamente e falhas de infraestrutura são inevitáveis.

Nesse cenário, depender de intervenção humana para detectar e corrigir problemas rapidamente se torna inviável.

O Kubernetes resolve esse desafio utilizando **loops de controle automatizados**, responsáveis por observar o estado do cluster e corrigi-lo continuamente.

Esse mecanismo é conhecido como **Reconciliation Loop**.

---

## Sistemas Distribuídos e Falhas

Em ambientes distribuídos, diversos eventos podem alterar o estado do sistema:

- containers podem falhar
- pods podem ser encerrados
- nós podem ficar indisponíveis
- problemas de rede podem interromper comunicação

Essas falhas não são exceções — elas fazem parte do funcionamento normal do sistema.

A arquitetura do Kubernetes assume essa realidade e foi projetada para **reagir automaticamente a essas mudanças**.

---

## Modelo Declarativo

No Kubernetes, o operador descreve **como o sistema deve estar**, não **como executar passo a passo para chegar lá**.

Essa descrição inclui, por exemplo:

- imagem do container
- número de réplicas da aplicação
- políticas de rede
- configurações de acesso

Essas definições são enviadas ao cluster através de **manifests** (arquivos YAML).

A partir desse momento, o Kubernetes passa a trabalhar continuamente para garantir que o estado atual do cluster corresponda ao estado declarado.

---

## Reconciliation Loop

O mecanismo responsável por manter o estado desejado é chamado de **Reconciliation Loop**.

Esse processo funciona como um ciclo contínuo:

1. o estado desejado é registrado no cluster
2. o estado atual do sistema é observado (via API Server)
3. ambos são comparados
4. divergências são identificadas
5. ações corretivas são executadas
6. o ciclo se repete continuamente

O objetivo não é executar uma operação única, mas **manter o sistema convergindo para o estado desejado ao longo do tempo**.

---

## Controllers

O Kubernetes não possui um único processo responsável por gerenciar todo o cluster.

Em vez disso, ele é composto por **diversos controllers independentes**, cada um responsável por reconciliar um tipo específico de recurso.

Exemplos incluem:

- Deployment Controller
- ReplicaSet Controller
- Node Controller
- Job Controller

Cada controller executa seu próprio **reconciliation loop**, observando recursos e tomando ações quando necessário.

---

## Loops de Controle em Paralelo

Como cada controller gerencia um recurso diferente, vários loops de reconciliação são executados **simultaneamente**.

Esse modelo oferece diversas vantagens:

- arquitetura modular
- componentes desacoplados
- maior escalabilidade
- tolerância a falhas

Os controllers não coordenam suas ações diretamente.  
Todos observam e reagem ao **estado compartilhado do cluster**.

Isso permite que o sistema continue funcionando mesmo se um controller específico falhar.

---

## Modelo Mental

Uma forma útil de entender o Kubernetes é imaginar o sistema como um conjunto de **loops de controle contínuos e automatizados**.

Cada controller continuamente avalia:

> O estado atual corresponde ao estado desejado?

Se houver divergência, o controller executa ações para reduzir a diferença entre os estados.

Com o tempo, o cluster converge novamente para a configuração declarada.

---

## Próximo passo

Se múltiplos controllers observam o estado do cluster, surge uma pergunta importante:

**onde esse estado é armazenado e como todos os componentes conseguem acessá-lo?**

Para entender isso, é necessário analisar dois componentes centrais da arquitetura do Kubernetes:

- **API Server**
- **etcd**

Eles formam a base de coordenação de todo o cluster.

---

## Verifique seu conhecimento

<quiz>
Qual é o principal objetivo do reconciliation loop?
- [x] Garantir que o estado atual corresponda ao estado desejado
- [ ] Evitar que falhas aconteçam
- [ ] Executar containers diretamente
- [ ] Substituir o scheduler
</quiz>

<quiz>
Qual padrão de componente implementa o reconciliation loop no Kubernetes?
- [x] Controllers
- [ ] kubelet
- [ ] etcd
- [ ] kube-proxy
</quiz>

<quiz>
O reconciliation loop no Kubernetes é:
- [x] um processo contínuo
- [ ] executado apenas uma vez durante o deploy
- [ ] acionado apenas por ações do usuário
- [ ] dependente de intervenção manual
</quiz>

<quiz>
O que acontece quando o estado atual difere do estado desejado?
- [x] Controllers executam ações para reduzir a diferença
- [ ] O cluster é interrompido
- [ ] O API Server ignora a mudança
- [ ] O node é reiniciado
</quiz>

<quiz>
Qual das opções melhor descreve o modelo declarativo?
- [x] Definir o que deve acontecer, não como executar passo a passo
- [ ] Executar comandos manualmente
- [ ] Definir apenas o estado atual
- [ ] Configurar nodes diretamente
</quiz>

<quiz>
Se um Pod falha, o que garante sua recriação?
- [x] Um controller através do reconciliation loop
- [ ] O scheduler
- [ ] etcd
- [ ] O container runtime
</quiz>

<quiz>
Qual recurso é reconciliado diretamente por um Deployment?
- [x] ReplicaSet
- [ ] Node
- [ ] Service
- [ ] Ingress
</quiz>

<quiz>
Verdadeiro ou falso: Controllers se comunicam diretamente entre si para coordenar ações.
- [ ] Verdadeiro
- [x] Falso
</quiz>

<quiz>
Como os controllers observam mudanças no cluster?
- [x] Através do API Server
- [ ] Diretamente no etcd
- [ ] Via kubelet
- [ ] Através do container runtime
</quiz>

<quiz>
O que é comparado durante o reconciliation loop?
- [x] Estado desejado e estado atual
- [ ] CPU e memória
- [ ] Nodes e Pods
- [ ] Services e Ingress
</quiz>

<quiz>
Quais situações podem disparar reconciliação? (múltiplas corretas)
- [x] Um Pod é removido inesperadamente
- [x] O número de réplicas é alterado
- [ ] Um usuário acessa um node
- [ ] Uma imagem de container é construída
</quiz>

<quiz>
Qual é o papel do etcd no contexto do reconciliation loop?
- [x] Armazenar o estado desejado e atual do cluster
- [ ] Executar lógica de reconciliação
- [ ] Agendar Pods
- [ ] Reiniciar containers
</quiz>

<quiz>
Qual das afirmações é correta sobre os loops de reconciliação?
- [x] Vários loops rodam em paralelo
- [ ] Existe apenas um loop central no cluster
- [ ] Rodam apenas durante deploys
- [ ] São acionados manualmente
</quiz>

<quiz>
Se um controller falhar, o que acontece?
- [x] Outros controllers continuam funcionando
- [ ] O cluster inteiro para
- [ ] Todos os Pods são removidos
- [ ] O scheduler assume suas funções
</quiz>

<quiz>
O que significa "convergência" no Kubernetes?
- [x] O sistema gradualmente atinge o estado desejado
- [ ] O sistema para de executar
- [ ] Todos os Pods são reiniciados
- [ ] Os nodes são sincronizados
</quiz>

<quiz>
Qual das opções NÃO faz parte do reconciliation loop?
- [ ] Observar o estado atual
- [ ] Comparar estados
- [ ] Executar ações corretivas
- [x] Construir imagens de container
</quiz>

<quiz>
Complete: Controllers operam continuamente executando [[loops de reconciliação]].
</quiz>

<quiz>
O que permite ao Kubernetes lidar automaticamente com falhas?
- [x] Reconciliação contínua
- [ ] Intervenção manual
- [ ] Configuração estática
- [ ] Infraestrutura fixa
</quiz>

<quiz>
Qual das opções melhor descreve o comportamento de um controller?
- [x] Atua sobre um tipo específico de recurso
- [ ] Controla todo o cluster
- [ ] Executa containers diretamente
- [ ] Gerencia apenas rede
</quiz>

<quiz>
Por que loops de reconciliação são importantes em sistemas distribuídos?
- [x] Permitem adaptação a mudanças constantes
- [x] Habilitam self-healing
- [ ] Eliminam falhas de rede
- [ ] Impedem falhas de hardware
</quiz>