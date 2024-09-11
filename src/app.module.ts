import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { SharedModule } from './shared/shared.module';
import { IndexManagmentModule } from './index_managment/index_managment.module';
import { OpeartionsModule } from './opeartions/opeartions.module';

@Module({
  imports: [CrudModule, SharedModule, IndexManagmentModule, OpeartionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
