var bookArr = [];
var isEditing = false;  // sets default editing mode to false
var editingIndex;   // index that is currently being edited

function saveBook() {       // this function takes all the userinputs into objects to organize them and pushes it to the bookArr array, then saves the array in local storage
    if(isEditing){      // checks if isEditing = true.......MEANING that we're in editing mode (edit btn was clicked)...if isEditing = true then dont add a new book to array
        let bookTitle = title.value ;       // document.querySelector('#title');
        let bookAuthor = author.value ;     // document.querySelector('#author');
        let bookDate = date_bought.value ;  // document.querySelector('#date_bought');
        let bookPrice = price.value ;       // document.querySelector('#price');
        var bookObj = {title: bookTitle, author: bookAuthor, date_bought: bookDate, price: bookPrice} ; // the inputs slots are already filled out from editBook() this just stores in the object 

        bookArr[editingIndex] = bookObj ;   // this uses the editingIndex that was saved in the editBook() function and puts it into the array then sets it to equal bookObj which replaces the index that was clicked
                                            // NO NEED TO PUSH TO ARRAY CUZ WERE JUST REPLACING THAT SPECIFIC INDEX (editingIndex)
        displayBooks();
        localStorage.setItem('books', JSON.stringify(bookArr)); // stringify converts to string so JSON can read it.....saves the updated array to localstorage
        // console.log(bookArr);

    }else{  // cehcks if isEditing is false.......MEANING that we're NOT in editing mode (edit btn was NOT clicked)...if isEditing = false then we add a new book to array
        // alert('Save bookArr has been saved');
        let bookTitle = document.querySelector('#title').value ;       // document.querySelector('#title');
        let bookAuthor = document.querySelector('#author').value ;     // document.querySelector('#author');
        let bookDate = document.querySelector('#date_bought').value ;  // document.querySelector('#date_bought');
        let bookPrice = document.querySelector('#price').value ;       // document.querySelector('#price');
    
        var bookObj = {title: bookTitle,  author: bookAuthor, date_bought: bookDate, price: bookPrice} ;
        bookArr.push(bookObj);
    
        displayBooks();   // calling displayBooks() so that we can see the updated array in real time      
        localStorage.setItem('books', JSON.stringify(bookArr)); // stringify converts to string so JSON can read it
        // console.log(bookArr);
    }
}

function displayBooks(){
    // alert('callng diplay funcntion')
    let bookBox = document.querySelector('#bookBox'); bookBox.innerHTML = "";
    // for (index = 0; index < bookArr.length; index++) {
    //     bookBox.innerHTML += `<tr>
    //         <td>${index+1}</td>
    //         <td>${bookArr[index].title}</td>
    //         <td>${bookArr[index].author}</td>
    //         <td>${bookArr[index].date_bought}</td>
    //         <td>${bookArr[index].price}</td>
    //     </tr>`;
    // }
    bookArr.map((eachBook, index)=>{        // "eachBook" is the value of each of the element/index in the array, while "index" is the index of each element in the array

        bookBox.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${eachBook.title}</td>
            <td>${eachBook.author}</td>
            <td>${eachBook.date_bought}</td>
            <td>${eachBook.price}</td>
            <td><button class="btn btn-sm btn-success" onclick="editBook(${index})">Edit</button> <button class="btn btn-sm btn-danger" onclick="deleteBook(${index})">Delete</button></td>
        </tr>`                                                              // we pass in the index to the deleteBook function so that when we click on it, it calls the index of the specific book
    })  // map calls a function for each element in an array ONCE and return a new array with the results 

}

const deleteBook = (index) => {
    if (confirm('Are you sure you want to delete this book?')) {    // checking if the user wants to delete the book
        bookArr.splice(index, 1);    // splice adds or removes elements in an array.....in this case we are removing the current index (1) from the array
        displayBooks();             // calling displayBooks() so that we can see the updated array in real time
        localStorage.setItem('books', JSON.stringify(bookArr)); // werer sending localstorage the updated arra
    }
}

const editBook = (index) => {       // the index gives us access to everythin like title, author etc
    editingIndex = index;           // editingIndex is equal to the index that was clicked......KEEPS THE INDEX THAT IS CURRENTLY BEING EDITED

    let book = bookArr[index];  // book equals the current array index
    title.value = book.title;   //book.title basically means bookArr[index].title.........this populates the input field with the value
    author.value = book.author;   //book.author basically means bookArr[index].author
    date_bought.value = book.date_bought;   //book.date_bought basically means bookArr[index].date_bought
    price.value = book.price;   //book.price basically means bookArr[index].price
    

    saveBtn.innerHTML = 'Update Book';
    isEditing = true;
    // saveBtn.addClass('btn-success');
}
const updateBook = () => {

}

const loadBooks = () => {   // when the page loads it calls the books from local storage and checks if theyre books already there and if so, then parse it to an object JS can read it
    let books = localStorage.getItem('books');
    if (books) { // checks if they're books in local storge
        bookArr = JSON.parse(books)     // books array equal to the books in local storge
    }
    displayBooks();
}
