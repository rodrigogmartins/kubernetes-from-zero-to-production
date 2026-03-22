# Fase 1 - Fundamentos do Kubernetes

Essa fase tem como objetivo construir o modelo mental do Kubernetes, um primeiro passo para compreender como funcionam deploys, escalabilidade e a comunicação entre workloads dentro de um cluster.

Antes de aprender YAML, comandos `kubectl` ou executar deploys, é importante entender três pontos fundamentais:

- **Por que o Kubernetes existe**
- **Qual problema ele resolve**
- **Como o Kubernetes "pensa" e reage às mudanças no sistema"**

Esses conceitos ajudam a entender como o cluster toma decisões automaticamente e mantém aplicações funcionando mesmo em ambientes dinâmicos.

## O que essa fase aborda

Nesta fase vamos explorar os fundamentos da arquitetura e do funcionamento do Kubernetes:

- **Por que o Kubernetes existe**
- **Arquitetura geral do cluster**
- **Control Plane**
- **Data Plane (ou Worker Nodes)**
- **Modelo declarativo**
- **Loop de reconciliação**

Esses conceitos formam a base necessária para compreender como o Kubernetes gerencia aplicações distribuídas.

## Por que esses conceitos são importantes?

Containers são **efêmeros, dinâmicos e frequentemente sem estado**. Em ambientes distribuídos, falhas são inevitáveis: processos podem encerrar inesperadamente, máquinas podem falhar e redes podem apresentar instabilidades.

O Kubernetes introduz abstrações que permitem lidar com esse cenário, como:

- Self-healing e alta disponibilidade
- Manutenção automática do número desejado de workloads
- Rede estável entre aplicações
- Automação de escala e atualizações

Em vez de executar comandos sequenciais, o Kubernetes trabalha com um modelo diferente.

Você declara **qual deve ser o estado desejado do sistema**, e o cluster continuamente tenta fazer o estado real convergir para esse objetivo.

Esse processo contínuo é chamado de **reconciliação**.

Nesta fase, o foco é compreender **os conceitos fundamentais**, não ainda as habilidades operacionais.

## Resultado esperado

Ao final desta fase, você deverá ser capaz de:

- Explicar o propósito do Kubernetes em um ambiente distribuído
- Compreender como o cluster lida com falhas e recuperação automática
- Entender como o sistema mantém continuamente o estado desejado das aplicações.
