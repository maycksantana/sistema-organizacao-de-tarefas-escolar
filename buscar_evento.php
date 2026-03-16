<?php
include 'conexao.php';

$codigo = $_GET['codigo'] ?? '';

$sql = "SELECT id, disciplina, professor, descricao FROM eventos WHERE codigo_evento = '$codigo' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $evento = $result->fetch_assoc();
    $evento['sucesso'] = true;
    // O fetch_assoc já pega o 'id' se ele estiver no SELECT acima
    echo json_encode($evento);
} else {
    echo json_encode(['sucesso' => false]);
}
$conn->close();
?>