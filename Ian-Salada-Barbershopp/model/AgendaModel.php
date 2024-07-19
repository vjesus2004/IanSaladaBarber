<?php
    class AgendaModel{
        
        private $db;
     
        public function __construct(){
            require_once("db.php");
            $this->db = Conexion::ConexionBD();
        }

        public function VerifyUser($user, $clave) {
            $stmt = $this->db->prepare("SELECT * FROM adm WHERE usuario=? AND clave=?");
            $stmt->bind_param("ss", $user, $clave);
            $stmt->execute();
            $result = $stmt->get_result();
            $num_rows = $result->num_rows;
        
            return $num_rows;
        }
//////////////////////////////HORARIOS NORMALES////////////////////////////////////////
                     //NO FUNCIONA//
function obtenerHorariosDisponibles($fecha) {
    if ($this->db->connect_error) {
        die("Connection failed: " . $this->db->connect_error);
    }
    
    $stmt = $this->db->prepare("SELECT hora, opcional FROM agenda WHERE dia = ? OR opcional = 1");
    
    if (!$stmt) {
        die("Error preparing statement: " . $this->db->error);
    }
    
    if (!$stmt->bind_param("s", $fecha)) {
        die("Error binding parameter: " . $stmt->error);
    }
    
    if (!$stmt->execute()) {
        die("Error executing statement: " . $stmt->error);
    }
    $result = $stmt->get_result();
    
    $horariosOcupados = array();
    $horariosOpcionales = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if ($row["opcional"] == 1) {
                $horariosOpcionales[] = $row["hora"];
            } else {
                $horariosOcupados[] = $row["hora"];
            }
        }
    }
    
    $horariosTotales = array();
    $horaInicio = strtotime("09:00");
    $horaFin = strtotime("18:00");
    $intervalo = 3600;
    
    for ($hora = $horaInicio; $hora < $horaFin; $hora += $intervalo) {
        $horario = date("H:i", $hora);
        if (!in_array($horario, $horariosOcupados) || in_array($horario, $horariosOpcionales)) {
            $horariosTotales[] = $horario;
        }
    }
    
    return $horariosTotales;
}

function obtenerHorariosDisponiblesMañana($fecha) {
    $stmt = $this->db->prepare("SELECT hora FROM agenda WHERE dia = ? AND (hora = '08:00' OR hora = '07:00') AND opcional = 1");
    $stmt->bind_param("s", $fecha);
    $stmt->execute();
    $result = $stmt->get_result();

    $horariosOpcionales = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $horariosOpcionales[] = $row["hora"];
        }
    }

    return $horariosOpcionales;
}



