import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScannerService } from './scanner/scanner.service';
import { ScannerModule } from './scanner/scanner.module';
import { DatabaseModule } from './database/database.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ScannerModule, DatabaseModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, ScannerService],
})
export class AppModule {}
