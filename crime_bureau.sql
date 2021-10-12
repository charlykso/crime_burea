-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2021 at 06:40 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crime_bureau`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_table`
--

CREATE TABLE `admin_table` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_table`
--

INSERT INTO `admin_table` (`admin_id`, `username`, `password`) VALUES
(1, 'josephinejosh', 'jojojo'),
(2, 'ikenna', '$2y$10$IwfIp7IRUcPrWt7aFTrRYeX5EL5XRkfHVU4ITzO03gsii.n1Vcf/i'),
(3, 'marvelous', '$2y$10$fRvG3bE5cb7ymN9eU1sFAurfPjl1KrWXseOK4T3a9MLgiP8.xl3W6');

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `complaint_id` int(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `contact_address` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `main_complaint` varchar(200) NOT NULL,
  `station` varchar(50) NOT NULL,
  `track_id` varchar(20) NOT NULL,
  `local_govt` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `notification` int(2) NOT NULL DEFAULT '0',
  `complaint_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`complaint_id`, `first_name`, `last_name`, `gender`, `contact_address`, `phone_number`, `main_complaint`, `station`, `track_id`, `local_govt`, `status`, `notification`, `complaint_time`) VALUES
(36, 'awah ', 'chisom', 'male', '22 ehi road', '0705182664', 'mr chinedu has been kidnap ', 'Aba South', 'CS17480', 'Ariaria Police Division', 'pending', 0, '2021-03-23 22:51:05'),
(37, 'chinanu', 'josiah', 'male', '137 etche road', '081702624081', 'mr billy has been murdered', 'Aba South', 'CS10757', 'Eastern Ngwa Police Division', 'pending', 0, '2021-03-23 22:51:05'),
(38, 'Ikenna', 'Remigius', 'male', '148 tenant road', '08726612585', 'a lady named Mrs Joy got raped by a man name Joshua  ', 'Aba South', 'CS11016', 'Ndiegoro Police Division', 'pending', 0, '2021-03-23 22:51:05'),
(39, 'osuah', 'harrison', 'female', '78 portharcourt road', '0922029975', 'lkalkflioielkjlfka;ieljl', 'Aba North', 'CS12851', 'Ohuru Isimiri Police Division', 'pending', 0, '2021-03-23 22:51:05'),
(40, 'samuel', 'ezeh', 'male', '78 kjlkdkfik', '080968752362', '[]', 'Aba North', 'CS14588', 'Ohanze Police Division', 'pending', 0, '2021-03-23 22:51:05'),
(41, 'divine', 'chisom', 'female', '85 tenant road', '09087563272', 'there is a fight going on between two guys', 'Aba South', 'CS11171', 'Obelirie Police Division', 'pending', 0, '2021-03-23 22:51:05'),
(42, 'joy', 'solomon', 'female', '85 dike streeet', '070666823141', 'dkjkflgkldkjflgkslkjfgkldkjglk', 'Aba South', 'CS10770', 'Umuobiakwa Police Division', 'pending', 0, '2021-03-23 22:51:05'),
(43, 'Vincent', 'Orji', 'male', 'Aba Ngwa', '08170624081', 'Yahoo boys', 'Aba Central Police Division', 'CS17153', 'Aba North', 'pending', 1, '2021-03-24 00:20:14'),
(44, 'Ikenna', 'eze', 'male', 'Ai', '07065262343', 'kidnapers are here', 'Aba Central Police Division', 'CS11368', 'Aba North', 'active', 1, '2021-03-28 17:27:11'),
(45, 'marvellous', 'Awah', 'female', 'Aba Ngwa', '08170624081', 'kidnaping', 'Aba Central Police Division', 'CS15077', 'Aba North', 'pending', 1, '2021-03-30 12:55:59'),
(46, 'Righteousness', 'Osuah', 'male', '78 portharcourt road', '07062682820', 'they are robbing a bank', 'Aba Central Police Division', 'CS10878', 'Aba North', 'active', 1, '2021-03-30 12:55:34'),
(47, 'Goodnews', 'Etim', 'male', '46 etche road', '07062682820', 'they are robbing a bank', 'Aba Central Police Division', 'CS12282', 'Aba North', 'solved', 1, '2021-03-30 12:54:06'),
(48, 'josephine', 'chidera', 'male', '135 etche road', '08170624081', 'Ike just killed someone this evening', 'Abayi Police Division', 'CS19707', 'Aba North', 'pending', 0, '2021-04-23 15:04:33'),
(49, 'josephine ', 'awah', 'female', '136 etche road', '08170624081', 'an armed robber attacked a warehouse', 'Ariaria Police Division', 'CS13638', 'Aba North', 'pending', 0, '2021-05-04 05:25:27'),
(50, 'josephine', 'chidera', 'female', '136 etche road', '08170624081', 'they are robbing a bank', 'Aba Central Police Division', 'CS15742', 'Aba South', 'pending', 0, '2021-05-04 07:57:18');

-- --------------------------------------------------------

--
-- Table structure for table `crimes`
--

