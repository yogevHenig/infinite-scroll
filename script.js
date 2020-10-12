const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// current call varibles
let isFinishedLoading= false;
let imagesLoaded = 0;
let totalImagesToLoad = 0;
let imagesArr = [];


// Unsplash API
const numberOfImagesToLoad = 5;
const APIkey = 'jW8UGxoKw5o9CUE4H7Xm9_L2udAVW_wdTBb1wHPgxck'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${APIkey}&count=${numberOfImagesToLoad}`;

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        isFinishedLoading = true;
        loader.hidden = true;
    }
}

// Helper function to set the Attributes on DOM elemens
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}


// create Elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = imagesArr.length;
    imagesArr.forEach(photo => {
        const item = document.createElement('a'); // create ancer element to ling to unsplash website

        const img = document.createElement('img');// create img for photo
        
        setAttributes(item, {
            href: photo.links.html,   // link to unsplash
            target: '_blank'          // open in a new window
        });

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // put img inside <a> and <a> inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiURL);
        imagesArr = await response.json();
        //console.log('photosarr',photosArr)
        displayPhotos();
    } catch (err){
        // catch erorr here
        console.log(err);
    }
}


// check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    // window.innerHeight - the total height of the browser window (stays constant as long as no resize..)
    // window.scrollHeight - the distance from the top of the page
    // document.body.offsetHeight - everything that in the body - i.e all our images
    // - 1000 - so we will load before reaching to the very bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isFinishedLoading){
        isFinishedLoading = false;
        getPhotos();
    }
})

// on Load:
getPhotos();
