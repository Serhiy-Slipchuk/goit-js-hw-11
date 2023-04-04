export const galleryListEl = document.querySelector('.gallery');

export function renderImages (data) {
const images = data.map( obj => {
const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = obj;
    galleryListEl.insertAdjacentHTML('beforeend',
        `<div class="photo-card">
            <a href="${largeImageURL}">
                <div class="image-thumb">
                    <img src="${webformatURL}" alt="${tags}" width="270" loading="lazy" />
                </div>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b><br>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b><br>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b><br>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b><br>
                        ${downloads}
                    </p>
                </div>
            </a>
        </div>`)
})
}

export function clearImages () {
    galleryListEl.innerHTML = '';
}