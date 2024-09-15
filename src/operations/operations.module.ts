import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { CustomElasticsearchModule } from 'src/custom_elasticsearch/custom_elasticsearch.module';

@Module({
    controllers: [OperationsController],
    providers: [OperationsService],
    
})
export class OperationsModule {}
