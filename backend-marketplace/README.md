# 🚀 Backend API - Projeto Loja E-commerce

API REST robusta para e-commerce desenvolvida com **Fastify**, **TypeScript**, **Drizzle ORM** e **PostgreSQL**, oferecendo autenticação JWT segura e documentação automática com Swagger.

## 📚 Documentação da API

🔗 **Swagger UI**: [`http://localhost:3001/docs`](http://localhost:3001/docs)

![Swagger Documentation](https://img.shields.io/badge/Swagger-Documentation-brightgreen)
![API Status](https://img.shields.io/badge/API-Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ⚡ Tecnologias

| Tecnologia | Versão | Função |
|------------|--------|---------|
| **Fastify** | ^4.0 | Framework web de alta performance |
| **TypeScript** | ^5.0 | Tipagem estática e segurança |
| **Drizzle ORM** | ^0.29 | ORM type-safe e performático |
| **PostgreSQL** | ^14+ | Banco de dados relacional |
| **José** | ^5.0 | Autenticação JWT segura |
| **Argon2** | ^0.31 | Hash de senhas robusto |
| **Swagger** | ^8.0 | Documentação automática |

## 📋 Funcionalidades

### 🔐 Autenticação
- ✅ **Registro de usuários** com validação completa
- ✅ **Login seguro** com JWT cookies httpOnly  
- ✅ **Middleware de proteção** automático
- ✅ **Hash Argon2** para senhas
- ✅ **Verificação de sessão** server-side

### 🛍️ Gestão de Produtos
- ✅ **CRUD completo** de produtos
- ✅ **Busca por categoria** e gênero
- ✅ **Sistema de busca** por termo
- ✅ **Produtos relacionados** inteligentes
- ✅ **Gestão de estoque** com quantidades
- ✅ **Sistema de preços** com descontos

### 👥 Gestão de Usuários
- ✅ **Perfis de usuário** completos
- ✅ **Atualização de dados** segura
- ✅ **Exclusão de contas** protegida

### 🏢 Sistema de Fornecedores
- ✅ **Cadastro de vendors** com CNPJ
- ✅ **Associação produto-fornecedor**
- ✅ **Gestão de empresas** parceiras

### 📦 Sistema de Pedidos
- ✅ **Criação de pedidos** automatizada
- ✅ **Histórico completo** por usuário
- ✅ **Controle de quantidades**

## 🔗 Endpoints da API

### 🔐 **Autenticação**
```
POST   /login              # Login do usuário
POST   /register           # Registro de usuário  
DELETE /users/:id          # Deletar conta (protegido)
```

### 🛍️ **Produtos**
```
GET    /products                    # Listar todos os produtos
POST   /products                    # Criar produto
GET    /products/:id                # Buscar produto por ID
PUT    /products/:id                # Atualizar produto
DELETE /products/:id                # Deletar produto
GET    /products/category/:category # Produtos por categoria
GET    /products/genre/:genre       # Produtos por gênero
GET    /products/search/:term       # Buscar produtos
GET    /products/related/:category  # Produtos relacionados
GET    /products/vendor/:vendorId   # Produtos de um fornecedor
```

### 🏢 **Fornecedores**
```
POST   /vendors           # Criar fornecedor
GET    /vendors           # Listar fornecedores
GET    /vendors/:id       # Buscar fornecedor
PUT    /vendors/:id       # Atualizar fornecedor
DELETE /vendors/:id       # Deletar fornecedor
```

### 📦 **Pedidos**
```
POST   /orders            # Criar pedido
GET    /orders            # Listar pedidos
GET    /orders/:id        # Buscar pedido
GET    /orders/user/:userId # Pedidos do usuário
DELETE /orders/:id        # Cancelar pedido
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run api          # Inicia servidor de desenvolvimento
npm run dev          # Mesmo que api (com watch)

# Banco de dados
npm run db:generate  # Gera migrations
npm run db:push      # Aplica migrations
npm run db:studio    # Interface visual do banco

# Validação
npm run type-check   # Verificação de tipos
npm run lint         # Linting do código

# Produção
npm run build        # Build para produção
npm start            # Inicia em produção

## 🌐 Integração com Frontend

Esta API está integrada com:
- **Frontend Next.js**: [`../frontend-next`](../frontend-next)
- **Painel Admin**: [projeto-loja-admin](https://github.com/MatheusPesarini/projeto-loja-admin)

### **CORS Configurado**
```typescript
fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

## 🐛 Troubleshooting

### **Erro de Conexão com Banco**
```bash
# Verificar se PostgreSQL está rodando
pg_ctl status

# Testar conexão
psql postgresql://usuario:senha@localhost:5432/loja_db
```

### **Erro de JWT**
```bash
# Verificar se JWT_SECRET_KEY tem pelo menos 32 caracteres
echo $JWT_SECRET_KEY | wc -c
```

### **Porta em uso**
```bash
# Matar processo na porta 3001
lsof -ti:3001 | xargs kill -9
```

## 📈 Performance

- **Fastify**: Framework 2x mais rápido que Express
- **Drizzle ORM**: Queries otimizadas e type-safe
- **Connection Pooling**: Pool de conexões para PostgreSQL
- **Validação JIT**: Validação compilada em tempo de execução

---

**Desenvolvido com ❤️ por [Matheus Pesarini](https://github.com/MatheusPesarini)**

🔗 **Links úteis:**
- [Documentação Swagger](http://localhost:3001/docs)
- [Frontend Next.js](../frontend-next)
- [Painel Admin](https://github.com/MatheusPesarini/projeto-loja-admin)