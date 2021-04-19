let addToy = false;

const toyUrl = "http://localhost:3000/toys" 
const form = document.querySelector(".add-toy-form")




document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function increaseLikes(e) {
  
  const cardDiv = e.target.parentElement
  const likeSpan = cardDiv.querySelector("span")
  console.log(likeSpan.innerText)
  let likes = parseInt(likeSpan.innerText, 10) + 1
  console.log(likes)
  likeSpan.innerText = likes
  let id = cardDiv.dataset.id
 console.log(id)
  const thisToyUrl = "http://localhost:3000/toys/" + id

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    }) }

    fetch(thisToyUrl, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    }); 

}

function createToy(toys) {
  

  toys.forEach(toy => {
      console.log(toy.id)
      appendDOM(toy)
  })
}

function appendDOM(object) {
  const collectionDiv = document.querySelector("#toy-collection")
  const toyDiv = document.createElement("DIV");
  toyDiv.dataset.id = object.id
  toyDiv.classList.add("card")
  const toyName = document.createElement("H2")
  toyName.innerText = object.name
  const imageTag = document.createElement("IMG");
  imageTag.classList.add("toy-avatar")
  imageTag.setAttribute("src", object.image);
  const likeCount = document.createElement("P")
  likeCount.innerHTML = "<span>" + object.likes + "</span> likes"
  const likeButton = document.createElement("button")

  likeButton.onclick = increaseLikes

  likeButton.classList.add("like-btn")
  likeButton.innerText = "Like <3"
  toyDiv.append(toyName)
  toyDiv.append(imageTag)
  toyDiv.append(likeCount)
  toyDiv.append(likeButton)
  collectionDiv.append(toyDiv)
}

function addData(e) {
  e.preventDefault();
  const nameInput = document.querySelector("input[name='name']")
  const imageInput = document.querySelector("input[name='image']")
  console.log(imageInput.value)
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": nameInput.value,
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    }) }

    fetch(toyUrl, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
      appendDOM(object);
    }); 
//     // .catch(function(error) {
//     //     console.log(error.message);
//     //     appendDOM(error.message);
//     //   }); 
//   };
 
}

form.addEventListener("submit", addData)

fetch(toyUrl)
.then(resp => resp.json())
.then(stringResults => createToy(stringResults));  
