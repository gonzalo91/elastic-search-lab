export interface Product {
    id: string;               // Unique identifier for the product
    name: string;             // Name of the product
    description: string;      // Detailed description for full-text search
    price: number;            // Numeric field for price, useful for range queries
    category: string;         // Category for filtering (e.g., Electronics, Clothing)
    brand: string;            // Brand for filtering (e.g., Apple, Nike)
    stock: number;            // Available stock, useful for inventory tracking
    ratings: number;          // Average customer ratings (can be used for sorting or filtering)
    tags: string[];           // Array of tags for search and filtering (e.g., ['smartphone', 'android'])
    createdAt: Date;          // Date when the product was added, for sorting or time-based queries
    updatedAt: Date;          // Date of last update
    available: boolean;       // Availability status (useful for filtering)
    
    reviews?: Review[];       // Array of reviews (useful for nested document queries)
}

export interface Review {
    username: string;
    rating: number;
    comment: string;
    date: Date;
}