const gallery = document.querySelector("figure");

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    for (let i = 0; i < gallery.children.length; i++) {
        const child = gallery.children[i];
        console.log(child)
        if (child.tagName === 'IMG') {
            console.log('okay')
          child.src = data.imageUrl;
        }else{
            console.log("error")
        }
  }})
  .catch(error => console.error(error))