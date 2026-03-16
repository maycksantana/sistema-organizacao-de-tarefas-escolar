<?php
include 'conexao.php';

// Limpa saídas para o JSON não quebrar
ob_clean();

$sql = "SELECT entregas.nome_aluno, entregas.arquivo_path, entregas.data_envio, eventos.disciplina 
        FROM entregas 
        JOIN eventos ON entregas.id_evento = eventos.id 
        ORDER BY entregas.data_envio DESC";

$result = $conn->query($sql);

$entregas = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $entregas[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($entregas);
$conn->close();
?>