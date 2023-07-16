-- CreateTable
CREATE TABLE `Livre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `auteur` VARCHAR(191) NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recette` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `ingredients` VARCHAR(191) NULL,
    `instructions` VARCHAR(191) NULL,
    `tempsPreparation` INTEGER NULL,
    `tempsCuisson` INTEGER NULL,
    `categorie` VARCHAR(191) NULL,
    `livreId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recette` ADD CONSTRAINT `Recette_livreId_fkey` FOREIGN KEY (`livreId`) REFERENCES `Livre`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
