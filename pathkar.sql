-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2024 at 06:03 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pathkar`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `AppointmentID` int(225) NOT NULL,
  `userID` int(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `customerID` int(255) NOT NULL,
  `times` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `dates` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`AppointmentID`, `userID`, `service`, `customerID`, `times`, `dates`) VALUES
(4, 4, '', 4, '2024-03-13 12:00:38.000000', '0000-00-00'),
(8, 7, '', 7, '2024-03-13 12:49:59.000000', '0000-00-00'),
(11, 3, '', 3, '2024-03-13 12:57:04.000000', '0000-00-00'),
(12, 4, '', 4, '2024-03-13 12:57:05.000000', '0000-00-00'),
(19, 4, '', 4, '2024-03-13 13:17:31.000000', '0000-00-00'),
(22, 2, '', 4, '2024-03-13 13:25:04.000000', '0000-00-00'),
(39, 3, 'Painter', 2, '2024-03-13 14:18:20.000000', '13-3-2024'),
(41, 5, 'AI', 2, '2024-03-13 15:12:49.000000', '13-3-2024');

-- --------------------------------------------------------

--
-- Table structure for table `consumers`
--

CREATE TABLE `consumers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('consumer','service-provider') NOT NULL DEFAULT 'consumer',
  `needs_service` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `consumers`
--

INSERT INTO `consumers` (`id`, `first_name`, `email`, `password`, `role`, `needs_service`, `created_at`) VALUES
(1, 'Ayush Nath', 'Ayush@gmail.com', '123456', 'consumer', 'Internet', '2024-03-11 12:18:18'),
(2, 'Surya Sk', 'suryasundarkalidas@gmail.com', '1234567', 'consumer', 'Drawing Artist', '2024-03-12 08:44:54'),
(8, 'Kalia', 'tidymak@mailinator.com', 'Pa$$w0rd!', 'consumer', 'Drawing Artist', '2024-03-12 13:21:40'),
(9, 'Halla', 'nagygi@mailinator.com', 'Pa$$w0rd!', 'consumer', 'Driver', '2024-03-12 13:22:25'),
(10, 'Surya Sk5', 'suryasundarkalidas7@gmail.com', '12345', 'consumer', 'Doctor', '2024-03-12 16:02:09'),
(11, 'EDVIN', 'edvin@gmail.com', 'edvin', 'consumer', 'science', '2024-03-13 15:14:47'),
(12, 'Test', 'Test@gmail.com', 'test', 'consumer', 'Plumber', '2024-03-13 16:40:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('consumer','service-provider') NOT NULL,
  `needs_service` varchar(255) DEFAULT NULL,
  `services_offered` varchar(255) DEFAULT NULL,
  `locations` varchar(255) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `email`, `password`, `role`, `needs_service`, `services_offered`, `locations`, `price`, `company_name`, `experience`) VALUES
(1, 'TEST@123', 'test@vstube.in', '123456', 'service-provider', '', 'Internet', 'Madh', '500', 'Akcyberscan', 10),
(2, 'SSK', 'ssk@gmail.com', '123456', 'service-provider', '', 'Drawing', 'Mumbai', '1000', 'New Digital Draw', 3),
(3, 'VVK', 'vvk@123.com', '123123', 'service-provider', '', 'Painter', 'Pune', '5000', 'Indian painter', 15),
(4, 'Kalia', 'kalia@123.coms', '123', 'service-provider', '', 'Hardware Engg', 'Chennai', '2000', 'DITI Tech', 10),
(5, 'NIE', 'NIE@gmail.com', 'NIE', 'service-provider', '', 'AI', 'Tamil Nadu', '10000', 'NIE', 12),
(6, 'SUNBEAN', 'sun@gmail.com', 'sun', 'service-provider', '', 'General Science', 'Bangalore', '9999', 'BigTECH', 7),
(7, 'testServer', 'testServer@gmail.com', 'testServer', 'service-provider', '', 'Digital Marketing', 'Kochin', '2000', 'new Digital Market', 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`AppointmentID`);

--
-- Indexes for table `consumers`
--
ALTER TABLE `consumers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `AppointmentID` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `consumers`
--
ALTER TABLE `consumers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
