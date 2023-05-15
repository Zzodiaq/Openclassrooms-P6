const tous = document.getElementById("tous");
const objet = document.getElementById("objets");
const appart = document.getElementById("appartements");
const hotel = document.getElementById("hotel");
let obj = [];
let app = [];
let hot = [];
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
    const figures = document.querySelectorAll('.gallery figure');
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