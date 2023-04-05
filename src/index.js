import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { getPictures, total } from "./js/clientAPI";
import { clearImages, galleryListEl, renderImages } from "./js/renderMarkup";

const lightbox = new SimpleLightbox('.gallery a');

const searchFormEl = document.querySelector('#search-form');
const buttonLoadMoreEl = document.querySelector('.load-more');

let page = 1;
let searchRequest = '';

searchFormEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (event) {
    event.preventDefault();
    clearImages();
    hideLoadMoreButton();
    searchRequest = searchFormEl.searchQuery.value.toLowerCase().trim();
    if(searchRequest === '') {
        Notiflix.Notify.failure('Input valid search query. Please try again.');
        return;
    }
    page = 1;
    getPictures(searchRequest, 1).then(data => {
        renderImages(data);
        lightbox.refresh();
        if (total > 40) {
            displayLoadMoreButton();
        };
        Notiflix.Notify.success(`Hooray! We found ${total} images.`);
        page = 2;
    }).catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    });
    searchFormEl.searchQuery.value = '';
}

function handlerLoadMoreButton() {
    hideLoadMoreButton();
    getPictures(searchRequest, page).then(data => {
        renderImages(data);
        scrollToLoadedImages();
        lightbox.refresh();
        page = page + 1;
    }).catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    });

    if(page >= total / 40) {
        return
    };

    displayLoadMoreButton();
}

function displayLoadMoreButton() {
    buttonLoadMoreEl.classList.add('show-button');
    buttonLoadMoreEl.addEventListener('click', handlerLoadMoreButton);
}

function hideLoadMoreButton() {
    buttonLoadMoreEl.removeEventListener('click', handlerLoadMoreButton);
    buttonLoadMoreEl.classList.remove('show-button');
}

function scrollToLoadedImages() {
    const buttonHeight = document.querySelector('.button-thumb').getBoundingClientRect().height;
    window.scrollBy({
        top: window.innerHeight - buttonHeight + 15,
        behavior: "smooth",
    });
}