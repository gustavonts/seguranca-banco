# Analisador de Segurança de Banco de Dados - PostgreSQL

Sistema simples para verificar vulnerabilidades em bancos de dados PostgreSQL.

## Instalação

```bash
npm install
```

## Executar

```bash
npm run start:dev
```

## Endpoints

### Executar varredura
```
POST /scanner/escanear
Body: {
  "host": "localhost",
  "port": 5432,
  "database": "postgres",
  "user": "postgres",
  "password": "senha"
}
```

### Ver resultados
```
GET /scanner/resultados
```

### Gerar relatório
```
GET /reports
```

## Verificações

- Lista de usuários do sistema
- Verificação de múltiplos superusuários
- Lista de extensões instaladas