function obtenerHorariosDisponiblesTarde($fecha) {
    $stmt = $this->db->prepare("SELECT hora FROM agenda WHERE dia = ? AND (hora = '18:00' OR hora = '19:00' OR hora = '20:00' OR hora = '21:00') AND opcional = 1");
    $stmt->bind_param("s", $fecha);
    $stmt->execute();
    $result = $stmt->get_result();

    $horariosOpcionales = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $horariosOpcionales[] = $row["hora"];
        }
    }

    return $horariosOpcionales;
}


        function obtenerHorarios($fecha) {
            $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia = ?");
            $stmt->bind_param("s", $fecha);
            $stmt->execute();
            $result = $stmt->get_result();
        
            $agendaCompleta = array();
        
            $horariosOcupados = array();
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $horariosOcupados[] = $row;
                }
            }
        
            $horaInicio = strtotime("09:00");
            $horaFin = strtotime("18:00");
            $intervalo = 3600;
        
            for ($hora = $horaInicio; $hora < $horaFin; $hora += $intervalo) {
                $horario = date("H:i", $hora);
                $disponible = true;
                foreach ($horariosOcupados as $ocupado) {
                    if ($horario == $ocupado["hora"]) {
                        $disponible = false;
                        $agendaCompleta[] = $ocupado;
                        break;
                    }
                }
                if ($disponible) {
                    $agendaCompleta[] = array(
                        "dia" => $fecha,
                        "hora" => $horario,
                        "nom" => "",
                        "tel" => "",
                        "nota" => "",
                        "disponible" => true
                    );
                }
            }
        
            usort($agendaCompleta, function($a, $b) {
                return strtotime($a['hora']) - strtotime($b['hora']);
            });
        
            return $agendaCompleta;
        }
        
        function obtenerHorariosMañana($fecha) {
            $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia = ?");
            $stmt->bind_param("s", $fecha);
            $stmt->execute();
            $result = $stmt->get_result();
        
            $agendaCompleta = array();
        
            $horariosOcupados = array();
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $horariosOcupados[] = $row;
                }
            }
        
            $horaInicio = strtotime("07:00");
            $horaFin = strtotime("09:00");
            $intervalo = 3600;
        
            for ($hora = $horaInicio; $hora < $horaFin; $hora += $intervalo) {
                $horario = date("H:i", $hora);
                $disponible = true;
                foreach ($horariosOcupados as $ocupado) {
                    if ($horario == $ocupado["hora"]) {
                        $disponible = false;
                        $agendaCompleta[] = $ocupado;
                        break;
                    }
                }
                if ($disponible) {
                    $agendaCompleta[] = array(
                        "dia" => $fecha,
                        "hora" => $horario,
                        "nom" => "",
                        "tel" => "",
                        "nota" => "",
                        "disponible" => true
                    );
                }
            }
        
            usort($agendaCompleta, function($a, $b) {
                return strtotime($a['hora']) - strtotime($b['hora']);
            });
        
            return $agendaCompleta;
        }

        function obtenerHorariosTarde($fecha) {
    $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia = ?");
    $stmt->bind_param("s", $fecha);
    $stmt->execute();
    $result = $stmt->get_result();

    $agendaCompleta = array();

    $horariosOcupados = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $horariosOcupados[] = $row;
        }
    }

    $horaInicio = strtotime("18:00");
    $horaFin = strtotime("22:00");
    $intervalo = 3600;

    for ($hora = $horaInicio; $hora < $horaFin; $hora += $intervalo) {
        $horario = date("H:i", $hora);
        $disponible = true;
        foreach ($horariosOcupados as $ocupado) {
            if ($horario == $ocupado["hora"]) {
                $disponible = false;
                $agendaCompleta[] = $ocupado;
                break;
            }
        }
        if ($disponible) {
            $agendaCompleta[] = array(
                "dia" => $fecha,
                "hora" => $horario,
                "nom" => "",
                "tel" => "",
                "nota" => "",
                "disponible" => true
            );
        }
    }


    usort($agendaCompleta, function($a, $b) {
        return strtotime($a['hora']) - strtotime($b['hora']);
    });

    return $agendaCompleta;
}

//INSERT OR UPDATE TURNO
        function InsertOrUpdateTurno($nombre, $telefono, $nota, $dia, $hora) {
            // Verificar si ya existe un turno opcional para el día y hora especificados
            $turno_existente = $this->CheckTurnoOpExist($dia, $hora);
        
            // Si existe un turno opcional, actualizarlo; de lo contrario, insertar uno nuevo

        if ($this->CheckTurnoExist($dia, $hora)==0){

            if ($turno_existente) {
                $this->UpdateTurnoOpcional($nombre, $telefono, $nota, $dia, $hora);
            } else {
                $this->InsertTurno($nombre, $telefono, $nota, $dia, $hora);                         
            }


        }else{
            echo "<script>alert('El turno se acaba de ocupar recientemente, actualice la pagina e intente nuevamente');</script>";
            echo "<script>document.location.href = '../index.php';</script>";
        }                           
    }





//INSERT TURNO
        
function CheckTurnoExist($dia, $hora) {
    $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia=? AND hora=? AND opcional=0");
    $stmt->bind_param("ss", $dia, $hora);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_rows = $result->num_rows;

    if ($num_rows > 0) {
    } else {
    }

    return $num_rows;
}


        function InsertTurno($nombre, $telefono, $nota, $dia, $hora) {
            $stmt = $this->db->prepare("INSERT INTO agenda (nom, tel, nota, dia, hora, opcional) VALUES (?, ?, ?, ?, ?, 0)");
            $stmt->bind_param("sssss", $nombre, $telefono, $nota, $dia, $hora);
            
            if ($stmt->execute()) {
                
            } else {
                
            }
        }

