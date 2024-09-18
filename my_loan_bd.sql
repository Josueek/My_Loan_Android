-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-08-2024 a las 16:05:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

-- Base de datos: `my_loan_bd`

DROP DATABASE IF EXISTS `my_loan_bd`;

CREATE DATABASE IF NOT EXISTS `my_loan_bd`;
USE `my_loan_bd`;

-- --------------------------------------------------------
-- Procedimientos y Funciones
-- --------------------------------------------------------

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarUsuariosActivos` ()  
BEGIN
    SELECT * FROM tb_usuarios WHERE estado_empleado = 'Activo';
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `contar_prestamos_usuario` (`id_usuario` INT) RETURNS INT(11)  
BEGIN
    DECLARE total_prestamos INT;
    SELECT COUNT(*) INTO total_prestamos FROM tb_prestamos WHERE id_usuario = id_usuario;
    RETURN total_prestamos;
END$$

DELIMITER ;

-- --------------------------------------------------------
-- Estructuras de Tablas
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tb_cargos`
--
CREATE TABLE `tb_cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cargo` varchar(120) NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_cursos`
--
CREATE TABLE `tb_cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_curso` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL, 
  `fecha_fin` date DEFAULT NULL,
  `cantidad_personas` int(11) NOT NULL,
  `grupo` varchar(100) DEFAULT NULL,
  `programa_formacion` enum('HTP','EC','FCAT') DEFAULT NULL,
  `codigo_curso` varchar(100) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `estado` enum('pendiente','denegado','en curso','finalizado') NOT NULL DEFAULT 'pendiente',
  `id_especialidad` int(11) DEFAULT NULL, -- Alterado Tomar en cuenta este valor
  PRIMARY KEY (`id_curso`),
  CONSTRAINT chk_cantidad_p CHECK (`cantidad_personas` >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_datos_empleados`
