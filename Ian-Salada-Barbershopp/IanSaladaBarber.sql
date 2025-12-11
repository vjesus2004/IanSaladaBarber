-- =========================================================
-- Crear base de datos
-- =========================================================

CREATE DATABASE IF NOT EXISTS `iansb_db`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE `iansb_db`;

-- =========================================================
-- Tabla de administradores
-- =========================================================

DROP TABLE IF EXISTS `adm`;

CREATE TABLE `adm` (
  `usuario` VARCHAR(50) NOT NULL,
  `clave`   TEXT NOT NULL,
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `adm` (`usuario`, `clave`)
VALUES ('ian', 'ian');

-- =========================================================
-- Tabla de servicios
-- =========================================================

DROP TABLE IF EXISTS `servicio`;

CREATE TABLE `servicio` (
  `id`               INT NOT NULL AUTO_INCREMENT,
  `nombre`           VARCHAR(100) NOT NULL,
  `descripcion`      VARCHAR(255) DEFAULT NULL,
  `precio_base`      DECIMAL(10,2) NOT NULL,
  `duracion_minutos` INT NOT NULL,
  `activo`           TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;

-- =========================================================
-- Tabla de agenda (turnos)
-- =========================================================

DROP TABLE IF EXISTS `agenda`;

CREATE TABLE `agenda` (
  `ID`        INT NOT NULL AUTO_INCREMENT,
  `dia`       DATE DEFAULT NULL,
  `hora`      VARCHAR(5) DEFAULT NULL,
  `nom`       VARCHAR(50) DEFAULT NULL,
  `tel`       INT DEFAULT NULL,
  `nota`      VARCHAR(200) DEFAULT NULL,
  `opcional`  TINYINT(1) DEFAULT '0',

  -- Datos de cliente y servicio
  `email`                 VARCHAR(100) DEFAULT NULL,
  `servicio_id`           INT DEFAULT NULL,
  `precio`                DECIMAL(10,2) DEFAULT NULL,

  -- Estado del turno
  `estado` ENUM('pendiente','confirmada','completada','cancelada','no_asistio')
           NOT NULL DEFAULT 'pendiente',

  -- Mailer
  `confirmacion_enviada`  TINYINT(1) NOT NULL DEFAULT 0,
  `recordatorio_enviado`  TINYINT(1) NOT NULL DEFAULT 0,
  `token_confirmacion`    VARCHAR(64) DEFAULT NULL,
  `fecha_confirmacion`    DATETIME DEFAULT NULL,

  -- Auditoría
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`ID`),

  CONSTRAINT `fk_agenda_servicio`
    FOREIGN KEY (`servicio_id`)
    REFERENCES `servicio`(`id`)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB
  AUTO_INCREMENT=1
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;

-- =========================================================
-- Tabla para carrusel de fondos
-- =========================================================

DROP TABLE IF EXISTS `fondo_carrusel`;

CREATE TABLE `fondo_carrusel` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `titulo`      VARCHAR(100) DEFAULT NULL,
  `descripcion` VARCHAR(255) DEFAULT NULL,
  `url_imagen`  VARCHAR(255) NOT NULL,
  `orden`       INT NOT NULL DEFAULT 0,
  `activo`      TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;

-- =========================================================
-- FIN DEL SCRIPT
-- =========================================================