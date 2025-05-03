CREATE TABLE "ProductSize" (
	"productId" uuid NOT NULL,
	"sizeId" uuid NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "ProductSize_productId_sizeId_pk" PRIMARY KEY("productId","sizeId")
);
--> statement-breakpoint
CREATE TABLE "Size" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "Size_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "Product" RENAME COLUMN "name" TO "productName";--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "brand" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_sizeId_Size_id_fk" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE cascade ON UPDATE cascade;