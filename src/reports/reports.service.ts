import { Injectable } from '@nestjs/common';
import { ScannerService } from '../scanner/scanner.service';

@Injectable()
export class ReportsService {
  constructor(private scannerService: ScannerService) {}

  gerarRelatorio() {
    const resultados = this.scannerService.obterResultados();
    
    let relatorio = '=== GUARDIANDB - RELATÓRIO DE SEGURANÇA ===\n';
    relatorio += 'Analisador de Vulnerabilidades PostgreSQL\n\n';
    
    if (resultados.length === 0) {
      return relatorio + 'Nenhuma varredura realizada ainda.\n';
    }
    
    resultados.forEach((resultado: any, index: number) => {
      relatorio += `\n--- Varredura ${index + 1} ---\n`;
      relatorio += `ID: ${resultado.id}\n`;
      relatorio += `Data: ${new Date(resultado.data).toLocaleString('pt-BR')}\n`;
      relatorio += `Banco: ${resultado.banco} (${resultado.host})\n\n`;
      
      relatorio += `RESUMO:\n`;
      relatorio += `  Total de verificações: ${resultado.resumo.total}\n`;
      relatorio += `  Risco Alta: ${resultado.resumo.alta}\n`;
      relatorio += `  Risco Média: ${resultado.resumo.media}\n`;
      relatorio += `  Risco Baixa: ${resultado.resumo.baixa}\n\n`;
      
      relatorio += `VULNERABILIDADES ENCONTRADAS:\n`;
      resultado.vulnerabilidades.forEach((vuln: any) => {
        relatorio += `\n[${vuln.risco || 'INFO'}] ${vuln.tipo}\n`;
        relatorio += `  Descrição: ${vuln.descricao}\n`;
        if (vuln.recomendacao) {
          relatorio += `  Recomendação: ${vuln.recomendacao}\n`;
        }
      });
      relatorio += '\n' + '='.repeat(50) + '\n';
    });

    return relatorio;
  }
}
