-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
<<<<<<< HEAD
-- Tiempo de generación: 11-03-2024 a las 09:53:35
=======
-- Tiempo de generación: 12-03-2024 a las 04:25:27
>>>>>>> 9a8d32a (Ejecutar con Live Server)
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `manzanas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manzanas`
--

CREATE TABLE `manzanas` (
  `idManzana` int(11) NOT NULL,
  `nombreManzana` varchar(30) DEFAULT NULL,
  `direccionManzana` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `manzanas`
--

INSERT INTO `manzanas` (`idManzana`, `nombreManzana`, `direccionManzana`) VALUES
(1, 'Guayaba', 'Cra 12A #51-98'),
(2, 'Papaya', 'Cra 10A #95-85'),
(3, 'Chontaduro', 'Cra 14B #63-45'),
(4, 'Remolacha', 'Cra 100 #65-98'),
(5, 'Mamoncillo', 'Cra 65 #98-57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manzanas_servicios`
--

CREATE TABLE `manzanas_servicios` (
  `idManzanaFK` int(11) DEFAULT NULL,
<<<<<<< HEAD
  `idServicioFK` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
=======
  `idServicioFK` int(11) DEFAULT NULL
>>>>>>> 9a8d32a (Ejecutar con Live Server)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `manzanas_servicios`
--

<<<<<<< HEAD
INSERT INTO `manzanas_servicios` (`idManzanaFK`, `idServicioFK`, `fecha`) VALUES
(1, 1, NULL),
(1, 3, NULL),
(1, 5, NULL),
(1, 7, NULL),
(2, 2, NULL),
(2, 4, NULL),
(2, 3, NULL),
(2, 6, NULL),
(2, 8, NULL),
(3, 1, NULL),
(3, 3, NULL),
(3, 5, NULL),
(4, 1, NULL),
(4, 5, NULL),
(4, 6, NULL),
(5, 8, NULL),
(5, 3, NULL),
(5, 7, NULL);
=======
INSERT INTO `manzanas_servicios` (`idManzanaFK`, `idServicioFK`) VALUES
(1, 1),
(1, 3),
(1, 5),
(1, 7),
(2, 2),
(2, 4),
(2, 3),
(2, 6),
(2, 8),
(3, 1),
(3, 3),
(3, 5),
(4, 1),
(4, 5),
(4, 6),
(5, 8),
(5, 3),
(5, 7);
>>>>>>> 9a8d32a (Ejecutar con Live Server)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idServicio` int(11) NOT NULL,
  `nombreServicio` varchar(30) DEFAULT NULL,
  `tipoServicio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idServicio`, `nombreServicio`, `tipoServicio`) VALUES
(1, 'Cine', 'Entretenimiento'),
(2, 'Piscina', 'Deporte'),
(3, 'Gimnasio', 'Deporte'),
(4, 'Cocina', 'Gastronomía'),
(5, 'Lavandería', 'Aseo'),
(6, 'Coser', 'Maquinaría'),
(7, 'Yoga', 'Deporte'),
(8, 'Librería', 'Entretenimiento'),
(12, 'PROBAR CAMBIO DE NOMBRE Y TIPO', 'Aseo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `idSolicitud` int(11) NOT NULL,
  `idUsuarioFK` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `codigoServicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `tipoDoc` varchar(5) DEFAULT NULL,
  `doc` int(10) DEFAULT NULL,
  `idManzanaFK` int(10) DEFAULT NULL,
  `rol` set('Usuario','Administrador') DEFAULT 'Usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `tipoDoc`, `doc`, `idManzanaFK`, `rol`) VALUES
<<<<<<< HEAD
(1, 'user', 'T.I', 456, 5, 'Usuario'),
(2, 'admin', 'C.C', 123, 2, 'Administrador'),
(16, 'Tio Gilipollas', 'C.C', 750, 3, 'Usuario'),
(17, 'gurrupleta kawai', 'C.C', 111, 2, 'Administrador');
=======
(1, 'user', 'C.C', 456, 5, 'Usuario'),
(2, 'admin', 'C.C', 123, 2, 'Administrador'),
(16, 'Tio Gilipollas', 'C.C', 750, 3, 'Usuario'),
(17, 'gurrupleta kawai', 'C.C', 111, 2, 'Administrador'),
(19, 'Oswaldo Usuario', 'C.C', 123456, 2, 'Usuario'),
(20, 'Oswaldo Admin', 'T.I', 123456, 5, 'Administrador');
>>>>>>> 9a8d32a (Ejecutar con Live Server)

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `manzanas`
--
ALTER TABLE `manzanas`
  ADD PRIMARY KEY (`idManzana`);

--
-- Indices de la tabla `manzanas_servicios`
--
ALTER TABLE `manzanas_servicios`
  ADD KEY `fk_manzanas1` (`idManzanaFK`),
  ADD KEY `fk_servicios` (`idServicioFK`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idServicio`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD KEY `solicitud_usu` (`idUsuarioFK`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fk_manzanas` (`idManzanaFK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `manzanas`
--
ALTER TABLE `manzanas`
<<<<<<< HEAD
  MODIFY `idManzana` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
=======
  MODIFY `idManzana` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
>>>>>>> 9a8d32a (Ejecutar con Live Server)

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idServicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
<<<<<<< HEAD
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
=======
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
>>>>>>> 9a8d32a (Ejecutar con Live Server)

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
<<<<<<< HEAD
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
=======
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
>>>>>>> 9a8d32a (Ejecutar con Live Server)

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `manzanas_servicios`
--
ALTER TABLE `manzanas_servicios`
  ADD CONSTRAINT `fk_manzanas1` FOREIGN KEY (`idManzanaFK`) REFERENCES `manzanas` (`idManzana`),
  ADD CONSTRAINT `fk_servicios` FOREIGN KEY (`idServicioFK`) REFERENCES `servicios` (`idServicio`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitud_usu` FOREIGN KEY (`idUsuarioFK`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_manzanas` FOREIGN KEY (`idManzanaFK`) REFERENCES `manzanas` (`idManzana`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
