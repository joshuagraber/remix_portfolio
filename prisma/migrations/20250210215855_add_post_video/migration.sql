-- CreateTable
CREATE TABLE "PostVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT,
    "title" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
