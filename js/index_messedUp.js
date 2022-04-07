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
    let likersList = document.createElement('ul')
    eachBook.users.forEach(user => {
        const userName = user.username
        let individualLiker = document.createElement('li')
        individualLiker.innerText = userName;
                likersList.append(individualLiker)
    })
    const likeButton = document.createElement('button')
    displayArea.append(bookTitle, bookImage, author, description, likeButton, likersList); 
    likeButton.innerText = "Like"
    likeButton.addEventListener('click', (event) => {
        let bookArray =[]
        eachBook.users.forEach(user => {
            const userName = user.username
            const userid = user.id
            bookArray.push({id: userid, username: userName})
        })
            fetch(`http://localhost:3000/books/${eachBook.id}`,{
                method:'PATCH',
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    "users": [ 
                        ...bookArray, 
                        {"id": 1, "username": "pouros"}
                    ]
                }),
        
            })
            .then (response => response.json())
            .then (data => {
                const user = data.users.slice(-1)
                let individualLiker = document.createElement('li')
                individualLiker.innerText = user[0].username;
                likersList.appendChild(individualLiker)
                if(likeButton.innerText === "Like"){
                    likeButton.innerText = "Unlike"
                } else if(likeButton.innerText === "Unlike") {
                    likeButton.innerText = "Like"
                }
            })
        })
    }


