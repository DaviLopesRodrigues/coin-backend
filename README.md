# Coin – Backend

Sistema de Gestão Financeira Pessoal desenvolvido para automatizar o controle de receitas, despesas, investimentos e agendamento de pagamentos.

## Tecnologias Utilizadas

* **NestJS**: Framework Node.js para a construção de aplicações eficientes e escaláveis.
* **TypeScript**: Adição de tipagem estática e recursos JavaScript.
* **Prisma ORM**: Mapeamento objeto-relacional para integração com o banco de dados.
* **PostgreSQL**: Banco de dados relacional.

---

## Propósito do Projeto

O objetivo principal é consolidar os estudos em NestJS através de uma aplicação real, resolvendo um problema diário que tenho de controle financeiro. O foco inicial é no desenvolvimento de um sistema para gerenciar:

* **Fluxo de Caixa**: Cadastro simplificado de receitas e despesas.
* **Investimentos**: Acompanhamento de evolução patrimonial.
* **Contas a Pagar**: Agendamento de pagamentos com alertas de vencimento.
* **Automação**: Futura integração com IA para análise de gastos e automatização de processos.

---

## Motivação: Por que construir do zero?

A decisão de criar uma solução própria em vez de utilizar ferramentas existentes como Mobbils, Excel e etc baseia-se em problemas específicos de usabilidade e limitações que os sistemas possuem:

* **Dependência de internet**: A maioria das ferramentas exige conexão para cadastrar transações. O Coin terá uma arquitetura preparada para futuras sincronizações offline-first.
* **Processo lento de registro**: Formulários longos desestimulam o uso. A ideia é um cadastro rápido, simples e com poucos campos obrigatórios (utilizando IA para isso).
* **Trabalho repetitivo**: Registrar contas fixas e recorrentes uma a uma todo mês é chato demais. O sistema automatizará a geração dessas recorrências.
* **Falta de alertas eficientes**: Ausência de notificações precisas sobre o dia correto de vencimento de contas.
* **Complexidade de planilhas**: Manter arquivos no Excel sempre foi chato e gerou desorganização no longo prazo.
* **Custo de assinatura**: Plataformas premium cobram caro por recursos básicos.