const div1 = document.querySelector(".header");
const addBook = document.querySelector('.add');
const cardContainer = document.querySelector('.cardContainer');
let myLibrary = [];

addBook.addEventListener('click', () => {
    const form = document.createElement('form');
    form.setAttribute("target", "dummyframe");
    document.body.insertBefore(form, div1);
    const h1 = document.createElement('h1');
    form.appendChild(h1);
    h1.textContent = "Add a new book";
    const divInput = document.createElement('div');
    form.appendChild(divInput);
    divInput.setAttribute('class', 'divInput');
    const title = document.createElement('input');
    divInput.appendChild(title);
    title.setAttribute('type', 'text');
    title.setAttribute('name', 'title');
    title.setAttribute('placeholder', 'Title');
    title.setAttribute('required', '');
    const author = document.createElement('input');
    divInput.appendChild(author);
    author.setAttribute('type', 'text');
    author.setAttribute('name', 'author');
    author.setAttribute('placeholder', 'Author');
    author.setAttribute('required', '');
    const pages = document.createElement('input');
    divInput.appendChild(pages);
    pages.setAttribute('type', 'number');
    pages.setAttribute('name', 'pages');
    pages.setAttribute('placeholder', 'Pages');
    pages.setAttribute('min', '0');
    pages.setAttribute('required', '');
    const divCheckbox = document.createElement('div');
    divCheckbox.setAttribute('class', 'divCheckbox');
    form.appendChild(divCheckbox)
    const readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.textContent = "Have you read this book?";
    divCheckbox.appendChild(readLabel);
    const read = document.createElement('input');
    read.setAttribute('type', 'checkbox');
    read.setAttribute('id', 'read');
    divCheckbox.appendChild(read);
    const submit = document.createElement('button')
    submit.setAttribute('class', 'submit')
    submit.textContent = "Submit";
    form.appendChild(submit);
    submit.addEventListener('click', () => {
        if (title.value != "" && author.value != "" && pages.value != "") {
            const newBook = new Book(title.value, author.value, pages.value, read);
            addBookToLibrary(newBook);
            document.body.removeChild(form);
        }
    })    
});


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = Math.floor(Math.random() * 1000)
    if (read.checked) {
        this.read = "Read";
    } else {
        this.read = "Not read yet";
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    displayBook();
}

function displayBook() {
    const removeCard = cardContainer.querySelectorAll('.card');
    removeCard.forEach((card) => {
        card.remove();
    })
    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', `${index}`)
        cardContainer.appendChild(card);
        const deleteCard = document.createElement('button')
        deleteCard.classList.add('deleteBtn')
        deleteCard.textContent = "X";
        deleteCard.addEventListener('click', deleteBook);
        card.appendChild(deleteCard);
        cardContent = document.createElement('div');
        cardContent.setAttribute('class', 'cardContent');
        card.appendChild(cardContent);
        const titleCard = document.createElement('h3');
        const authorCard = document.createElement('p');
        const pagesCard = document.createElement('p');
        const readCard = document.createElement('p');
        cardContent.appendChild(titleCard);
        cardContent.appendChild(authorCard);
        cardContent.appendChild(pagesCard);
        cardContent.appendChild(readCard);

        titleCard.textContent = book.title;
        authorCard.textContent = book.author;
        pagesCard.textContent = `${book.pages} pages`;
        readCard.textContent = book.read;
    })
}

function deleteBook() {
    const cardId = document.querySelector('.card');
    myLibrary.forEach((book) => {
        if (cardId.dataset.id === myLibrary.indexOf(book)){  
        myLibrary.splice(cardId.dataset.id, 1);
        }
    })
    displayBook();
}