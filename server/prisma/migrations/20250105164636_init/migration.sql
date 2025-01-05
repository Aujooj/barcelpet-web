-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL,
    "name" TEXT,
    "type" TEXT,
    "image" TEXT,
    "brand" TEXT,
    "features" TEXT,
    "benefits" TEXT,
    "composition" TEXT,
    "analytical" TEXT,
    "additional_additives" TEXT,
    "technological_additives" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
