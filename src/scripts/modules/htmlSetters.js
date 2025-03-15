import { getFollowers, getFollowing, getRepositories, getEvents} from "./services.js";
import { infosContainer } from "./variables.js";

async function showUser(profile) {
  const followers = await getFollowers(profile);
  const following = await getFollowing(profile);

  const user = `<div class="info">
                  <img src="${profile.avatar_url}">
                  <div class="data">
                    <h1>${profile.nome ?? profile.login}</h1>
                    <p>${
                      profile.bio ?? "O usuário não possui bio cadastrada."
                    }</p>
                    <p>Seguidores: ${followers.length ?? followers.length}</p>
                    <p>Seguindo: ${following.length ?? following.length}</p>
                  </div>
                </div>`;
  return user;
}

async function showRepositories(repositories) {
  let itensRepositorio = "";

  if (repositories.length) {
    repositories.forEach((repositorio, index) => {
      if (index < 10) {
        itensRepositorio += `<li>
                              <a href = "${repositorio.html_url}" target="_blank">${repositorio.name}
                                <div class = "detail-container">
                                  <div class = "detail">
                                    <p>🍴 ${repositorio.forks_count}</p>
                                  </div>
                                  <div class = "detail">
                                    <p>⭐ ${repositorio.stargazers_count}</p>
                                  </div>    
                                  <div class = "detail">
                                    <p>👀 ${repositorio.watchers_count}</p>
                                  </div>     
                                  <div class = "detail">
                                    <p>📖 ${repositorio.language}</p>
                                  </div>   
                                </div>                   
                              </a><li>`;
      }
    });
  } else {
    itensRepositorio = "Usuário sem repositórios";
  }

  const repositorios = `<div class="repositories">
                          <h2>Repositórios</h2>
                          <ul>${itensRepositorio}</ul>
                        </div>`;
  return repositorios;
}

async function showEvents(events) {
  let itensEventos = "";

  if (events.length) {
    events.forEach((evento, index) => {
      if (index < 10) {
        let mensagemCommit = "";
        if (evento.type === "PushEvent" && evento.payload.commits) {
          const mensagens = evento.payload.commits.map(
            (commit) => commit.message
          );
          mensagemCommit = mensagens.join(", "); // Junta as mensagens com vírgula
        } else if (evento.type === "CreateEvent") {
          mensagemCommit = "Sem mensagem de commit.";
        }
        itensEventos += `<li><span>${evento.repo.name}</span> - ${mensagemCommit}</li>`;
      }
    });
  } else {
    itensEventos = "Usuário sem eventos";
  }

  const eventos = `<div class="repositories">
                      <h2>Eventos</h2>
                      <ul>${itensEventos}</ul>
                   </div>`;
  return eventos;
}

async function completeUser(profile) {
  const repositories = await getRepositories(profile);
  const events = await getEvents(profile);
  const usuario = await showUser(profile);
  const repositorios = await showRepositories(repositories);
  const eventos = await showEvents(events);

  infosContainer.innerHTML = `${usuario} ${repositorios} ${eventos}`;
}

export { showUser, showRepositories, showEvents, completeUser };
