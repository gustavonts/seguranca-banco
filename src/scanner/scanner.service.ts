import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ScannerService {
  private resultados: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  async escanear(host: string, port: number, database: string, user: string, password: string) {
    await this.databaseService.conectar(host, port, database, user, password);

    const vulnerabilidades: any[] = [];

    // 1. Verificar versão do PostgreSQL
    const versao = await this.databaseService.executarQuery('SELECT version() as versao');
    vulnerabilidades.push({
      tipo: 'Versão do PostgreSQL',
      descricao: versao[0]?.versao || 'Não identificada',
      severidade: 'INFO',
      risco: 'Baixa',
    });

    // 2. Verificar superusuários
    const superusuarios = await this.databaseService.executarQuery(
      'SELECT usename FROM pg_user WHERE usesuper = true',
    );
    if (superusuarios.length > 1) {
      vulnerabilidades.push({
        tipo: 'Múltiplos superusuários',
        descricao: `Encontrados ${superusuarios.length} superusuários: ${superusuarios.map((u: any) => u.usename).join(', ')}`,
        severidade: 'ALTA',
        risco: 'Alta',
        recomendacao: 'Limite o número de contas de superusuário ao mínimo necessário',
      });
    }

    // 3. Verificar usuários do sistema
    const usuarios = await this.databaseService.executarQuery('SELECT usename FROM pg_user');
    vulnerabilidades.push({
      tipo: 'Usuários do sistema',
      descricao: `Total de ${usuarios.length} usuários cadastrados`,
      severidade: 'INFO',
      risco: 'Baixa',
    });

    // 4. Verificar permissões no schema público
    const permissoes = await this.databaseService.executarQuery(`
      SELECT COUNT(*) as total 
      FROM information_schema.role_table_grants 
      WHERE table_schema = 'public' AND grantee = 'PUBLIC'
    `);
    if (parseInt(permissoes[0]?.total || '0') > 0) {
      vulnerabilidades.push({
        tipo: 'Permissões excessivas no schema público',
        descricao: `Schema público possui ${permissoes[0].total} permissões concedidas ao role PUBLIC`,
        severidade: 'ALTA',
        risco: 'Alta',
        recomendacao: 'Revogue permissões desnecessárias do role PUBLIC',
      });
    }

    // 5. Verificar extensões instaladas
    const extensoes = await this.databaseService.executarQuery('SELECT extname FROM pg_extension');
    vulnerabilidades.push({
      tipo: 'Extensões instaladas',
      descricao: `Total de ${extensoes.length} extensões: ${extensoes.map((e: any) => e.extname).join(', ')}`,
      severidade: 'INFO',
      risco: 'Baixa',
    });

    await this.databaseService.desconectar();

    // Classificar por risco
    const alta = vulnerabilidades.filter((v) => v.risco === 'Alta').length;
    const media = vulnerabilidades.filter((v) => v.risco === 'Média').length;
    const baixa = vulnerabilidades.filter((v) => v.risco === 'Baixa').length;

    const resultado = {
      id: `scan_${Date.now()}`,
      data: new Date().toISOString(),
      banco: database,
      host: host,
      vulnerabilidades,
      resumo: {
        total: vulnerabilidades.length,
        alta,
        media,
        baixa,
      },
    };

    this.resultados.push(resultado);
    return resultado;
  }

  obterResultados() {
    return this.resultados;
  }
}
