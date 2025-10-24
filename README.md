# Avaliação Prática: Sistema de Turmas e Atividades

### Objetivo
O objetivo é criar um **sistema web full-stack** para controle de turmas e atividades de professores, permitindo que eles registrem, visualizem e excluam suas turmas e atividades.  

### Contextualização
Na educação, a falta de organização das atividades aplicadas pelos professores pode gerar problemas de gestão do conhecimento já trabalhado e avaliado.  
Em muitas escolas de áreas remotas do Brasil, a ausência de um sistema adequado prejudica estudantes, professores e o processo educacional como um todo.  

### Desafio
Desenvolver um sistema que permita ao professor:
- Autenticar-se no sistema;
- Visualizar, registrar e excluir suas turmas;
- Registrar atividades relacionadas às turmas;
- Sair do sistema de forma segura.

---

## Requisitos de Infraestrutura

Para rodar o sistema corretamente, o ambiente deve atender aos seguintes requisitos:

### 1. Banco de Dados
- **SGBD:** MySQL  
- **Versão recomendada:** 8.0 ou superior  
- **Observação:** Criar um banco de dados específico para o projeto com usuário e senha configurados.

### 2. Servidor / Sistema Operacional
- **Sistema Operacional:** Windows 10/11
- **Servidor de Aplicação:** Node.js  
- **Versão recomendada do Node.js:** 18 ou superior

### 3. Linguagens e Frameworks
- **Back-end:** JavaScript (Node.js, Express, Prisma ORM)  
- **Front-end:** HTML, CSS
- **Banco de Dados:** MySQL  


---

## Instalação e Teste do Sistema

Siga os passos abaixo para configurar e testar o sistema localmente:

### 1. Clonar o Repositório

```bash
git clone https://github.com/lucashasmann/escolaavaliacao.git
cd escolaavaliacao
```

### 2. Instalar Dependências

```bash
npm install
ou
npm i
```

### 3. Configurar Banco de Dados
- Crie um banco de dados MySQL específico para o projeto.  
- Configure usuário e senha no arquivo `.env`:

```env
DATABASE_URL="mysql://root@localhost:3306/nome_do_banco"
```

### 4. Rodar Migrations do Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Iniciar o Servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`.

### 6. Testar o Sistema
- Acesse pelo navegador ou utilize o **Insomnia/Postman** para testar a API.  
- Funcionalidades para testar:
  - Cadastro, listagem, edição e exclusão de turmas;
  - Cadastro, listagem, edição e exclusão de atividades;
  - Login e logout do professor.


