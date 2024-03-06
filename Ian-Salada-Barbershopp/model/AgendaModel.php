<?php
	class AgendaModel{
		
		private $db;
	 
		public function __construct(){
			require_once("db.php");
			$this->db = Conexion::ConexionBD();
		}

		public function VerifyUser($user, $clave) {
            $sql = "SELECT * FROM adm WHERE usuario='$user' AND clave='$clave';";
            $result = $this->db->query($sql);
			print_r($result);
            $num_rows = mysqli_num_rows($result);
        
            if ($num_rows > 0) {
				echo "<script>alert(\"Sesion iniciada\");</script>";
            } else {
                echo "<script>alert(\"Los datos son incorrectos, intente de nuevo.\");document.location=''</script>";
            }
        
            // El método devuelve la cantidad de filas
            return $num_rows;
        }












		}