<?php

    class Conexion{
        
        // Declare properties or class methods as static 
        // makes them accessible without the need to instantiate the class.
        public static function ConexionBD(){
            $conn = new mysqli("localhost", "root", "root", "jesus"); // Modify the connection string with the correct credentials

            // Solves problems with characters
            $conn->query("SET NAMES 'utf8'"); // IMPORTANT

            // Returns the connection
            return $conn;
        }
    }
