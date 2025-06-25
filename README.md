# 🛍️ Projeto Loja - E-commerce Full Stack

Uma aplicação completa de e-commerce desenvolvida com tecnologias modernas, oferecendo uma experiência de compra intuitiva e sistema de gerenciamento robusto integrado com plataforma administrativa.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind 4** - Estilização utilitária e responsiva
- **Shadcn/ui** - Componentes UI modernos e acessíveis
- **next-themes** - Sistema de temas claro/escuro

### Backend
- **Node.js** com **TypeScript**
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe e performático
- **PostgreSQL** - Banco de dados relacional
- **José JWT** - Autenticação segura com tokens JWT
- **Argon2** - Hash de senhas seguro

## ✨ Funcionalidades

### 🛒 Para Clientes
- **Catálogo de Produtos**: Navegação por categorias (tênis, roupas, acessórios)
- **Páginas de Produto**: Detalhes completos com imagens, preços e especificações
- **Sistema de Busca**: Encontre produtos facilmente por categoria
- **Tema Personalizado**: Alternância entre modo claro e escuro
- **Design Responsivo**: Experiência otimizada em todos os dispositivos
- **Rotas Dinâmicas**: URLs amigáveis para categorias e produtos

### 🔐 Sistema de Autenticação
- **Registro/Login** seguro com validação completa
- **Sessões JWT** com cookies httpOnly
- **Middleware de proteção** de rotas
- **Gerenciamento de sessão** automático
- **Logout seguro** com limpeza de cookies
- **Verificação de autenticação** em tempo real

### 🎨 Interface
- **Design Moderno**: Interface limpa e intuitiva
- **Transições Suaves**: Animações fluidas entre páginas
- **Sistema de Cores OKLCH**: Melhor acessibilidade e contraste
- **Componentes Reutilizáveis**: Arquitetura modular e escalável
- **Navigation Menu**: Sistema de navegação responsivo

### 🔧 Integração Administrativa
- **Plataforma de Desenvolvedor**: Integrada com [projeto-loja-admin](https://github.com/MatheusPesarini/projeto-loja-admin)
- **Gerenciamento de Produtos**: CRUD completo via painel administrativo
- **Controle de Usuários**: Sistema de gerenciamento de perfis
- **Sessões Seguras**: Controle de acesso baseado em JWT

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd projeto-loja
```

2. **Instale as dependências**
```bash
# Frontend
cd frontend-next
npm i

# Backend
cd ../backend-ts-prisma-fastify
npm i
```

3. **Configure as variáveis de ambiente**

**Backend (.env):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/loja_db"
JWT_SECRET_KEY="your-super-secret-jwt-key"
```

**Frontend (.env.local):**
```env
JWT_SECRET_KEY="your-super-secret-jwt-key"
```

4. **Configure o banco de dados**
```bash
# No diretório backend-ts-prisma-fastify
npx drizzle-kit generate
npx drizzle-kit push
```

5. **Execute a aplicação**

**Backend:**
```bash
cd backend-ts-prisma-fastify
npm run dev
# Servidor rodando em http://localhost:3001
```

**Frontend:**
```bash
cd frontend-next
npm run dev
# Aplicação rodando em http://localhost:3000
```

## 🔐 Sistema de Autenticação

O projeto implementa um sistema completo de autenticação com:

- **JWT Tokens** seguros com José
- **Cookies httpOnly** para armazenamento seguro
- **Hash Argon2** para senhas
- **Middleware de proteção** automático
- **Verificação de sessão** server-side
- **Renovação automática** de tokens

### Rotas Protegidas
- `/dashboard` - Requer autenticação
- Rotas públicas redirecionam usuários autenticados

### Middleware de Sessão
```typescript
// Verifica automaticamente a autenticação
const isAuth = await isAuthenticated();
```

## 📸 Demonstração

![Demonstração do projeto](./frontend-next/public/projeto_1.png)
![Demonstração do projeto](./frontend-next/public/projeto_2.png)
![Demonstração do projeto](./frontend-next/public/projeto_3.png)

## 🔗 Integração com Painel Admin

Este projeto está integrado com o [Painel Administrativo](https://github.com/MatheusPesarini/projeto-loja-admin) que oferece:

- **Gerenciamento de Produtos**: CRUD completo
- **Controle de Usuários**: Administração de contas
- **Dashboard Analytics**: Métricas de vendas
- **Configurações de Loja**: Personalização

## 🔧 Scripts Disponíveis

### Frontend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run format       # Linting
```

### Backend
```bash
npm run dev          # Servidor de desenvolvimento
```

## 🛡️ Segurança

- Senhas hashadas com Argon2
- JWT com chaves secretas seguras
- Cookies httpOnly para prevenir XSS
- Validação rigorosa de dados com Zod
- Middleware de proteção CORS configurado

---

**Desenvolvido com ❤️ usando Next.js 15, TypeScript, Drizzle ORM e Fastify**

**Integrado com:** [Projeto Loja Admin](https://github.com/MatheusPesarini/projeto-loja-admin)