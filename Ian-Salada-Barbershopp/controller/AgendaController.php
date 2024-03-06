<?php

	require_once("model/AgendaModel.php");

	$agenda = new AgendaModel();

    require_once("view/AgendaView.php");

	if(isset($_POST["btn-logout"])){
		session_start();
		session_destroy();
		echo "<script>document.location.href = 'index.php';</script>";
	}