////CHECK TURNO OPCIONAL EXIST

        function CheckTurnoOpExist($dia, $hora) {
            $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia=? AND hora=? AND opcional=1");
            $stmt->bind_param("ss", $dia, $hora);
            $stmt->execute();
            $result = $stmt->get_result();
            $num_rows = $result->num_rows;
        
            if ($num_rows > 0) {
                
            } else {
                
            }
        
            return $num_rows;
        }
/////OCULTAR HORARIO
function CheckTurnoOcultoExist($dia, $hora) {
    $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia=? AND hora=? AND opcional=0 AND nota='Horario Oculto'");
    $stmt->bind_param("ss", $dia, $hora);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_rows = $result->num_rows;

    if ($num_rows > 0) {
    } else {
    }

    return $num_rows;
}






function InsertTurnoOculto($dia,$hora) {
    $stmt = $this->db->prepare("INSERT INTO agenda (dia, hora, nota, opcional) VALUES (?, ?, 'Horario Oculto', 0)");
    $stmt->bind_param("ss",$dia, $hora);

    if ($stmt->execute()) {
        
    } else {
        
    }
}

////CHECK TURNO OPCIONAL EXIST
function CheckTurnoOpExist2($dia, $hora) {
    $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia=? AND hora=? AND opcional=0");
    $stmt->bind_param("ss", $dia, $hora);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_rows = $result->num_rows;

    if ($num_rows > 0) {
        
    } else {
        
    }

    return $num_rows;
}
function CheckTurnoOpExist1($dia, $hora) {
    $stmt = $this->db->prepare("SELECT * FROM agenda WHERE dia=? AND hora=? AND opcional=1 AND nota='Opcional liberado.'");
    $stmt->bind_param("ss", $dia, $hora);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_rows = $result->num_rows;

    if ($num_rows > 0) {
        
    } else {
        
    }

    return $num_rows;
}


//UPDATE TURNO OPCIONAL
        function UpdateTurnoOpcional($nombre, $telefono, $nota, $dia, $hora) {
            $stmt = $this->db->prepare("UPDATE agenda SET opcional=0 , nom=? , tel = ? , nota = ? WHERE dia=? AND hora=?");
            $stmt->bind_param("sssss",$nombre, $telefono, $nota, $dia, $hora);
            
            if ($stmt->execute()) {
                
            } else {
                
            }
        }




//INSERT TURNO OPCIONAL
        function InsertTurnoOpcional($dia,$hora) {
            $stmt = $this->db->prepare("INSERT INTO agenda (dia, hora, nota, opcional) VALUES (?, ?, 'Opcional liberado.', 1)");
            $stmt->bind_param("ss",$dia, $hora);

            if ($stmt->execute()) {
                
            } else {
                
            }
        }



///DELETE TURNO
        function DeleteTurno($hora, $dia) {
            // Validación de parámetros
            if (empty($hora) || empty($dia)) {
                return;
            }
        
            try {
                $stmt = $this->db->prepare("DELETE FROM agenda WHERE dia=? AND hora=?");
                $stmt->bind_param("ss", $dia, $hora);
        
                if ($stmt->execute()) {
                    
                } else {
                    
                }
            } catch (Exception $e) {
                echo "Error: " . $e->getMessage();
            }
        }
        

//FORMATO FECHA ESPAÑOL
function formatoFechaEspañol($fecha) {

    $meses = array(
        '01' => 'enero', '02' => 'febrero', '03' => 'marzo', '04' => 'abril', '05' => 'mayo', '06' => 'junio',
        '07' => 'julio', '08' => 'agosto', '09' => 'septiembre', '10' => 'octubre', '11' => 'noviembre', '12' => 'diciembre'
    );
    
    $partes_fecha = explode('-', $fecha);

    if (count($partes_fecha) < 3) {
        return;
    }

    $dia = $partes_fecha[2];
    $mes = $meses[$partes_fecha[1]];
    $año = $partes_fecha[0];
    
    $fecha_formateada = "$dia de $mes de $año";
    
    return $fecha_formateada;
        }

    }