import { Controller, Get } from '@nestjs/common';

@Controller('operations')
export class OperationsController {

    @Get()
    getOperations(): string {
        return 'This action returns all operations';
    }

}