CREATE TABLE `crimes` (
  `crime_id` int(50) NOT NULL,
  `crime_type` varchar(50) NOT NULL,
  `crime date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `crime_location` varchar(100) NOT NULL,
  `complaint_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crimes`
--

INSERT INTO `crimes` (`crime_id`, `crime_type`, `crime date`, `crime_location`, `complaint_id`) VALUES
(35, 'Child_abuse', '2021-03-23 11:38:58', '87 EHI ROAD', 35),
(36, 'Kidnap', '2021-03-23 11:40:33', 'azikiwe road', 36),
(37, 'Murder', '2021-03-23 11:42:09', '45 clifford road', 37),
(38, 'Rape', '2021-03-23 11:49:40', '56 tenant road by east', 38),
(39, 'Arson', '2021-03-23 11:51:25', 'ehi nroad by asa', 39),
(41, 'Fraud', '2021-03-23 11:54:32', '56 ehi road', 41),
(43, 'Fraud', '2021-03-23 20:25:02', 'eche road', 43),
(44, 'Kidnap', '2021-03-28 17:22:55', 'Aba', 44),
(45, 'Rape', '2021-03-28 18:18:50', 'Ai', 45),
(46, 'Kidnap', '2021-03-28 18:22:21', 'AI', 46),
(47, 'Robbery', '2021-03-28 18:28:34', 'Aba', 47),
(48, 'Kidnap', '2021-03-28 18:38:43', 'Aba', 48),
(49, 'Kidnap', '2021-03-28 19:54:16', 'Ngwa road', 45),
(50, 'Robbery', '2021-03-30 11:26:52', 'azikiwe road', 46),
(51, 'Robbery', '2021-03-30 12:48:00', 'azikiwe road', 47),
(52, 'Arson', '2021-04-23 15:04:34', '125 etche road', 48),
(53, 'Buglary', '2021-05-04 05:25:28', '14 azikiwe', 49),
(54, 'Buglary', '2021-05-04 07:57:18', 'azikiwe road', 50);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `complaint_id` int(11) NOT NULL,
  `longitude` float(10,6) NOT NULL,
  `latitude` float(10,6) NOT NULL,
  `crime_type` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `complaint_id`, `longitude`, `latitude`, `crime_type`) VALUES
(1, 48, 9.081999, 9.081999, 'Arson'),
(2, 49, 8.675277, 9.081999, 'Buglary'),
(3, 50, 8.675277, 9.081999, 'Buglary');

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `station_id` int(50) NOT NULL,
  `station_name` varchar(100) NOT NULL,
  `station_address` varchar(100) NOT NULL,
  `station_email` varchar(50) NOT NULL,
  `station_number` varchar(11) NOT NULL,
  `station_password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`station_id`, `station_name`, `station_address`, `station_email`, `station_number`, `station_password`) VALUES
(14, 'Abayi Police Division', '44 ABAYI STREET', 'abayipolice@gmail.com', '07062408112', '$2y$10$azME4JIog6DCOto.eezl5uKbwLpD2Nce8auWGhb5ZRhmwRKFW1yh2'),
(15, 'Ariaria Police Division', 'ARIARIA', 'ariariapolice@gmail.com', '08170624081', '$2y$10$K64hSUITJZqpyu2WcBSfH.HNoCqBmUj4dKjqL32KDiXe0hfQYMrcy'),
(16, 'Azuka Police Division', '56 AZUKA ', 'azukapolice@gmail.com', '07057228462', '$2y$10$I50yt.toByGyHS7KWYyQM.pQVdbKbTQ.Oar.l9la/wscgZKD2Nv6q'),
(17, 'Eastern Ngwa Police Division', 'Clifford Road by East', 'easternpolice@gmail.com', '09020299775', '$2y$10$PlWGK03XmJphhAIlc/QLteqdJVNtluIOGqozhv8d6z.JB/fVfF4LW'),
(18, 'Ndiegoro Police Division', 'Ndiegoro Street off Obikabia', 'ndiegoro@gmail.com', '07047229758', '$2y$10$bxZf9K9ReBYEPPBm8rJkKuvE/ntBtpzMBiS.qXlBKF/hhU.ouQQ3C'),
(19, 'Ohuru Isimiri Police Division', '45B OBOHIA ', 'ohurupolice@gmail.com', '08106611823', '$2y$10$0GalTZSv2FFZ9Rjr7TUEGeZvEjdAqLNgFInoEdihNYg5KEwB/wGdS'),
(20, 'Ohanze Police Division', '222 Ohanku street', 'ohanzepolice@gmail.com', '08057195858', '$2y$10$4nUtpdiwWjSykxYa3BUQ6.lxODkNV.Uo469tuKd/NoHqV/c26fJg2'),
(21, 'Obelirie Police Division', '345 Obelirie ', 'obeliriepolice@gmail.com', '08122456789', '$2y$10$NMrmJeovWiTcJd8LsfKHeuRC4evwBCobueEeoMDLJvIiPlT2YTLjO'),
(22, 'Umuobiakwa Police Division', '34 Umuobiakwa ', 'umuobiakwapolice@gmail.com', '08170624051', '$2y$10$xKOW.gl/a5OYEytx8NZT3.fjrFrbKurnucUHGPHsxD5Ss7G/ORa/6'),
(23, 'Aba Central Police Division', 'AZIKIWE ROAD', 'abacentral@gmail.com', '07066116460', '$2y$10$faPFlOkyQCca25q19aw5/OSXHjyrTJtDvqsTKKoLrXxYscbAtv9Su');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_table`
--
ALTER TABLE `admin_table`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`complaint_id`);

--
-- Indexes for table `crimes`
--
ALTER TABLE `crimes`
  ADD PRIMARY KEY (`crime_id`),
  ADD KEY `complaint_id` (`complaint_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`station_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_table`
--
ALTER TABLE `admin_table`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `complaint_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `crimes`
--
ALTER TABLE `crimes`
  MODIFY `crime_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `station_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `crimes`
--
ALTER TABLE `crimes`
  ADD CONSTRAINT `crimes_ibfk_1` FOREIGN KEY (`complaint_id`) REFERENCES `crimes` (`crime_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
