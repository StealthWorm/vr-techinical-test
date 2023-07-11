# App - REGRA DE NEGÓCIO

  VR SOFTWARE TECH TEST.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar um Aluno;
- [x] Deve ser possível deletar um Aluno;
- [x] Deve ser possível atualizar os dados de um Aluno;
- [x] Deve ser possível Filtrar os Alunos pelo nome;

- [x] Deve ser possível cadastrar um Curso;
- [x] Deve ser possível deletar um Curso;
- [x] Deve ser possível atualizar os dados de um Curso;
- [x] Deve ser possível Filtrar os Cursos pela descrição;

- [x] Deve ser possível cadastrar uma Matrícula;
- [x] Deve ser possível deletar uma Matrícula;
- [x] Deve ser possível listar as Matrículas;

## RNs (Regras de Negócio)

- [x] Não deve ser possivel deletar um aluno matriculado a um curso;
- [x] Não deve ser possivel deletar um curso com alunos matriculados;

## RNFs (Requisitos Não-Funcionais)

- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;

# Backend com Nest + PrismaORM + Docker

- rode a imagem do container postgres com o comando docker-compose up na pasta backend;
- caso queira o banco populado, ou caso as tabelas não carreguem, bastam dar o comando abaixo, que ele executará as migrations e populará o banco com os dados do arquimo seed.ts disponivel na pasta prisma.
  ```npx prisma migrate dev```
- Asiim que o container estiver iniciado, para rodar o sistema basta rodar
  ```npm run start:dev```
- fiz os testes unitários de todos os casos de uso listados, porém não implementei os testes e2e do serviço;

# Frontend desenvolvido em Angular

- para rodar basta rodar o comando abaixo na pasta frontend
  ```ng serve```
- o projeto é local e não foi hospedado em container;
- será possivel notar que algumas telas lidam com components "Material" do Angular e outras não, e isso foi de modo proposital pela questão do tempo e também para treinar diferentes formas de funcionamento.
- Não foram relizados testes e2e para o front, mas era algo que estava na lista xD.
- Não estou muito acostumado com a arquitetura do angular, então nesse primeiro momento é provável que as telas não estejam totalmente mobile-friendly ou com tratamento de erros de maneira "bonita" hahaha.
  
**PS: Fiz o melhor que pude com o tempo que me foi dado, espero que gostem xD**

**Desde já agradeço a oportunidade e admito que foi uma experiencia interessante.**
