import { Inject, Injectable } from '@nestjs/common';
import { ProductFilters, ProductRepository } from '#app/product/application/ports/product.repository.port';
import { Product } from '#app/product/domain/entities/product.entity';
import type { DrizzleDB } from '#app/infrastructure/postgres/drizzle.provider';
import { DRIZZLE } from '#app/infrastructure/postgres/drizzle.provider';
import { products } from '#app/infrastructure/postgres/schema/index';
import { ProductId } from '#app/product/domain/value-objects/product-id.vo';
import { Sku } from '#app/product/domain/value-objects/sku.vo';
import { Money } from '#app/domain/value-objects/money.vo';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {
  }

    async save(product: Product): Promise<void> {
        const row = DrizzleProductRepository.toPersistence(product);

        await this.db.insert(products).values(row).onConflictDoUpdate({
          target: products.id,
          set: {
            name: row.name,
          },
        });
    }

    findById(id: Product): Promise<Product | null> {
        throw new Error('Method not implemented.');
    }

    findAll(filters: ProductFilters): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }

    private static toPersistence(product: Product): typeof products.$inferSelect {
      return {
        id: product.id.getValue(),
        name: product.name,
        description: product.description,
        sku: product.sku.getValue(),
        priceAmount: product.price.toCents(),
        priceCurrency: product.price.getCurrency(),
        stock: product.stock,
        isActive: product.isActive,
        lowStockThreshold: product.lowStockThreshold,
        createdAt: product.createdAt,
        updatedAt: product.updateAt,
      }
    }

    private static toDomain(row: typeof products.$inferSelect): Product {
      return Product.reconstitute({
        id: new ProductId(row.id),
        name: row.name,
        description: row.description,
        sku: Sku.create(row.sku),
        price: Money.create(row.priceAmount / 100, row.priceCurrency),
        stock: row.stock,
        isActive: row.isActive,
        lowStockThreshold: row.lowStockThreshold,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      });
    }
}
