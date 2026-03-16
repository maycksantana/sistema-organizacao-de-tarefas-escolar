// Selecionando os botões
const btnOrg = document.getElementById('btnOrganizador');
const btnPart = document.getElementById('btnParticipante');

function entrarComo(perfil) {
    // Mantemos o localStorage aqui apenas para o navegador saber o tema ou nome do usuário
    localStorage.setItem('perfilUsuario', perfil);

    if (perfil === 'organizador') {
        window.location.href = 'Organizador.html';
    } else {
        window.location.href = 'Participante.html';
    }
}

// Ouvindo os cliques
if(btnOrg) btnOrg.addEventListener('click', () => entrarComo('organizador'));
if(btnPart) btnPart.addEventListener('click', () => entrarComo('participante'));