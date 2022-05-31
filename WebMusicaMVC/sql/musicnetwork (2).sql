DROP DATABASE IF EXISTS musicnetwork;
CREATE DATABASE musicnetwork;

USE musicnetwork;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-05-2022 a las 17:55:00
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `musicnetwork`
--

-- --------------------------------------------------------

DROP TABLE IF EXISTS `seguidores`;
DROP TABLE IF EXISTS `comentarios`;
DROP TABLE IF EXISTS `comentarios_publicaciones`;
DROP TABLE IF EXISTS `megusta`;
DROP TABLE IF EXISTS `publicaciones`;
DROP TABLE IF EXISTS `tipos_archivos`;
DROP TABLE IF EXISTS `temas`;
DROP TABLE IF EXISTS `foros`;
DROP TABLE IF EXISTS `usuarios`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(30) NOT NULL,
  `tag` varchar(15) NOT NULL,
  `foto_perfil` varchar(40) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `email_verificado` tinyint(1) NOT NULL DEFAULT '0',
  `cancion` varchar(20) DEFAULT NULL,
  `foto_fondo` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `UK_tag` (`tag`) USING BTREE,
  UNIQUE KEY `UK_email` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros`
--

CREATE TABLE IF NOT EXISTS `foros` (
  `id_foro` int(4) NOT NULL,
  `nombre_foro` varchar(15) NOT NULL,
  PRIMARY KEY (`id_foro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE IF NOT EXISTS `temas` (
  `id_tema` int(10) NOT NULL,
  `titulo` varchar(20) NOT NULL,
  `fecha_publicacion` datetime NOT NULL,
  `id_usuario` int(10) NOT NULL,
  `id_foro` int(4) NOT NULL,
  PRIMARY KEY (`id_tema`),
  KEY `fk_temas_usuario` (`id_usuario`),
  KEY `fk_temas_foro` (`id_foro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE IF NOT EXISTS `comentarios` (
  `id_comentario` int(10) NOT NULL AUTO_INCREMENT,
  `fecha_publicacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mensaje` varchar(300) NOT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `audio` varchar(200) DEFAULT NULL,
  `id_tema` int(10) NOT NULL,
  `id_usuario` int(10) NOT NULL,
  PRIMARY KEY (`id_comentario`),
  KEY `fk_comentarios_tema` (`id_tema`),
  KEY `fk_comentarios_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id_publicacion` int(10) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(10) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `texto` varchar(250) NOT NULL,
  `archivo` varchar(30) NOT NULL,
  `tipo_archivo` int(4) NOT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_publicacion`),
  KEY `fk_publicaciones_usuario` (`id_usuario`),
  KEY `publicaciones_fk_2` (`tipo_archivo`
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_publicaciones`
--

CREATE TABLE IF NOT EXISTS `comentarios_publicaciones` (
  `id_comentario` int(10) NOT NULL AUTO_INCREMENT,
  `id_publicacion` int(10) NOT NULL,
  `id_usuario` int(10) NOT NULL,
  `texto` text NOT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comentario`,`id_publicacion`),
  KEY `fk_comentarios_publicacion_usuario` (`id_usuario`),
  KEY `id_publicacion` (`id_publicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `megusta`
--

DROP TABLE IF EXISTS `megusta`;
CREATE TABLE IF NOT EXISTS `megusta` (
  `id_usuario` int(10) NOT NULL,
  `id_publicacion` int(10) NOT NULL,
  PRIMARY KEY (`id_publicacion`,`id_usuario`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguidores`
--

CREATE TABLE IF NOT EXISTS `seguidores` (
  `seguidor` int(10) NOT NULL,
  `seguido` int(10) NOT NULL,
  PRIMARY KEY (`seguidor`,`seguido`),
  KEY `fk_seguido_usuario` (`seguido`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `tipos_archivos`
--

DROP TABLE IF EXISTS `tipos_archivos`;
CREATE TABLE IF NOT EXISTS `tipos_archivos` (
  `id_archivo` int(4) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_archivo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipos_archivos`
--

INSERT INTO `tipos_archivos` (`id_archivo`, `nombre`) VALUES
(1, 'audio'),
(2, 'imagen'),
(3, 'video'),
(4, 'enlace');

-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_comentarios_tema` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id_tema`);

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_fk_2` FOREIGN KEY (`tipo_archivo`) REFERENCES `tipos_archivos` (`id_archivo`),
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `comentarios_publicaciones`
--
ALTER TABLE `comentarios_publicaciones`
  ADD CONSTRAINT `comentarios_publicaciones_ibfk_1` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comentarios_publicacion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `megusta`
--
ALTER TABLE `megusta`
  ADD CONSTRAINT `megusta_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `megusta_ibfk_2` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE;
COMMIT;

--
-- Filtros para la tabla `seguidores`
--
ALTER TABLE `seguidores`
  ADD CONSTRAINT `fk_seguido_usuario` FOREIGN KEY (`seguido`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `fk_seguidor_usuario` FOREIGN KEY (`seguidor`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `temas`
--
ALTER TABLE `temas`
  ADD CONSTRAINT `fk_temas_foro` FOREIGN KEY (`id_foro`) REFERENCES `foros` (`id_foro`),
  ADD CONSTRAINT `fk_temas_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
