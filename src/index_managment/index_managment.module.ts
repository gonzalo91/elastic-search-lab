import { Module } from '@nestjs/common';
import { IndexManagmentService } from './index_managment.service';
import { IndexManagmentController } from './index_managment.controller';
import { CustomElasticsearchModule } from 'src/custom_elasticsearch/custom_elasticsearch.module';

@Module({
  providers: [IndexManagmentService],
  controllers: [IndexManagmentController], 
  imports: [CustomElasticsearchModule] 
})
export class IndexManagmentModule {}
