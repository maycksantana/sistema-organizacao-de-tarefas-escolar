<?php
include 'conexao.php';

// Recebe os dados do FormData do JavaScript
$disciplina  = $_POST['disciplina'] ?? '';
$professor   = $_POST['professor'] ?? '';
$id_usuario  = $_POST['idUsuario'] ?? '';
$data_hora   = $_POST['dataHora'] ?? '';
$descricao   = $_POST['descricao'] ?? '';
$localizacao = $_POST['localizacao'] ?? '';
$codigo      = $_POST['codigo'] ?? '';

if (empty($codigo)) {
    die("Erro: Código do evento é obrigatório.");
}

$sql = "INSERT INTO eventos (disciplina, professor, id_usuario, data_hora, descricao, localizacao, codigo_evento) 
        VALUES ('$disciplina', '$professor', '$id_usuario', '$data_hora', '$descricao', '$localizacao', '$codigo')";

if ($conn->query($sql) === TRUE) {
    echo "Sucesso! Evento " . $codigo . " cadastrado.";
} else {
    echo "Erro ao salvar no banco: " . $conn->error;
}

$conn->close();
?>