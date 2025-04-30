ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "discount" numeric(5, 2);