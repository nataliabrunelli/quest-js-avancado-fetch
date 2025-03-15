import { getUser } from "./modules/services.js";
import { inputUser, btnSearch } from "./modules/variables.js";

function searchUser() {
  const user = inputUser.value;
  if (!user) {
    alert("Insira um usuário para busca.");
    return;
  }
  getUser(user);
}

btnSearch.addEventListener("click", searchUser);

inputUser.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchUser();
  }
});
