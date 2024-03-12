<?php
session_start();

$visible = "none"; // Valor por defecto
$visiblelogin = "block"; // Valor por defecto

if(isset($_SESSION["adm"]) && $_SESSION["adm"] == 1){
    $visible = "block";
	$visiblelogin = "none";
}else{
	$visible = "none";
	$visiblelogin = "block";
}
?>

<!DOCTYPE HTML>
<html>
	<head>
		<title>Ian Salada Barber</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="view/assets/css/main.css" />
		<noscript><link rel="stylesheet" href="view/assets/css/noscript.css" /></noscript>
		<style>
			.btn-agenda{
				display: <?php echo $visible; ?>;
			}
			.btn-logout{
				display: <?php echo $visible; ?>;
			}

			#nav-user{
				display: <?php echo $visiblelogin; ?>;
			}
	
			</style>
		
	</head>
	<body class="is-preload">

		<!-- Wrapper -->
			<div id="wrapper">

				<nav class="btn-iniciar-sesion" id="nav-user">
					<span><a href="controller/LoginController.php"><img src="view/images/user-icon.png" class="img-iniciar-sesion" alt="Iniciar Sesión"></a></span>
				</nav>
				<!-- Header -->
					<header id="header">
						<div class="logo">
							<span class="icon fa-gem"></span>
						</div>
						<div class="content">
							<div class="inner">
								<h1>IAN SALADA BARBER</h1>
							</div>
						</div>
						<nav>
						<form method="post"> 
						<ul>
						    <li><a href="#intro" >Reserva Online</a></li>
						    <li class="btn-agenda"><a href="#work" >Ver agenda</a></li>
						    <li><button class="btn-logout" name="btn-logout">CERRAR SESION</button></li>
						</ul>
						</form>
						</nav>
					</header>

				<!-- Main -->
					<div id="main">

						<!-- Intro -->
							<article id="intro">
								<h2 class="major">Elige día y hora</h2>


								<div class="div-calendar"> <!-- Div Principal -->
									<div class="div-calendar-superior"> <!-- Div superior -->
										<div><!-- Div izquierdo -->
											<div class="calendar">
												<div class="nav-calendar">
													<div class="nav-item">
														<button class="prev-month style-button btn-calendar-left">&laquo;</button>
													</div>
													<div class="month-year">
														<span id="month"></span>
														<span id="year"></span>
													</div>
													<div class="nav-item">
														<button class="next-month style-button btn-calendar-right">&raquo;</button>
													</div>
												</div>
												
												<table id="calendar-table" class="style-table responsive-table">
													<thead>
														<tr>
															<th>Lun</th>
															<th>Mar</th>
															<th>Mie</th>
															<th>Jue</th>
															<th>Vie</th>
															<th>Sab</th>
															<th>Dom</th>
														</tr>
													</thead>
													<tbody></tbody>
												</table>
											</div>
										</div>
										<div class="div-horas"><!-- Div derecho -->
											<div class="div-horas-mañana">
												<h4>Mañana</h4>
												<input class="btn-hora" type="button" value="9:00">
												<input class="btn-hora" type="button" value="10:00">
												<input class="btn-hora" type="button" value="11:00">
												<input class="btn-hora" type="button" value="12:00">
											</div>
											<div class="div-horas-tarde">
												<h4>Tarde</h4>
												<input class="btn-hora" type="button" value="14:00">
												<input class="btn-hora" type="button" value="15:00">
												<input class="btn-hora" type="button" value="16:00">
												<input class="btn-hora" type="button" value="17:00">
												<input class="btn-hora" type="button" value="18:00">
												<input class="btn-hora" type="button" value="19:00">
												<input class="btn-hora" type="button" value="20:00">
												<input class="btn-hora" type="button" value="21:00">
											</div>
										</div>
									</div>
									<div> <!-- Div inferior -->
									<form method="post">
										<h4>Nombre</h4>
										<input type="text">

										<h4 class="txt-reservar">Teléfono</h4>
										<input type="text">

										<h4 class="txt-reservar">Nota (opcional)</h4>
										<input type="text">

										<input type="button" value="reservar" class="primary btn-reservar">
									</form>
										
									</div>
								</div>

							</article>

						<!-- Work -->
							<article id="work">
								<h2 class="major">Agenda</h2>
								
							</article>

					</div>

				<!-- Footer -->
					<footer id="footer">
					</footer>

			</div>

		<!-- BG -->
		
		<div class="marquee-container">
			<div id="bg"></div>
		</div>

		<!-- Scripts -->
			<script src="view/assets/js/jquery.min.js"></script>
			<script src="view/assets/js/browser.min.js"></script>
			<script src="view/assets/js/breakpoints.min.js"></script>
			<script src="view/assets/js/util.js"></script>
			<script src="view/assets/js/main.js"></script>
			<script src="view/assets/js/script-calendar.js"></script>
			<script src="view/https://kit.fontawesome.com/3ee734fc3f.js" crossorigin="anonymous"></script>

			<script>
				document.addEventListener('DOMContentLoaded', function () {
				  // Obtenemos el elemento #nav-user
				  var navUser = document.getElementById('nav-user');
				
				  // Verificamos si #work está activo
				  var workSection = document.getElementById('work');
				  if (workSection.classList.contains('active')) {
					// Si está activo, ocultamos #nav-user
					navUser.style.display = 'none';
				  }
				});
			</script>
	</body>
</html>
