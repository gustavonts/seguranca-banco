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

## Verificações Realizadas

1. **Versão do PostgreSQL** - Identifica a versão instalada
2. **Superusuários** - Detecta múltiplas contas com privilégios elevados (Risco: Alta)
3. **Usuários do Sistema** - Lista todos os usuários cadastrados
4. **Permissões do Schema Público** - Verifica permissões excessivas (Risco: Alta)
5. **Extensões Instaladas** - Lista todas as extensões do banco

## Classificação de Risco

- **Alta**: Vulnerabilidades críticas que requerem atenção imediata
- **Média**: Vulnerabilidades que devem ser corrigidas
- **Baixa**: Informações e verificações gerais
