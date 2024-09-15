import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { SharedModule } from './shared/shared.module';
import { IndexManagmentModule } from './index_managment/index_managment.module';
import { OperationsController } from './operations/operations.controller';
import { OperationsService } from './operations/operations.service';
import { OperationsModule } from './operations/operations.module';
import { CustomElasticsearchModule } from './custom_elasticsearch/custom_elasticsearch.module';

@Module({
  imports: [CrudModule, SharedModule, IndexManagmentModule, OperationsModule,  CustomElasticsearchModule],
  controllers: [AppController, OperationsController],
  providers: [AppService, OperationsService,],
})
export class AppModule {}
