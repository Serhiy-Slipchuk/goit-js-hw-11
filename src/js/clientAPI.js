import axios from 'axios';

export let total = 0;
export const getPictures = async function (searchRequest, page) {
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParametrs = {
        key: '34764215-86b3c445ef0af6c105776f540',
        q: searchRequest,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40
        };

    const response = await axios.get(BASE_URL, { params: searchParametrs });

    if (response.status !== 200 || response.data.total === 0) {
        throw new Error(response.status);
    }
    total = response.data.total;
    return response.data.hits;
}