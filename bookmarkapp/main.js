// listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookMark);

// save bookmark
function saveBookMark(e) {
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  }

/*
  //Local Storage Test
  localStorage.setItem('test', 'hello');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
*/

  //test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
  //init array
  var bookmarks = [];
  //add to array
  bookmarks.push(bookmark);
  //set to local Storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //add bookmark to array
  bookmarks.push(bookmark);
  //re-set to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//clear Form
document.getElementById('myForm').reset();
//re-fetch bookmarks
fetchBookmarks();
  //Prevent form from submitting
  e.preventDefault();
}

//delete bookmark
function deleteBookmark(url) {
  //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url) {
        //remove from array
        bookmarks.splice(i,1);
        }
    }
  //reset to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //re-fetch bookmarks
  fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get output ID
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body mt-3">'+
    '<h3>'+name+
    ' <a class="btn btn-default" target ="_blank" href="'+url+'">Visit</a>'+
    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
    '</h3>'+
    '</div>';

  }
}

//Validate Form
function validateForm(siteName, siteUrl) {
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
  alert('Please use a valid URL');
  return false;
  }
  return true;
}
