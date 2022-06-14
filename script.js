const div1 = document.querySelector(".header");
const addBook = document.querySelector('.add');
const cardContainer = document.querySelector('.cardContainer');
let id = 0;
let myLibrary = [];

displayBook();

addBook.addEventListener('click', () => {
    const form = document.createElement('form');
    form.setAttribute("target", "dummyframe");
    document.body.insertBefore(form, div1);
    const h1 = document.createElement('h1');
    form.appendChild(h1);
    h1.textContent = "Add a New Book";
    const title = document.createElement('input');
    form.appendChild(title);
    title.setAttribute('type', 'text');
    title.setAttribute('name', 'title');
    title.setAttribute('placeholder', 'Title');
    title.setAttribute('required', '');
    const author = document.createElement('input');
    form.appendChild(author);
    author.setAttribute('type', 'text');
    author.setAttribute('name', 'author');
    author.setAttribute('placeholder', 'Author');
    author.setAttribute('required', '');
    const pages = document.createElement('input');
    form.appendChild(pages);
    pages.setAttribute('type', 'number');
    pages.setAttribute('name', 'pages');
    pages.setAttribute('placeholder', 'Pages');
    pages.setAttribute('min', '0');
    pages.setAttribute('required', '');
    const readLabel = document.createElement('label')
    readLabel.setAttribute('for', 'read');
    readLabel.textContent = "Have you read this book?";
    form.appendChild(readLabel);
    const read = document.createElement('input');
    read.setAttribute('type', 'checkbox');
    read.setAttribute('id', 'read');
    read.setAttribute('value', 'off');
    form.appendChild(read);
    const submit = document.createElement('button')
    submit.textContent = "Submit";
    form.appendChild(submit);
    submit.addEventListener('click', () => {
        id += 1;
        if (title.value != "" && author.value != "" && pages.value != "") {
            const newBook = new Book(title.value, author.value, pages.value, read, id);
            addBookToLibrary(newBook);
            document.body.removeChild(form);
        }
    })    
});


function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    if (read.checked) {
        this.read = "Read";
    } else {
        this.read = "Not read yet";
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBook() {
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('id', `card${id}`);
        cardContainer.appendChild(card);
        const titleCard = document.createElement('p');
        titleCard.setAttribute('class', 'titleCard')
        const authorCard = document.createElement('p');
        const pagesCard = document.createElement('p');
        const readCard = document.createElement('p');
        const deleteCard = document.createElement('button')
        deleteCard.classList.add('deleteBtn')
        deleteCard.textContent = "Delete";
        card.appendChild(titleCard);
        card.appendChild(authorCard);
        card.appendChild(pagesCard);
        card.appendChild(readCard);
        card.appendChild(deleteCard);

        titleCard.textContent = book.title;
        authorCard.textContent = book.author;
        pagesCard.textContent = book.pages;
        readCard.textContent = book.read;
    })
}

// function deleteBook() {
//     const classTitle = document.querySelector('.titleCard');
//     const deleteBtn = document.querySelector('.deleteBtn');
//     deleteBtn.addEventListener('click', () => {

//     myLibrary.forEach((book) => {
//         if (book.title == classTitle.textContent) {
//             console.log(book.id);
//             const delCard = document.querySelector('.card');
//             delCard.parentNode.removeChild(delCard);
//             myLibrary.splice(book, 1);
//         }
//     })
//     })
// }