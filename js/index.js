const likersList = document.createElement('ul');
const likeButton = document.createElement('button');

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => {
        for (eachBook of data) {
            listBooks(eachBook)
        }});
});

function listBooks(eachBook){
    let listItem = document.createElement('li');
    listItem.innerText = eachBook.title;
    let list = document.getElementById('list');
    list.append(listItem)
    listItem.addEventListener('click', () => showBookDetail(eachBook))
}

function showBookDetail(eachBook){
    let displayArea = document.getElementById('show-panel')
    displayArea.innerHTML = ""
    let bookTitle = document.createElement('h2');
    bookTitle.innerText = eachBook.title;

    let bookImage = document.createElement('img');
    bookImage.src = eachBook.img_url;

    let author = document.createElement('h3');
    author.innerText = eachBook.author;

    let description = document.createElement('p');
    description.innerHTML = eachBook.description;

    likeButton.innerText = "Like"
    likeButton.addEventListener('click', (event) => addLikers(event, eachBook));
    
    // let likersList = document.createElement('ul')
    let likers = eachBook.users;
        for (let i =0; i < eachBook.users.length; i++){
        let individualLiker = document.createElement('li')
        individualLiker.innerText = eachBook.users[i].username;
        likersList.append(individualLiker)
        }
    displayArea.append(bookTitle, bookImage, author, description, likeButton, likersList); 
}

function addLikers(event, eachBook){
    event.preventDefault();
    fetch(`http://localhost:3000/books/${eachBook.id}`,{
        method:'PATCH',
        headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify({
            id: 101,
            user: "mio",
        }),
    })
    .then (response => response.json())
    .then (data => showAdditionalLiker(data))
}
function showAdditionalLiker(data){
    let additionalLiker = document.createElement('li')
        additionalLiker.innerText = data.user;
        likersList.append(additionalLiker)
        likeButton.innerText = "Unlike"
        likeButton.addEventListener('click', (data) => unlike(data))
}

function unlike(data){
        fetch(`http://localhost:3000/books/${eachBook.id}`,{
            method:'PATCH',
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                id: null,
                user: null,
            }),
        })
        .then(resp => resp.json())
        .then (data => console.log(data))
        likeButton.innerText = "Like";
    }