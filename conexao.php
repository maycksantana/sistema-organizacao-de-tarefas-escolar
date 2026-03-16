<?php
// Substitua pelos dados que aparecem no seu painel do InfinityFree (Account Details)
$servername = ""; // O seu Host (veja se é o 102 mesmo)
$username = "";           // Seu Usuário do MySQL
$password = "";    // Sua senha (a Account Password)
$dbname = "";   // O nome exato do seu banco

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica se a conexão falhou
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>