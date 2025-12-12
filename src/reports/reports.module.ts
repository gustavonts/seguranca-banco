import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ScannerModule } from '../scanner/scanner.module';

@Module({
  imports: [ScannerModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
