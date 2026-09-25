import { Product } from '#app/product/domain/entities/product.entity';

export const PRODUCT_REPOSITORY = Symbol("PRODUCT_REPOSITORY");

export interface ProductFilters {
  isActive: boolean;
  minPrice: number;
  maxPrice: number;
}

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: Product): Promise<Product | null>;
  findAll(filters: ProductFilters): Promise<Product[]>;
}
