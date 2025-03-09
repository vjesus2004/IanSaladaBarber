<?php

// Incluye el autoload de Composer para cargar las librerías.
require_once __DIR__ . '/vendor/autoload.php';

// Carga las variables de entorno desde el archivo .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

class Conexion {

    // Declara el método estático para obtener la conexión a la base de datos
    public static function ConexionBD() {
        // Usa las variables de entorno cargadas
        $host = getenv('DB_HOST');
        $user = getenv('DB_USER');
        $pass = getenv('DB_PASS');
        $database = getenv('DB_DATABASE');

        // Crea la conexión con las credenciales obtenidas
        $conn = new mysqli($host, $user, $pass, $database);

        // Verifica si la conexión fue exitosa
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Soluciona problemas con caracteres
        $conn->query("SET NAMES 'utf8'");

        // Devuelve la conexión
        return $conn;
    }
}
