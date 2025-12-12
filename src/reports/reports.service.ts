import { Injectable } from '@nestjs/common';
import { ScannerService } from '../scanner/scanner.service';

@Injectable()
export class ReportsService {
  constructor(private scannerService: ScannerService) {}

  gerarRelatorio() {
    const resultados = this.scannerService.obterResultados();
    
    let relatorio = '=== RELATÓRIO DE SEGURANÇA ===\n\n';
    
    resultados.forEach((resultado, index) => {
      relatorio += `Varredura ${index + 1} - ${resultado.data}\n`;
      relatorio += `Vulnerabilidades encontradas: ${resultado.vulnerabilidades.length}\n\n`;
      
      resultado.vulnerabilidades.forEach((vuln: any) => {
        relatorio += `- ${vuln.tipo} [${vuln.severidade}]\n`;
        relatorio += `  ${vuln.descricao}\n\n`;
      });
    });

    return relatorio;
  }
}
