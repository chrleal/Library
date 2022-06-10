const div1 = document.querySelector(".header");
const addBook = document.querySelector('.add');
const cardContainer = document.querySelector('.cardContainer');
let myLibrary = [];

addBook.addEventListener('click', () => {
    const form = document.createElement('form');
    form.setAttribute("target", "dummyframe")
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
    const pages = document.createElement('input');
    form.appendChild(pages);
    pages.setAttribute('type', 'number');
    pages.setAttribute('name', 'pages');
    pages.setAttribute('placeholder', 'Pages');
    pages.setAttribute('min', '0');
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
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        cardContainer.appendChild(card);
        const titleCard = document.createElement('p');
        const authorCard = document.createElement('p');
        const pagesCard = document.createElement('p');
        const readCard = document.createElement('p');
        card.appendChild(titleCard);
        card.appendChild(authorCard);
        card.appendChild(pagesCard);
        card.appendChild(readCard);
        
        const newBook = new Book(title.value, author.value, pages.value, read.checked);
        addBookToLibrary(newBook);

        titleCard.textContent = newBook.title;
        authorCard.textContent = newBook.author;
        pagesCard.textContent = newBook.pages;
        readCard.textContent = newBook.read;
        document.body.removeChild(form);
    })    
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read == 'checked') {
        this.read = "Read";
    } else if (!read) {
        this.read = "Not read yet";
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}