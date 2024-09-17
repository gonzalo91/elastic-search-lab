import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CustomElasticsearchModule } from 'src/custom_elasticsearch/custom_elasticsearch.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [CustomElasticsearchModule]
})
export class ProductsModule {}
