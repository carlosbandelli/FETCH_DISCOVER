const url = "http://localhost:5500/api";

function getUsers() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => (renderApiResult.textContent = JSON.stringify(data)))
    .catch((error) => console.error(error));
}

function getUser(id) {
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      userName.textContent = data.name;
      userCity.textContent = data.city;
      userAvatar.src = data.avatar;
    })
    .catch((error) => console.error(error));
}

function getImage() {
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 151) + 1}`
  )
    .then((response) => response.json())
    .then((data) => {
      const newUser = {
        name: data.name,
        avatar: data.sprites.front_default,
        city: data.types[0].type.name, // Usando o primeiro tipo como cidade
      };
      addUser(newUser); // Adicionando o novo usuário
    })
    .catch((error) => console.error(error));
}

function addUser(newUser) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alertApi.textContent = data;
      getImage(); // Chamando getImage após adicionar o usuário
    })
    .catch((error) => console.error(error));
}

function updateUser(id) {
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((userData) => {
      // Obtém dados da API do Pokémon
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${
          Math.floor(Math.random() * 151) + 1
        }`
      )
        .then((response) => response.json())
        .then((pokemonData) => {
          const updatedUser = {
            name: pokemonData.name,
            avatar: pokemonData.sprites.front_default,
            city: "",
          };

          // Obtém informações de encontros do Pokémon
          fetch(pokemonData.location_area_encounters)
            .then((response) => response.json())
            .then((encounterData) => {
              if (encounterData.length > 0) {
                // Define a cidade com base nas informações de encontros
                updatedUser.city = encounterData[0].location_area.name;
              }

              // Envia os detalhes atualizados para a API do usuário
              fetch(`${url}/${id}`, {
                method: "PUT",
                body: JSON.stringify(updatedUser),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  alertApi.textContent = data; // Atualiza a mensagem de alerta
                })
                .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

function deleteUser(id) {
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => (alertApi.textContent = data))
    .catch((error) => console.error(error));
}

// Chamando as funções após definir newUser
const newUser = {
  name: "Nome Novo",
  avatar: "https://exemplo.com/imagem.jpg",
  city: "Cidade Nova",
};

getImage();
deleteUser();
getUsers();
getUser(112);
//updateUser(111);
