/*
  Warnings:

  - Made the column `name` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `benefits` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `composition` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `analytical` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `additional_additives` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `technological_additives` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "brand" SET NOT NULL,
ALTER COLUMN "features" SET NOT NULL,
ALTER COLUMN "benefits" SET NOT NULL,
ALTER COLUMN "composition" SET NOT NULL,
ALTER COLUMN "analytical" SET NOT NULL,
ALTER COLUMN "additional_additives" SET NOT NULL,
ALTER COLUMN "technological_additives" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL;
