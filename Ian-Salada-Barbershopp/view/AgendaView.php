<?php
	session_start();
	
	
	if($_SESSION["adm"] == 1){
		$visible = "visible";

	}else{
		$visible = "hidden";
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
				visibility: <?php echo $visible; ?>;
			}
			.btn-logout{
				visibility: <?php echo $visible; ?>;
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
								<div class="calendar">
									<div class="nav-calendar">
										<div class="nav-item">
											<button class="prev-month style-button">&laquo;</button>
										</div>
										<div class="month-year">
											<span id="month"></span>
											<span id="year"></span>
										</div>
										<div class="nav-item">
											<button class="next-month style-button">&raquo;</button>
										</div>
									</div>
									
									<table id="calendar-table" class="style-table">
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
							</article>

						<!-- Work -->
							<article id="work">
								<h2 class="major">Work</h2>
								<span class="image main"><img src="view/images/pic02.jpg" alt="" /></span>
								<p>Adipiscing magna sed dolor elit. Praesent eleifend dignissim arcu, at eleifend sapien imperdiet ac. Aliquam erat volutpat. Praesent urna nisi, fringila lorem et vehicula lacinia quam. Integer sollicitudin mauris nec lorem luctus ultrices.</p>
								<p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet feugiat tempus.</p>
							</article>

					</div>

				<!-- Footer -->
					<footer id="footer">
					</footer>

			</div>

		<!-- BG -->
		
		<div id="marquee-container">
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
