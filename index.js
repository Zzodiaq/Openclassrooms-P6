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
const upload = document.getElementById("upload");
const title = document.getElementById('ajout-title');
const category = document.getElementById('categorie');
const valider = document.getElementById("valider");
const deleteGalery = document.getElementById("delete-gallery");
const formUpload = document.getElementById("upload-form");
let loginNavBtn = document.getElementById("login-nav-btn");
let obj = [];
let app = [];
let hot = [];
const user = localStorage.getItem("user");
const userDataSrting = localStorage.getItem("user");
const userData = JSON.parse(userDataSrting)

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

            const trash = document.querySelectorAll(".trash");
            trash.forEach((div) => {
              div.addEventListener("click", (event) => {
                const workId = div.getAttribute('data-value');
                fetch('http://localhost:5678/api/works/' + workId, {
                  method: "DELETE",
                  headers: {
                    'Authorization': 'Bearer ' + userData.token
                  }
                })
                  .then(response => {
                    if (response.ok) {
                      const clickedIndex = Array.from(trash).indexOf(div);
                      const elementToDelete = document.querySelector(`div[data-value="${workId}"]`);
                      gallery.removeChild(gallery.children[clickedIndex])
                      if (elementToDelete) {
                        const parentElement = elementToDelete.parentNode;
                        parentElement.remove();
                      }
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              });
            });
        }
      })
    })
  })
  document.getElementById('formDeleteGalerie').addEventListener("submit", (event) => {
    event.preventDefault()
    let divTrashSelect = document.querySelectorAll('.trash');
    divTrashSelect.forEach(e => {
      const works = e.getAttribute('data-value');
      fetch('http://localhost:5678/api/works/' + works, {
        method : "DELETE",
        headers : {
          'Authorization' : 'Bearer ' + userData.token
        }
      })
      .then (response => {
          const parentElement = e.parentNode;
          parentElement.remove();
          while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
          }
          removePreloadImg();
          modalePopUp.style.display = "none";
      })
      .catch(error => {
        console.log(error)
      })
    });
  })

  formUpload.addEventListener("submit", (event) =>{
    event.preventDefault();
    event.stopPropagation()

    const titleValue = title.value;
    const fileValue = file.files[0];
    const categoryValue = category.value;
    let formData = new FormData();

    formData.append('title', titleValue);
    formData.append('category', Number(categoryValue));
    formData.append('image', fileValue);
    formData.append('UserId', 1);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers : {
        'Authorization' : 'Bearer ' + userData.token,
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
        var figure = document.createElement('figure');
        var img = document.createElement('img');
        img.setAttribute('src', data.imageUrl);
        img.setAttribute('alt', data.title);
        var figcaption = document.createElement('figcaption');
        figcaption.textContent = data.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
        removePreloadImg();
        modalePopUp.style.display = "none";
    })
    .catch(error => {
      console.error(error);
    });
  });
  
  file.addEventListener('change', (e) => {
    valider.setAttribute('style', 'background-color: #1D6154');
    let enfant = upload.children;
    Array.from(enfant).forEach(function(en) {
      en.style.display = 'none';
    });
    let selectedFile = e.target.files[0];
    let image = document.createElement('img');
    image.src = URL.createObjectURL(selectedFile)
    image.setAttribute('style', 'width: 224px');
    upload.appendChild(image);
  })

  xmark.addEventListener("click", () => {
    removePreloadImg();
    modalePopUp.style.display = "none";
  })
  xmark2.addEventListener("click", () => {
    removePreloadImg();
    modalePopUp.style.display = "none";
  })
  leftArrow.addEventListener("click", () => {
    removePreloadImg();
    popUpAjout.style.display = "none";
    popUp.style.display = "flex";
  })
  modalePopUp.addEventListener("click", () => {
    if (event.target === modalePopUp){
      removePreloadImg();
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
    console.log(data)
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

  if(!user){
    log_form.addEventListener('submit', (event) => {
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
          window.location.href = "index.html";
        }else {
          errorPassword.innerHTML = "Votre identifiant ou votre mot de passe est incorrect. Veuillez réessayer.";
        }
      })
      .catch(function(error){
        console.log(error)
      })
    })
  }



function empty2() {
  while(photoEdit.firstChild){
    photoEdit.removeChild(photoEdit.firstChild)
  }
}

function removePreloadImg(){
  valider.setAttribute('style', 'background-color: grey');
  title.value = '';
  category.value = '';
  file.value = '';
  let enfant = upload.children;
  Array.from(enfant).forEach(function(en) {
    if(en.nodeName === "IMG"){
      upload.removeChild(en);
    }else{
      en.style.display = 'block';
    }
  });
}