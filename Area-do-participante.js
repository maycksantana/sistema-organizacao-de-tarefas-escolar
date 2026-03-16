async function buscarEvento() {
    const codigo = document.getElementById('codigoBusca').value;
    const erro = document.getElementById('mensagemErro');
    const detalhes = document.getElementById('detalhesEvento');

    if (!codigo) {
        erro.innerText = "Digite um código para buscar.";
        return;
    }

    try {
        // Busca no banco de dados via PHP
        const resposta = await fetch(`buscar_evento.php?codigo=${codigo}`);
        const evento = await resposta.json();

        if (evento.sucesso) {
            erro.innerText = "";
            detalhes.style.display = "block";
            document.getElementById('nomeEventoEncontrado').innerText = evento.disciplina;
            document.getElementById('profEvento').innerText = evento.professor;
            document.getElementById('descEvento').innerText = evento.descricao;
            
            // Guardamos o ID do evento escondido para saber onde salvar o arquivo depois
            localStorage.setItem('idEventoAtual', evento.id);
        } else {
            detalhes.style.display = "none";
            erro.innerText = "Evento não encontrado. Verifique o código.";
        }
    } catch (e) {
        erro.innerText = "Erro ao conectar com o servidor.";
    }
}

async function enviarDadosParticipante() {
    const nome = document.getElementById('nomeParticipante').value;
    const inputArquivo = document.getElementById('arquivoAtividade');
    const idEvento = localStorage.getItem('idEventoAtual');

    if (!nome || inputArquivo.files.length === 0) {
        alert("Preencha seu nome e selecione um arquivo.");
        return;
    }

    // Para enviar ARQUIVOS, usamos o FormData de um jeito especial
    const dados = new FormData();
    dados.append('nome_aluno', nome);
    dados.append('id_evento', idEvento);
    dados.append('arquivo', inputArquivo.files[0]); // Pega o arquivo real

    try {
        const resposta = await fetch('enviar_atividade.php', {
            method: 'POST',
            body: dados
        });
        
        const resultado = await resposta.text();
        alert(resultado);

        // Resetar tela
        document.getElementById('formEnvio').reset();
        document.getElementById('detalhesEvento').style.display = "none";
        document.getElementById('codigoBusca').value = "";
    } catch (e) {
        alert("Erro ao enviar arquivo.");
    }
}