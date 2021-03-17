const BREEDS_LIST_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');
const randomURL = 'https://dog.ceo/api/breeds/image/random';


getDogsList();

function getDogsList() {
    fetch(BREEDS_LIST_URL).then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);

        for(let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    })
    defaultImage();
    showImages();
}

function defaultImage() {
    //const spinner = document.querySelector('.spinner');
    document.querySelector('.spinner').style.display='block';
    document.querySelector('.show').style.display='none';
    //spinner.classList.add('show');
    fetch(randomURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let defaultImage = document.querySelector('.default-image');
            defaultImage.setAttribute('src', data.message);
            //spinner.classList.remove('show');
            loadEvent(defaultImage);
            // document.querySelector('.spinner').style.display='none';
            // document.querySelector('.show').style.display='block';
        })
    }

function showImages() {
    select.addEventListener('change', function(event) {
        
        if(event.target.value == 'default'){
            defaultImage();
        } else {
            const userOptionSelect = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
            
            // const spinner = document.querySelector('.spinner');
            // spinner.classList.add('show');
            document.querySelector('.spinner').style.display='block';
            document.querySelector('.show').style.display='none';

            fetch(userOptionSelect)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    let dogImage = document.querySelector('.dog-image');
                    dogImage.setAttribute('src',data.message);
                    // spinner.classList.remove('show');
                    loadEvent(dogImage);
                    //document.querySelector('.spinner').style.display='none';
                    //document.querySelector('.show').style.display='block';
                })
        }
            //document.querySelector('.spinner').style.display='none';
    })
}

function loadEvent(event) {
    event.addEventListener('load',function() {
        document.querySelector('.spinner').style.display='none';
        document.querySelector('.show').style.display='block';
    })
}