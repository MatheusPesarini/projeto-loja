CREATE TABLE "Order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"price" real NOT NULL,
	"quantity" integer NOT NULL,
	"description" text,
	"image" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"vendorId" uuid
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Vendor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"companyName" text NOT NULL,
	"cnpj" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "Vendor_companyName_unique" UNIQUE("companyName"),
	CONSTRAINT "Vendor_cnpj_unique" UNIQUE("cnpj"),
	CONSTRAINT "Vendor_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_vendorId_Vendor_id_fk" FOREIGN KEY ("vendorId") REFERENCES "public"."Vendor"("id") ON DELETE set null ON UPDATE cascade;