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
}
