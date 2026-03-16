// 1. Função para salvar um novo evento (Formulário Roxo)
async function salvarEvento() {
    const dados = new FormData();
    dados.append('disciplina', document.getElementById('disciplina').value);
    dados.append('professor', document.getElementById('professor').value);
    dados.append('idUsuario', document.getElementById('idUsuario').value);
    dados.append('dataHora', document.getElementById('dataHora').value);
    dados.append('descricao', document.getElementById('descricao').value);
    dados.append('localizacao', document.getElementById('localizacao').value);
    dados.append('codigo', document.getElementById('codigoEvento').value);

    try {
        const resposta = await fetch('Salvar_evento.php', {
            method: 'POST',
            body: dados
        });

        const resultado = await resposta.text();
        alert(resultado);
        
        // Limpa o formulário e recarrega a lista de eventos
        document.getElementById('formEvento').reset();
        listarMeusEventos(); 

    } catch (erro) {
        console.error("Erro ao salvar evento:", erro);
        alert("Erro na conexão com o servidor.");
    }
}

// 2. Função para listar os eventos criados (na parte de cima)
async function listarMeusEventos() {
    const lista = document.getElementById('listaEventos');
    try {
        const resposta = await fetch('Listar_eventos.php');
        const eventos = await resposta.json();

        if (eventos.length === 0) {
            lista.innerHTML = "<p>Nenhum evento criado.</p>";
            return;
        }

        lista.innerHTML = eventos.map(ev => `
            <div style="border: 1px solid #6a1b9a; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                <strong>${ev.disciplina}</strong> - Código: <b>${ev.codigo_evento}</b><br>
                <small>Professor: ${ev.professor} | Data: ${ev.data_hora}</small>
            </div>
        `).join('');

    } catch (erro) {
        console.error("Erro ao listar eventos:", erro);
    }
}

// 3. Função para listar as entregas dos alunos (A que estava faltando aparecer!)
async function carregarEntregas() {
    console.log("Iniciando busca de entregas...");
    const container = document.getElementById('listaEntregas');

    if (!container) {
        console.error("ERRO: Div 'listaEntregas' não encontrada no HTML.");
        return;
    }

    try {
        const resposta = await fetch('listar_entregas.php');
        const entregas = await resposta.json();
        console.log("Entregas recebidas do PHP:", entregas);

        if (entregas.length === 0) {
            container.innerHTML = "<p>Nenhuma atividade entregue ainda.</p>";
            return;
        }

        let html = `
            <table class="tabela-entregas">
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th>Disciplina</th>
                        <th>Data de Envio</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
        `;

        entregas.forEach(ent => {
            html += `
                <tr>
                    <td>${ent.nome_aluno}</td>
                    <td>${ent.disciplina}</td>
                    <td>${new Date(ent.data_envio).toLocaleString('pt-BR')}</td>
                    <td><a href="${ent.arquivo_path}" target="_blank" class="btn-baixar">Baixar Arquivo</a></td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        container.innerHTML = html;

    } catch (erro) {
        console.error("Erro ao processar entregas:", erro);
        container.innerHTML = "<p style='color: red;'>Erro ao carregar a lista de entregas.</p>";
    }
}

// 4. Comandos que rodam assim que a página abre
window.onload = function() {
    listarMeusEventos(); // Carrega os eventos criados
    carregarEntregas();  // Carrega as atividades dos alunos
};