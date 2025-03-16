import { completeUser } from "./htmlSetters.js";
import { infosContainer } from "./variables.js";


async function getUser(user) {
  infosContainer.innerHTML = ""; // Limpa o container
  try {
    const resposta = await fetch(`https://api.github.com/users/${user}`);
    if (!resposta.ok) {
      throw new Error(`Usuário "${user}" não encontrado.`);
    }
    const profile = await resposta.json();

    completeUser(profile)

  } catch (error) {
    infosContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

async function getRepositories(profile) {
  const resposta = await fetch(profile.repos_url);
  const repositories = await resposta.json();

  return repositories;
}

async function getEvents(profile) {
  const resposta = await fetch((profile.events_url).replace("{/privacy}", ""));
  const events = await resposta.json();

  return events;
}

export { getUser, getRepositories, getEvents }