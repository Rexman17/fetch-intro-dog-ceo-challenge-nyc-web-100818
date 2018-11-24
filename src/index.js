// going to need an event listener on the document since js loaded in the HEAD
// takes in a call back function
document.addEventListener('DOMContentLoaded', function() {
  // DOM ELEMENTS
  const breedDropDown = document.getElementById('breed-dropdown')
  // console.log(breedDropDown);
  const imgContainer = document.getElementById('dog-image-container')
  // console.log(imgContainer); // just to check we got the right element
  const breedList = document.getElementById('dog-breeds')
  // console.log(breedList);
  // VARIABLES
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  // return an object called message with keys repping the breeds
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4" // where we are fetching images from
  // returns an array of 4 dog img urls with a key of message
  // console.log(imgUrl);
  // on page load - accomplished by being inside this eventlistener which listens for DOMContentLoaded
  // fetch the images using the url above ⬆️
  fetch(imgUrl, { method: 'GET' })
    .then((response) => {
      // console.log(response); // must parse this response
        return response.json()// parse the response as JSON
    })
    .then((parsedJSON) => {
      // console.log(parsedJSON); // logs an object w an array of 4 dog img urls with a key of message which gives us an ARRAY to iterate over
      let imgUrlsArray = parsedJSON.message
      // console.log(imgUrlsArray);
      // add image elements to the DOM for each🤔 image in the array
      imgUrlsArray.map((url) => {
        // take the parsedJSON and append it to the dog image container <-- identify this container above ^
        imgContainer.innerHTML += `<img src=${url}>`
      })
    })

    // on page load - accomplished by being inside this eventlistener which listens for DOMContentLoaded
    // fetch all the dog breeds using the url above ⬆️
    fetch(breedUrl, { method: 'GET' })
      .then((r) => {
        // console.log(r); // r is json we must parse
        return r.json()
      })
      .then((parsedJSON) => {
        // console.log(parsedJSON) // prints an object called message with keys repping the breeds
        // must iterate over the keys of the message object to add the breeds to the page in an <ul> (take a look at the included index.html)
        breeds = Object.keys(parsedJSON.message)
        // console.log(breeds);
        breeds.map((breed) => {
          // find the element to which we are adding this ul which we defined above ^
          return breedList.innerHTML += `<li> ${breed} </li>`
        })
      })
      // add javascript so that the font color of a particular <li> changes on click. This can be a color of your choosing = add a click event to the breedList DOM element
      breedList.addEventListener('click', function(e) {
        // console.log(e.target); grabbed the li
        // When the user clicks any of the dog breed list items, the color the text should change.
        e.target.style.color = 'pink';
      })

      //Once we are able to load all of the dog breeds onto the page, add javascript so that the user can filter breeds that start with a particular letter using a dropdown.
      //locate the drop down for the change event -- identified it above ^
      breedDropDown.addEventListener('change', function(e) {
        // must capture value that user selects from dropdown...
        let letter = breedDropDown.value
        // console.log(letter);
        // console.log(e);
        let filtered = breeds.filter((breed) => {return breed.startsWith(letter)})
        // console.log(filtered);
          // console.log(filteredBreed);
          // must change the DOM to reflect filtered breeds...
          let listedFiltered = filtered.map((breed) => `<li>${breed}</li>`)
          breedList.innerHTML = listedFiltered.join('')
      })
}) // end of DOMContentLoaded
