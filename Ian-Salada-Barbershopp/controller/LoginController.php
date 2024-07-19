<?php

	require_once("../model/AgendaModel.php");

	$agenda = new AgendaModel();
	session_start();

	$_SESSION["rol"] = 'null';

	if(isset($_POST["btn-login"])){
		$usuario = $_POST["user"];
		$clave = $_POST["pass"];
		if($agenda->VerifyUser($usuario, $clave) == 1){
			$_SESSION["rol"] = 'admin';
			echo "<script>document.location.href = '../index.php';</script>";
		} else {
			echo "<script>alert('Usuario o contraseña incorrectos.');</script>";
			echo "<script>document.location.href = '../view/LoginView.php';</script>";
		}
	}

?>
