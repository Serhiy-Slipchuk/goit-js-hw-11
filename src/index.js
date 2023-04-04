// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { getPictures, total } from "./js/clientAPI";
import { clearImages, galleryListEl, renderImages } from "./js/renderMarkup";

const lightbox = new  SimpleLightbox('.gallery a');

const searchFormEl = document.querySelector('#search-form');
const buttonLoadMoreEl = document.querySelector('.load-more');

let page = 1;
let searchRequest = '';

searchFormEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (event) {
    event.preventDefault();
    clearImages();
    searchRequest = searchFormEl.searchQuery.value.toLowerCase();
    page = 1;
    getPictures(searchRequest, 1).then(data => {
        renderImages (data);
        displayLoadMoreButton();
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
    const cardHeight = galleryListEl.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2.8,
        behavior: "smooth",
    });
}