const div1 = document.querySelector(".header");
const addBook = document.querySelector('.add');
const cardContainer = document.querySelector('.cardContainer');
let myLibrary = [];

// Creates the form
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

    //Adds an overlay when the form is displayed
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    overlay.addEventListener('click', () => {
        overlay.style.display = "none";
        document.body.removeChild(form);
    });

    //Adds a card to the screen when the submit button is clicked
    submit.addEventListener('click', () => {
        if (title.value != "" && author.value != "" && pages.value != "") {
            const newBook = new Book(title.value, author.value, pages.value, read);
            addBookToLibrary(newBook);
            document.body.removeChild(form);
            overlay.style.display = "none"
        }
    })   
});

class Book {
    constructor(title, author, pages, read, color) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = Math.floor(Math.random() * 1000);
        this.color = color;
        if (read.checked) {
            this.read = "Read";
        } else if (read == "read") {
            this.read = "Read";
        } else {
            this.read = "Not read yet";
        }
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
        cardContainer.appendChild(card);

        const deleteCard = document.createElement('button')
        deleteCard.classList.add('deleteBtn')
        deleteCard.textContent = "X";
        deleteCard.addEventListener('click', () => {
            console.log(book)
            myLibrary.splice(myLibrary.indexOf(book), 1);
            cardContainer.removeChild(card);
        });
        card.appendChild(deleteCard);

        const cardContent = document.createElement('div');
        cardContent.setAttribute('class', 'cardContent');
        card.appendChild(cardContent);

        const titleCard = document.createElement('h3');
        const authorCard = document.createElement('p');
        const pagesCard = document.createElement('p');
        const readCard = document.createElement('button');
        readCard.setAttribute('class', 'readBtn')
        if (myLibrary[index].read == "Read") {
            readCard.style.padding = '5px 61px';
            readCard.style.backgroundColor = '#00BA98';
        } else {
            readCard.style.padding = '5px 30px';
            readCard.style.backgroundColor = '#FF7676';
        }
        readCard.addEventListener('click', () => {
            if (readCard.textContent == 'Read') {
                readCard.style.padding = '5px 30px';
                readCard.style.backgroundColor = '#FF7676';
                readCard.textContent = 'Not read yet';
                myLibrary[index].read = 'Not read yet';
            } else {
                readCard.style.padding = '5px 61px'
                readCard.textContent = 'Read';
                readCard.style.backgroundColor = '#00BA98';
                myLibrary[index].read = 'Read';
            }
        })
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

const book1 = new Book('The Fellowship of the Ring', 'J. R. R. Tolkien', 576, 'read')
addBookToLibrary(book1)

const book2 = new Book('1984', 'George Orwell', 416, 'read')
addBookToLibrary(book2)

const book3 = new Book('Brave New World', 'Aldous Huxley', 259, '')
addBookToLibrary(book3)

const book4 = new Book('On The Shortness of Life', 'Seneca', 112, 'read')
addBookToLibrary(book4)
