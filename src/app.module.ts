import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScannerService } from './scanner/scanner.service';
import { ScannerModule } from './scanner/scanner.module';
import { DatabaseModule } from './database/database.module';
import { ReportsModule } from './reports/reports.module';
import { DatabaseNoSpecService } from './database--no-spec/database--no-spec.service';

@Module({
  imports: [ScannerModule, DatabaseModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, ScannerService, DatabaseNoSpecService],
})
export class AppModule {}
