const gallery = document.querySelector("figure");

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
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
  })
  .catch(error => console.error(error))