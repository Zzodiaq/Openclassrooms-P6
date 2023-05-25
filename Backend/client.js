const tous = document.getElementById("tous");
const objet = document.getElementById("objets");
const appart = document.getElementById("appartements");
const hotel = document.getElementById("hotel");
const log = document.getElementById("log-btn");
const figures = document.querySelectorAll('.gallery figure');
const figuresPopUp = document.querySelectorAll('#modale-popUp figure');
const log_form = document.getElementById("log-form");
const errorPassword = document.getElementById("error-password");
const modale = document.getElementById("modale");
const modifier = document.querySelector(".container-btn-modifier span");
const filtres = document.getElementById("filtres");
const modalePopUp = document.getElementById("modale-popUp");
const btn = document.querySelectorAll(".btn");
const xmark = document.getElementById("xmar");
const trash = document.querySelectorAll(".trash");
let loginNavBtn = document.getElementById("login-nav-btn");
let obj = [];
let app = [];
let hot = [];
const user = localStorage.getItem("user");
if (user){
  loginNavBtn.innerHTML = "logout";
  modale.style.display = "flex";
  modifier.style.display = "flex";
  modifier.style.marginTop = "5rem";
  modifier.style.marginBottom = "5rem";
  filtres.style.display = "none"
  document.querySelector("header").style.marginTop = "6rem";
  document.querySelector("#introduction figcaption").style.display = "flex";
  btn.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      modalePopUp.style.display = "flex";
      fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => {
        console.log(data)
      for (let i = 0; i < figuresPopUp.length; i++) {
        const figure = figuresPopUp[i];
        for (let j = 0; j < figure.children.length; j++) {
          const child = figure.children[j];
          if(child.tagName === 'IMG'){
            console.log(data[i].imageUrl)
            child.src = data[i].imageUrl;
            child.alt = data[i].title; 
          }else if (child.tagName === 'FIGCAPTION'){
            child.innerHTML = 'éditer';
          }
        }
      }
    })
    })
  })
  xmark.addEventListener("click", () => {
    modalePopUp.style.display = "none";
  })
  modalePopUp.addEventListener("click", () => {
    if (event.target === modalePopUp){
      modalePopUp.style.display = "none"
    }
  })
  trash.forEach((div, index) => {
    const workId = index;
    div.addEventListener("click", () => {
      const userDataSrting = localStorage.getItem("user");
      const userData = JSON.parse(userDataSrting)
      console.log(userData.token)
      // fetch('http://localhost:5678/api/works/' + workId, {
      //   method : "DELETE",
      //   headers : {
      //     'Authorization' : userData.token
      //   }
      // })
      // .then (response => {
      //   if(response.ok){
      //     alert("travail supprimé");
      //   }
      // })
      // .catch(error => {
      //   console.log(error)
      // })
    })
  })
}
loginNavBtn.addEventListener("click", () => {
  const user = localStorage.getItem("user");
  if(user){
    localStorage.removeItem("user");
  }
})
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    for(let h = 0; h < data.length; h++){
      let name = (data[h].category.name);
      if (name === "Objets"){
        obj.push(data[h]);
      }else if(name === "Appartements"){
        app.push(data[h]);
      }else {
        hot.push(data[h]);
      }
    }
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];
      for (let j = 0; j < figure.children.length; j++) {
        const child = figure.children[j];
        if(child.tagName === 'IMG'){
          child.src = data[i].imageUrl;
          child.alt = data[i].title; 
        }else{
          child.innerHTML = data[i].title;
        }
      }
    }
  tous.addEventListener("click", () => {
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];
      for (let j = 0; j < figure.children.length; j++) {
        const child = figure.children[j];
        if(child.tagName === 'IMG'){
          child.src = data[i].imageUrl;
          child.alt = data[i].title;
        }else{
          child.innerHTML = data[i].title;
        }
      }
    }
  })
  objet.addEventListener("click", () => {
    empty()
    for (let i = 0; i < obj.length; i++) {
      const figure = figures[i];
      for (let j = 0; j < figure.children.length; j++) {
        const child = figure.children[j];
        if(child.tagName === 'IMG'){
          child.src = obj[i].imageUrl;
          child.alt = obj[i].title;
        }else{
          child.innerHTML = obj[i].title;
        }
      }
    }
  })
  appart.addEventListener("click", () => {
    empty()
    for (let i = 0; i < app.length; i++) {
      const figure = figures[i];
      for (let j = 0; j < figure.children.length; j++) {
        const child = figure.children[j];
        if(child.tagName === 'IMG'){
          child.src = app[i].imageUrl;
          child.alt = app[i].title;
        }else{
          child.innerHTML = app[i].title;
        }
      }
    }
  })
  hotel.addEventListener("click", () => {
    empty()
    for (let i = 0; i < hot.length; i++) {
      const figure = figures[i];
      for (let j = 0; j < figure.children.length; j++) {
        const child = figure.children[j];
        if(child.tagName === 'IMG'){
          child.src = hot[i].imageUrl;
          child.alt = hot[i].title;
        }else{
          child.innerHTML = hot[i].title;
        }
      }
    }
  })


  function empty() {
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];
      for (let j = 0; j < figure.children.length; j++) {
        const child = figure.children[j];
        if(child.tagName === 'IMG'){
          child.src = "";
          child.alt = "";
        }else{
          child.innerHTML = "";
        }
      }
    }
  }
  })
  .catch(error => console.error(error))

log_form.addEventListener('submit', () => {
  event.preventDefault();
  const mdp = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  let user = {
    email: email,
    password: mdp
  };
  
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .then(data => {
    if (data.userId){
      localStorage.setItem("user", JSON.stringify({
        token : data.token
      }));
      window.location.href = "../index.html";
    }else {
      errorPassword.innerHTML = "Votre identifiant ou votre mot de passe est incorrect. Veuillez réessayer.";
    }
  })
  .catch(function(error){
    console.log(error)
  })
})