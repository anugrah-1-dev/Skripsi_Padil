-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 22, 2026 at 07:49 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csv_db 6`
--
CREATE DATABASE IF NOT EXISTS `csv_db 6` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `csv_db 6`;

-- --------------------------------------------------------

--
-- Table structure for table `training_data`
--

CREATE TABLE `training_data` (
  `nama` varchar(33) DEFAULT NULL,
  `kelas` varchar(3) DEFAULT NULL,
  `pai` int DEFAULT NULL,
  `ppkn` int DEFAULT NULL,
  `bahasa_indonesia` int DEFAULT NULL,
  `bahasa_inggris` int DEFAULT NULL,
  `matematika_umum` int DEFAULT NULL,
  `ipa` int DEFAULT NULL,
  `ips` int DEFAULT NULL,
  `bahasa_daerah` int DEFAULT NULL,
  `pjok` int DEFAULT NULL,
  `seni` int DEFAULT NULL,
  `informatika` int DEFAULT NULL,
  `jurusan` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `training_data`
--

INSERT INTO `training_data` (`nama`, `kelas`, `pai`, `ppkn`, `bahasa_indonesia`, `bahasa_inggris`, `matematika_umum`, `ipa`, `ips`, `bahasa_daerah`, `pjok`, `seni`, `informatika`, `jurusan`) VALUES
('AHMAD ALY AULIYA RAHMAN', 'X-A', 89, 85, 83, 85, 84, 85, 85, 85, 87, 80, 84, 'Paket B'),
('ANDRE PRASTYO WIRA KUSUMA', 'X-A', 87, 84, 85, 83, 83, 84, 85, 83, 87, 85, 84, 'Paket C'),
('ANNISA DWI PUSPITASARI', 'X-A', 88, 86, 84, 83, 83, 85, 85, 85, 87, 80, 84, 'Paket G'),
('ARDI PUTRA RAMADHAN', 'X-A', 87, 87, 86, 85, 84, 88, 85, 85, 87, 80, 86, 'Paket A'),
('AVEL BUNGA AZ-ZAHRA SYARIFA BAGYO', 'X-A', 89, 86, 85, 85, 88, 86, 89, 83, 88, 80, 88, 'Paket E'),
('AVRIZALE WIRA AERA', 'X-A', 87, 83, 83, 83, 83, 84, 84, 85, 87, 80, 83, 'Paket G'),
('AYUB DIAN AGUSTIN', 'X-A', 89, 85, 85, 84, 89, 87, 86, 83, 87, 80, 85, 'Paket B'),
('DELLA LIANA MASRIFAH', 'X-A', 86, 86, 82, 85, 83, 85, 86, 85, 87, 80, 84, 'Paket C'),
('FAIRUZ HAZNA\' ROFIFAH', 'X-A', 89, 87, 84, 85, 83, 85, 85, 83, 87, 80, 85, 'Paket A'),
('FIRDA KHILYATUS SHOLIKHAH', 'X-A', 86, 87, 85, 84, 85, 86, 88, 83, 87, 90, 84, 'Paket A'),
('FREDIKA ARIANTO', 'X-A', 88, 84, 83, 83, 90, 86, 86, 85, 87, 80, 84, 'Paket C'),
('HANUM SAL SABILA', 'X-A', 89, 87, 84, 84, 83, 85, 86, 83, 88, 85, 83, 'Paket E'),
('HASAN PUTRA KURNIAWAN', 'X-A', 89, 84, 84, 83, 84, 85, 85, 83, 86, 90, 84, 'Paket G'),
('HEAVENSENT PAULOUIS ZAITUN', 'X-A', 87, 83, 85, 85, 84, 84, 87, 83, 88, 80, 83, 'Paket C'),
('IMMA FAUZIYAH', 'X-A', 87, 86, 84, 84, 84, 86, 86, 83, 88, 80, 82, 'Paket B'),
('LABIBA ELVARETTA NURCAHYA PUTRI', 'X-A', 88, 83, 85, 84, 84, 85, 86, 83, 87, 80, 84, 'Paket B'),
('LILIS SETYOWATI', 'X-A', 87, 87, 84, 85, 83, 85, 86, 83, 88, 80, 84, 'Paket A'),
('LUJENG LUTHFIYAH', 'X-A', 89, 86, 87, 85, 85, 85, 86, 83, 88, 85, 83, 'Paket A'),
('MOCHAMMAD ZAIN IRSYAD ISLAMI', 'X-A', 88, 86, 85, 85, 84, 87, 88, 83, 88, 80, 84, 'Paket D'),
('MUHAMMAD MUHYIDDIN', 'X-A', 88, 86, 85, 86, 90, 87, 86, 85, 87, 80, 85, 'Paket E'),
('NAILA SYAFIRA', 'X-A', 86, 83, 84, 83, 83, 84, 86, 83, 87, 80, 83, 'Paket G'),
('NIMAS AYU SAYUTI', 'X-A', 86, 86, 84, 84, 83, 84, 85, 83, 86, 80, 82, 'Paket F'),
('NURUL \'IZZAH LATHIFATUR RAHMAH', 'X-A', 88, 84, 85, 84, 83, 84, 85, 83, 85, 80, 83, 'Paket F'),
('RAFI RAHMAN SHAH', 'X-A', 88, 84, 84, 84, 84, 87, 86, 83, 85, 80, 84, 'Paket D'),
('RAHMA AULIA KUSUMA', 'X-A', 89, 86, 85, 84, 84, 85, 87, 83, 86, 80, 84, 'Paket D'),
('RAHMAT HIDAYATULLAH', 'X-A', 85, 85, 84, 84, 84, 84, 86, 83, 86, 80, 83, 'Paket C'),
('REFITA ANGGRAENI BASUKI', 'X-A', 89, 86, 84, 85, 84, 84, 85, 83, 85, 80, 84, 'Paket B'),
('RESWARA BHANU ADYATMA', 'X-A', 88, 86, 85, 84, 88, 85, 85, 87, 87, 80, 83, 'Paket A'),
('RIZKIA DWI PUTRI AJI', 'X-A', 88, 87, 85, 84, 85, 87, 86, 83, 85, 85, 85, 'Paket E'),
('SALSABILA AGUSTINA', 'X-A', 86, 85, 82, 83, 84, 84, 84, 83, 86, 85, 80, 'Paket F'),
('SITI FAUZIYAH', 'X-A', 88, 86, 87, 83, 83, 85, 87, 83, 88, 85, 84, 'Paket G'),
('SOFIYANA ARBA ASRI', 'X-A', 89, 86, 85, 83, 83, 85, 89, 83, 85, 80, 84, 'Paket D'),
('SRI INDARWATI HARDINI', 'X-A', 89, 85, 85, 86, 85, 85, 87, 83, 85, 85, 86, 'Paket E'),
('VRISKA DWI APRILIA VIANTI', 'X-A', 90, 86, 85, 85, 83, 84, 87, 83, 87, 80, 82, 'Paket E'),
('WAFIQUL IRSYAD', 'X-A', 88, 86, 87, 83, 85, 85, 85, 87, 88, 80, 83, 'Paket G'),
('ZHARFAN IZZATUL FASIH', 'X-A', 89, 85, 85, 86, 86, 86, 87, 85, 87, 80, 85, 'Paket B'),
('AHMAD DEDY PRASETYAWAN', 'X-B', 88, 86, 85, 83, 89, 86, 87, 87, 88, 80, 84, 'Paket C'),
('AHMAD HUSEN ANWAR', 'X-B', 88, 87, 84, 85, 84, 85, 87, 83, 88, 80, 84, 'Paket A'),
('AHMAD NUR ARIF ZENI ROHMAN', 'X-B', 85, 83, 84, 83, 83, 85, 86, 83, 88, 80, 83, 'Paket A'),
('ALBANI FARREL IRVYNNO', 'X-B', 87, 87, 84, 85, 89, 85, 88, 83, 88, 80, 84, 'Paket C'),
('ALFIATUL MUNIRO', 'X-B', 86, 85, 84, 86, 84, 85, 86, 85, 88, 80, 83, 'Paket E'),
('AMAR MUSLIKH', 'X-B', 86, 84, 85, 84, 83, 85, 87, 83, 85, 85, 83, 'Paket G'),
('ANDINI AINUR RAHMA', 'X-B', 87, 84, 85, 83, 84, 85, 86, 87, 88, 80, 83, 'Paket C'),
('ANNISA EDELWEISS', 'X-B', 87, 87, 86, 86, 84, 85, 87, 85, 85, 80, 84, 'Paket B'),
('ANNISA USWATUN KHASANAH', 'X-B', 87, 83, 84, 85, 83, 85, 88, 85, 85, 80, 83, 'Paket B'),
('AURA AYU RAMADHANI', 'X-B', 86, 83, 87, 85, 83, 85, 87, 85, 88, 85, 83, 'Paket A'),
('DELLA APRILIA YOULANDA', 'X-B', 88, 84, 83, 85, 83, 85, 86, 85, 85, 80, 84, 'Paket A'),
('FARIA AMANDA PERMATA PUTRI', 'X-B', 89, 86, 85, 86, 83, 86, 88, 83, 88, 88, 84, 'Paket D'),
('FITTA LARAS WATI', 'X-B', 88, 84, 86, 83, 84, 85, 87, 85, 85, 85, 84, 'Paket E'),
('INTAN NORA FIRDAUS', 'X-B', 87, 84, 88, 84, 87, 85, 87, 85, 88, 80, 83, 'Paket G'),
('JAYA NITA PRATYA PUTRI DEWI', 'X-B', 88, 87, 87, 86, 88, 85, 88, 83, 88, 85, 85, 'Paket F'),
('JOVITA NINA RASYIDA', 'X-B', 88, 85, 85, 83, 84, 85, 87, 83, 88, 80, 85, 'Paket F'),
('KHOFIFAH HIDAYAH', 'X-B', 86, 85, 81, 86, 84, 84, 86, 83, 88, 85, 84, 'Paket D'),
('LUBAABAH', 'X-B', 86, 86, 84, 86, 84, 85, 87, 83, 85, 80, 84, 'Paket D'),
('MAESA SUKMA AYU', 'X-B', 88, 86, 84, 84, 83, 85, 87, 83, 88, 85, 84, 'Paket C'),
('MAULANA RIDHO ARMANSYAH', 'X-B', 85, 84, 83, 85, 83, 85, 86, 83, 88, 80, 84, 'Paket B'),
('MIA HENY NELAWATI', 'X-B', 88, 87, 87, 84, 86, 85, 87, 87, 85, 85, 84, 'Paket A'),
('MUHAMMAD SHOKHIBUL ABID', 'X-B', 87, 84, 86, 83, 83, 84, 87, 87, 85, 80, 82, 'Paket E'),
('NABILA AINUN FAJRI ANANTA', 'X-B', 86, 87, 87, 84, 85, 85, 88, 83, 88, 80, 85, 'Paket D'),
('NICKY DWI MEILANA', 'X-B', 86, 83, 87, 85, 90, 84, 88, 87, 88, 80, 84, 'Paket E'),
('QURROTA A\'YUNI', 'X-B', 86, 84, 84, 85, 85, 84, 86, 83, 88, 80, 82, 'Paket E'),
('RAFIF ZAKARIA SUHARIANSYAH', 'X-B', 88, 85, 83, 86, 85, 85, 88, 83, 88, 85, 85, 'Paket G'),
('RAHMA NOFITA WIJAYANTI', 'X-B', 89, 84, 85, 86, 84, 86, 87, 85, 85, 85, 85, 'Paket B'),
('RAPHAEL KRISNA YUDHA ASMARA', 'X-B', 85, 84, 85, 83, 84, 84, 87, 83, 88, 80, 84, 'Paket C'),
('SHOLIHATIN NISA', 'X-B', 87, 85, 86, 85, 84, 86, 87, 83, 88, 80, 84, 'Paket A'),
('SINDI AMELIA KARIN', 'X-B', 87, 84, 81, 83, 88, 84, 86, 85, 88, 80, 82, 'Paket A'),
('SINTA DWI RAHAYU', 'X-B', 89, 86, 87, 84, 87, 86, 87, 85, 88, 80, 85, 'Paket C'),
('SITI DEWIMAHARANI', 'X-B', 86, 86, 84, 83, 83, 86, 86, 85, 86, 85, 84, 'Paket E'),
('SUTAN FERDIN ARDIANSYAH', 'X-B', 86, 88, 85, 84, 89, 86, 89, 87, 88, 80, 85, 'Paket G'),
('TETY MELINDA SARI', 'X-B', 89, 86, 85, 85, 83, 85, 86, 85, 88, 80, 83, 'Paket C'),
('VIRGIAN HERU NUGROHO', 'X-B', 80, 83, 83, 85, 83, 85, 86, 85, 85, 80, 84, 'Paket B'),
('YESIKA AGUSTINA', 'X-B', 88, 86, 83, 84, 84, 85, 87, 85, 85, 85, 84, 'Paket B'),
('ADITYA JAYA MAHENDRA WAHYUDI', 'X-C', 88, 84, 86, 86, 87, 85, 86, 85, 88, 85, 85, 'Paket A'),
('ANDI AMANDA PUTRI APRILIA', 'X-C', 85, 83, 81, 85, 83, 84, 86, 83, 87, 88, 83, 'Paket A'),
('ANIQ FARICHATUS ZAHWA', 'X-C', 85, 83, 80, 83, 82, 82, 85, 83, 85, 84, 82, 'Paket D'),
('APRILIA LINDA WATI PUTRI', 'X-C', 87, 86, 81, 84, 86, 85, 87, 87, 88, 85, 84, 'Paket E'),
('ARUM RAHMAWATI', 'X-C', 87, 84, 81, 86, 86, 84, 85, 85, 86, 86, 85, 'Paket G'),
('ASEYKA GITA SASMITA RAHARJA', 'X-C', 89, 83, 81, 85, 86, 85, 86, 87, 88, 85, 86, 'Paket F'),
('BAGUS CHANDRA WIBOWO', 'X-C', 86, 85, 80, 86, 85, 84, 86, 87, 87, 87, 84, 'Paket F'),
('DEEVA WAHYU ELVIANTO', 'X-C', 89, 83, 82, 86, 87, 86, 88, 87, 87, 86, 86, 'Paket D'),
('DESTIAN FIRANSYAH YUSUF', 'X-C', 85, 83, 87, 86, 83, 85, 86, 83, 87, 83, 85, 'Paket D'),
('DWI NUR AULIA RAHMA OKTAVIANA', 'X-C', 88, 84, 89, 85, 87, 85, 86, 85, 85, 86, 86, 'Paket C'),
('EFA ANANDA OLIFIA SARI', 'X-C', 85, 85, 80, 84, 84, 85, 86, 85, 86, 84, 82, 'Paket B'),
('ERICA AMELIA NUR KUMALASARI', 'X-C', 86, 83, 81, 85, 83, 83, 86, 85, 88, 84, 86, 'Paket A'),
('GEMA IZZAD AL KARAMI', 'X-C', 89, 82, 81, 85, 87, 84, 86, 85, 86, 86, 83, 'Paket E'),
('GIOSHELYN SANISA LEKSONO', 'X-C', 89, 82, 80, 84, 87, 84, 87, 83, 88, 86, 85, 'Paket F'),
('ILHAM ROIS RASID', 'X-C', 85, 83, 80, 85, 82, 83, 85, 87, 88, 86, 84, 'Paket G'),
('IRVANDI BAGUS FIRMANSYAH', 'X-C', 87, 84, 84, 85, 85, 84, 85, 87, 88, 85, 85, 'Paket B'),
('LIMAN CAROLINE MELYANA', 'X-C', 86, 82, 80, 85, 87, 85, 87, 83, 88, 87, 84, 'Paket C'),
('LULUK', 'X-C', 89, 84, 85, 85, 84, 87, 88, 83, 86, 86, 86, 'Paket A'),
('MAYLAFIA NUR SETIYANDA', 'X-C', 85, 84, 83, 85, 84, 85, 87, 83, 85, 86, 85, 'Paket A'),
('MOH. FAKHIN ROZAQ', 'X-C', 89, 84, 84, 85, 85, 85, 88, 83, 88, 84, 85, 'Paket C'),
('MUHAMMAD NAUFAL FAHREZI', 'X-C', 89, 83, 80, 85, 87, 86, 88, 87, 88, 87, 86, 'Paket E'),
('NADYA HERLINA SETYA PUTRI', 'X-C', 88, 85, 88, 85, 87, 87, 88, 87, 88, 87, 86, 'Paket G'),
('NAYOHA HERVIA APRILIANA', 'X-C', 85, 84, 80, 84, 82, 82, 87, 83, 86, 86, 83, 'Paket C'),
('NAZRIL ILMIYAH', 'X-C', 86, 84, 86, 86, 87, 86, 86, 83, 88, 84, 85, 'Paket B'),
('NOVIAN ALI FAUZI', 'X-C', 87, 84, 81, 86, 83, 84, 87, 87, 85, 84, 82, 'Paket A'),
('NUR ISNAINI DAVINA MILA', 'X-C', 89, 85, 84, 84, 84, 84, 87, 75, 88, 87, 86, 'Paket C'),
('NURUL AFIFAH PUSPITA SARI', 'X-C', 84, 83, 80, 84, 82, 81, 86, 83, 85, 84, 80, 'Paket E'),
('RATNA DWI LESTARI', 'X-C', 89, 85, 81, 86, 86, 85, 85, 87, 88, 86, 85, 'Paket G'),
('REVALINA ANASTASYA', 'X-C', 88, 83, 81, 86, 88, 87, 85, 85, 88, 86, 87, 'Paket C'),
('SELLY IMELDHA', 'X-C', 85, 84, 81, 87, 86, 85, 85, 83, 86, 86, 84, 'Paket B'),
('SITI NUR ATIKAH', 'X-C', 87, 84, 87, 85, 87, 85, 86, 83, 88, 85, 85, 'Paket D'),
('SITI ROHMA', 'X-C', 86, 84, 81, 85, 86, 84, 86, 85, 88, 86, 87, 'Paket E'),
('SYAFAR KAUTFAR AHMAD YUSAR', 'X-C', 89, 83, 80, 86, 86, 84, 88, 85, 88, 86, 84, 'Paket E'),
('VIRA FIRNANDA PUTRI AVI OKTAFIA', 'X-C', 87, 83, 80, 86, 88, 85, 84, 83, 88, 86, 84, 'Paket G'),
('ZAHWA ANASTASIA SUDIBYO', 'X-C', 85, 83, 81, 85, 86, 83, 85, 83, 85, 86, 83, 'Paket B'),
('ZUHRIYAH YOGI SEPTIANA', 'X-C', 89, 84, 82, 85, 87, 85, 88, 83, 88, 88, 86, 'Paket C'),
('ADINDA EVI WULANDARI', 'X-D', 86, 82, 86, 85, 89, 84, 86, 83, 88, 87, 86, 'Paket A'),
('AHMADA FIRDAUS SAPUTRA', 'X-D', 86, 83, 86, 84, 84, 84, 85, 87, 87, 87, 83, 'Paket A'),
('AISYAH PUTRI WANTASEN', 'X-D', 87, 83, 86, 88, 83, 84, 86, 83, 88, 86, 85, 'Paket C'),
('ALFINDA FAUZIYAH PUTRI', 'X-D', 89, 84, 85, 80, 89, 84, 87, 85, 86, 86, 84, 'Paket E'),
('ANNAS SYAIFULLOH', 'X-D', 86, 84, 86, 84, 84, 84, 87, 87, 88, 85, 86, 'Paket G'),
('APRISILIA FANNYA PUTRI', 'X-D', 88, 83, 86, 79, 83, 84, 87, 83, 88, 85, 86, 'Paket C'),
('ARIL ADI TARA', 'X-D', 86, 86, 86, 82, 84, 83, 86, 83, 85, 86, 84, 'Paket B'),
('AULIA DINAR ROSYADIN', 'X-D', 88, 83, 86, 86, 84, 84, 86, 83, 88, 85, 86, 'Paket B'),
('BANY RIKHADATUL AISY', 'X-D', 88, 83, 84, 83, 83, 84, 88, 83, 88, 85, 84, 'Paket A'),
('BUNTARA ALIM WIJAYA', 'X-D', 86, 83, 85, 86, 83, 84, 85, 83, 85, 86, 83, 'Paket A'),
('CHRISMA TIKA ARIYANTI', 'X-D', 86, 86, 84, 82, 83, 84, 87, 87, 88, 86, 83, 'Paket D'),
('DEA AYU NOVITA PUTRI', 'X-D', 87, 84, 84, 85, 83, 83, 86, 87, 88, 85, 84, 'Paket E'),
('ELSA AMANDA PUTRI', 'X-D', 88, 83, 84, 80, 84, 84, 84, 87, 87, 86, 82, 'Paket G'),
('ERIK FERDIAN DWI PERMANA', 'X-D', 87, 84, 86, 87, 87, 85, 86, 85, 88, 85, 86, 'Paket F'),
('FARA SEFTIYANI', 'X-D', 89, 84, 86, 84, 88, 85, 88, 83, 88, 85, 87, 'Paket F'),
('HENGKI ANDRIYANSYAH', 'X-D', 89, 84, 86, 84, 84, 85, 87, 83, 88, 87, 87, 'Paket D'),
('HILDA SULFY APRILYAWATI', 'X-D', 85, 83, 85, 82, 84, 85, 84, 80, 85, 88, 84, 'Paket D'),
('IMELIA LATIFA', 'X-D', 89, 84, 86, 87, 84, 86, 87, 87, 88, 86, 85, 'Paket C'),
('IRDYA KHOLIS AFRISALSYA', 'X-D', 86, 86, 87, 84, 83, 84, 85, 83, 88, 87, 84, 'Paket B'),
('LAILATUL FITROTI NUR HIDAYAH', 'X-D', 87, 83, 86, 83, 83, 84, 85, 87, 88, 86, 83, 'Paket A'),
('LUTVIAH MIRZA KAARISTINA', 'X-D', 88, 83, 86, 81, 86, 85, 85, 87, 88, 86, 85, 'Paket E'),
('MAHILDA RINTA AYUNDA', 'X-D', 87, 83, 86, 77, 83, 83, 87, 87, 88, 85, 84, 'Paket F'),
('MUFIDATUL DEVINDA', 'X-D', 88, 84, 86, 81, 85, 83, 83, 87, 87, 85, 82, 'Paket G'),
('MUHAMMAD TEGAR RAMADHANI', 'X-D', 85, 83, 86, 78, 90, 83, 84, 85, 87, 85, 82, 'Paket D'),
('NAUFARA ROHMANUDDIN', 'X-D', 88, 86, 86, 86, 85, 85, 87, 85, 88, 88, 86, 'Paket E'),
('NIDYA DIAN PRASASTY', 'X-D', 88, 83, 86, 82, 85, 85, 85, 85, 88, 88, 85, 'Paket E'),
('NUR BEY FIRMANSYAH', 'X-D', 89, 83, 86, 79, 84, 84, 85, 83, 88, 85, 85, 'Paket G'),
('PRIYO SETIO UTOMO', 'X-D', 88, 83, 86, 83, 84, 84, 86, 87, 85, 88, 86, 'Paket B'),
('PUTRI WAHYUNE SRI WULANSARI', 'X-D', 86, 83, 84, 89, 84, 85, 86, 83, 88, 84, 84, 'Paket C'),
('SATRIO AJI SASONGKO', 'X-D', 88, 83, 86, 81, 88, 85, 84, 83, 88, 86, 85, 'Paket A'),
('SHOKIB NUR AZIZ', 'X-D', 86, 84, 86, 81, 87, 84, 84, 80, 88, 85, 85, 'Paket A'),
('SILVANA EKA ANGESTI', 'X-D', 88, 86, 86, 82, 83, 83, 85, 85, 88, 85, 86, 'Paket C'),
('SOFIA NUR ROHMAH', 'X-D', 86, 84, 84, 83, 89, 84, 86, 83, 88, 83, 86, 'Paket E'),
('SYAFIQAH FITRI NATASYA', 'X-D', 88, 83, 86, 87, 83, 84, 86, 83, 88, 88, 86, 'Paket G'),
('VIOLYNA SERE NAKAHAYA', 'X-D', 86, 83, 86, 80, 83, 84, 85, 85, 85, 88, 85, 'Paket C'),
('ZARATUL AZIZAH', 'X-D', 88, 86, 85, 77, 84, 84, 85, 85, 88, 83, 85, 'Paket B'),
('ABDUL KHOLIK', 'X-E', 85, 83, 84, 77, 83, 84, 85, 85, 88, 84, 81, 'Paket B'),
('ACHMAD FAHMI', 'X-E', 86, 83, 86, 78, 84, 82, 86, 83, 88, 87, 83, 'Paket A'),
('ADELIA PRATIWI', 'X-E', 85, 84, 85, 79, 86, 84, 85, 83, 87, 86, 81, 'Paket A'),
('AHMAD SYAHRUL ROFIQI', 'X-E', 84, 82, 85, 82, 88, 83, 87, 83, 87, 85, 82, 'Paket D'),
('AIMAR REYHAN PRANANDA', 'X-E', 86, 83, 85, 78, 83, 82, 85, 87, 87, 84, 82, 'Paket E'),
('AYU DZIKROTUR ROHMAH', 'X-E', 87, 86, 84, 82, 83, 83, 86, 87, 87, 87, 84, 'Paket G'),
('DINATUR ROHMAH BRILIANA', 'X-E', 85, 84, 86, 85, 83, 84, 87, 83, 87, 87, 85, 'Paket F'),
('DIVA ANGGRAENI', 'X-E', 86, 83, 86, 77, 83, 83, 86, 87, 87, 85, 84, 'Paket F');
--
-- Database: `jurusan_db`
--
CREATE DATABASE IF NOT EXISTS `jurusan_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `jurusan_db`;

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `kelas` varchar(20) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Belum Diproses',
  `jurusan` varchar(20) DEFAULT NULL,
  `confidence` float DEFAULT NULL,
  `alasan` text,
  `tree` json DEFAULT NULL,
  `entropy` float DEFAULT NULL,
  `information_gain` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id`, `user_id`, `nama`, `kelas`, `status`, `jurusan`, `confidence`, `alasan`, `tree`, `entropy`, `information_gain`, `created_at`, `updated_at`) VALUES
(4, 198, 'MOCH. SULTHONIC HAKIKI', 'X-F', 'Sudah Diproses', 'Paket G', 72, '[\"Nilai Geografi, Prakarya kamu di atas rata-rata siswa Paket G.\",\"Paket G cocok untuk siswa yang memiliki kemampuan pada geografi, sains, dan matematika.\",\"Di Paket G, kamu akan mempelajari: Geografi, Biologi, Kimia, Matematika Lanjut, Prakarya.\"]', NULL, 2.76519, 0.0820664, '2026-05-21 15:18:20', '2026-05-21 15:18:20'),
(5, 161, 'ABDUL KHOLIK', 'X-E', 'Sudah Diproses', 'Paket C', 72, '[\"Paket C cocok untuk siswa yang memiliki minat di bidang teknologi, sosial, dan sains.\",\"Di Paket C, kamu akan mempelajari: Informatika, Sosiologi, Matematika Lanjut, Kimia, Prakarya.\"]', NULL, 2.76519, 0.0820664, '2026-05-21 15:22:10', '2026-05-21 15:22:10'),
(6, 163, 'ABRILLIANTY TIVANY SURYA PUTRI', 'X-F', 'Sudah Diproses', 'Paket C', 72, '[\"Nilai Prakarya kamu di atas rata-rata siswa Paket C.\",\"Paket C cocok untuk siswa yang memiliki minat di bidang teknologi, sosial, dan sains.\",\"Di Paket C, kamu akan mempelajari: Informatika, Sosiologi, Matematika Lanjut, Kimia, Prakarya.\"]', NULL, 2.76519, 0.0820664, '2026-05-21 21:23:54', '2026-05-21 21:23:54');

-- --------------------------------------------------------

--
-- Table structure for table `student_scores`
--

CREATE TABLE `student_scores` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `pai` int DEFAULT '0',
  `ppkn` int DEFAULT '0',
  `bahasa_indonesia` int DEFAULT '0',
  `bahasa_inggris` int DEFAULT '0',
  `matematika_umum` int DEFAULT '0',
  `ipa` int DEFAULT '0',
  `ips` int DEFAULT '0',
  `bahasa_daerah` int DEFAULT '0',
  `pjok` int DEFAULT '0',
  `seni` int DEFAULT '0',
  `informatika` int DEFAULT '0',
  `semester` varchar(10) DEFAULT NULL,
  `tahun_ajaran` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nama` varchar(255) DEFAULT NULL,
  `kelas` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student_scores`
--

INSERT INTO `student_scores` (`id`, `user_id`, `pai`, `ppkn`, `bahasa_indonesia`, `bahasa_inggris`, `matematika_umum`, `ipa`, `ips`, `bahasa_daerah`, `pjok`, `seni`, `informatika`, `semester`, `tahun_ajaran`, `created_at`, `nama`, `kelas`) VALUES
(1, 99, 88, 82, 87, 87, 86, 84, 87, 83, 88, 88, 87, NULL, NULL, '2026-05-20 18:52:17', 'HAFIDZ HAIDAR AMRU HIDAYAT', 'X-G'),
(2, 100, 86, 86, 84, 84, 83, 84, 85, 83, 86, 80, 82, NULL, NULL, '2026-05-20 18:52:17', 'NIMAS AYU SAYUTI', 'X-A'),
(3, 101, 86, 83, 85, 79, 83, 83, 86, 83, 86, 86, 82, NULL, NULL, '2026-05-20 18:52:17', 'WANDA APRILIA MAULANI', 'X-F'),
(4, 102, 89, 84, 86, 84, 88, 85, 88, 83, 88, 85, 87, NULL, NULL, '2026-05-20 18:52:17', 'FARA SEFTIYANI', 'X-D'),
(5, 103, 88, 82, 84, 82, 85, 84, 86, 85, 87, 87, 83, NULL, NULL, '2026-05-20 18:52:17', 'ACHMAD HAFIT DWI CAHYONO', 'X-G'),
(6, 104, 88, 83, 86, 83, 84, 84, 86, 87, 85, 88, 86, NULL, NULL, '2026-05-20 18:52:17', 'PRIYO SETIO UTOMO', 'X-D'),
(7, 105, 85, 84, 83, 85, 84, 85, 87, 83, 85, 86, 85, NULL, NULL, '2026-05-20 18:52:17', 'MAYLAFIA NUR SETIYANDA', 'X-C'),
(8, 106, 87, 83, 85, 81, 84, 83, 85, 85, 88, 83, 82, NULL, NULL, '2026-05-20 18:52:17', 'BELLA AMEYLIA ROSAFA', 'X-F'),
(9, 107, 86, 88, 85, 84, 89, 86, 89, 87, 88, 80, 85, NULL, NULL, '2026-05-20 18:52:17', 'SUTAN FERDIN ARDIANSYAH', 'X-B'),
(10, 108, 86, 84, 87, 87, 86, 84, 86, 83, 86, 84, 85, NULL, NULL, '2026-05-20 18:52:17', 'MOCH. HERRIS ARDIANSHAH', 'X-G'),
(11, 109, 89, 87, 84, 85, 83, 85, 85, 83, 87, 80, 85, NULL, NULL, '2026-05-20 18:52:17', 'FAIRUZ HAZNA\' ROFIFAH', 'X-A'),
(12, 110, 88, 86, 85, 86, 90, 87, 86, 85, 87, 80, 85, NULL, NULL, '2026-05-20 18:52:17', 'MUHAMMAD MUHYIDDIN', 'X-A'),
(13, 111, 85, 83, 86, 83, 84, 86, 86, 85, 88, 88, 84, NULL, NULL, '2026-05-20 18:52:17', 'DWI PRIYO UTOMO', 'X-E'),
(14, 112, 87, 83, 84, 78, 85, 83, 87, 87, 87, 88, 85, NULL, NULL, '2026-05-20 18:52:17', 'NATASA SITI AJI ASMUNI', 'X-F'),
(15, 113, 88, 83, 86, 86, 84, 84, 86, 83, 88, 85, 86, NULL, NULL, '2026-05-20 18:52:17', 'AULIA DINAR ROSYADIN', 'X-D'),
(16, 114, 88, 84, 83, 83, 90, 86, 86, 85, 87, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'FREDIKA ARIANTO', 'X-A'),
(17, 115, 89, 87, 84, 84, 83, 85, 86, 83, 88, 85, 83, NULL, NULL, '2026-05-20 18:52:17', 'HANUM SAL SABILA', 'X-A'),
(18, 116, 86, 83, 87, 79, 86, 83, 87, 85, 88, 88, 86, NULL, NULL, '2026-05-20 18:52:17', 'DIYAH AYU IKAWATI', 'X-G'),
(19, 117, 85, 84, 85, 83, 84, 84, 87, 83, 88, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'RAPHAEL KRISNA YUDHA ASMARA', 'X-B'),
(20, 118, 89, 83, 86, 79, 84, 84, 85, 83, 88, 85, 85, NULL, NULL, '2026-05-20 18:52:17', 'NUR BEY FIRMANSYAH', 'X-D'),
(21, 119, 87, 84, 87, 86, 90, 84, 86, 83, 87, 88, 87, NULL, NULL, '2026-05-20 18:52:17', 'ANGGRAENI AYU WIDIYANTI', 'X-G'),
(22, 120, 84, 83, 80, 84, 82, 81, 86, 83, 85, 84, 80, NULL, NULL, '2026-05-20 18:52:17', 'NURUL AFIFAH PUSPITA SARI', 'X-C'),
(23, 121, 85, 83, 85, 79, 83, 84, 87, 83, 86, 87, 83, NULL, NULL, '2026-05-20 18:52:17', 'SITI NURUL HIDAYATI', 'X-F'),
(24, 122, 85, 84, 84, 77, 83, 84, 86, 83, 87, 85, 83, NULL, NULL, '2026-05-20 18:52:17', 'NA`IMATUN HASANAH', 'X-E'),
(25, 123, 87, 84, 84, 81, 84, 83, 85, 87, 87, 85, 84, NULL, NULL, '2026-05-20 18:52:17', 'MERRY NOVITADEWI', 'X-E'),
(26, 124, 86, 87, 85, 84, 85, 86, 88, 83, 87, 90, 84, NULL, NULL, '2026-05-20 18:52:17', 'FIRDA KHILYATUS SHOLIKHAH', 'X-A'),
(27, 125, 86, 83, 85, 78, 83, 82, 85, 87, 87, 84, 82, NULL, NULL, '2026-05-20 18:52:17', 'AIMAR REYHAN PRANANDA', 'X-E'),
(28, 126, 87, 83, 85, 83, 90, 85, 87, 85, 87, 86, 85, NULL, NULL, '2026-05-20 18:52:17', 'ALFIA AMALIA SYAHRO', 'X-G'),
(29, 127, 85, 84, 84, 81, 86, 84, 85, 83, 88, 88, 84, NULL, NULL, '2026-05-20 18:52:17', 'SITI NADIYATUL MA\'ARIF', 'X-E'),
(30, 128, 86, 83, 87, 87, 90, 86, 87, 83, 87, 87, 85, NULL, NULL, '2026-05-20 18:52:17', 'AKTIF EKA RIANTO', 'X-G'),
(31, 129, 88, 85, 83, 86, 85, 85, 88, 83, 88, 85, 85, NULL, NULL, '2026-05-20 18:52:17', 'RAFIF ZAKARIA SUHARIANSYAH', 'X-B'),
(32, 130, 85, 83, 86, 86, 84, 83, 87, 83, 87, 86, 82, NULL, NULL, '2026-05-20 18:52:17', 'NISA MAULIDUL HIDAYAH', 'X-F'),
(33, 131, 88, 84, 85, 84, 83, 84, 85, 83, 85, 80, 83, NULL, NULL, '2026-05-20 18:52:17', 'NURUL \'IZZAH LATHIFATUR RAHMAH', 'X-A'),
(34, 132, 86, 83, 81, 85, 83, 83, 86, 85, 88, 84, 86, NULL, NULL, '2026-05-20 18:52:17', 'ERICA AMELIA NUR KUMALASARI', 'X-C'),
(35, 133, 86, 86, 84, 86, 84, 85, 87, 83, 85, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'LUBAABAH', 'X-B'),
(36, 134, 86, 84, 85, 77, 85, 83, 84, 87, 86, 87, 81, NULL, NULL, '2026-05-20 18:52:17', 'OLIVIA RIKA SABELA', 'X-G'),
(37, 135, 87, 86, 87, 81, 83, 84, 88, 83, 86, 86, 86, NULL, NULL, '2026-05-20 18:52:17', 'ADIB SHOFIYA RAKHMAN TRI PUTRA', 'X-F'),
(38, 136, 85, 84, 85, 79, 86, 84, 85, 83, 87, 86, 81, NULL, NULL, '2026-05-20 18:52:17', 'ADELIA PRATIWI', 'X-E'),
(39, 137, 87, 85, 86, 85, 86, 85, 87, 87, 87, 88, 87, NULL, NULL, '2026-05-20 18:52:17', 'ANI RISMA LATIF', 'X-G'),
(40, 138, 85, 84, 81, 87, 86, 85, 85, 83, 86, 86, 84, NULL, NULL, '2026-05-20 18:52:17', 'SELLY IMELDHA', 'X-C'),
(41, 139, 90, 86, 85, 85, 83, 84, 87, 83, 87, 80, 82, NULL, NULL, '2026-05-20 18:52:17', 'VRISKA DWI APRILIA VIANTI', 'X-A'),
(42, 140, 89, 85, 85, 84, 89, 87, 86, 83, 87, 80, 85, NULL, NULL, '2026-05-20 18:52:17', 'AYUB DIAN AGUSTIN', 'X-A'),
(43, 141, 86, 86, 84, 82, 83, 84, 87, 87, 88, 86, 83, NULL, NULL, '2026-05-20 18:52:17', 'CHRISMA TIKA ARIYANTI', 'X-D'),
(44, 142, 88, 83, 86, 81, 83, 84, 86, 83, 88, 85, 82, NULL, NULL, '2026-05-20 18:52:17', 'ALIEFTA LAISA SALSABILLA', 'X-F'),
(45, 143, 87, 84, 81, 83, 88, 84, 86, 85, 88, 80, 82, NULL, NULL, '2026-05-20 18:52:17', 'SINDI AMELIA KARIN', 'X-B'),
(46, 144, 84, 83, 83, 77, 84, 83, 86, 83, 87, 86, 85, NULL, NULL, '2026-05-20 18:52:17', 'PUTRI RAHMALIYA', 'X-F'),
(47, 145, 85, 84, 84, 87, 84, 84, 88, 83, 88, 87, 87, NULL, NULL, '2026-05-20 18:52:17', 'FIFIN ENDRIYANA FORISKI', 'X-E'),
(48, 146, 87, 83, 85, 77, 84, 85, 86, 83, 86, 86, 84, NULL, NULL, '2026-05-20 18:52:17', 'REVIA EKA DIAN APRILIA', 'X-G'),
(49, 147, 88, 86, 84, 84, 83, 85, 87, 83, 88, 85, 84, NULL, NULL, '2026-05-20 18:52:17', 'MAESA SUKMA AYU', 'X-B'),
(50, 148, 88, 84, 89, 85, 87, 85, 86, 85, 85, 86, 86, NULL, NULL, '2026-05-20 18:52:17', 'DWI NUR AULIA RAHMA OKTAVIANA', 'X-C'),
(51, 149, 84, 83, 85, 83, 84, 83, 86, 83, 86, 87, 85, NULL, NULL, '2026-05-20 18:52:17', 'DWI ANGGARA ADE SUMARTONO', 'X-F'),
(52, 150, 86, 84, 85, 84, 83, 85, 87, 83, 85, 85, 83, NULL, NULL, '2026-05-20 18:52:17', 'AMAR MUSLIKH', 'X-B'),
(53, 151, 87, 84, 81, 86, 86, 84, 85, 85, 86, 86, 85, NULL, NULL, '2026-05-20 18:52:17', 'ARUM RAHMAWATI', 'X-C'),
(54, 152, 84, 84, 85, 84, 86, 84, 87, 83, 85, 85, 87, NULL, NULL, '2026-05-20 18:52:17', 'DEVITA DWI AGUSTINA', 'X-F'),
(55, 153, 85, 83, 86, 78, 90, 83, 84, 85, 87, 85, 82, NULL, NULL, '2026-05-20 18:52:17', 'MUHAMMAD TEGAR RAMADHANI', 'X-D'),
(56, 154, 84, 84, 84, 85, 84, 83, 85, 83, 86, 85, 86, NULL, NULL, '2026-05-20 18:52:17', 'MAULIDYA AMARA HASNA', 'X-F'),
(57, 155, 88, 86, 87, 83, 83, 85, 87, 83, 88, 85, 84, NULL, NULL, '2026-05-20 18:52:17', 'SITI FAUZIYAH', 'X-A'),
(58, 156, 85, 84, 85, 79, 84, 84, 86, 83, 87, 86, 85, NULL, NULL, '2026-05-20 18:52:17', 'RYANTA EKA SAPUTRA', 'X-G'),
(59, 157, 89, 83, 85, 82, 83, 83, 87, 87, 88, 86, 82, NULL, NULL, '2026-05-20 18:52:17', 'IBNA ALFERA LATIFAH', 'X-E'),
(60, 158, 89, 84, 85, 85, 84, 87, 88, 83, 86, 86, 86, NULL, NULL, '2026-05-20 18:52:17', 'LULUK', 'X-C'),
(61, 159, 87, 83, 86, 88, 83, 84, 86, 83, 88, 86, 85, NULL, NULL, '2026-05-20 18:52:17', 'AISYAH PUTRI WANTASEN', 'X-D'),
(62, 160, 85, 82, 84, 78, 84, 83, 86, 83, 87, 86, 86, NULL, NULL, '2026-05-20 18:52:17', 'ALLI HANDI', 'X-F'),
(63, 161, 85, 83, 84, 77, 83, 84, 85, 85, 88, 84, 81, NULL, NULL, '2026-05-20 18:52:17', 'ABDUL KHOLIK', 'X-E'),
(64, 162, 88, 84, 86, 81, 85, 83, 83, 87, 87, 85, 82, NULL, NULL, '2026-05-20 18:52:17', 'MUFIDATUL DEVINDA', 'X-D'),
(65, 163, 85, 83, 84, 78, 83, 83, 84, 83, 86, 85, 83, NULL, NULL, '2026-05-20 18:52:17', 'ABRILLIANTY TIVANY SURYA PUTRI', 'X-F'),
(66, 164, 86, 86, 87, 84, 83, 84, 85, 83, 88, 87, 84, NULL, NULL, '2026-05-20 18:52:17', 'IRDYA KHOLIS AFRISALSYA', 'X-D'),
(67, 165, 88, 86, 84, 83, 83, 85, 85, 85, 87, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'ANNISA DWI PUSPITASARI', 'X-A'),
(68, 166, 87, 85, 86, 85, 83, 83, 86, 83, 87, 88, 84, NULL, NULL, '2026-05-20 18:52:17', 'FAISOL GILANG ZAKARIA', 'X-E'),
(69, 167, 88, 87, 84, 85, 84, 85, 87, 83, 88, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'AHMAD HUSEN ANWAR', 'X-B'),
(70, 168, 87, 84, 87, 85, 87, 85, 86, 83, 88, 85, 85, NULL, NULL, '2026-05-20 18:52:17', 'SITI NUR ATIKAH', 'X-C'),
(71, 169, 87, 84, 85, 79, 83, 83, 85, 83, 86, 86, 82, NULL, NULL, '2026-05-20 18:52:17', 'MUHAMMAD DANY NUR AZIZ', 'X-G'),
(72, 170, 86, 83, 85, 80, 85, 83, 87, 85, 87, 88, 87, NULL, NULL, '2026-05-20 18:52:17', 'DEVIA FATIMATUS AZARO', 'X-F'),
(73, 171, 89, 86, 84, 85, 84, 84, 85, 83, 85, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'REFITA ANGGRAENI BASUKI', 'X-A'),
(74, 172, 88, 86, 85, 85, 84, 87, 88, 83, 88, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'MOCHAMMAD ZAIN IRSYAD ISLAMI', 'X-A'),
(75, 173, 87, 86, 84, 84, 84, 86, 86, 83, 88, 80, 82, NULL, NULL, '2026-05-20 18:52:17', 'IMMA FAUZIYAH', 'X-A'),
(76, 174, 85, 84, 86, 82, 84, 83, 87, 83, 87, 85, 87, NULL, NULL, '2026-05-20 18:52:17', 'MEI WULANDARI', 'X-E'),
(77, 175, 87, 87, 86, 86, 84, 85, 87, 85, 85, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'ANNISA EDELWEISS', 'X-B'),
(78, 176, 84, 83, 85, 86, 84, 83, 86, 85, 86, 87, 84, NULL, NULL, '2026-05-20 18:52:17', 'DEVITA NANDRA ARIANI', 'X-G'),
(79, 177, 88, 86, 85, 77, 84, 84, 85, 85, 88, 83, 85, NULL, NULL, '2026-05-20 18:52:17', 'ZARATUL AZIZAH', 'X-D'),
(80, 178, 88, 83, 86, 82, 85, 85, 85, 85, 88, 88, 85, NULL, NULL, '2026-05-20 18:52:17', 'NIDYA DIAN PRASASTY', 'X-D'),
(81, 179, 86, 86, 86, 82, 84, 83, 86, 83, 85, 86, 84, NULL, NULL, '2026-05-20 18:52:17', 'ARIL ADI TARA', 'X-D'),
(82, 180, 89, 84, 86, 84, 84, 85, 87, 83, 88, 87, 87, NULL, NULL, '2026-05-20 18:52:17', 'HENGKI ANDRIYANSYAH', 'X-D'),
(83, 181, 85, 86, 86, 84, 83, 83, 85, 83, 87, 86, 82, NULL, NULL, '2026-05-20 18:52:17', 'MUHAMMAD FIRMANSYAH', 'X-E'),
(84, 182, 89, 84, 85, 80, 89, 84, 87, 85, 86, 86, 84, NULL, NULL, '2026-05-20 18:52:17', 'ALFINDA FAUZIYAH PUTRI', 'X-D'),
(85, 183, 86, 82, 84, 80, 83, 83, 85, 87, 88, 85, 80, NULL, NULL, '2026-05-20 18:52:17', 'NICKY', 'X-E'),
(86, 184, 89, 85, 85, 86, 85, 85, 87, 83, 85, 85, 86, NULL, NULL, '2026-05-20 18:52:17', 'SRI INDARWATI HARDINI', 'X-A'),
(87, 185, 85, 84, 84, 79, 83, 84, 86, 87, 86, 86, 82, NULL, NULL, '2026-05-20 18:52:17', 'RAHMA KHOIRUNNISA', 'X-E'),
(88, 186, 86, 84, 84, 85, 85, 84, 86, 83, 88, 80, 82, NULL, NULL, '2026-05-20 18:52:17', 'QURROTA A\'YUNI', 'X-B'),
(89, 187, 86, 84, 84, 83, 83, 85, 86, 87, 88, 85, 86, NULL, NULL, '2026-05-20 18:52:17', 'SITI JULAINDAH SARI', 'X-E'),
(90, 188, 87, 82, 86, 83, 85, 83, 86, 83, 87, 83, 83, NULL, NULL, '2026-05-20 18:52:17', 'KAMELIA AFIFATUS ZAHRO', 'X-E'),
(91, 189, 85, 83, 84, 77, 83, 83, 87, 83, 88, 85, 86, NULL, NULL, '2026-05-20 18:52:17', 'JOAN MARCELLINO REYNALDI', 'X-E'),
(92, 190, 88, 86, 85, 83, 89, 86, 87, 87, 88, 80, 84, NULL, NULL, '2026-05-20 18:52:17', 'AHMAD DEDY PRASETYAWAN', 'X-B'),
(93, 191, 85, 84, 86, 85, 83, 84, 87, 83, 87, 87, 85, NULL, NULL, '2026-05-20 18:52:17', 'DINATUR ROHMAH BRILIANA', 'X-E'),
(94, 192, 86, 86, 86, 77, 83, 84, 85, 83, 86, 85, 80, NULL, NULL, '2026-05-20 18:52:17', 'NOFI PUTRIYANI', 'X-E'),
(95, 193, 84, 82, 85, 82, 88, 83, 87, 83, 87, 85, 82, NULL, NULL, '2026-05-20 18:52:17', 'AHMAD SYAHRUL ROFIQI', 'X-E'),
(96, 194, 86, 86, 84, 83, 83, 86, 86, 85, 86, 85, 84, NULL, NULL, '2026-05-20 18:52:17', 'SITI DEWIMAHARANI', 'X-B'),
(97, 195, 86, 84, 85, 84, 83, 85, 87, 83, 88, 83, 85, NULL, NULL, '2026-05-20 18:52:17', 'RAHMASARI NABILLA AMROZI PUTRI', 'X-E'),
(98, 196, 86, 83, 84, 78, 84, 83, 86, 83, 86, 88, 83, NULL, NULL, '2026-05-20 18:52:17', 'QUEEN SILA BANOWATI', 'X-F'),
(99, 197, 89, 82, 81, 85, 87, 84, 86, 85, 86, 86, 83, NULL, NULL, '2026-05-20 18:52:17', 'GEMA IZZAD AL KARAMI', 'X-C'),
(100, 198, 85, 83, 85, 83, 83, 83, 86, 85, 87, 87, 83, NULL, NULL, '2026-05-20 18:52:17', 'MOCH. SULTHONIC HAKIKI', 'X-F');

