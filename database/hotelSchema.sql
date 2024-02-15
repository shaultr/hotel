-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `booking_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `bookings_ibfk_1` (`customer_id`),
  KEY `bookings_ibfk_2` (`room_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,2,'2024-02-01','2024-02-02',5000.00,'1'),(22,2,1,'2024-02-05','2024-02-06',1999.00,'1'),(23,3,1,'2024-02-05','2024-02-06',1999.00,'1'),(24,4,1,'2024-02-07','2024-02-08',2299.00,'1'),(25,5,1,'2024-02-07','2024-02-08',2299.00,'1'),(26,6,1,'2024-02-07','2024-02-08',2299.00,'1'),(27,7,1,'2024-02-07','2024-02-08',2299.00,'1'),(28,8,5,'2024-02-12','2024-02-13',2500.00,'1'),(29,9,5,'2024-02-12','2024-02-13',2500.00,'1'),(30,10,1,'2024-02-13','2024-02-14',1999.00,'1'),(31,11,1,'2024-02-13','2024-02-14',1999.00,'1'),(32,12,3,'2024-03-02','2024-04-13',83958.00,'1'),(33,13,3,'2024-02-13','2024-02-14',1999.00,'1'),(34,14,6,'2024-02-14','2024-02-15',1500.00,'1');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `credit_card_number` varchar(20) DEFAULT NULL,
  `is_admin` tinyint DEFAULT '0',
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'emanuelTiran','0549631916','et@39','toledeno12','12345678980',0,NULL),(2,'eli','055-5632474','df@123','tolo20',NULL,1,NULL),(3,'fdf','fdfdd','dffdfd',NULL,NULL,0,NULL),(4,'',NULL,'',NULL,NULL,0,NULL),(5,'',NULL,'',NULL,NULL,0,NULL),(6,'',NULL,'',NULL,NULL,0,NULL),(7,'',NULL,'',NULL,NULL,0,NULL),(8,'ככ','ככ','ככ',NULL,NULL,0,NULL),(9,'ככ','ככ','ככ',NULL,NULL,0,NULL),(10,'fd','fdf','fdfd',NULL,NULL,0,NULL),(11,'fd','fdf','fdfd',NULL,NULL,0,NULL),(12,'fd','fd','fd',NULL,NULL,0,NULL),(13,'bf','fbbf','bfb',NULL,NULL,0,NULL),(14,'fd','fd','fd',NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (33,'./images/1a.jpg'),(34,'./images/1b.jpg'),(35,'./images/1c.jpg'),(36,'./images/2a.jpg'),(37,'./images/2b.jpg'),(38,'./images/2c.jpg'),(39,'./images/3a.jpg'),(40,'./images/3b.jpg'),(41,'./images/3c.jpg'),(42,'./images/4a.jpg'),(43,'./images/4b.jpg'),(44,'./images/4c.jpg'),(45,'./images/5a.jpg'),(46,'./images/5b.jpg'),(47,'./images/5c.jpg'),(48,'./images/6a.jpg'),(49,'./images/6b.jpg'),(50,'./images/6c.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_images`
--

DROP TABLE IF EXISTS `room_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_images` (
  `room_id` int NOT NULL,
  `image_id` int NOT NULL,
  PRIMARY KEY (`room_id`,`image_id`),
  KEY `room_images_ibfk_2` (`image_id`),
  CONSTRAINT `room_images_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `room_images_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_images`
--

LOCK TABLES `room_images` WRITE;
/*!40000 ALTER TABLE `room_images` DISABLE KEYS */;
INSERT INTO `room_images` VALUES (1,33),(1,34),(1,35),(2,36),(2,37),(2,38),(3,39),(3,40),(3,41),(4,42),(4,43),(4,44),(5,45),(5,46),(5,47),(6,48),(6,49),(6,50);
/*!40000 ALTER TABLE `room_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_type` varchar(50) DEFAULT NULL,
  `num_beds` int DEFAULT NULL,
  `price_per_night` decimal(10,2) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'standert',2,1999.00,1),(2,'deluxe',5,2999.00,1),(3,'standert',2,1999.00,1),(4,'suite',4,3590.00,1),(5,'suite',3,2200.00,1),(6,'standard',2,1500.00,1);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 13:01:00
