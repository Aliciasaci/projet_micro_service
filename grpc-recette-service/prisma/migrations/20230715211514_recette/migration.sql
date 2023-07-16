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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
