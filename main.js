let container =  document.querySelector('.lists');
let inputField = document.querySelector('input');
let clearButton = document.querySelector('#clearButton')

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 4, title: "1984", author: "George Orwell", year: 1949 },
    { id: 5, title: "One Hundred Years of Solitude", author: "Gabriel García", year: 1967 },
    { id: 6, title: "Moby-Dick", author: "Herman Melville", year: 1851 },
    { id: 7, title: "Frankenstein", author: "Mary Shelley", year: 1818 },
    { id: 8, title: "David Copperfield", author: "Charles Dickens", year: 1849 },
    { id: 9, title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866 },
    { id: 10, title: "War and Peace", author: "Leo Tolstoy", year: 1865 },
    { id: 11, title: "And Then There Were None", author: "Agatha Christie", year: 1939 },
    { id: 12, title: "The Catcher in the Rye", author: "JD. Salinger", year: 1945 },
    { id: 13, title: "Harry Potter Series", author: "J.K. Rowling", year: 1997 },
  ];
  

showList(books)

inputField.addEventListener('input', debounce(update, 300));
clearButton.addEventListener('click', clearSearchResult)

function update(){
    let inputValue = inputField.value.trim().toLowerCase();
    let filtered = books.filter(elem =>
     elem.title.toLowerCase().includes(inputValue) || elem.author.toLowerCase().includes(inputValue)
    );
    container.textContent = ``;
        if(filtered.length == 0){
            container.appendChild(document.createElement('p')).textContent = `Nothing found`
        }
        else{
            showList(filtered, inputValue)
        }
    }

function showList(book, inputValue){
    book.forEach(elem => {
        let title = hilghlight(elem.title, inputValue);
        let author = hilghlight(elem.author, inputValue);
        let newItem = document.createElement('p');
        container.appendChild(newItem).innerHTML = `Title : ${title}, Author : ${author}` 
        
    });
} 

function hilghlight(text, inputValue){
    if (!inputValue) return text;
    let search = new RegExp(inputValue, 'gi');
    return text.replace(search, '<span class = "highlight">$&</span>');
}

function clearSearchResult(){
    inputField.value = '';
    update();
}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args); }, timeout);
    };
}
