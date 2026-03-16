async function loginparticipante() {
    console.log("Chamando o servidor para validar participante...");

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação básica antes de enviar
    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Criando o pacote para o PHP
    const dados = new FormData();
    dados.append('email', email);
    dados.append('senha', senha);
    dados.append('tipo', 'participante'); // Diferencial para o PHP saber quem é

    try {
        // Fazendo a requisição para o seu futuro arquivo PHP
        const resposta = await fetch('verificar_login.php', {
            method: 'POST',
            body: dados
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            console.log("Login aprovado pelo banco!");
            // Guardamos o nome para dar as boas-vindas na próxima página
            localStorage.setItem('nomeUsuario', resultado.nome);
            window.location.href = "Area-do-participante.html";
        } else {
            alert(resultado.mensagem);
        }

    } catch (erro) {
        console.error("Erro técnico:", erro);
        alert("Erro ao conectar com o servidor. Verifique o arquivo PHP.");
    }
}