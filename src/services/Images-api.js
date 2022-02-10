const key = '22655365-6101b3df63b8a13e7283cd043';

function fetchImages(searchValue, page) {
    return fetch(
        `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    ).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Nothing...`));
    });
}
export const api = { fetchImages, };