import { Controller, Get, Param, Res, Header } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  obterRelatorio() {
    return {
      relatorio: this.reportsService.gerarRelatorio(),
    };
  }

  @Get('texto')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  obterRelatorioTexto(@Res() res: Response) {
    const relatorio = this.reportsService.gerarRelatorio();
    res.send(relatorio);
  }

  @Get('json')
  obterRelatorioJson() {
    return this.reportsService.gerarRelatorioJson();
  }

  @Get(':scanId')
  obterRelatorioPorId(@Param('scanId') scanId: string) {
    return this.reportsService.gerarRelatorioPorId(scanId);
  }
}
