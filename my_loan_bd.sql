-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2024 a las 16:11:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `my_loan_bd`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarUsuariosActivos` ()   BEGIN
    -- Seleccionar usuarios activos
    SELECT *
    FROM tb_usuarios
    WHERE estado_empleado = 'Activo';
END$$

--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `contar_prestamos_usuario` (`id_usuario` INT) RETURNS INT(11)  BEGIN
    DECLARE total_prestamos INT;

    -- Contar la cantidad de préstamos realizados por el usuario
    SELECT COUNT(*)
    INTO total_prestamos
    FROM tb_prestamos
    WHERE id_usuario = id_usuario;

    RETURN total_prestamos;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cargos`
--

CREATE TABLE `tb_cargos` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_cargos`
--

INSERT INTO `tb_cargos` (`id_cargo`, `nombre_cargo`) VALUES
(1, 'Gerente'),
(2, 'Supervisor'),
(3, 'Técnico'),
(4, 'Asistente'),
(5, 'adwad'),
(6, 'adwadxzxzx'),
(7, 'sdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cursos`
--

CREATE TABLE `tb_cursos` (
  `id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `cantidad_personas` int(11) NOT NULL,
  `grupo` varchar(100) DEFAULT NULL,
  `programa_formacion` enum('HTP','EC','FCAT') DEFAULT NULL,
  `codigo_curso` varchar(100) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `estado` enum('pendiente','denegado','en curso','finalizado') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_cursos`
--

INSERT INTO `tb_cursos` (`id_curso`, `nombre_curso`, `fecha_inicio`, `fecha_fin`, `cantidad_personas`, `grupo`, `programa_formacion`, `codigo_curso`, `id_empleado`, `estado`) VALUES
(5, 'Pasteleria viejita', '2024-06-12', '2024-06-26', 15, '2', 'EC', 'AC231', 21, 'en curso'),
(9, 'pasteleria 3', '2024-06-24', '2024-06-25', 12, '12', 'FCAT', 'AC231', 21, 'denegado'),
(10, 'Pasteleria II', '2024-06-24', '2024-06-25', 21, '12', 'FCAT', 'AC231', 21, 'pendiente'),
(12, 'Pasteleria IID', '2024-06-28', '2024-06-29', 14, '12', 'HTP', 'AC231', 21, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_datos_empleados`
--

CREATE TABLE `tb_datos_empleados` (
  `id_datos_empleado` int(11) NOT NULL,
  `nombre_empleado` varchar(255) NOT NULL,
  `apellido_empleado` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `estado_empleado` enum('Activo','Inactivo') NOT NULL,
  `foto_empleado` varchar(100) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_datos_empleados`
--

INSERT INTO `tb_datos_empleados` (`id_datos_empleado`, `nombre_empleado`, `apellido_empleado`, `telefono`, `estado_empleado`, `foto_empleado`, `id_usuario`, `id_especialidad`) VALUES
(21, 'Brandon Daniel', 'Sanchez Santamaria', '76861206', 'Activo', '66723623b1f69.jpg', 30, 2),
(31, 'Dylan', 'Sanchez', '11223344', 'Activo', '66856a3d36126.png', 34, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalles_cursos`
--

CREATE TABLE `tb_detalles_cursos` (
  `id_detalle_curso` int(11) NOT NULL,
  `id_espacio` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_detalle_prestamo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_detalles_cursos`
--

INSERT INTO `tb_detalles_cursos` (`id_detalle_curso`, `id_espacio`, `id_curso`, `id_detalle_prestamo`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalle_prestamos`
--

CREATE TABLE `tb_detalle_prestamos` (
  `id_detalle_prestamo` int(11) NOT NULL,
  `unidad` enum('unidad','unidades') NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `id_espacio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_detalle_prestamos`
--

INSERT INTO `tb_detalle_prestamos` (`id_detalle_prestamo`, `unidad`, `descripcion`, `id_espacio`) VALUES
(1, 'unidad', 'Descripción detalle prestamo 1', NULL),
(2, 'unidad', 'Descripción detalle prestamo 2', NULL),
(3, 'unidad', 'Descripción detalle prestamo 3', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipos`
--

CREATE TABLE `tb_equipos` (
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `id_espacio` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_equipos`
--

INSERT INTO `tb_equipos` (`id_equipo`, `nombre`, `descripcion`, `cantidad`, `id_espacio`, `id_institucion`) VALUES
(1, 'Brandon', 'Vender iphone 11 pro max', 14, 42, 2),
(2, 'Equipo 2', 'Descripción equipo 2', 3, 41, 2),
(4, 'Brandon', 'brandon', 15, 34, 2),
(5, 'Brandon', 'awdwd', 4, 34, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_espacios`
--

CREATE TABLE `tb_espacios` (
  `id_espacio` int(11) NOT NULL,
  `nombre_espacio` varchar(255) NOT NULL,
  `capacidad_personas` int(11) DEFAULT NULL,
  `tipo_espacio` enum('Taller','Laboratorio') NOT NULL,
  `inventario_doc` varchar(255) DEFAULT NULL,
  `foto_espacio` varchar(255) DEFAULT NULL,
  `id_especialidad` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_espacios`
--

INSERT INTO `tb_espacios` (`id_espacio`, `nombre_espacio`, `capacidad_personas`, `tipo_espacio`, `inventario_doc`, `foto_espacio`, `id_especialidad`, `id_institucion`, `id_empleado`) VALUES
(34, 'Laboratorio emca 3', 12, 'Laboratorio', '6673072e166a9.pdf', '6673072e1624c.jpeg', 2, 2, 21),
(39, 'Laboratorio emca 4', 21, 'Laboratorio', '6674e634656e1.pdf', '66731d99e557c.jpg', 2, 1, 21),
(42, 'Software', 32, 'Laboratorio', '6674e60f8baf4.pdf', '6674e84bda85d.png', 1, 3, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_especialidades`
--

CREATE TABLE `tb_especialidades` (
  `id_especialidad` int(11) NOT NULL,
  `nombre_especialidad` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_especialidades`
--

INSERT INTO `tb_especialidades` (`id_especialidad`, `nombre_especialidad`) VALUES
(1, 'Informática'),
(2, 'Electrónica'),
(3, 'Mecánica'),
(4, 'Diseño'),
(5, 'awdawd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_instituciones`
--

CREATE TABLE `tb_instituciones` (
  `id_institucion` int(11) NOT NULL,
  `nombre_institucion` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_instituciones`
--

INSERT INTO `tb_instituciones` (`id_institucion`, `nombre_institucion`) VALUES
(1, 'Institución A'),
(2, 'Institución B'),
(3, 'Institución C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_instructores`
--

CREATE TABLE `tb_instructores` (
  `id_instructor` int(11) NOT NULL,
  `nombre_instructor` varchar(255) NOT NULL,
  `apellido_instructor` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `estado_empleado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `foto_empleado` varchar(100) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_instructores`
--

INSERT INTO `tb_instructores` (`id_instructor`, `nombre_instructor`, `apellido_instructor`, `telefono`, `estado_empleado`, `foto_empleado`, `id_usuario`, `id_especialidad`) VALUES
(1, 'Pedro', 'Martínez', '555111222', 'Activo', NULL, 1, 1),
(2, 'Laura', 'Hernández', '555333444', 'Activo', NULL, 2, 2),
(3, 'Ana', 'Rodríguez', '555555555', 'Inactivo', NULL, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_inventario_herramienta`
--

CREATE TABLE `tb_inventario_herramienta` (
  `codigo_herramienta` int(11) NOT NULL,
  `nombre_herramienta` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `en_uso` int(11) DEFAULT 0,
  `id_institucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_inventario_herramienta`
--

INSERT INTO `tb_inventario_herramienta` (`codigo_herramienta`, `nombre_herramienta`, `descripcion`, `stock`, `en_uso`, `id_institucion`) VALUES
(1, 'Llave', 'Esta es una llave y se usa para hacer esto y esto por esto', 1, 0, 3),
(2, 'Llave 2', 'esta es la llave 2', 12, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_materiales`
--

CREATE TABLE `tb_materiales` (
  `id_material` int(11) NOT NULL, 
  `nombre` varchar(100) NOT NULL UNIQUE, /* EL nombre de los materiales será UNIQUE */
  `descripcion` varchar(300) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_materiales`
--

INSERT INTO `tb_materiales` (`id_material`, `nombre`, `descripcion`, `cantidad`) VALUES
(1, 'Material 1', 'Descripción material 1', 99),
(2, 'Material 2', 'Descripción material 2', 150),
(3, 'Material 3', 'Descripción material 3', 200);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tb_observaciones`
--

CREATE TABLE `tb_observaciones` (
  `id_observacion` int(11) NOT NULL,
  `fecha_observacion` date NOT NULL,
  `observacion` varchar(300) NOT NULL,
  `foto_observacion` varchar(255) DEFAULT NULL,
  `tipo_observacion` enum('Previa','Durante','Despues','Fuera') NOT NULL,
  `tipo_prestamo` enum('Taller','Laboratorio','Equipo','Material','Herramienta') NOT NULL,
  `id_espacio` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_prestamo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_observaciones`
--

INSERT INTO `tb_observaciones` (`id_observacion`, `fecha_observacion`, `observacion`, `foto_observacion`, `tipo_observacion`, `tipo_prestamo`, `id_espacio`, `id_usuario`, `id_prestamo`) VALUES
(1, '2024-04-10', 'Observación 1', NULL, 'Previa', 'Taller', 1, 1, NULL),
(2, '2024-04-11', 'Observación 2', NULL, 'Durante', 'Laboratorio', 2, 2, NULL),
(3, '2024-04-12', 'Observación 3', NULL, 'Despues', 'Equipo', 3, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_periodo_prestamos`
--

CREATE TABLE `tb_periodo_prestamos` (
  `id_periodo_prestamo` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `persona_entrega` varchar(100) NOT NULL,
  `persona_recibe` varchar(100) NOT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `entrega_persona` varchar(100) DEFAULT NULL,
  `recibe_persona` varchar(100) DEFAULT NULL,
  `id_detalle_prestamo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_periodo_prestamos`
--

INSERT INTO `tb_periodo_prestamos` (`id_periodo_prestamo`, `fecha_inicio`, `persona_entrega`, `persona_recibe`, `fecha_entrega`, `entrega_persona`, `recibe_persona`, `id_detalle_prestamo`) VALUES
(1, '2024-04-10', 'Persona 1', 'Persona 2', NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_prestamos`
--

CREATE TABLE `tb_prestamos` (
  `id_prestamo` int(11) NOT NULL,
  `fecha_solicitud` date NOT NULL,
  `programa_formacion` enum('HTP','EC','FCAT') NOT NULL,
  `estado_prestamo` enum('Aceptado','Denegado','En Espera') DEFAULT 'En Espera',
  `observacion` varchar(300) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_prestamos`
--

INSERT INTO `tb_prestamos` (`id_prestamo`, `fecha_solicitud`, `programa_formacion`, `estado_prestamo`, `observacion`, `id_curso`, `id_usuario`) VALUES
(1, '2024-04-18', 'HTP', 'Denegado', 'Observación 1', 1, 1),
(2, '2024-04-20', 'EC', 'Denegado', 'Observación 2', 2, 2),
(3, '2024-04-30', 'FCAT', 'Aceptado', NULL, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_recuperacion_contra`
--

CREATE TABLE `tb_recuperacion_contra` (
  `id_codigo` int(11) NOT NULL,
  `codigo_recuperacion` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_recuperacion_contra`
--

INSERT INTO `tb_recuperacion_contra` (`id_codigo`, `codigo_recuperacion`, `id_usuario`) VALUES
(1, 'ABC123', 1),
(2, 'DEF456', 2),
(3, 'GHI789', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id_usuario` int(11) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contraseña` varchar(300) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id_usuario`, `correo_electronico`, `contraseña`, `id_cargo`, `id_institucion`) VALUES
(30, 'brandon5@gmail.com', '$2y$10$1PGNCOYcgfyH.74ZwrDuKulmmD/zDJw.dJdU7A91iauHkboQfsIBS', 2, 1),
(34, 'holahola@gmail.com', '$2y$10$bTfpqzvjvCmiL1F9AKUMpO2ahq7x9DSjvRIvwHVdXtZ3Duiut8BW.', 1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_cargos`
--
ALTER TABLE `tb_cargos`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `tb_cursos`
--
ALTER TABLE `tb_cursos`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `fk_curso_empleado` (`id_empleado`);

--
-- Indices de la tabla `tb_datos_empleados`
--
ALTER TABLE `tb_datos_empleados`
  ADD PRIMARY KEY (`id_datos_empleado`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD KEY `fk_datos_empleados_usuarios` (`id_usuario`),
  ADD KEY `fk_id_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `tb_detalles_cursos`
--
ALTER TABLE `tb_detalles_cursos`
  ADD PRIMARY KEY (`id_detalle_curso`),
  ADD KEY `fk_detalle_curso_espacio` (`id_espacio`),
  ADD KEY `fk_detalle_curso_curso` (`id_curso`),
  ADD KEY `fk_detalle_curso_detalle_prestamo` (`id_detalle_prestamo`);

--
-- Indices de la tabla `tb_detalle_prestamos`
--
ALTER TABLE `tb_detalle_prestamos`
  ADD PRIMARY KEY (`id_detalle_prestamo`),
  ADD KEY `fk_prestamos` (`id_espacio`);

--
-- Indices de la tabla `tb_equipos`
--
ALTER TABLE `tb_equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `fk_equipo_espacio` (`id_espacio`),
  ADD KEY `fk_tb_equipos_institucion` (`id_institucion`);

--
-- Indices de la tabla `tb_espacios`
--
ALTER TABLE `tb_espacios`
  ADD PRIMARY KEY (`id_espacio`),
  ADD KEY `fk_tb_espacios_institucion` (`id_institucion`),
  ADD KEY `fk_espacio_especialidad` (`id_especialidad`),
  ADD KEY `fk_id_empleado` (`id_empleado`);

--
-- Indices de la tabla `tb_especialidades`
--
ALTER TABLE `tb_especialidades`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `tb_instituciones`
--
ALTER TABLE `tb_instituciones`
  ADD PRIMARY KEY (`id_institucion`);

--
-- Indices de la tabla `tb_instructores`
--
ALTER TABLE `tb_instructores`
  ADD PRIMARY KEY (`id_instructor`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD KEY `fk_instructor_usuario` (`id_usuario`),
  ADD KEY `fk_instructores_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `tb_inventario_herramienta`
--
ALTER TABLE `tb_inventario_herramienta`
  ADD PRIMARY KEY (`codigo_herramienta`),
  ADD KEY `fk_herramienta_institucion` (`id_institucion`);

--
-- Indices de la tabla `tb_materiales`
--
ALTER TABLE `tb_materiales`
  ADD PRIMARY KEY (`id_material`);

--
-- Indices de la tabla `tb_observaciones`
--
ALTER TABLE `tb_observaciones`
  ADD PRIMARY KEY (`id_observacion`),
  ADD KEY `fk_observacion_espacio` (`id_espacio`),
  ADD KEY `fk_observacion_usuario` (`id_usuario`),
  ADD KEY `fk_observacion_prestamo` (`id_prestamo`);

--
-- Indices de la tabla `tb_periodo_prestamos`
--
ALTER TABLE `tb_periodo_prestamos`
  ADD PRIMARY KEY (`id_periodo_prestamo`),
  ADD KEY `fk_periodo_detalle_prestamo` (`id_detalle_prestamo`);

--
-- Indices de la tabla `tb_prestamos`
--
ALTER TABLE `tb_prestamos`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `fk_prestamo_curso` (`id_curso`),
  ADD KEY `fk_prestamo_usuario` (`id_usuario`);

--
-- Indices de la tabla `tb_recuperacion_contra`
--
ALTER TABLE `tb_recuperacion_contra`
  ADD PRIMARY KEY (`id_codigo`),
  ADD KEY `fk_codigo_usuario` (`id_usuario`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD UNIQUE KEY `fk_usuarios_correo_unique` (`correo_electronico`),
  ADD KEY `fk_usuario_cargo` (`id_cargo`),
  ADD KEY `fk_usuario_institucion` (`id_institucion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_cargos`
--
ALTER TABLE `tb_cargos`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_cursos`
--
ALTER TABLE `tb_cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tb_datos_empleados`
--
ALTER TABLE `tb_datos_empleados`
  MODIFY `id_datos_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `tb_detalles_cursos`
--
ALTER TABLE `tb_detalles_cursos`
  MODIFY `id_detalle_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_detalle_prestamos`
--
ALTER TABLE `tb_detalle_prestamos`
  MODIFY `id_detalle_prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_equipos`
--
ALTER TABLE `tb_equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_espacios`
--
ALTER TABLE `tb_espacios`
  MODIFY `id_espacio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `tb_especialidades`
--
ALTER TABLE `tb_especialidades`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_instituciones`
--
ALTER TABLE `tb_instituciones`
  MODIFY `id_institucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_instructores`
--
ALTER TABLE `tb_instructores`
  MODIFY `id_instructor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_materiales`
--
ALTER TABLE `tb_materiales`
  MODIFY `id_material` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_observaciones`
--
ALTER TABLE `tb_observaciones`
  MODIFY `id_observacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_periodo_prestamos`
--
ALTER TABLE `tb_periodo_prestamos`
  MODIFY `id_periodo_prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_prestamos`
--
ALTER TABLE `tb_prestamos`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_recuperacion_contra`
--
ALTER TABLE `tb_recuperacion_contra`
  MODIFY `id_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_cursos`
--
ALTER TABLE `tb_cursos`
  ADD CONSTRAINT `fk_curso_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `tb_datos_empleados` (`id_datos_empleado`);

--
-- Filtros para la tabla `tb_datos_empleados`
--
ALTER TABLE `tb_datos_empleados`
  ADD CONSTRAINT `fk_datos_empleados_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`),
  ADD CONSTRAINT `fk_id_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `tb_especialidades` (`id_especialidad`);

--
-- Filtros para la tabla `tb_detalle_prestamos`
--
ALTER TABLE `tb_detalle_prestamos`
  ADD CONSTRAINT `fk_prestamos` FOREIGN KEY (`id_espacio`) REFERENCES `tb_prestamos` (`id_prestamo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
