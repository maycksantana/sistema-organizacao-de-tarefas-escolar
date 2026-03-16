<?php
include 'conexao.php';

// Limpa qualquer saída anterior para não quebrar o retorno
ob_clean();

$nome_aluno = $_POST['nome_aluno'] ?? 'Anônimo';
$id_evento = $_POST['id_evento'] ?? 0;

// Verifica se o arquivo foi enviado sem erros
if (isset($_FILES['arquivo']) && $_FILES['arquivo']['error'] === 0) {
    
    $pasta = "uploads/";
    
    // Se a pasta não existir, o PHP tenta criar
    if (!is_dir($pasta)) {
        mkdir($pasta, 0777, true);
    }

    // Pega a extensão do arquivo e cria um nome único (para não sobrescrever arquivos com nomes iguais)
    $extensao = pathinfo($_FILES['arquivo']['name'], PATHINFO_EXTENSION);
    $novo_nome = bin2hex(random_bytes(10)) . "." . $extensao;
    $caminho_final = $pasta . $novo_nome;

    if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $caminho_final)) {
        // Salva o caminho no banco de dados
        $sql = "INSERT INTO entregas (id_evento, nome_aluno, arquivo_path) VALUES ('$id_evento', '$nome_aluno', '$caminho_final')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Sucesso! Sua atividade foi entregue com sucesso.";
        } else {
            echo "Erro ao gravar no banco: " . $conn->error;
        }
    } else {
        echo "Erro ao mover o arquivo para a pasta uploads. Verifique as permissões.";
    }
} else {
    echo "Erro no envio do arquivo. Verifique o tamanho ou o formato.";
}

$conn->close();
?>