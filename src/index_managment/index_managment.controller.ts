import { Controller, Get } from '@nestjs/common';
import { IndexManagmentService } from './index_managment.service';

@Controller('index-managment')
export class IndexManagmentController {

    constructor(private indexManagementService: IndexManagmentService) {}

    @Get()
    async createProductIndex(): Promise<void> {
        await this.indexManagementService.createProductIndex();
        const iterations = 10000000 - 2000000 / 10000

        for(let i = 0; i < iterations; i++) {
            await this.indexManagementService.bulkIndexProducts();
        }
        return;
    }

}