-- --------------------------------------------------------

--
-- Table structure for table `training_data`
--

CREATE TABLE `training_data` (
  `id` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `kelas` varchar(10) DEFAULT NULL,
  `pai` int DEFAULT NULL,
  `ppkn` int DEFAULT NULL,
  `bahasa_indonesia` int DEFAULT NULL,
  `bahasa_inggris` int DEFAULT NULL,
  `matematika_umum` int DEFAULT NULL,
  `ipa` int DEFAULT NULL,
  `ips` int DEFAULT NULL,
  `bahasa_daerah` int DEFAULT NULL,
  `pjok` int DEFAULT NULL,
  `seni` int DEFAULT NULL,
  `informatika` int DEFAULT NULL,
  `jurusan` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `training_data`
--

INSERT INTO `training_data` (`id`, `nama`, `kelas`, `pai`, `ppkn`, `bahasa_indonesia`, `bahasa_inggris`, `matematika_umum`, `ipa`, `ips`, `bahasa_daerah`, `pjok`, `seni`, `informatika`, `jurusan`, `created_at`) VALUES
(1, 'SITI FATIKHATUL HASANAH', 'X-G', 86, 83, 87, 77, 84, 83, 86, 83, 86, 85, 86, 'Paket A', '2026-05-20 18:52:16'),
(2, 'HILDA SULFY APRILYAWATI', 'X-D', 85, 83, 85, 82, 84, 85, 84, 80, 85, 88, 84, 'Paket D', '2026-05-20 18:52:16'),
(3, 'APRILIA LINDA WATI PUTRI', 'X-C', 87, 86, 81, 84, 86, 85, 87, 87, 88, 85, 84, 'Paket E', '2026-05-20 18:52:16'),
(4, 'NAZRIL ILMIYAH', 'X-C', 86, 84, 86, 86, 87, 86, 86, 83, 88, 84, 85, 'Paket B', '2026-05-20 18:52:16'),
(5, 'ZUHRIYAH YOGI SEPTIANA', 'X-C', 89, 84, 82, 85, 87, 85, 88, 83, 88, 88, 86, 'Paket C', '2026-05-20 18:52:16'),
(6, 'NUR ISNAINI DAVINA MILA', 'X-C', 89, 85, 84, 84, 84, 84, 87, 75, 88, 87, 86, 'Paket C', '2026-05-20 18:52:16'),
(7, 'MUHAMMAD SHOKHIBUL ABID', 'X-B', 87, 84, 86, 83, 83, 84, 87, 87, 85, 80, 82, 'Paket E', '2026-05-20 18:52:16'),
(8, 'APRISILIA FANNYA PUTRI', 'X-D', 88, 83, 86, 79, 83, 84, 87, 83, 88, 85, 86, 'Paket C', '2026-05-20 18:52:16'),
(9, 'DESTIAN FIRANSYAH YUSUF', 'X-C', 85, 83, 87, 86, 83, 85, 86, 83, 87, 83, 85, 'Paket D', '2026-05-20 18:52:16'),
(10, 'GIOSHELYN SANISA LEKSONO', 'X-C', 89, 82, 80, 84, 87, 84, 87, 83, 88, 86, 85, 'Paket F', '2026-05-20 18:52:16'),
(11, 'REVALINA ANASTASYA', 'X-C', 88, 83, 81, 86, 88, 87, 85, 85, 88, 86, 87, 'Paket C', '2026-05-20 18:52:16'),
(12, 'IRVANDI BAGUS FIRMANSYAH', 'X-C', 87, 84, 84, 85, 85, 84, 85, 87, 88, 85, 85, 'Paket B', '2026-05-20 18:52:16'),
(13, 'EFA ANANDA OLIFIA SARI', 'X-C', 85, 85, 80, 84, 84, 85, 86, 85, 86, 84, 82, 'Paket B', '2026-05-20 18:52:16'),
(14, 'SOFIYANA ARBA ASRI', 'X-A', 89, 86, 85, 83, 83, 85, 89, 83, 85, 80, 84, 'Paket D', '2026-05-20 18:52:16'),
(15, 'RAHMA NOFITA WIJAYANTI', 'X-B', 89, 84, 85, 86, 84, 86, 87, 85, 85, 85, 85, 'Paket B', '2026-05-20 18:52:16'),
(16, 'HASAN PUTRA KURNIAWAN', 'X-A', 89, 84, 84, 83, 84, 85, 85, 83, 86, 90, 84, 'Paket G', '2026-05-20 18:52:16'),
(17, 'NAILA SYAFIRA', 'X-A', 86, 83, 84, 83, 83, 84, 86, 83, 87, 80, 83, 'Paket G', '2026-05-20 18:52:16'),
(18, 'ELSA AMANDA PUTRI', 'X-D', 88, 83, 84, 80, 84, 84, 84, 87, 87, 86, 82, 'Paket G', '2026-05-20 18:52:16'),
(19, 'SYAFAR KAUTFAR AHMAD YUSAR', 'X-C', 89, 83, 80, 86, 86, 84, 88, 85, 88, 86, 84, 'Paket E', '2026-05-20 18:52:16'),
(20, 'LILIS SETYOWATI', 'X-A', 87, 87, 84, 85, 83, 85, 86, 83, 88, 80, 84, 'Paket A', '2026-05-20 18:52:16'),
(21, 'VIRGIAN HERU NUGROHO', 'X-B', 80, 83, 83, 85, 83, 85, 86, 85, 85, 80, 84, 'Paket B', '2026-05-20 18:52:16'),
(22, 'ASEYKA GITA SASMITA RAHARJA', 'X-C', 89, 83, 81, 85, 86, 85, 86, 87, 88, 85, 86, 'Paket F', '2026-05-20 18:52:16'),
(23, 'NADYA HERLINA SETYA PUTRI', 'X-C', 88, 85, 88, 85, 87, 87, 88, 87, 88, 87, 86, 'Paket G', '2026-05-20 18:52:16'),
(24, 'FARIA AMANDA PERMATA PUTRI', 'X-B', 89, 86, 85, 86, 83, 86, 88, 83, 88, 88, 84, 'Paket D', '2026-05-20 18:52:16'),
(25, 'LIMAN CAROLINE MELYANA', 'X-C', 86, 82, 80, 85, 87, 85, 87, 83, 88, 87, 84, 'Paket C', '2026-05-20 18:52:17'),
(26, 'NAYOHA HERVIA APRILIANA', 'X-C', 85, 84, 80, 84, 82, 82, 87, 83, 86, 86, 83, 'Paket C', '2026-05-20 18:52:17'),
(27, 'MUHAMMAD NAUFAL FAHREZI', 'X-C', 89, 83, 80, 85, 87, 86, 88, 87, 88, 87, 86, 'Paket E', '2026-05-20 18:52:17'),
(28, 'DELLA APRILIA YOULANDA', 'X-B', 88, 84, 83, 85, 83, 85, 86, 85, 85, 80, 84, 'Paket A', '2026-05-20 18:52:17'),
(29, 'ALBANI FARREL IRVYNNO', 'X-B', 87, 87, 84, 85, 89, 85, 88, 83, 88, 80, 84, 'Paket C', '2026-05-20 18:52:17'),
(30, 'SHOKIB NUR AZIZ', 'X-D', 86, 84, 86, 81, 87, 84, 84, 80, 88, 85, 85, 'Paket A', '2026-05-20 18:52:17'),
(31, 'SALSABILA AGUSTINA', 'X-A', 86, 85, 82, 83, 84, 84, 84, 83, 86, 85, 80, 'Paket F', '2026-05-20 18:52:17'),
(32, 'ZAHWA ANASTASIA SUDIBYO', 'X-C', 85, 83, 81, 85, 86, 83, 85, 83, 85, 86, 83, 'Paket B', '2026-05-20 18:52:17'),
(33, 'INTAN NORA FIRDAUS', 'X-B', 87, 84, 88, 84, 87, 85, 87, 85, 88, 80, 83, 'Paket G', '2026-05-20 18:52:17'),
(34, 'NAUFARA ROHMANUDDIN', 'X-D', 88, 86, 86, 86, 85, 85, 87, 85, 88, 88, 86, 'Paket E', '2026-05-20 18:52:17'),
(35, 'AFRILIA DWI HERMAWANTI', 'X-F', 87, 83, 85, 77, 83, 83, 85, 83, 87, 86, 81, 'Paket C', '2026-05-20 18:52:17'),
(36, 'HEAVENSENT PAULOUIS ZAITUN', 'X-A', 87, 83, 85, 85, 84, 84, 87, 83, 88, 80, 83, 'Paket C', '2026-05-20 18:52:17'),
(37, 'MAHILDA RINTA AYUNDA', 'X-D', 87, 83, 86, 77, 83, 83, 87, 87, 88, 85, 84, 'Paket F', '2026-05-20 18:52:17'),
(38, 'SATRIO AJI SASONGKO', 'X-D', 88, 83, 86, 81, 88, 85, 84, 83, 88, 86, 85, 'Paket A', '2026-05-20 18:52:17'),
(39, 'ARRUNGGA RADITYA SULAKSONO', 'X-G', 86, 83, 86, 86, 90, 85, 86, 83, 88, 86, 86, 'Paket E', '2026-05-20 18:52:17'),
(40, 'SABIL LUTFIR RAHMAN', 'X-F', 86, 83, 84, 77, 83, 82, 85, 83, 86, 85, 82, 'Paket E', '2026-05-20 18:52:17'),
(41, 'DEEVA WAHYU ELVIANTO', 'X-C', 89, 83, 82, 86, 87, 86, 88, 87, 87, 86, 86, 'Paket D', '2026-05-20 18:52:17'),
(42, 'SILVANA EKA ANGESTI', 'X-D', 88, 86, 86, 82, 83, 83, 85, 85, 88, 85, 86, 'Paket C', '2026-05-20 18:52:17'),
(43, 'NAFI DANU ZANUAR', 'X-F', 86, 86, 85, 80, 84, 84, 87, 87, 87, 86, 86, 'Paket C', '2026-05-20 18:52:17'),
(44, 'RESWARA BHANU ADYATMA', 'X-A', 88, 86, 85, 84, 88, 85, 85, 87, 87, 80, 83, 'Paket A', '2026-05-20 18:52:17'),
(45, 'MAULANA RIDHO ARMANSYAH', 'X-B', 85, 84, 83, 85, 83, 85, 86, 83, 88, 80, 84, 'Paket B', '2026-05-20 18:52:17'),
(46, 'ADINDA EVI WULANDARI', 'X-D', 86, 82, 86, 85, 89, 84, 86, 83, 88, 87, 86, 'Paket A', '2026-05-20 18:52:17'),
(47, 'AVRIZALE WIRA AERA', 'X-A', 87, 83, 83, 83, 83, 84, 84, 85, 87, 80, 83, 'Paket G', '2026-05-20 18:52:17'),
(48, 'NOVITA LANI AGUSTINA', 'X-G', 87, 84, 87, 84, 85, 87, 87, 83, 86, 87, 86, 'Paket E', '2026-05-20 18:52:17'),
(49, 'SINTA DWI RAHAYU', 'X-B', 89, 86, 87, 84, 87, 86, 87, 85, 88, 80, 85, 'Paket C', '2026-05-20 18:52:17'),
(50, 'JOVITA NINA RASYIDA', 'X-B', 88, 85, 85, 83, 84, 85, 87, 83, 88, 80, 85, 'Paket F', '2026-05-20 18:52:17'),
(51, 'KHOFIFAH HIDAYAH', 'X-B', 86, 85, 81, 86, 84, 84, 86, 83, 88, 85, 84, 'Paket D', '2026-05-20 18:52:17'),
(52, 'AHMAD NUR ARIF ZENI ROHMAN', 'X-B', 85, 83, 84, 83, 83, 85, 86, 83, 88, 80, 83, 'Paket A', '2026-05-20 18:52:17'),
(53, 'WAFIQUL IRSYAD', 'X-A', 88, 86, 87, 83, 85, 85, 85, 87, 88, 80, 83, 'Paket G', '2026-05-20 18:52:17'),
(54, 'RIZKIA DWI PUTRI AJI', 'X-A', 88, 87, 85, 84, 85, 87, 86, 83, 85, 85, 85, 'Paket E', '2026-05-20 18:52:17'),
(55, 'NOVIAN ALI FAUZI', 'X-C', 87, 84, 81, 86, 83, 84, 87, 87, 85, 84, 82, 'Paket A', '2026-05-20 18:52:17'),
(56, 'AVEL BUNGA AZ-ZAHRA SYARIFA BAGYO', 'X-A', 89, 86, 85, 85, 88, 86, 89, 83, 88, 80, 88, 'Paket E', '2026-05-20 18:52:17'),
(57, 'SITI NUR HALIMAH', 'X-G', 88, 84, 85, 78, 85, 89, 84, 87, 86, 87, 90, 'Paket D', '2026-05-20 18:52:17'),
(58, 'MUHAMAD WAHYU ABDUL HAFID', 'X-G', 85, 83, 86, 84, 83, 84, 84, 87, 87, 86, 83, 'Paket G', '2026-05-20 18:52:17'),
(59, 'KURNIATUL AINI KARIMAH', 'X-F', 86, 82, 85, 80, 84, 84, 87, 87, 87, 86, 81, 'Paket F', '2026-05-20 18:52:17'),
(60, 'SITI NUR FATIMAH', 'X-E', 86, 84, 85, 82, 84, 85, 86, 83, 88, 88, 86, 'Paket G', '2026-05-20 18:52:17'),
(61, 'JAYA NITA PRATYA PUTRI DEWI', 'X-B', 88, 87, 87, 86, 88, 85, 88, 83, 88, 85, 85, 'Paket F', '2026-05-20 18:52:17'),
(62, 'PUTRI WAHYUNE SRI WULANSARI', 'X-D', 86, 83, 84, 89, 84, 85, 86, 83, 88, 84, 84, 'Paket C', '2026-05-20 18:52:17'),
(63, 'MUSTIKA NURFIDA. G', 'X-G', 87, 83, 85, 78, 83, 83, 85, 85, 86, 85, 83, 'Paket A', '2026-05-20 18:52:17'),
(64, 'TIRA KARISMAWATI', 'X-E', 87, 85, 86, 84, 89, 85, 87, 83, 87, 85, 86, 'Paket D', '2026-05-20 18:52:17'),
(65, 'RAHMAT HIDAYATULLAH', 'X-A', 85, 85, 84, 84, 84, 84, 86, 83, 86, 80, 83, 'Paket C', '2026-05-20 18:52:17'),
(66, 'ANIQ FARICHATUS ZAHWA', 'X-C', 85, 83, 80, 83, 82, 82, 85, 83, 85, 84, 82, 'Paket D', '2026-05-20 18:52:17'),
(67, 'UMMU HABIBAH WULANDARI', 'X-G', 89, 83, 85, 77, 84, 85, 86, 83, 86, 86, 84, 'Paket E', '2026-05-20 18:52:17'),
(68, 'ZHARFAN IZZATUL FASIH', 'X-A', 89, 85, 85, 86, 86, 86, 87, 85, 87, 80, 85, 'Paket B', '2026-05-20 18:52:17'),
(69, 'SYAFIQAH FITRI NATASYA', 'X-D', 88, 83, 86, 87, 83, 84, 86, 83, 88, 88, 86, 'Paket G', '2026-05-20 18:52:17'),
(70, 'AXELLY TANAYA', 'X-F', 85, 83, 86, 81, 83, 83, 85, 87, 87, 87, 82, 'Paket C', '2026-05-20 18:52:17'),
(71, 'NICKY DWI MEILANA', 'X-B', 86, 83, 87, 85, 90, 84, 88, 87, 88, 80, 84, 'Paket E', '2026-05-20 18:52:17'),
(72, 'ANDINI AINUR RAHMA', 'X-B', 87, 84, 85, 83, 84, 85, 86, 87, 88, 80, 83, 'Paket C', '2026-05-20 18:52:17'),
(73, 'SAFIRA APRILIYANI', 'X-F', 85, 85, 85, 83, 84, 84, 86, 83, 88, 88, 87, 'Paket G', '2026-05-20 18:52:17'),
(74, 'TETY MELINDA SARI', 'X-B', 89, 86, 85, 85, 83, 85, 86, 85, 88, 80, 83, 'Paket C', '2026-05-20 18:52:17'),
(75, 'CHINTYA KUSUMA HANDAYANI', 'X-G', 85, 83, 85, 77, 84, 82, 86, 83, 87, 86, 82, 'Paket F', '2026-05-20 18:52:17'),
(76, 'DEA AYU NOVITA PUTRI', 'X-D', 87, 84, 84, 85, 83, 83, 86, 87, 88, 85, 84, 'Paket E', '2026-05-20 18:52:17'),
(77, 'ILHAM ROIS RASID', 'X-C', 85, 83, 80, 85, 82, 83, 85, 87, 88, 86, 84, 'Paket G', '2026-05-20 18:52:17'),
(78, 'ADE ASSOF WANI', 'X-F', 86, 83, 86, 85, 83, 83, 85, 85, 87, 86, 83, 'Paket G', '2026-05-20 18:52:17'),
(79, 'MUHAMMAD RAYHAN FAHMI', 'X-G', 86, 84, 85, 81, 84, 84, 85, 83, 87, 87, 85, 'Paket C', '2026-05-20 18:52:17'),
(80, 'LAILATUL FITROTI NUR HIDAYAH', 'X-D', 87, 83, 86, 83, 83, 84, 85, 87, 88, 86, 83, 'Paket A', '2026-05-20 18:52:17'),
(81, 'HAFIDZ SEAN OSADHA', 'X-E', 86, 83, 86, 78, 83, 83, 87, 83, 88, 88, 82, 'Paket B', '2026-05-20 18:52:17'),
(82, 'ALIF AL FATIHAH', 'X-F', 86, 84, 85, 84, 85, 84, 87, 87, 88, 85, 87, 'Paket A', '2026-05-20 18:52:17'),
(83, 'AGUS ALI AL HAKIM', 'X-G', 85, 84, 87, 85, 90, 85, 86, 83, 88, 86, 85, 'Paket C', '2026-05-20 18:52:17'),
(84, 'NADIA AZZERIN DAIYANA', 'X-E', 86, 83, 85, 80, 83, 83, 86, 87, 87, 85, 84, 'Paket C', '2026-05-20 18:52:17'),
(85, 'MUSTOFA ALAM NUGROHO', 'X-E', 85, 83, 86, 78, 83, 83, 86, 87, 87, 86, 80, 'Paket E', '2026-05-20 18:52:17'),
(86, 'VANNYA ALYSA P', 'X-F', 86, 83, 86, 83, 83, 84, 87, 83, 88, 86, 87, 'Paket A', '2026-05-20 18:52:17'),
(87, 'EKA SATRIA SANDY PUTRA', 'X-G', 87, 83, 85, 78, 83, 83, 83, 87, 87, 87, 82, 'Paket C', '2026-05-20 18:52:17'),
(88, 'ADINDA RHIZKY KARUNIA PUTRI', 'X-G', 87, 83, 86, 82, 84, 82, 84, 85, 87, 87, 82, 'Paket G', '2026-05-20 18:52:17'),
(89, 'PUTRI SOLIHATIN', 'X-F', 86, 84, 86, 82, 83, 84, 86, 83, 87, 86, 82, 'Paket F', '2026-05-20 18:52:17'),
(90, 'AURA AYU RAMADHANI', 'X-B', 86, 83, 87, 85, 83, 85, 87, 85, 88, 85, 83, 'Paket A', '2026-05-20 18:52:17'),
(91, 'IMELIA LATIFA', 'X-D', 89, 84, 86, 87, 84, 86, 87, 87, 88, 86, 85, 'Paket C', '2026-05-20 18:52:17'),
(92, 'ETIKA RAHMA SETYA', 'X-G', 86, 82, 85, 79, 86, 83, 85, 85, 87, 86, 82, 'Paket B', '2026-05-20 18:52:17'),
(93, 'SHAFA WIJDAN NATHANIELA', 'X-F', 86, 86, 85, 82, 83, 83, 87, 85, 87, 86, 82, 'Paket B', '2026-05-20 18:52:17'),
(94, 'ACHMAD FAHMI', 'X-E', 86, 83, 86, 78, 84, 82, 86, 83, 88, 87, 83, 'Paket A', '2026-05-20 18:52:17'),
(95, 'SITI NUR KHOLISHOH', 'X-E', 86, 83, 86, 77, 83, 82, 85, 80, 87, 87, 80, 'Paket F', '2026-05-20 18:52:17'),
(96, 'MOH. FAKHIN ROZAQ', 'X-C', 89, 84, 84, 85, 85, 85, 88, 83, 88, 84, 85, 'Paket C', '2026-05-20 18:52:17'),
(97, 'NAFAIZA FITRA DINOVA', 'X-G', 85, 83, 85, 85, 83, 82, 84, 85, 86, 86, 82, 'Paket A', '2026-05-20 18:52:17'),
(98, 'ROYHAN ASWANGGA', 'X-F', 85, 84, 85, 78, 83, 83, 85, 83, 88, 85, 83, 'Paket E', '2026-05-20 18:52:17'),
(99, 'SIFAUL KHULUF', 'X-G', 84, 83, 85, 80, 84, 83, 84, 80, 88, 87, 81, 'Paket B', '2026-05-20 18:52:17'),
(100, 'ICHA ARDELLIA NOVITA', 'X-G', 85, 82, 86, 82, 84, 85, 86, 87, 88, 85, 86, 'Paket E', '2026-05-20 18:52:17'),
(101, 'VIRA FIRNANDA PUTRI AVI OKTAFIA', 'X-C', 87, 83, 80, 86, 88, 85, 84, 83, 88, 86, 84, 'Paket G', '2026-05-20 18:52:17'),
(102, 'BELA SAFITRI DEWI', 'X-G', 86, 86, 84, 87, 85, 84, 87, 87, 87, 86, 86, 'Paket F', '2026-05-20 18:52:17'),
(103, 'FERIZAL DIMAS SAPUTRA', 'X-F', 85, 86, 85, 83, 89, 83, 86, 85, 86, 88, 85, 'Paket D', '2026-05-20 18:52:17'),
(104, 'DELLA LIANA MASRIFAH', 'X-A', 86, 86, 82, 85, 83, 85, 86, 85, 87, 80, 84, 'Paket C', '2026-05-20 18:52:17'),
(105, 'SOFIA NUR ROHMAH', 'X-D', 86, 84, 84, 83, 89, 84, 86, 83, 88, 83, 86, 'Paket E', '2026-05-20 18:52:17'),
(106, 'SITI ROHMA', 'X-C', 86, 84, 81, 85, 86, 84, 86, 85, 88, 86, 87, 'Paket E', '2026-05-20 18:52:17'),
(107, 'AHMADA FIRDAUS SAPUTRA', 'X-D', 86, 83, 86, 84, 84, 84, 85, 87, 87, 87, 83, 'Paket A', '2026-05-20 18:52:17'),
(108, 'AYU DZIKROTUR ROHMAH', 'X-E', 87, 86, 84, 82, 83, 83, 86, 87, 87, 87, 84, 'Paket G', '2026-05-20 18:52:17'),
(109, 'ALVIANO FEBRIAN SITUMORANG', 'X-F', 87, 83, 85, 85, 83, 84, 86, 83, 87, 85, 87, 'Paket E', '2026-05-20 18:52:17'),
(110, 'RATNA DWI LESTARI', 'X-C', 89, 85, 81, 86, 86, 85, 85, 87, 88, 86, 85, 'Paket G', '2026-05-20 18:52:17'),
(111, 'LABIBA ELVARETTA NURCAHYA PUTRI', 'X-A', 88, 83, 85, 84, 84, 85, 86, 83, 87, 80, 84, 'Paket B', '2026-05-20 18:52:17'),
(112, 'ANNAS SYAIFULLOH', 'X-D', 86, 84, 86, 84, 84, 84, 87, 87, 88, 85, 86, 'Paket G', '2026-05-20 18:52:17'),
(113, 'ARDI PUTRA RAMADHAN', 'X-A', 87, 87, 86, 85, 84, 88, 85, 85, 87, 80, 86, 'Paket A', '2026-05-20 18:52:17'),
(114, 'LUTVIAH MIRZA KAARISTINA', 'X-D', 88, 83, 86, 81, 86, 85, 85, 87, 88, 86, 85, 'Paket E', '2026-05-20 18:52:17'),
(115, 'BANY RIKHADATUL AISY', 'X-D', 88, 83, 84, 83, 83, 84, 88, 83, 88, 85, 84, 'Paket A', '2026-05-20 18:52:17'),
(116, 'INTAN MEI SAROH', 'X-F', 86, 82, 86, 79, 84, 83, 86, 83, 86, 86, 81, 'Paket G', '2026-05-20 18:52:17'),
(117, 'ERIK FERDIAN DWI PERMANA', 'X-D', 87, 84, 86, 87, 87, 85, 86, 85, 88, 85, 86, 'Paket F', '2026-05-20 18:52:17'),
(118, 'ANDI AMANDA PUTRI APRILIA', 'X-C', 85, 83, 81, 85, 83, 84, 86, 83, 87, 88, 83, 'Paket A', '2026-05-20 18:52:17'),
(119, 'VIOLYNA SERE NAKAHAYA', 'X-D', 86, 83, 86, 80, 83, 84, 85, 85, 85, 88, 85, 'Paket C', '2026-05-20 18:52:17'),
(120, 'RAHMA AULIA KUSUMA', 'X-A', 89, 86, 85, 84, 84, 85, 87, 83, 86, 80, 84, 'Paket D', '2026-05-20 18:52:17'),
(121, 'DIVA ANGGRAENI', 'X-E', 86, 83, 86, 77, 83, 83, 86, 87, 87, 85, 84, 'Paket F', '2026-05-20 18:52:17'),
(122, 'AHMAD ALY AULIYA RAHMAN', 'X-A', 89, 85, 83, 85, 84, 85, 85, 85, 87, 80, 84, 'Paket B', '2026-05-20 18:52:17'),
(123, 'NOVAL PRATAMA PUTRA', 'X-G', 86, 83, 85, 77, 83, 83, 84, 83, 87, 85, 82, 'Paket C', '2026-05-20 18:52:17'),
(124, 'YESIKA AGUSTINA', 'X-B', 88, 86, 83, 84, 84, 85, 87, 85, 85, 85, 84, 'Paket B', '2026-05-20 18:52:17'),
(125, 'LUJENG LUTHFIYAH', 'X-A', 89, 86, 87, 85, 85, 85, 86, 83, 88, 85, 83, 'Paket A', '2026-05-20 18:52:17'),
(126, 'NABILA AINUN FAJRI ANANTA', 'X-B', 86, 87, 87, 84, 85, 85, 88, 83, 88, 80, 85, 'Paket D', '2026-05-20 18:52:17'),
(127, 'ALFIATUL MUNIRO', 'X-B', 86, 85, 84, 86, 84, 85, 86, 85, 88, 80, 83, 'Paket E', '2026-05-20 18:52:17'),
(128, 'ANNISA USWATUN KHASANAH', 'X-B', 87, 83, 84, 85, 83, 85, 88, 85, 85, 80, 83, 'Paket B', '2026-05-20 18:52:17'),
(129, 'MEI ERMAWATI', 'X-E', 85, 83, 85, 77, 85, 83, 84, 83, 87, 88, 80, 'Paket B', '2026-05-20 18:52:17'),
(130, 'IRSA HARIS FATMIR REZA', 'X-E', 86, 84, 85, 77, 83, 83, 85, 83, 87, 85, 80, 'Paket E', '2026-05-20 18:52:17'),
(131, 'IKMAL MAULANA', 'X-E', 85, 84, 85, 79, 83, 83, 87, 83, 87, 85, 82, 'Paket D', '2026-05-20 18:52:17'),
(132, 'BAGUS CHANDRA WIBOWO', 'X-C', 86, 85, 80, 86, 85, 84, 86, 87, 87, 87, 84, 'Paket F', '2026-05-20 18:52:17'),
(133, 'KALANDRA AZRIEL SYAMSUDHIN HARIYANTO', 'X-G', 85, 83, 85, 82, 83, 83, 84, 87, 87, 86, 83, 'Paket D', '2026-05-20 18:52:17'),
(134, 'FITTA LARAS WATI', 'X-B', 88, 84, 86, 83, 84, 85, 87, 85, 85, 85, 84, 'Paket E', '2026-05-20 18:52:17'),
(135, 'ZANUBA ARIFATUL CHOFSOH', 'X-F', 87, 83, 86, 81, 90, 83, 86, 83, 86, 85, 86, 'Paket C', '2026-05-20 18:52:17'),
(136, 'ADITYA JAYA MAHENDRA WAHYUDI', 'X-C', 88, 84, 86, 86, 87, 85, 86, 85, 88, 85, 85, 'Paket A', '2026-05-20 18:52:17'),
(137, 'AUZAN ABRAR ALRAFI', 'X-F', 86, 84, 84, 78, 86, 83, 87, 85, 87, 88, 87, 'Paket G', '2026-05-20 18:52:17'),
(138, 'RIZA AZZAHRA RAMADHANI', 'X-F', 87, 86, 83, 77, 83, 83, 84, 87, 86, 85, 85, 'Paket D', '2026-05-20 18:52:17'),
(139, 'SITI KHOLIFATUN NISA', 'X-G', 85, 84, 85, 84, 84, 85, 87, 83, 87, 87, 87, 'Paket A', '2026-05-20 18:52:17'),
(140, 'MARTA LIDIA WATI', 'X-G', 87, 83, 86, 80, 84, 84, 87, 83, 87, 87, 85, 'Paket E', '2026-05-20 18:52:17'),
(141, 'BUNTARA ALIM WIJAYA', 'X-D', 86, 83, 85, 86, 83, 84, 85, 83, 85, 86, 83, 'Paket A', '2026-05-20 18:52:17'),
(142, 'MARLITA APRILIA PUTRI', 'X-F', 88, 83, 85, 77, 84, 83, 85, 83, 87, 86, 81, 'Paket F', '2026-05-20 18:52:17'),
(143, 'ANDRE PRASTYO WIRA KUSUMA', 'X-A', 87, 84, 85, 83, 83, 84, 85, 83, 87, 85, 84, 'Paket C', '2026-05-20 18:52:17'),
(144, 'VANNESYA JULIA PUTRI', 'X-E', 85, 83, 86, 82, 85, 85, 88, 87, 87, 88, 87, 'Paket E', '2026-05-20 18:52:17'),
(145, 'AHMAD RIHAN UBAIDILLAH', 'X-G', 84, 84, 87, 88, 89, 84, 87, 83, 88, 87, 85, 'Paket B', '2026-05-20 18:52:17'),
(146, 'RAFI RAHMAN SHAH', 'X-A', 88, 84, 84, 84, 84, 87, 86, 83, 85, 80, 84, 'Paket D', '2026-05-20 18:52:17'),
(147, 'BATHARI ASRI HANDAYANI', 'X-G', 87, 83, 84, 77, 83, 83, 85, 83, 87, 86, 82, 'Paket G', '2026-05-20 18:52:17'),
(148, 'SHOLIHATIN NISA', 'X-B', 87, 85, 86, 85, 84, 86, 87, 83, 88, 80, 84, 'Paket A', '2026-05-20 18:52:17'),
(149, 'MIA HENY NELAWATI', 'X-B', 88, 87, 87, 84, 86, 85, 87, 87, 85, 85, 84, 'Paket A', '2026-05-20 18:52:17'),
(150, 'MUHLISHOTUL AMALIA', 'X-E', 86, 84, 85, 86, 83, 83, 84, 87, 87, 84, 82, 'Paket C', '2026-05-20 18:52:17'),
(151, 'FIGO HERTANSYA ALAY', 'X-F', 86, 83, 85, 79, 88, 84, 87, 83, 88, 87, 85, 'Paket E', '2026-05-20 18:52:17'),
(152, 'HANDAYANI KARTIKA SARI', 'X-E', 87, 85, 86, 78, 83, 84, 87, 83, 88, 87, 84, 'Paket A', '2026-05-20 18:52:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','guru','siswa') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nis` varchar(20) DEFAULT NULL,
  `nip` varchar(30) DEFAULT NULL,
  `kelas` varchar(10) DEFAULT NULL,
  `telepon` varchar(15) DEFAULT NULL,
  `alamat` text,
  `tanggal_lahir` date DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `reset_token` text,
  `reset_expired` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `created_at`, `nis`, `nip`, `kelas`, `telepon`, `alamat`, `tanggal_lahir`, `tempat_lahir`, `foto`, `reset_token`, `reset_expired`) VALUES
(99, 'HAFIDZ HAIDAR AMRU HIDAYAT', 'siswa1@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(100, 'NIMAS AYU SAYUTI', 'siswa2@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(101, 'WANDA APRILIA MAULANI', 'siswa3@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(102, 'FARA SEFTIYANI', 'siswa4@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(103, 'ACHMAD HAFIT DWI CAHYONO', 'siswa5@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(104, 'PRIYO SETIO UTOMO', 'siswa6@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(105, 'MAYLAFIA NUR SETIYANDA', 'siswa7@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(106, 'BELLA AMEYLIA ROSAFA', 'siswa8@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(107, 'SUTAN FERDIN ARDIANSYAH', 'siswa9@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(108, 'MOCH. HERRIS ARDIANSHAH', 'siswa10@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(109, 'FAIRUZ HAZNA\' ROFIFAH', 'siswa11@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(110, 'MUHAMMAD MUHYIDDIN', 'siswa12@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(111, 'DWI PRIYO UTOMO', 'siswa13@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(112, 'NATASA SITI AJI ASMUNI', 'siswa14@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(113, 'AULIA DINAR ROSYADIN', 'siswa15@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(114, 'FREDIKA ARIANTO', 'siswa16@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(115, 'HANUM SAL SABILA', 'siswa17@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(116, 'DIYAH AYU IKAWATI', 'siswa18@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(117, 'RAPHAEL KRISNA YUDHA ASMARA', 'siswa19@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(118, 'NUR BEY FIRMANSYAH', 'siswa20@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(119, 'ANGGRAENI AYU WIDIYANTI', 'siswa21@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(120, 'NURUL AFIFAH PUSPITA SARI', 'siswa22@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(121, 'SITI NURUL HIDAYATI', 'siswa23@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(122, 'NA`IMATUN HASANAH', 'siswa24@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(123, 'MERRY NOVITADEWI', 'siswa25@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(124, 'FIRDA KHILYATUS SHOLIKHAH', 'siswa26@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(125, 'AIMAR REYHAN PRANANDA', 'siswa27@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(126, 'ALFIA AMALIA SYAHRO', 'siswa28@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(127, 'SITI NADIYATUL MA\'ARIF', 'siswa29@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(128, 'AKTIF EKA RIANTO', 'siswa30@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(129, 'RAFIF ZAKARIA SUHARIANSYAH', 'siswa31@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(130, 'NISA MAULIDUL HIDAYAH', 'siswa32@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(131, 'NURUL \'IZZAH LATHIFATUR RAHMAH', 'siswa33@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(132, 'ERICA AMELIA NUR KUMALASARI', 'siswa34@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(133, 'LUBAABAH', 'siswa35@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(134, 'OLIVIA RIKA SABELA', 'siswa36@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(135, 'ADIB SHOFIYA RAKHMAN TRI PUTRA', 'siswa37@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(136, 'ADELIA PRATIWI', 'siswa38@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(137, 'ANI RISMA LATIF', 'siswa39@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(138, 'SELLY IMELDHA', 'siswa40@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(139, 'VRISKA DWI APRILIA VIANTI', 'siswa41@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(140, 'AYUB DIAN AGUSTIN', 'siswa42@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(141, 'CHRISMA TIKA ARIYANTI', 'siswa43@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(142, 'ALIEFTA LAISA SALSABILLA', 'siswa44@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(143, 'SINDI AMELIA KARIN', 'siswa45@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(144, 'PUTRI RAHMALIYA', 'siswa46@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(145, 'FIFIN ENDRIYANA FORISKI', 'siswa47@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(146, 'REVIA EKA DIAN APRILIA', 'siswa48@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(147, 'MAESA SUKMA AYU', 'siswa49@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(148, 'DWI NUR AULIA RAHMA OKTAVIANA', 'siswa50@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(149, 'DWI ANGGARA ADE SUMARTONO', 'siswa51@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(150, 'AMAR MUSLIKH', 'siswa52@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(151, 'ARUM RAHMAWATI', 'siswa53@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(152, 'DEVITA DWI AGUSTINA', 'siswa54@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(153, 'MUHAMMAD TEGAR RAMADHANI', 'siswa55@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(154, 'MAULIDYA AMARA HASNA', 'siswa56@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(155, 'SITI FAUZIYAH', 'siswa57@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(156, 'RYANTA EKA SAPUTRA', 'siswa58@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(157, 'IBNA ALFERA LATIFAH', 'siswa59@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(158, 'LULUK', 'siswa60@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(159, 'AISYAH PUTRI WANTASEN', 'siswa61@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(160, 'ALLI HANDI', 'siswa62@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(161, 'ABDUL KHOLIK', 'janda8500@gmail.com', '$2b$10$CO3aLu8G7lI65Qd6npmZOe5WMd0LVVA8AFsuzC1yMIZOxjanDaCnO', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, '/uploads/photos/user_161_1779377426513.jpg', '2f9d5c4a4aa304fe27e95376bea72123233789bbed2e6acc4f60c30c296b80bb', '2026-05-21 23:51:28'),
(162, 'MUFIDATUL DEVINDA', 'siswa64@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(163, 'ABRILLIANTY TIVANY SURYA PUTRI', 'siswa65@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(164, 'IRDYA KHOLIS AFRISALSYA', 'siswa66@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(165, 'ANNISA DWI PUSPITASARI', 'siswa67@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(166, 'FAISOL GILANG ZAKARIA', 'siswa68@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(167, 'AHMAD HUSEN ANWAR', 'siswa69@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(168, 'SITI NUR ATIKAH', 'siswa70@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(169, 'MUHAMMAD DANY NUR AZIZ', 'siswa71@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(170, 'DEVIA FATIMATUS AZARO', 'siswa72@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(171, 'REFITA ANGGRAENI BASUKI', 'siswa73@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(172, 'MOCHAMMAD ZAIN IRSYAD ISLAMI', 'siswa74@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(173, 'IMMA FAUZIYAH', 'siswa75@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(174, 'MEI WULANDARI', 'siswa76@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(175, 'ANNISA EDELWEISS', 'siswa77@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(176, 'DEVITA NANDRA ARIANI', 'siswa78@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-G', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(177, 'ZARATUL AZIZAH', 'siswa79@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(178, 'NIDYA DIAN PRASASTY', 'siswa80@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(179, 'ARIL ADI TARA', 'siswa81@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(180, 'HENGKI ANDRIYANSYAH', 'siswa82@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(181, 'MUHAMMAD FIRMANSYAH', 'siswa83@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(182, 'ALFINDA FAUZIYAH PUTRI', 'siswa84@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-D', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(183, 'NICKY', 'siswa85@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(184, 'SRI INDARWATI HARDINI', 'siswa86@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-A', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(185, 'RAHMA KHOIRUNNISA', 'siswa87@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(186, 'QURROTA A\'YUNI', 'siswa88@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(187, 'SITI JULAINDAH SARI', 'siswa89@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(188, 'KAMELIA AFIFATUS ZAHRO', 'siswa90@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(189, 'JOAN MARCELLINO REYNALDI', 'siswa91@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(190, 'AHMAD DEDY PRASETYAWAN', 'siswa92@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(191, 'DINATUR ROHMAH BRILIANA', 'siswa93@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(192, 'NOFI PUTRIYANI', 'siswa94@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(193, 'AHMAD SYAHRUL ROFIQI', 'siswa95@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(194, 'SITI DEWIMAHARANI', 'siswa96@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-B', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(195, 'RAHMASARI NABILLA AMROZI PUTRI', 'siswa97@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-E', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(196, 'QUEEN SILA BANOWATI', 'siswa98@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(197, 'GEMA IZZAD AL KARAMI', 'siswa99@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-C', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(198, 'MOCH. SULTHONIC HAKIKI', 'fadhilpraa2024@gmail.com', '$2b$10$m23BnuJniOcbM6sCK3f5sOfN9Qkb.USiZ1xrNkzEdGp46X31IGBSi', 'siswa', '2026-05-20 18:52:17', NULL, NULL, 'X-F', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(199, 'Administrator', 'admin@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'admin', '2026-05-20 18:53:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200, 'Guru BK', 'guru@gmail.com', '$2b$10$dnhMtB0ogKOaQnH518AFm.swcM/niyoObO/skIs35242rj1KEFZZC', 'guru', '2026-05-20 18:53:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `student_scores`
--
ALTER TABLE `student_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_student_scores_user` (`user_id`);

--
-- Indexes for table `training_data`
--
ALTER TABLE `training_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_scores`
--
ALTER TABLE `student_scores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `training_data`
--
ALTER TABLE `training_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `fk_siswa_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_scores`
--
ALTER TABLE `student_scores`
  ADD CONSTRAINT `fk_student_scores_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
