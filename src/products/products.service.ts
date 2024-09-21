import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchService } from 'src/custom_elasticsearch/search.service';
import { INDICES } from 'src/custom_elasticsearch/constants';
import { AddReviewDto } from './dto/add-review.dto';
import { error } from 'console';

import { ESSingleResponse } from 'src/custom_elasticsearch/dto/elastic_search_response.dto';
import { GetResponse } from '@elastic/elasticsearch/lib/api/types';
import { Product } from 'src/shared/entities/product.entity';

@Injectable()
export class ProductsService {
  
  constructor(private readonly searchService: SearchService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.searchService.search.index({
      index: INDICES.PRODUCT_INDEX,
      document: {
        ...createProductDto,
        createdAt: new Date().toISOString(),          
        updatedAt: new Date().toISOString(),     
      },
    });
  }

  async findAll() {
    return await this.searchService.search.search({
      index: INDICES.PRODUCT_INDEX,
      size: 100,      
      from: Math.floor(Math.random() * 1001)
    });
  }

  async findOne(id: string) : Promise<GetResponse<Product>> {
    return await this.searchService.search.get({
      index: INDICES.PRODUCT_INDEX,
      id: id
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.searchService.search.update({
      index: INDICES.PRODUCT_INDEX,
      id: id,
      doc: {
        ...updateProductDto,
        updatedAt: new Date().toISOString(),     
      }
    });
  }

  async addReview(id: string, addReview: AddReviewDto) {

    const product = await this.findOne(id);

    if (!product._source) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Product not found',
      },  HttpStatus.NOT_FOUND)
    }

    let reviews = product._source.reviews || [];

    let ratings = product._source.ratings || 0;

    ratings = (ratings + addReview.rating) / (reviews.length + 1);
    let newReview = {
      ...addReview,
      date: new Date()
    }

    //ctx._source.ratings = ctx._source.ratings + params.newReview.rating / ctx._source.reviews.length + 1;

    return await this.searchService.search.update({
      index: INDICES.PRODUCT_INDEX,
      id: id,      
      script:{
        source: 'if (ctx._source.reviews == null) { ctx._source.reviews = new ArrayList(); } ctx._source.reviews.add(params.newReview); ctx._source.ratings = (ctx._source.ratings + params.newReview.rating ) / (ctx._source.reviews.length + 1)',
        lang: 'painless',
        params: {
          newReview,          
        }
      }
    });
  }

  async remove(id: string) {
    return await this.searchService.search.delete({
      index: INDICES.PRODUCT_INDEX,
      id: id
    });
  }
}
