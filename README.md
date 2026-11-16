# Mercado Fácil

O **Mercado Fácil** é um aplicativo mobile desenvolvido em **React Native com TypeScript** como atividade prática da disciplina de **Interação Humano-Computador (IHC)** do curso de Análise e Desenvolvimento de Sistemas.

O projeto tem como objetivo aplicar, de forma prática, conceitos de IHC relacionados à usabilidade, acessibilidade, arquitetura da informação, feedback, consistência visual, prevenção de erros e design centrado no usuário.

A proposta do aplicativo é facilitar a realização de compras de supermercado por dispositivos móveis, permitindo que diferentes perfis de usuários encontrem produtos, organizem suas compras e finalizem pedidos de maneira simples, clara e previsível.

---

## Contextualização

Realizar compras de supermercado envolve diversas atividades, como localizar produtos, comparar preços, verificar quantidades, acompanhar o valor total da compra e escolher formas de entrega e pagamento.

Em um aplicativo mobile, essas tarefas precisam ser organizadas de maneira que o usuário não encontre as mesmas dificuldades existentes no ambiente físico ou enfrente novas barreiras causadas por uma interface complexa.

Por esse motivo, o Mercado Fácil foi desenvolvido com foco em reduzir a carga cognitiva e facilitar a navegação. As telas utilizam uma identidade visual simples e consistente, com poucas informações simultâneas, áreas de toque amplas, textos claros e feedback para as principais ações realizadas pelo usuário.

## Principais funcionalidades

O aplicativo permite:

- realizar login de forma simplificada;
- pesquisar produtos;
- pesquisar também por categorias;
- navegar pelos produtos organizados por categorias;
- visualizar detalhes dos produtos;
- adicionar produtos ao carrinho;
- alterar quantidades;
- remover produtos mediante confirmação;
- receber feedback visual ao adicionar um produto;
- acompanhar o valor total da compra;
- escolher entre entrega ou retirada;
- alterar o endereço de entrega;
- selecionar a forma de pagamento;
- revisar o pedido antes da confirmação;
- finalizar uma compra;
- consultar o histórico de pedidos realizados durante a execução da aplicação;
- visualizar detalhes de pedidos anteriores;
- refazer um pedido anterior, podendo ajustar o carrinho antes de concluir a nova compra;
- alterar e salvar o nome do usuário na tela de perfil.

## Fluxo principal

O fluxo principal da aplicação segue a seguinte estrutura:

> **Login → Início → Categoria/Pesquisa → Produto → Carrinho → Entrega ou Retirada → Pagamento → Revisão → Confirmação do pedido**

Após a finalização, o pedido passa a ficar disponível na área de histórico de pedidos enquanto a aplicação estiver em execução.

## Conceitos de IHC aplicados

Durante o desenvolvimento foram considerados diferentes princípios de Interação Humano-Computador.

A **usabilidade** foi aplicada por meio de fluxos simples e ações facilmente identificáveis. A **consistência** é mantida por meio da repetição de cores, componentes, botões, tipografia e padrões de navegação entre as telas.

O **feedback** aparece em ações como adicionar produtos ao carrinho, salvar informações ou concluir um pedido. A **prevenção de erros** está presente, por exemplo, na confirmação antes da remoção de um produto e na possibilidade de revisar o pedido antes da compra.

Também foi aplicado o princípio de **reconhecimento em vez de memorização**, mantendo informações como preços, quantidades, categorias e principais ações visíveis ao usuário.

A **acessibilidade** foi considerada por meio de contraste, legibilidade, áreas de toque amplas e uso de textos junto aos principais elementos de interação.

## Identidade visual

A interface foi desenvolvida com uma abordagem minimalista e profissional, utilizando:

- fundo predominantemente claro;
- verde como cor principal;
- tons neutros para textos secundários;
- ícones simples;
- botões e cards padronizados;
- ausência de gradientes e elementos decorativos desnecessários.

O objetivo foi reduzir a poluição visual e priorizar as informações realmente importantes para a realização da compra.

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Expo Router
- Context API
- Componentes funcionais e Hooks

## Persistência de dados

O projeto foi desenvolvido com foco acadêmico e demonstrativo.

Não há integração com backend ou banco de dados. Dados como carrinho, perfil e histórico de pedidos permanecem apenas em memória durante a execução da aplicação.

Ao encerrar ou reiniciar a aplicação, essas informações podem ser perdidas.

## Objetivo acadêmico

Mais do que desenvolver um aplicativo funcional, o objetivo deste projeto é demonstrar como decisões de interface e interação podem ser fundamentadas em conceitos de IHC.

Cada escolha de navegação, disposição de elementos, feedback, organização de informações e prevenção de erros foi pensada para favorecer a experiência do usuário e tornar o processo de compra mais simples, compreensível e acessível.

## Como executar

Com Node.js e npm instalados, execute na raiz do projeto:

```bash
npm install
npx expo start
```

Abra o aplicativo em um dispositivo ou emulador compatível com o ambiente Expo. Para verificar o código:

```bash
npx expo lint
npx tsc --noEmit
```
