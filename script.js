function Book(title, author, numOfPages, read){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;

    this.info = function(){
        return this.read ? (title + " by " + author + ", " + numOfPages + 
            " pages, finished reading"): (title + " by " + author + 
            ", " + numOfPages + " pages, not finished reading yet");
    }

    this.getTitle = () => {
        return this.title;
    }

    this.getAuthor = () => {
        return this.author;
    }

    this.getNumOfPages = () => {
        return this.numOfPages;
    }

    this.getRead = () => {
        return this.read ? "Finished": "Not Finished";
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function removeBookFromLibrary(index){
    myLibrary.splice(index, 1);
}

function toggleRead(index){
    if (myLibrary[index].read){
        myLibrary[index].read = false;
    }
    else{
        myLibrary[index].read = true;
    }
}

function render(){
    const content = document.querySelector("#content");
    content.innerHTML = "";

    for (i = 0; i < myLibrary.length; i++){
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute('data-index', `${i}`);

        const titleAuthor = document.createElement("p");
        titleAuthor.textContent = myLibrary[i].getTitle() + " by " + 
            myLibrary[i].getAuthor();

        const pages = document.createElement("p");
        pages.textContent = "Pages: " + myLibrary[i].getNumOfPages();

        const didRead = document.createElement("p");
        didRead.textContent = myLibrary[i].getRead();

        const line1 = document.createElement("hr");
        const line2 = document.createElement("hr");

        card.appendChild(line1);

        card.appendChild(titleAuthor);

        card.appendChild(line2);

        card.appendChild(pages);

        card.appendChild(didRead);

        const iconDiv = document.createElement("div");
        iconDiv.classList.add("icon-div");

        const readBtn = document.createElement("button");
        readBtn.classList.add("icon-btn");
        const readIcon = document.createElement("i");
        readIcon.classList.add("material-icons");
        readIcon.textContent = "visibility";

        readBtn.appendChild(readIcon);

        readBtn.addEventListener("click", (e) => {
            let index = card.getAttribute("data-index");
            toggleRead(index);

            render();
        })

        iconDiv.appendChild(readBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("icon-btn");
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("material-icons");
        trashIcon.textContent = "delete";

        deleteBtn.appendChild(trashIcon);

        deleteBtn.addEventListener("click", (e) => {
            let index = card.getAttribute("data-index");
            console.log(index);
            removeBookFromLibrary(index);

            render();
        })

        iconDiv.appendChild(deleteBtn);

        card.appendChild(iconDiv);

        content.appendChild(card);
    }
}

function clearInput(){
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const numOfPagesInput = document.querySelector("#numOfPages");
    titleInput.value = "";
    authorInput.value = "";
    numOfPagesInput.value = "";
}

let myLibrary = [];
const addBtn = document.querySelector("#add");
const closeBtn = document.querySelector("#close");
const submitBtn = document.querySelector(".submit")
const popUpForm = document.querySelector(".pop-up");

addBtn.addEventListener("click", (e) => {
    popUpForm.setAttribute("style", "display: block");
    clearInput();
})

closeBtn.addEventListener("click", (e) => {
    popUpForm.setAttribute("style", "display: none");
})

submitBtn.addEventListener("click", (e) => {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let numOfPages = document.getElementById("numOfPages").value;

    let books = new Book(title, author, numOfPages, false);

    addBookToLibrary(books);

    popUpForm.setAttribute("style", "display: none");

    render();
})

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 310, true);
const book2 = new Book("Harry Potter and the Philosopher's Stone", "J.K Rowling", 246, false);
const book3 = new Book("Why We Sleep", "Matthew Walker", 360, false);
const book4 = new Book("12 Rules for Life", "Jordan Peterson", 450, false);
const book5 = new Book("The Intelligent Investor", "Benjamin Graham", 640, true);
const book6 = new Book("Cracking the Coding Interview", "Gayle Laakmann Mcdowell", 696, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
render();