import { Module } from '@nestjs/common';
import { ElasticsearchModule, } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
    imports: [
        ElasticsearchModule.register({
          node: 'http://localhost:9200',  // Elasticsearch URL        
        }),
    ],    
    providers: [SearchService],
    exports: [SearchService],
})
export class CustomElasticsearchModule {}
