import { Injectable } from '@nestjs/common';
import { query } from 'express';
import { INDICES } from 'src/custom_elasticsearch/constants';
import { SearchService } from 'src/custom_elasticsearch/search.service';

@Injectable()
export class OperationsService {

    constructor(private searchService: SearchService) { }

    andQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                bool: {
                    must: [
                        { term: { 'brand': 'Brand 4' } },
                        { term: { 'stock': 405 } },
                        { term: { "tags": "tag4" } }, // This is an array field
                        { // Nested object query
                            nested: {
                                path: 'reviews',
                                query: {
                                    bool: {
                                        must: [
                                            { term: { 'reviews.username': 'user4' } }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        });
    }


    orQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                bool: {
                    should: [
                        { term: { 'brand': 'Brand 4', } },
                        { term: { 'stock': 405 } },
                        { term: { "tags": "tag4" } },
                    ]
                }
            }
        });
    }


    andWithOrQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                bool: {
                    must: [
                        { term: { 'brand': 'Brand 4', } },
                        { term: { 'stock': 405 } },
                    ],
                    should: [
                        { term: { "tags": "tag9524" } },
                    ]
                }
            }
        });
    }


    orWithAndQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                bool: {
                    should: [
                        { term: { 'brand': 'Brand 4', } },
                        { term: { 'price': 436 } },
                    ],
                    must: [
                        { term: { "tags": "tag9524" } },
                    ]
                }
            }
        });
    }


    wildcardQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                wildcard: { 'tags': '*phone' }
            }
        }); 
    }


    rangeQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                range: {
                    price: {
                        gte: 195,
                        lte: 200
                    }
                }
            }
        });        
    }


    fullTextSearchQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                match: {
                    description: 'for product 7670001'
                }
            }
        });
    }


    columnExists() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                exists: {
                    field: 'comment'
                }
            }
        });
    }


    phraseQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                match_phrase: {
                    description: 'for product 7670001'
                }
            }
        });
    }


    paginatedQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                match_all: {}
            },
            from: 0,
            size: 20
        });
    }

    relevanceQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                bool:{
                    should: [
                        {
                            match: {
                                description:{
                                    query: 'refurbished',
                                    boost: 2
                                }                              
                            }
                        },
                        {
                            term:{                                
                                tags: 'tag10'
                            }
                        }
                    ]
                }
            }
        });
    }

    boostingQuery() {
        return this.searchService.search.search({
            index: INDICES.PRODUCT_INDEX,
            query: {
                boosting:{
                    negative: {
                        term: {
                            brand: 'XYZ Corporation'
                        }
                    },
                    positive: {
                        term: {
                            price: 699.99
                        }
                    },
                    negative_boost: 0.5,
                }
            }
        });
    }

}
