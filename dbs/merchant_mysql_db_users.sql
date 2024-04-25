CREATE DATABASE  IF NOT EXISTS `merchant_mysql_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `merchant_mysql_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: merchant_mysql_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(450) NOT NULL,
  `email` varchar(450) NOT NULL,
  `password` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'amar','amar@amar.com','$2b$10$l.e86Ku.kWrR57S8hvtSHe16EvHaI8oCrXc/.XfEYHqcFnaeh8UbO','2024-04-21 21:10:46','2024-04-21 21:10:46'),(3,'amar','amar1@amar.com','$2b$10$ndsvo4Ez2G0wXaMHTMm8A.3QW5yZy7aaCZHuD7b8Db9z2l2523BrS','2024-04-21 21:25:00','2024-04-21 21:25:00'),(5,'amar','amar2@amar.com','$2b$10$Jssn/NGtiVF0HLpvP3bHBep1xqNHoia1h9vVQDmMg6KUkcmdb/e1.','2024-04-21 21:33:49','2024-04-21 21:33:49'),(6,'amar','amar3@amar.com','$2b$10$7MmjafbTtZyHEeLjJEM.KOrymeCLmC5HjHQghHty7W6KJo.CX1ApS','2024-04-21 21:34:05','2024-04-21 21:34:05'),(10,'amar4','amar4@amar.com','$2b$10$HfapqCc6RlfEUdUgTjpJXO8Yn1D91zMyAU8jA2kHXShJozuZNlaEC','2024-04-22 09:41:44','2024-04-22 09:41:44'),(11,'amar5','amar5@amar.com','$2b$10$NuJJXKvGU7Ragks/62/XS.oDotnnnG5/mAUsIBCadBwRBGqvFKRta','2024-04-22 09:43:47','2024-04-22 09:43:47'),(12,'amar6','amar6@amar.com','$2b$10$0XNjXFhE8OU1.tHHxCAKfuBkKmrNrD2KcNqSEHTU6fKa6iDSoUPYS','2024-04-22 09:51:22','2024-04-22 09:51:22'),(13,'Amar7','amar7@amar.com','$2b$10$LIf5Xmu8.v2H34y8qTjG3OwvgmMKZdMm9cILAErO2FzhKW8LVjmDC','2024-04-24 09:07:28','2024-04-24 09:07:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-25 18:21:13
