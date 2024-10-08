export interface ElasticSearchResponse<T> {
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: number;
        hits: {
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: T;
        }[];
    };
}

export interface ESSingleResponse<T> {
    _index: string;    
    _id: string;
    _version: number;
    _seq_no: number;
    _primary_term: number;
    found: boolean;
    _source: T;
}