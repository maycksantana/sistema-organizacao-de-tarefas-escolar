<?php
include 'conexao.php';

$sql = "SELECT * FROM eventos ORDER BY id DESC";
$result = $conn->query($sql);

$eventos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $eventos[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($eventos);
$conn->close();
?>