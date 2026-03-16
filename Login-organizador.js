async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const dados = new FormData();
    dados.append('email', email);
    dados.append('senha', senha);

    try {
        // Envia para o PHP verificar
        const resposta = await fetch('verificar_login.php', {
            method: 'POST',
            body: dados
        });

        const resultado = await resposta.json(); // Recebe a resposta em formato de objeto

        if (resultado.sucesso) {
            // Salva o nome do usuário para usar depois
            localStorage.setItem('usuarioLogado', resultado.nome);
            window.location.href = "Area-do-organizador.html";
        } else {
            alert(resultado.mensagem);
        }
    } catch (erro) {
        console.error("Erro ao logar:", erro);
        alert("Erro na conexão com o servidor.");
    }
}