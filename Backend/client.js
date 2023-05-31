const tous = document.getElementById("tous");
const objet = document.getElementById("objets");
const appart = document.getElementById("appartements");
const hotel = document.getElementById("hotel");
const log = document.getElementById("log-btn");
const figures = document.querySelectorAll('.gallery figure');
const gallery = document.querySelector('.gallery');
const figuresPopUp = document.querySelectorAll('#modale-popUp figure');
const log_form = document.getElementById("log-form");
const errorPassword = document.getElementById("error-password");
const modale = document.getElementById("modale");
const modifier = document.querySelector(".container-btn-modifier span");
const filtres = document.getElementById("filtres");
const modalePopUp = document.getElementById("modale-popUp");
const popUp = document.getElementById("popUp");
const popUpAjout = document.getElementById("popUp-ajout");
const btn = document.querySelectorAll(".btn");
const xmark = document.getElementById("xmar");
const xmark2 = document.getElementById("xmar2");
const photoEdit = document.querySelector(".photo-edit");
const addPhoto = document.getElementById("ajout-photo");
const leftArrow = document.getElementById("left-arrow");
const btnFile = document.getElementById("file-btn");
const file = document.getElementById("file");
let formUpload = document.forms.namedItem("formFile");
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
      empty2()
      modalePopUp.style.display = "flex";
      fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
            if(i === 0){
              var divMove = document.createElement('div');
              divMove.classList.add('move');
              var iMove = document.createElement('i');
              iMove.classList.add('fa-solid', 'fa-arrows-up-down-left-right', 'fa-sm');
              iMove.style.color = '#ffffff';
              var figure = document.createElement('figure');
              var divTrash = document.createElement('div');
              divTrash.setAttribute('data-value', data[i].id);
              divTrash.classList.add('trash');
              var iTrash = document.createElement('i');
              iTrash.classList.add('fa-solid', 'fa-trash-can', 'fa-sm');
              var img = document.createElement('img');
              img.setAttribute('src', data[i].imageUrl);
              img.setAttribute('alt', data[i].title);
              var figcaption = document.createElement('figcaption');
              divTrash.appendChild(iTrash);
              figure.appendChild(divTrash);
              figure.appendChild(img);
              figure.appendChild(figcaption);
              divMove.appendChild(iMove);
              figure.appendChild(divMove);
              photoEdit.appendChild(figure);
            }else {
              var figure = document.createElement('figure');
              var divTrash = document.createElement('div');
              divTrash.setAttribute('data-value', data[i].id);
              divTrash.classList.add('trash');
              var iTrash = document.createElement('i');
              iTrash.classList.add('fa-solid', 'fa-trash-can', 'fa-sm');
              var img = document.createElement('img');
              img.setAttribute('src', data[i].imageUrl);
              img.setAttribute('alt', data[i].title);
              var figcaption = document.createElement('figcaption');
              divTrash.appendChild(iTrash);
              figure.appendChild(divTrash);
              figure.appendChild(img);
              figure.appendChild(figcaption);
              photoEdit.appendChild(figure);
            }
        }
        const trash = document.querySelectorAll(".trash");
        trash.forEach((div) => {
          div.addEventListener("click", () => {
            event.preventDefault();
            const workId = div.getAttribute('data-value');
            const userDataSrting = localStorage.getItem("user");
            const userData = JSON.parse(userDataSrting)
            fetch('http://localhost:5678/api/works/' + workId, {
              method : "DELETE",
              headers : {
                'Authorization' : 'Bearer ' + userData.token
              }
            })
            .then (response => {
              if(response.ok){
                console.log(response)
                return false
              }
            })
            .catch(error => {
              console.log(error)
            })
          })
        })
      })
    })
  })
  formUpload.addEventListener("submit", () =>{
    const userDataSrting = localStorage.getItem("user");
    const userData = JSON.parse(userDataSrting)
    event.preventDefault();

    const title = document.getElementById('ajout-title').value;
    const imageFile = document.getElementById('file').files[0];
    const category = document.getElementById('categorie').value;
    const data = {
      title: title,
      imageUrl: '',
      categoryId: category,
      userId: 0
    };
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('categoryId', data.categoryId);
    formData.append('image', imageFile);
  
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers : {
        'Authorization' : 'Bearer ' + userData.token,
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Traiter la réponse de l'API ici
      console.log(data);
    })
    .catch(error => {
      // Gérer les erreurs de la requête
      console.error(error);
    });
  });
  
  xmark.addEventListener("click", () => {
    modalePopUp.style.display = "none";
  })
  xmark2.addEventListener("click", () => {
    modalePopUp.style.display = "none";
  })
  leftArrow.addEventListener("click", () => {
    popUpAjout.style.display = "none";
    popUp.style.display = "flex";
  })
  modalePopUp.addEventListener("click", () => {
    if (event.target === modalePopUp){
      modalePopUp.style.display = "none"
    }
  })
  addPhoto.addEventListener("click", () => {
    popUpAjout.style.display = "flex";
    popUp.style.display = "none";
  })
  btnFile.addEventListener("click", () => {
    file.click();
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
    create(data)

  tous.addEventListener("click", () => {
    empty()
    create(data)
  })
  objet.addEventListener("click", () => {
    empty()
    create(obj)
  })
  appart.addEventListener("click", () => {
    empty()
    create(app)
  })
  hotel.addEventListener("click", () => {
    empty()
    create(hot)
  })


  function empty() {
    while(gallery.firstChild){
      gallery.removeChild(gallery.firstChild)
    }
  }

  function create(array){
    for (let i = 0; i < array.length; i++) {
      var figure = document.createElement('figure');
      var img = document.createElement('img');
      img.setAttribute('src', array[i].imageUrl);
      img.setAttribute('alt', array[i].title);
      var figcaption = document.createElement('figcaption');
      figcaption.textContent = array[i].title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
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

function empty2() {
  while(photoEdit.firstChild){
    photoEdit.removeChild(photoEdit.firstChild)
  }
}