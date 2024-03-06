<?php

	require_once("../model/AgendaModel.php");

	$agenda = new AgendaModel();
 
	require_once("../view/LoginView.php");
	session_start();

	if(isset($_POST["btn-login"])){
		$usuario = $_POST["user"];
		$clave = $_POST["pass"];
		if($agenda->VerifyUser($usuario, $clave) == 1){
			$_SESSION["adm"]=1; 
			$_SESSION["user"] = $usuario;
			echo "<script>document.location.href = '../index.php';</script>";
		}
	}

		

?>

