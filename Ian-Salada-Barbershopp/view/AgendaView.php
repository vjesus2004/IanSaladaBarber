<?php

session_start();

$visible = "none"; // Valor por defecto
$visiblelogin = "block"; // Valor por defecto

if(isset($_SESSION['rol']) && $_SESSION['rol'] == 'admin') {
    $visible = "block";
    $visiblelogin = "none";
}
?>

<!DOCTYPE HTML>
<html>
	<head>
		<title>Ian Salada Barber</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="view/assets/css/main.css" />
		<link rel="icon" type="image/x-icon" href="view/images/logo01.png">
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
	
			#calendar-table td:nth-child(7n) {
            background-color: black;
			color: grey;
            pointer-events: none; /* Deshabilita los clics en los domingos */
        }
			.div-reserva{
				display: none;
			}
			.color-i {
			color: #a08360; /* Color para la letra "I" */
		}
		
		.color-s {
			color: #a08360; /* Color para la letra "S" */
		}
			</style>

			
			
		
	</head>
	<body class="is-preload">

		<!-- Wrapper -->
			<div id="wrapper">

				<nav class="btn-iniciar-sesion" id="nav-user">
					<span><a href="view/LoginView.php"><img src="view/images/user-icon.png" class="img-iniciar-sesion" alt="Iniciar Sesión"></a></span>
				</nav>
				<!-- Header -->
					<header id="header">
					<div class="logo-container">
 					  <div class="white-circle">
 					    <img src="view/images/logo01.png" alt="Logo" class="logo" style="width: 180px; height: auto;">
 					  </div>
 					</div>
						<div class="content">
							<div class="inner">
							<h1>IAN SALADA BARBER</h1>
							</div>
						</div>
						<nav>
						<form method="post" action="controller/AgendaController.php"> 
						<ul>
						    <li><input type="button" class="btn-lista" onclick="window.location.href = '#intro';" value="Reserva Online"></li>
						    <li class="btn-agenda"><input type="button" class="btn-lista" onclick="window.location.href = '#work';" value="Ver agenda"></li>
						    <li class="btn-logout"><input type="submit" class="btn-lista"  href="index.php" name="btn-logout" value="Cerrar sesión"></li>
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
										
									    <div class="div-horas" id="horariosDiv"><!-- Div derecho -->
										
									         <div class="div-horas-disponibles" id="div-horas-disponibles">
											</div>
											
									    </div>
									</div>
								</div>
									    <div> <!-- Div inferior -->
									
										
										<form method="POST" id="myForm" action="controller/AgendaController.php">
										
										<div id="divReserva" class="div-reserva">
												<h4>Nombre (*)</h4>
												<input type="text" name="nombre" maxlength="50" id="nombreForm" oninput="validarSoloLetras(this)">
														
												<h4 class="txt-reservar">Teléfono (*)</h4>
												<input type="text" name="telefono" maxlength="9" id="telefonoForm" oninput="validarSoloNumeros(this)">
														
												<h4 class="txt-reservar">Nota (opcional)</h4>
												<input type="text" name="nota">

												
												<input type="hidden" id="horaSeleccionada" name="horaSeleccionada" value="">
												
												<!-- El modal -->
													<div id="confirmModal" class="modal">
                                            	<div class="modal-content">
												<p id="confirmationDetails">¿Esta seguro de reservar el turno?</p>
                                            	    <button id="confirmButton" name="confirmar-reserva">Confirmar</button>
                                            	    <button id="cancelButton" type="button">Cancelar</button>
                                            	</div>
                                        </div>

										</form>
											
											</div>
												<form>
													<button id="btn-reservar" type="button" class="primary btn-reservar" onclick="mostrarModal1()">Reservar</button>
												</form>				
									    	</div>
								

							</article>

							<article id="work">
								<h2 class="major">Agenda</h2>

									<!-- Mostrar la fecha actual -->
								<div class="agenda-date">
									<p>Día: <?php echo $_SESSION["diaconsultaFORMAT"] ; ?></p>
									<form style="width: 130vh; display:flex;">
											<button type="button" id="prevDayButton" style="margin-right:15px">Día Anterior</button>
											<button type="button" id="nextDayButton" style="margin-right:15px">Próximo Día</button>
											<button type="button" id="refresh"><img src="view/images/refresh.png" style="display:flex;" alt="Actualizar"></button>
									</form>
								</div>

								<div class="agenda-container">
									<table class="agenda-table">
								    <thead>
								        <tr>
								            <th>Nombre</th>
								            <th>Teléfono</th>
								            <th>Nota</th>
								            <th>Hora</th>
								            <th>Acción</th>
								        </tr>
								    </thead>
								    <tbody>
								        <?php
								        // Mostrar reservas para la mañana si existen
								        if (isset($_SESSION["agendaOpMañana"]) && !empty($_SESSION["agendaOpMañana"])) {
								            // Encabezado para los horarios opcionales en la mañana
								            ?>
								            <tr>
								                <td colspan="6">Horarios opcionales en la mañana</td>
								            </tr>
								            <?php
								            foreach ($_SESSION["agendaOpMañana"] as $reservaMañana) {
								                ?>
								                <tr>
								                    <td><?php echo $reservaMañana['nom']; ?></td>
								                    <td><?php echo $reservaMañana['tel']; ?></td>
								                    <td><?php echo $reservaMañana['nota']; ?></td>
								                    <td><?php echo $reservaMañana['hora']; ?></td>
								                    <td>
															<button type="button" onclick="mostrarModalMostrar(); getHoraShow('<?php echo $reservaMañana['hora']; ?>')"><img src="view\images\mostrar.png" alt="Liberar horario"/></button>
															<button type="button" onclick="mostrarModalBorrar(); getHoraDelete('<?php echo $reservaMañana['hora']; ?>')"><img src="view\images\borrar.png" alt="Eliminar Turno"/></button>
								                    </td>
								                </tr>
								            <?php
								            }
								        }
									
								        // Mostrar reservas normales si existen
								        if (isset($_SESSION["agenda"]) && !empty($_SESSION["agenda"])) {
								            // Encabezado para los horarios por defecto
								            ?>
								            <tr>
								                <td colspan="6">Horarios por defecto</td>
								            </tr>
								            <?php
								            foreach ($_SESSION["agenda"] as $reserva) {
								                ?>
								                <tr>
								                    <td><?php echo $reserva['nom']; ?></td>
								                    <td><?php echo $reserva['tel']; ?></td>
								                    <td><?php echo $reserva['nota']; ?></td>
								                    <td><?php echo $reserva['hora']; ?></td>
								                    <td>
															<button type="button" onclick="mostrarModalOcultar(); getHoraHidde('<?php echo $reserva['hora']; ?>')"><img src="view\images\ocultar.png" alt="Ocultar horario"/></button>
															<button type="button" onclick="mostrarModalBorrar(); getHoraDelete('<?php echo $reserva['hora']; ?>')"><img src="view\images\borrar.png" alt="Eliminar turno"/></button>
								                    </td>
								                </tr>
								            <?php
								            }
								        }
									
										
								        // Mostrar reservas para la tarde si existen
								        if (isset($_SESSION["agendaOpTarde"]) && !empty($_SESSION["agendaOpTarde"])) {
								            // Encabezado para los horarios opcionales de la tarde
								            ?>
								            <tr>
								                <td colspan="6">Horarios opcionales de la tarde</td>
								            </tr>
								            <?php
								            foreach ($_SESSION["agendaOpTarde"] as $reservaTarde) {
								                ?>
								                <tr>
								                    <td><?php echo $reservaTarde['nom']; ?></td>
								                    <td><?php echo $reservaTarde['tel']; ?></td>
								                    <td><?php echo $reservaTarde['nota']; ?></td>
								                    <td><?php echo $reservaTarde['hora']; ?></td>
								                    <td>
															<button type="button" onclick="mostrarModalMostrar(); getHoraShow('<?php echo $reservaTarde['hora']; ?>');"><img src="view\images\mostrar.png" alt="Liberar horario"/></button>
															<button type="button" onclick="mostrarModalBorrar(); getHoraDelete('<?php echo $reservaTarde['hora']; ?>');" ><img src="view\images\borrar.png" alt="Eliminar turno"/></button>
											
								                    </td>

													
								                </tr>
												
								            <?php
								            }
								        }
								        ?>
										

										<div id="confirmarBorrarModal" class="modal">
											<div class="modal-content">
												<div>
													
													<p>¿Esta seguro que desea eliminar el turno reservado?</p>
												</div>
												<div style="display:flex;">
												<form>
													<input type="hidden" id="hora-delete" value="">
													<button id="btnConfirmarBorrar">Confirmar</button>
													<button id="btnCancelarBorrar" type="button" style="margin-left: 15px">Cancelar</button>
												</form>
													
												</div>
											</div>
                       					</div>

										   <div id="confirmarMostrarModal" class="modal">
												<div class="modal-content">
													<div>
														<p>¿Esta seguro que desea mostrar el turno?</p>
													</div>
													<div style="display:flex;">
													<form>
														<input type="hidden" id="hora-show" value="">
														<button id="btnConfirmarMostrar">Confirmar</button>
														<button id="btnCancelarMostrar" type="button" style="margin-left: 15px">Cancelar</button>
													</form>
														
													</div>
												</div>
                       						</div>

											<div id="confirmarOcultarModal" class="modal">
												<div class="modal-content">
													<div>
														<p>¿Esta seguro que desea ocultar el turno?</p>
													</div>
													<div style="display:flex;">
													<form>
														<input type="hidden" id="hora-hidde" value="">
														<button id="btnConfirmarOcultar">Confirmar</button>
														<button id="btnCancelarOcultar" type="button" style="margin-left: 15px">Cancelar</button>
													</form>
														
													</div>
												</div>
                       						</div>
								    </tbody>
								</table>
								

							</div>

							</article>



					</div>

				<!-- Footer -->
					<footer id="footer">

					</footer>

			</div>

		<!-- Marquesina -->
		
		<div class="marquee-container">
			<div id="bg"></div>
		</div>

		<!-- Scripts -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
			<script src="view/assets/js/browser.min.js"></script>
			<script src="view/assets/js/breakpoints.min.js"></script>
			<script src="view/assets/js/util.js"></script>
			<script src="view/assets/js/popups.js"></script>
			<script src="view/assets/js/main.js"></script>
			<script src="view/assets/js/script-calendar.js"></script>
			<script src="view/assets/js/controlHoras.js"></script>
			<script src="view/assets/js/validaciones.js"></script>
			<script src="view/assets/js/solicitudesAJAX.js"></script>
	</body>
</html>
