<?php
include 'conexao.php';

// Recebe os dados do fetch()
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

// Procura o usuário no banco (Tabela 'usuarios')
$sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha' LIMIT 1";
$result = $conn->query($sql);

$resposta = [];

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $resposta['sucesso'] = true;
    $resposta['nome'] = $user['nome'];
} else {
    $resposta['sucesso'] = false;
    $resposta['mensagem'] = "E-mail ou senha incorretos!";
}

header('Content-Type: application/json');
echo json_encode($resposta);
$conn->close();
?>