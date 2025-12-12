import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ScannerService {
  private resultados: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  async escanear(host: string, port: number, database: string, user: string, password: string) {
    await this.databaseService.conectar(host, port, database, user, password);

    const vulnerabilidades = [];

    // Verificar usuários
    const usuarios = await this.databaseService.executarQuery('SELECT usename FROM pg_user');
    vulnerabilidades.push({
      tipo: 'Usuários do sistema',
      descricao: `Encontrados ${usuarios.length} usuários`,
      severidade: 'INFO',
    });

    // Verificar superusuários
    const superusuarios = await this.databaseService.executarQuery(
      'SELECT usename FROM pg_user WHERE usesuper = true',
    );
    if (superusuarios.length > 1) {
      vulnerabilidades.push({
        tipo: 'Múltiplos superusuários',
        descricao: `Encontrados ${superusuarios.length} superusuários`,
        severidade: 'ALTA',
      });
    }

    // Verificar extensões
    const extensoes = await this.databaseService.executarQuery('SELECT extname FROM pg_extension');
    vulnerabilidades.push({
      tipo: 'Extensões instaladas',
      descricao: `Encontradas ${extensoes.length} extensões`,
      severidade: 'INFO',
    });

    await this.databaseService.desconectar();

    const resultado = {
      data: new Date().toISOString(),
      vulnerabilidades,
    };

    this.resultados.push(resultado);
    return resultado;
  }

  obterResultados() {
    return this.resultados;
  }
}