--
CREATE TABLE `tb_datos_empleados` (
  `id_datos_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_empleado` varchar(255) NOT NULL,
  `apellido_empleado` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `estado_empleado` enum('Activo','Inactivo') NOT NULL,
  `foto_empleado` varchar(100) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_datos_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_detalles_cursos`
--
CREATE TABLE `tb_detalles_cursos` (
  `id_detalle_curso` int(11) NOT NULL AUTO_INCREMENT,
  `id_espacio` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_detalle_prestamo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_detalle_prestamos`
--
CREATE TABLE `tb_detalle_prestamos` (
`id_detalle_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `unidad` enum('unidad','unidades') NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `id_prestamo` int(11) NOT NULL,
  `id_espacio` int(11) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `id_material` int(11) DEFAULT NULL,
  `codigo_herramienta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_prestamo`),
  CONSTRAINT chk_cantidad_inventario_equipo CHECK (`cantidad` >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_equipos`
--
CREATE TABLE `tb_equipos` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `id_espacio` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo`),
  CONSTRAINT chk_cantidad_equipos CHECK (`cantidad` >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_espacios`
--
CREATE TABLE `tb_espacios` (
  `id_espacio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_espacio` varchar(255) NOT NULL,
  `capacidad_personas` int(11) DEFAULT NULL,
  `tipo_espacio` enum('Taller','Laboratorio') NOT NULL,
  `inventario_doc` varchar(255) DEFAULT NULL,
  `foto_espacio` varchar(255) DEFAULT NULL,
  `id_especialidad` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  PRIMARY KEY (`id_espacio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_especialidades`
--
CREATE TABLE `tb_especialidades` (
  `id_especialidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` varchar(120) NOT NULL,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_instituciones` (
  `id_institucion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_institucion` varchar(120) NOT NULL,
  PRIMARY KEY (`id_institucion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_instructores`
--
CREATE TABLE `tb_instructores` (
  `id_instructor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_instructor` varchar(255) NOT NULL,
  `apellido_instructor` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `estado_empleado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `foto_empleado` varchar(100) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  PRIMARY KEY (`id_instructor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_inventario_herramienta`
--
CREATE TABLE `tb_inventario_herramienta` (
  `codigo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_herramienta` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `en_uso` int(11) DEFAULT 0,
  `id_institucion` int(11) NOT NULL,
  PRIMARY KEY (`codigo_herramienta`),
  CONSTRAINT chk_stock CHECK (`stock` >= 1),
  CONSTRAINT chk_en_uso CHECK (`en_uso` >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_materiales`
--
CREATE TABLE `tb_materiales` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_material`),
  CONSTRAINT chk_cantidad_material CHECK (`cantidad` >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_observaciones`
--
CREATE TABLE `tb_observaciones` (
  `id_obsevacion` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_observacion` date NOT NULL,
  `observacion` varchar(40) NOT NULL,
  `foto_observacion` varchar(255) DEFAULT NULL,
  `tipo_observacion` enum('Previa','Durante','Despues','Fuera') NOT NULL,
  `tipo_prestamo` enum('Taller','Laboratorio','Equipo','Material','Herramienta') NOT NULL,
  `id_espacio` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_prestamo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_obsevacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_periodo_prestamos`
--
CREATE TABLE `tb_periodo_prestamos` (
  `id_periodo_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_inicio` date NOT NULL,
  `persona_entrega` varchar(100) NOT NULL,
  `persona_recibe` varchar(100) NOT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `entrega_persona` varchar(100) DEFAULT NULL,
  `recibe_persona` varchar(100) DEFAULT NULL,
  `id_detalle_prestamo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_periodo_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Estructura de tabla para la tabla `tb_prestamos`
--
CREATE TABLE `tb_prestamos` (
  `id_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` date NOT NULL,
  `programa_formacion` enum('HTP','EC','FCAT') NOT NULL,
  `estado_prestamo` enum('Aceptado','Denegado','En Espera') DEFAULT 'En Espera',
  `observacion` varchar(300) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
   PRIMARY KEY (`id_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- Estructura de tabla para la tabla `tb_usuarios`
--
CREATE TABLE `tb_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,          
  `correo_electronico` varchar(255) NOT NULL,             
  `contraseña` varchar(300) NOT NULL,                   
  `id_cargo` int(11) NOT NULL,                           
  `id_institucion` int(11) NOT NULL,                     
  PRIMARY KEY (`id_usuario`),                           
  UNIQUE KEY `correo_electronico` (`correo_electronico`), 
  KEY `fk_usuario_cargo` (`id_cargo`),                    -- Índice para la relación con la tabla `tb_cargos`
  KEY `fk_usuario_institucion` (`id_institucion`)         -- Índice para la relación con la tabla `tb_instituciones`
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

--
-- Relaciones entre tablas
--
-- tb_usuarios
ALTER TABLE `tb_usuarios`
ADD CONSTRAINT `fk_usuario_cargo`
FOREIGN KEY (`id_cargo`) REFERENCES `tb_cargos` (`id_cargo`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_usuarios`
ADD CONSTRAINT `fk_usuario_institucion`
FOREIGN KEY (`id_institucion`) REFERENCES `tb_instituciones` (`id_institucion`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_datos_empleados

ALTER TABLE `tb_datos_empleados`
ADD CONSTRAINT `fk_datos_empleados_usuarios`
FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_datos_empleados`
ADD CONSTRAINT `fk_id_especialidad`
FOREIGN KEY (`id_especialidad`) REFERENCES `tb_especialidades` (`id_especialidad`)
ON DELETE SET NULL ON UPDATE CASCADE;

-- tb_cursos
-- Verificar este campo ya que no se tenia antes
ALTER TABLE `tb_cursos`
ADD CONSTRAINT `fk_curso_especialidad`
FOREIGN KEY (`id_especialidad`) REFERENCES `tb_especialidades` (`id_especialidad`)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `tb_cursos`
ADD CONSTRAINT `fk_curso_empleado`
FOREIGN KEY (`id_empleado`) REFERENCES `tb_datos_empleados` (`id_datos_empleado`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_detalles_cursos
ALTER TABLE `tb_detalles_cursos`
ADD CONSTRAINT `fk_detalle_curso_curso`
FOREIGN KEY (`id_curso`) REFERENCES `tb_cursos` (`id_curso`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_detalles_cursos`
ADD CONSTRAINT `fk_detalle_curso_espacio`
FOREIGN KEY (`id_espacio`) REFERENCES `tb_espacios` (`id_espacio`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_detalles_cursos`
ADD CONSTRAINT `fk_detalle_curso_detalle_prestamo`
FOREIGN KEY (`id_detalle_prestamo`) REFERENCES `tb_detalle_prestamos` (`id_detalle_prestamo`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_detalle_prestamos
ALTER TABLE `tb_detalle_prestamos`
ADD CONSTRAINT `fk_detalle_prestamo`
FOREIGN KEY (`id_prestamo`) REFERENCES `tb_prestamos` (`id_prestamo`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_detalle_prestamos`
ADD CONSTRAINT `fk_detalle_espacio`
FOREIGN KEY (`id_espacio`) REFERENCES `tb_espacios` (`id_espacio`)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `tb_detalle_prestamos`
ADD CONSTRAINT `fk_detalle_equipo`
FOREIGN KEY (`id_equipo`) REFERENCES `tb_equipos` (`id_equipo`)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `tb_detalle_prestamos`
ADD CONSTRAINT `fk_detalle_material`
FOREIGN KEY (`id_material`) REFERENCES `tb_materiales` (`id_material`)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `tb_detalle_prestamos`
ADD CONSTRAINT `fk_detalle_herramienta`
FOREIGN KEY (`codigo_herramienta`) REFERENCES `tb_inventario_herramienta` (`codigo_herramienta`)
ON DELETE SET NULL ON UPDATE CASCADE;

-- tb_equipos
ALTER TABLE `tb_equipos`
ADD CONSTRAINT `fk_equipo_espacio`
FOREIGN KEY (`id_espacio`) REFERENCES `tb_espacios` (`id_espacio`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_equipos`
ADD CONSTRAINT `fk_tb_equipos_institucion`
FOREIGN KEY (`id_institucion`) REFERENCES `tb_instituciones` (`id_institucion`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_espacios

ALTER TABLE `tb_espacios`
ADD CONSTRAINT `fk_espacio_especialidad`
FOREIGN KEY (`id_especialidad`) REFERENCES `tb_especialidades` (`id_especialidad`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_espacios`
ADD CONSTRAINT `fk_tb_espacios_institucion`
FOREIGN KEY (`id_institucion`) REFERENCES `tb_instituciones` (`id_institucion`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_espacios`
ADD CONSTRAINT `fk_id_empleado`
FOREIGN KEY (`id_empleado`) REFERENCES `tb_datos_empleados` (`id_datos_empleado`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_instructores
ALTER TABLE `tb_instructores`
ADD CONSTRAINT `fk_instructor_usuario`
FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tb_instructores`
ADD CONSTRAINT `fk_instructores_especialidad`
FOREIGN KEY (`id_especialidad`) REFERENCES `tb_especialidades` (`id_especialidad`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_inventario_herramienta
ALTER TABLE `tb_inventario_herramienta`
ADD CONSTRAINT `fk_herramienta_institucion`
FOREIGN KEY (`id_institucion`) REFERENCES `tb_instituciones` (`id_institucion`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_prestamos
ALTER TABLE `tb_prestamos`
ADD CONSTRAINT `fk_prestamo_curso`
FOREIGN KEY (`id_curso`) REFERENCES `tb_cursos` (`id_curso`)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `tb_prestamos`
ADD CONSTRAINT `fk_prestamo_usuario`
FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- tb_observaciones
ALTER TABLE `tb_observaciones`
ADD CONSTRAINT `fk_observacion_espacio`
FOREIGN KEY (`id_espacio`) REFERENCES `tb_espacios` (`id_espacio`)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `tb_observaciones`
ADD CONSTRAINT `fk_observacion_usuario`
FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `tb_observaciones`
ADD CONSTRAINT `fk_observacion_prestamo`
FOREIGN KEY (`id_prestamo`) REFERENCES `tb_prestamos` (`id_prestamo`)
ON DELETE SET NULL ON UPDATE CASCADE;

-- tb_periodo_prestamo
ALTER TABLE `tb_periodo_prestamos`
ADD CONSTRAINT `fk_periodo_detalle_prestamo`
FOREIGN KEY (`id_detalle_prestamo`) REFERENCES `tb_detalle_prestamos` (`id_detalle_prestamo`)
ON DELETE SET NULL ON UPDATE CASCADE;

--
-- -- Validaciones para datos unicos
--
ALTER TABLE `tb_cargos` ADD UNIQUE (`nombre_cargo`);
ALTER TABLE `tb_inventario_herramienta` ADD UNIQUE (`nombre_herramienta`);
ALTER TABLE `tb_cursos` ADD UNIQUE (`codigo_curso`);
ALTER TABLE `tb_datos_empleados` ADD UNIQUE (`id_usuario`);
ALTER TABLE `tb_espacios` ADD UNIQUE (`nombre_espacio`);
ALTER TABLE `tb_especialidades` ADD UNIQUE (`nombre_especialidad`);

--
--
-- INSERT DE DATOS ACORDE AL SISTEMA
--
--
INSERT INTO `tb_cargos` (`id_cargo`, `nombre_cargo`) VALUES
(1, 'Administrador'), (2, 'Instructor'), (3, 'Asistente');

INSERT INTO `tb_especialidades` (`id_especialidad`, `nombre_especialidad`) VALUES
(1, 'D. Software'), (2, 'Electrónica'), (3, 'Automotriz'), (4, 'Diseño gráfico'), (5, 'Arquitectura'), (6, 'Electromecánica');
 
INSERT INTO `tb_instituciones` (`id_institucion`, `nombre_institucion`) VALUES
(1, 'Ricaldone'), (2, 'Insaforp');

INSERT INTO `tb_usuarios` (`id_usuario`, `correo_electronico`, `contraseña`, `id_cargo`, `id_institucion`) VALUES
(1, 'brandon5@gmail.com', '$2y$10$1PGNCOYcgfyH.74ZwrDuKulmmD/zDJw.dJdU7A91iauHkboQfsIBS', 1, 1),
(2, 'Josue@gmail.com', '$2y$10$1PGNCOYcgfyH.74ZwrDuKulmmD/zDJw.dJdU7A91iauHkboQfsIBS', 2, 1),
(3, 'Dylan@gmail.com', '$2y$10$1PGNCOYcgfyH.74ZwrDuKulmmD/zDJw.dJdU7A91iauHkboQfsIBS', 1, 2);

-- Tabla tb_datos_empleados
INSERT INTO `tb_datos_empleados` (`nombre_empleado`, `apellido_empleado`, `telefono`, `estado_empleado`, `foto_empleado`, `id_usuario`, `id_especialidad`) VALUES 
('Brandon', 'Daniel', '555-1234', 'Activo', 'carlos.jpg', 1, 1),
('Josue', 'Martínez', '555-5678', 'Activo', 'ana.jpg', 2, 2),
('Dylan', 'González', '555-9876', 'Inactivo', 'luis.jpg', 3, 3);
 
 -- Tabla tb_cursos
INSERT INTO `tb_cursos` (`nombre_curso`, `fecha_inicio`, `fecha_fin`, `cantidad_personas`, `grupo`, `programa_formacion`, `codigo_curso`, `id_empleado`, `estado`, `id_especialidad`) VALUES 
('Curso de Python', '2024-09-01', '2024-12-01', 25, 'Grupo A', 'HTP', 'PY2024', 1, 'en curso', 1),
('Curso de Soldadura', '2024-09-15', '2024-12-15', 20, 'Grupo B', 'EC', 'JV2024', 2, 'pendiente', 2),
('Curso de Diseño', '2024-10-01', '2024-12-31', 30, 'Grupo C', 'FCAT', 'CP2024', 3, 'finalizado', 3);

-- Tabla tb_espacios
INSERT INTO `tb_espacios` (`nombre_espacio`, `capacidad_personas`, `tipo_espacio`, `inventario_doc`, `foto_espacio`, `id_especialidad`, `id_institucion`, `id_empleado`) VALUES 
('Laboratorio 0155', 30, 'Laboratorio', 'Inventario Lab A.pdf', 'lab_a.jpg', 1, 1, 1),
('Taller Arquitectura', 25, 'Taller', 'Inventario Taller B.pdf', 'taller_b.jpg', 1, 2, 2),
('Laboratorio diseño', 20, 'Laboratorio', 'Inventario Lab C.pdf', 'lab_c.jpg', 3, 1, 3);

-- Tabla tb_equipos
INSERT INTO `tb_equipos` (`nombre`, `descripcion`, `cantidad`, `id_espacio`, `id_institucion`) VALUES 
('Laptop', 'Laptop Dell Inspiron', 10, 1, 1),
('Proyector', 'Proyector Epson', 5, 1, 2),
('Libro', 'Libro de C++', 20, 3, 1);

-- Tabla tb_materiales
INSERT INTO `tb_materiales` (`nombre`, `descripcion`, `cantidad`) VALUES 
('Cables UTP', 'Cables de red UTP', 100),
('Conectores RJ45', 'Conectores para cables de red', 200),
('Placas Arduino', 'Placas de desarrollo Arduino', 50),
('Resistencias', 'Resistencias de diferentes valores', 500),
('Condensadores', 'Condensadores de diferentes valores', 300);

-- Tabla tb_inventario_herramienta
INSERT INTO `tb_inventario_herramienta` (`nombre_herramienta`, `descripcion`, `stock`, `en_uso`, `id_institucion`) VALUES 
('Taladro', 'Taladro Bosch', 15, 3, 1),
('Multímetro', 'Multímetro Fluke', 10, 2, 2),
('Cautín', 'Cautín Weller', 20, 5, 1),
('Osciloscopio', 'Osciloscopio Tektronix', 8, 1, 2),
('Pinzas', 'Pinzas de corte', 25, 10, 1);

 -- Tabla tb_instructores
INSERT INTO `tb_instructores` (`nombre_instructor`, `apellido_instructor`, `telefono`, `estado_empleado`, `foto_empleado`, `id_usuario`, `id_especialidad`) VALUES 
('Pedro', 'Lopez', '555-0011', 'Activo', 'pedro.jpg', 1, 1),
('Marta', 'García', '555-0022', 'Activo', 'marta.jpg', 2, 2),
('Juan', 'Rodríguez', '555-0033', 'Inactivo', 'juan.jpg', 3, 3);

-- Tabla tb_prestamos
INSERT INTO tb_prestamos (`fecha_solicitud`, `programa_formacion`, `estado_prestamo`, `observacion`, `id_curso`, `id_usuario`) VALUES
 ('2024-04-18', 'HTP', 'En Espera', 'Observación 1', 1, 1),
 ('2024-04-20', 'EC', 'Denegado', 'Observación 2', 2, 2),
 ('2024-04-30', 'FCAT', 'Aceptado', NULL, 3, 3);

-- Tabla tb_detalles_cursos
INSERT INTO `tb_detalle_prestamos` (cantidad, unidad, descripcion, id_prestamo, id_espacio, id_equipo, id_material, codigo_herramienta) VALUES
(2, 'Unidad', 'Descripción detalle prestamo 1', 1, 1, NULL, 1, NULL),
(3, 'Unidad', 'Descripción detalle prestamo 2', 2, NULL, 2, NULL, NULL),
(1, 'Unidad', 'Descripción detalle prestamo 3', 3, NULL, NULL, 2, NULL);

-- Tabla tb_periodo_prestamos
INSERT INTO `tb_periodo_prestamos` (`fecha_inicio`, `persona_entrega`, `persona_recibe`, `fecha_entrega`, `entrega_persona`, `recibe_persona`, `id_detalle_prestamo`) VALUES 
('2024-08-01', 'Carlos Q.', 'Ana M.', '2024-08-05', 'Carlos Q.', 'Ana M.', 1),
('2024-08-02', 'Luis G.', 'María P.', '2024-08-06', 'Luis G.', 'María P.', 2),
('2024-08-03', 'José R.', 'Pedro L.', '2024-08-07', 'José R.', 'Pedro L.', 3);

 -- Tabla tb_detalles_cursos
INSERT INTO `tb_detalles_cursos` (`id_espacio`, `id_curso`, `id_detalle_prestamo`) VALUES 
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- Tabla tb_observaciones
INSERT INTO tb_observaciones (fecha_observacion, observacion, tipo_observacion, tipo_prestamo, id_espacio, id_usuario, id_prestamo) VALUES
('2024-04-10', 'Observación 1', 'Previa', 'Taller', 1, 1, NULL),
('2024-04-11', 'Observación 2', 'Durante', 'Laboratorio', 2, 2, 1),
('2024-04-12', 'Observación 3', 'Despues', 'Equipo', 3, 3, NULL);

select * from tb_observaciones;