import { Controller, Get } from '@nestjs/common';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {

    constructor(
        private operationsService: OperationsService
    ) {}

    @Get('and-query')
    andQuery(){
        return this.operationsService.andQuery();
    }

    @Get('or-query')
    orQuery(){
        return this.operationsService.orQuery();
    }

    @Get('and-with-or-query')
    andWithOrQuery(){
        return this.operationsService.andWithOrQuery();
    }

    @Get('or-with-and-query')
    orWithAndQuery(){
        return this.operationsService.orWithAndQuery();
    }

    @Get('wildcard-query')
    wildcardQuery(){
        return this.operationsService.wildcardQuery();
    }

    @Get('range-query')
    rangeQuery(){
        return this.operationsService.rangeQuery();
    }

    @Get('full-text-search-query')
    fullTextSearchQuery(){
        return this.operationsService.fullTextSearchQuery();
    }

    @Get('column-exists')
    columnExists(){
        return this.operationsService.columnExists();
    }

    @Get('phrase-query')
    phraseQuery(){
        return this.operationsService.phraseQuery();
    }

    @Get('paginated-query')
    paginatedQuery(){
        return this.operationsService.paginatedQuery();
    }

    @Get('relevance-query')
    relevanceQuery(){
        return this.operationsService.relevanceQuery();
    }


    @Get('boosting-query')
    boostingQuery(){
        return this.operationsService.boostingQuery();
    }


}
