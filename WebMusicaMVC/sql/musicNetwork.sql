DROP DATABASE IF EXISTS musicnetwork;
CREATE DATABASE musicnetwork;

USE musicnetwork;

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` varchar(11) NOT NULL,
  `nombre_usuario` varchar(15) NOT NULL,
  `foto_usuario` varchar(20) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contrasena` varchar(15) DEFAULT NULL,
  `codigo_confirmacion` varchar(5) DEFAULT NULL,
  `activado` varchar(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre` (`nombre_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

DROP TABLE IF EXISTS `temas`;
CREATE TABLE IF NOT EXISTS `temas` (
  `id_tema` varchar(30) NOT NULL,
  `titulo` varchar(20) NOT NULL,
  `fecha_publicacion` date NOT NULL,
  `id_usuario` varchar(11) NOT NULL,
  `id_foro` varchar(4) NOT NULL,
  PRIMARY KEY (`id_tema`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros`
--

DROP TABLE IF EXISTS `foros`;
CREATE TABLE IF NOT EXISTS `foros` (
  `id_foro` varchar(4) NOT NULL,
  `nombre_foro` varchar(15) NOT NULL,
  PRIMARY KEY (`id_foro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id_comentario` varchar(30) NOT NULL,
  `fecha_publicacion` varchar(20) NOT NULL,
  `mensaje` varchar(300) NOT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `audio` varchar(200) DEFAULT NULL,
  `id_tema` varchar(30) NOT NULL,
  `id_usuario` varchar(11) NOT NULL,
  PRIMARY KEY (`id_comentario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Icluimos las claves ajenas
--

ALTER TABLE `temas`
  ADD CONSTRAINT `fk_temas_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `fk_temas_foro` FOREIGN KEY (`id_foro`) REFERENCES `foros` (`id_foro`);
 
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_comentarios_tema` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id_tema`),
  ADD CONSTRAINT `fk_comentarios_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Hacemos los insert necesarios
--

insert into foros (id_foro,nombre_foro) values
('F001','ayuda'),
('F002','busqueda'),
('F003','general');

COMMIT; 