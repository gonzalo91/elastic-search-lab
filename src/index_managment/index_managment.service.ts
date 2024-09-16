import { Injectable } from '@nestjs/common';
import { INDICES } from 'src/custom_elasticsearch/constants';
import { SearchService } from 'src/custom_elasticsearch/search.service';
import { Product } from 'src/shared/entities/product.entity';

@Injectable()
export class IndexManagmentService {
    
    constructor(private readonly searchService: SearchService) {}

    async createProductIndex(): Promise<void> {
        const indexExists = await this.searchService.search.indices.exists({ index: INDICES.PRODUCT_INDEX });

        if (!indexExists) {
          await this.searchService.search.indices.create({
            index: INDICES.PRODUCT_INDEX,
            body: {
              mappings: {
                properties: {
                  id: { type: 'keyword' },
                  name: { type: 'text' },
                  description: { type: 'text' },
                  price: { type: 'double' },
                  category: { type: 'keyword' },
                  brand: { type: 'keyword' },
                  stock: { type: 'integer' },
                  ratings: { type: 'float' },
                  tags: { type: 'keyword' },
                  createdAt: { type: 'date' },
                  updatedAt: { type: 'date' },
                  available: { type: 'boolean' },
                  reviews: {
                    type: 'nested',
                    properties: {
                      username: { type: 'keyword' },
                      rating: { type: 'integer' },
                      comment: { type: 'text' },
                      date: { type: 'date' },
                    },
                  },
                },
              },
            },
          });
          console.log('Product index created!');
        } else {
          console.log('Product index already exists!');
        }
    }

    async getProductCount(): Promise<number> {
        const body = await this.searchService.search.count({
          index: INDICES.PRODUCT_INDEX,
        });
    
        return body.count;
    }

    async bulkIndexProducts() {
        // Get the current number of documents in the 'products' index
        const currentCount = await this.getProductCount();
    
        const bulkOperations : any[] = [];
        const products = this.generateProductData(10000, currentCount);
        products.forEach((product, index) => {
          const id = currentCount + index + 1;  
          bulkOperations.push(
            { index: { _index: INDICES.PRODUCT_INDEX,  } }, 
            product  // Actual product data to be indexed
          );
        });
    
        const body  = await this.searchService.search.bulk({
          refresh: true,  // Refresh the index after the operation
          body: bulkOperations,
        });
    
        // Check for errors in the bulk response
        if (body.errors) {
          const errorDetails = body.items
            .map((item: any) => item.index?.error)
            .filter(Boolean);
          console.error('Bulk indexing errors:', errorDetails);
          throw new Error('Failed to index some products');
        }
    
        console.log(`Successfully indexed ${products.length} products`);
        return body;
    }

    private generateProductData(count: number, initialCount: number): Product[] {
        const products : Product[] = [];
        
        for (let i = 1; i <= count; i++) {
          products.push({
            id: `${initialCount + i}`,
            name: `Product ${initialCount + i}`,
            description: `This is the description for product ${initialCount + i}`,
            price: Math.floor(Math.random() * 1000),
            category: `Category ${i % 10}`,
            brand: `Brand ${i % 5}`,
            stock: Math.floor(Math.random() * 500),
            ratings: Number((Math.random() * 5).toFixed(2)),
            tags: [`tag${i}`, `tag${i % 10}`],
            createdAt: new Date(),
            updatedAt: new Date(),
            available: true,
            reviews: [
              {
                username: `user${i}`,
                rating: Math.floor(Math.random() * 5) + 1,
                comment: `This is a review for product ${initialCount + i}`,
                date: new Date(),
              },
            ],
          });
        }
      
        return products;
      }

}
