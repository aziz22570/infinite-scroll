const imageContainer = document.getElementById("image-container")
const load = document.getElementById("loader")
let photoArray = []
let ready = true

// Unsplash API
const count = 10;
const apiKey = "6Y-L1g-m3gAf9vXxSFmbcBCOE9ATpxvH4KTWD0HSu8k"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//  create  Elemnts for Links & Photo, add to DOM

function displayPhotos(){
    // Run function for each object in photoArray
    photoArray.forEach((photo)=>{
        // create <a> to link unsplash
        const item = document.createElement("a")
        item.setAttribute("href",photo.links.html)
        item.setAttribute("target","_blank")
        // create <img> for photo
        const img = document.createElement('img')
        img.setAttribute("src",photo.urls.regular)
        img.setAttribute("alt",photo.description)
        img.setAttribute("title",photo.alt_description)


        // put <img> inside <a>, then put both inside container
        imageContainer.appendChild(item)
        item.appendChild(img)

    })
}
// display hide load
function display(){
    load.classList.add("display")
    load.classList.remove("hide")

}
function hide(){
    load.classList.remove("display")
    load.classList.add("hide")
}

// get photos from unsplash API
async function getPhotos(){
    try {
        const reponses = await fetch(apiUrl)
        photoArray = await reponses.json()
        console.log(photoArray);
        displayPhotos()
    } catch (error) {
        // catch error
        console.log(error);
    }

}
// on load
getPhotos()

let scrollNB
window.addEventListener("scroll",()=>{
     if(window.innerHeight+window.scrollY >= document.body.offsetHeight && ready){
        getPhotos()
        ready =false
        display()
         setTimeout(function(){
            hide()
            ready=true},3000)
    }}
    )