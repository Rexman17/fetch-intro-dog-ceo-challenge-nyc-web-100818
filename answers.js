console.log('%c HI', 'color: firebrick')

// in order to do something after the page has loaded...
// takes in a function as an argument
document.addEventListener('DOMContentLoaded', function() {
  let allBreeds = [] // first set to empty array
  // set URL given to us in the ReadMe
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  // where we will add our dog images
  const dogImgCont = document.getElementById('dog-image-container')
  // where we will add our breed names
  const dogBreedList = document.getElementById('dog-breeds')
  // could attach 50 dupe eventlistener OR leverage event DELEGATION so find the parent
  // instead, listen for click on the PARENT container (ONE event listener) and then delegate what should happen
  const letterDropDown = document.getElementById('breed-dropdown') // the select


  dogBreedList.addEventListener('click', (event) => {
    // console.log(event.target); // target is the DOM node that RECEIVED the event
    event.target.style.color = "cyan"
  })

  letterDropDown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value
    // console.log(allBreeds);
    // filter out name that do not match the selected letter
    let filteredBreeds = allBreeds.filter((breed) => {
      return breed.startsWith(selectedLetter)
    })
    // console.log(filteredBreeds);
    // WHY DOESN'T FOR EACH WORK - IS IT BC IT MUTATES ORIGINAL ARRAY?
    // filteredBreeds.forEach(function(breed) {
    //   dogBreedList.innerHTML += `${breed}`
    // })
    dogBreedList.innerHTML = createDogLis(filteredBreeds)
  })
  // console.log(dogImgCont);
  // send a fetch request to the URL
  // fetch takes 2 args - the url and the method of the request
  fetch(imgUrl, { method: "GET" })
    .then((responseData) => {
      // console.log(responseData); // log responseData to check that all is good
      if (responseData.ok) { // checking status code and making sure it's less than 400
        return responseData.json() // returns another promise and the only way to get this value is w another .then()
      }
    })
    .then((dogImgData) => {
      // console.log(dogImgData);
      // add imgs to the dom forEach element in the array and since that element won't change, just add it to the top of when page loads ^
      // dogImgData is an object with a KEY of message that holds the images in an array
      // so we want to forEach over each element in the array
      dogImgData.message.forEach(function(imgUrl) {
        dogImgCont.innerHTML += `<img src=${imgUrl}>`
      })
    })

    fetch(breedUrl, { method: 'GET' })
      .then((response) => response.json()) // implicit return
      .then((breedData) => {
        allBreeds = Object.keys(breedData.message)
        // console.log(allBreeds);
        // dogBreedList.innerHTML = allBreeds.map(breed) =>
        allBreeds.forEach(function(breedname) {
          dogBreedList.innerHTML += createDogLis(allBreeds)
        })
    })
})

function createDogLis(dogBreedArray) {
  return dogBreedArray.map((breed) => `<li>${breed}</li>`).join(" ")
}
