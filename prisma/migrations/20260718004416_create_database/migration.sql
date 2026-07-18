-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "tb_users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_roles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_transactions" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "type_transaction" "TransactionType" NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_roles_name_key" ON "tb_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_categories_name_key" ON "tb_categories"("name");

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tb_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transactions" ADD CONSTRAINT "tb_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transactions" ADD CONSTRAINT "tb_transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tb_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
