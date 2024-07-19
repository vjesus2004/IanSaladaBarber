<?php
    ob_start(); // Inicia el almacenamiento en búfer de salida
    session_start();

    require_once("../model/AgendaModel.php");

    $agenda = new AgendaModel();

    if(isset($_POST['seleccionarDia'])) {
        $_SESSION['SelectedDay'] = $_POST['seleccionarDia'];
        $horarios = $agenda->obtenerHorariosDisponibles($_SESSION['SelectedDay']);
        $horariosTarde = $agenda->obtenerHorariosDisponiblesTarde($_SESSION['SelectedDay']);
        $horariosMañana = $agenda->obtenerHorariosDisponiblesMañana($_SESSION['SelectedDay']);
        $horariosTotalesDia = array_merge($horarios, $horariosTarde, $horariosMañana);
    
        function hora_a_minutos($hora) {
            $partes = explode(':', $hora);
            return $partes[0] * 60 + $partes[1];
        }
    
        function minutos_a_hora($minutos) {
            $horas = floor($minutos / 60);
            $minutos = $minutos % 60;
            return sprintf('%02d:%02d', $horas, $minutos);
        }
    
        $horarios_en_minutos = array_map('hora_a_minutos', $horariosTotalesDia);
        sort($horarios_en_minutos);
    
        $horarios_ordenados = array_map('minutos_a_hora', $horarios_en_minutos);
        $horariosTotalesDia = $horarios_ordenados;
    
        // Devolver los horarios disponibles como respuesta AJAX
        echo json_encode($horariosTotalesDia);
    }

    if(!isset($_SESSION["diaconsultaFORMAT"])) {

        $_SESSION["agenda"] = $agenda->obtenerHorarios(date("Y-m-d"));

        $_SESSION["agendaOpMañana"] = $agenda->obtenerHorariosMañana(date("Y-m-d"));
        
        $_SESSION["agendaOpTarde"] = $agenda->obtenerHorariosTarde(date("Y-m-d"));

        $_SESSION["diaconsultaFORMAT"] = $agenda->formatoFechaEspañol(date("Y-m-d"));
    }


    if(isset($_POST["refresh"])) {
        $_SESSION["agenda"] = $agenda->obtenerHorarios($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpMañana"] = $agenda->obtenerHorariosMañana($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpTarde"] = $agenda->obtenerHorariosTarde($_SESSION["diaconsulta"]);
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    }


////SHOW OPCIONAL TURNO
if (isset($_POST['hora-show'])) {
    $horaShow = $_POST['hora-show'];

    if($agenda->CheckTurnoOpExist1($_SESSION["diaconsulta"],$horaShow) == 0 && $agenda->CheckTurnoOpExist2($_SESSION["diaconsulta"],$horaShow) == 0){
        $agenda->InsertTurnoOpcional( $_SESSION["diaconsulta"],$horaShow);

                $_SESSION["agenda"] = $agenda->obtenerHorarios($_SESSION["diaconsulta"]);
                $_SESSION["agendaOpMañana"] = $agenda->obtenerHorariosMañana($_SESSION["diaconsulta"]);
                $_SESSION["agendaOpTarde"] = $agenda->obtenerHorariosTarde($_SESSION["diaconsulta"]);
                header("Location: " . $_SERVER['REQUEST_URI']);
    exit;
    }
    else{
        echo "<script>alert('Ya existe un turno opcional en ese horario');</script>";
    }
}
    if(isset($_POST['btn-pre-reserva'])){
        $_SESSION["FormatoPopup"] = $agenda->formatoFechaEspañol($_SESSION['SelectedDay']);
        $_SESSION["horaSeleccionada"] = $_POST['btn-pre-reserva'];
    }
    
    if (isset($_POST['hora-hidde'])) {
        
        $horaHidde = $_POST['hora-hidde'];
        if ($agenda->CheckTurnoOcultoExist($_SESSION["diaconsulta"],$horaHidde) == 0) {
            $agenda->InsertTurnoOculto($_SESSION["diaconsulta"],$horaHidde);
            $_SESSION["agenda"] = $agenda->obtenerHorarios($_SESSION["diaconsulta"]);
            $_SESSION["agendaOpMañana"] = $agenda->obtenerHorariosMañana($_SESSION["diaconsulta"]);
            $_SESSION["agendaOpTarde"] = $agenda->obtenerHorariosTarde($_SESSION["diaconsulta"]);
            header("Location: " . $_SERVER['REQUEST_URI']);
            exit;
        }
        else{
            echo "<script>alert('El horario ya esta oculto.');</script>";
        }
        
       
        }
    

// DELETE TURNO
    if(isset($_POST["hora-delete"])){
        $horaABorrar = $_POST["hora-delete"];
        $agenda->DeleteTurno($horaABorrar,$_SESSION["diaconsulta"]);
        $_SESSION["agenda"] = $agenda->obtenerHorarios($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpMañana"] = $agenda->obtenerHorariosMañana($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpTarde"] = $agenda->obtenerHorariosTarde($_SESSION["diaconsulta"]);
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    }


    if (isset($_POST["next-day"])) {

        $_SESSION["diaconsulta"] = date("Y-m-d", strtotime($_SESSION["diaconsulta"] . "+1 day"));
        $_SESSION["agenda"] = $agenda->obtenerHorarios($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpMañana"] = $agenda->obtenerHorariosMañana($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpTarde"] = $agenda->obtenerHorariosTarde($_SESSION["diaconsulta"]);
        $_SESSION["diaconsultaFORMAT"] = $agenda->formatoFechaEspañol($_SESSION["diaconsulta"]);
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
    }

    if (isset($_POST["prev-day"])) {

        $_SESSION["diaconsulta"] = date("Y-m-d", strtotime($_SESSION["diaconsulta"] . "-1 day"));
        $_SESSION["agenda"] = $agenda->obtenerHorarios($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpMañana"] = $agenda->obtenerHorariosMañana($_SESSION["diaconsulta"]);
        $_SESSION["agendaOpTarde"] = $agenda->obtenerHorariosTarde($_SESSION["diaconsulta"]);
        $_SESSION["diaconsultaFORMAT"] = $agenda->formatoFechaEspañol($_SESSION["diaconsulta"]);
        header("Location: " . $_SERVER['REQUEST_URI']);
        exit;
        }
//
       // LOGOUT
       if(isset($_POST["btn-logout"])){
           $_SESSION["rol"] = null;
           echo "<script>document.location.href = '../index.php';</script>";
       }
       
    // GUARDAR  TURNO
    if (isset($_POST["confirmar-reserva"])) {
        // Verificar si el campo "SelectedDay" está definido en la sesión
        if (isset($_SESSION['SelectedDay'])) {

                $nombre = $_POST["nombre"];
                $telefono = $_POST["telefono"];
                $nota = $_POST["nota"];
                $hora = $_POST["horaSeleccionada"];
                $agenda->InsertOrUpdateTurno($nombre, $telefono, $nota, $_SESSION['SelectedDay'], $hora);
                echo "<script>";
                echo "var hora = '$hora';";
                echo "var dia = '{$_SESSION['FormatoPopup']}';";
                echo "var url = 'ConfirmacionController.php?hora=' + encodeURIComponent(hora) + '&dia=' + encodeURIComponent(dia);";
                echo "document.location.href = url;";
                echo "</script>";
        }
    }

    ob_end_flush(); // Envía el contenido del búfer de salida y desactiva el almacenamiento en búfer de salida
?>


	

