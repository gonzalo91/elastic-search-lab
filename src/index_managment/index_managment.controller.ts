import { Controller, Get } from '@nestjs/common';
import { IndexManagmentService } from './index_managment.service';

@Controller('index-managment')
export class IndexManagmentController {

    constructor(private indexManagementService: IndexManagmentService) {}

    @Get()
    async createProductIndex(): Promise<void> {
        await this.indexManagementService.createProductIndex();
    }

    @Get('bulk-products')
    async bulkProducts(): Promise<void> {
        for(let i = 0; i < 100; i++) {
            await this.indexManagementService.bulkIndexProducts();
        }
        return;
    }

}
