import { Controller, Post, Get, Body } from '@nestjs/common';
import { ScannerService } from './scanner.service';

@Controller('scanner')
export class ScannerController {
  constructor(private scannerService: ScannerService) {}

  @Post('escanear')
  async escanear(@Body() dados: any) {
    return await this.scannerService.escanear(
      dados.host,
      dados.port,
      dados.database,
      dados.user,
      dados.password,
    );
  }

  @Get('resultados')
  obterResultados() {
    return this.scannerService.obterResultados();
  }
}
