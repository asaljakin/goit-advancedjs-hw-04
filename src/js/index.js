import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'modern-normalize/modern-normalize.css';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api';

const elements = {
    searchForm : document.getElementById('search-form'),
    gallery : document.querySelector('.gallery'),
    inputSerch: document.querySelector('.serch-form-input'),
    btnSerch: document.querySelector('.serch-form-btn'),
    btnLoadMore: document.querySelector('.load-more'),
};

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

elements.searchForm.addEventListener('submit', onSearchForm);

async function onSearchForm(e) {
    e.preventDefault();
    page = 1;
    query = e.currentTarget.elements.searchQuery.value.trim();
    elements.gallery.innerHTML = '';

    if (!query) {
        iziToast.error({
            title: 'Error',
            position: 'center',
            message: 'The search string cannot be empty. Please specify your search query.',
        });
        return;
    }
    try {
        const data = await fetchImages(query, page, perPage);
        if (data.totalHits === 0) {
            iziToast.error({
                title: 'Error',
                position: 'center',
                message: 'Sorry, there are no images matching your search query. Please try again.',
            });
            return;
        } else {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            iziToast.success({
                position: 'center',
                message: `Hooray! We found ${data.totalHits} images.`,
            });
        }
        const totalPages = Math.ceil(data.totalHits / perPage);
        if (totalPages <= page) {
            iziToast.warning({
                position: 'bottomCenter',
                message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            window.addEventListener('scroll', showLoadMorePage);
        }
    } catch(error) {
        iziToast.error({
            title: 'Error',
            position: 'center',
            message: `${error.message} Something went wrong!`,
        });
        console.log(error)
    } finally {
        elements.searchForm.reset();
    };
}


function renderGallery(images) {
    // Перевірка чи існує галерея перед вставкою даних
    if (!elements.gallery) {
        return;
    }

    const markup = images
        .map(image => {
        const {
            id,
            largeImageURL,
            webformatURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        } = image;
        return `
                <div class="photo-card">
                    <a href='${largeImageURL}' class="card-link js-card-link">
                        <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                            <b>Views</b>
                            ${views}
                            </p>
                            <p class="info-item">
                            <b>Comments</b>
                            ${comments}
                            </p>
                            <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                            </p>
                        </div>
                    </a>
                </div>`;
        })
        .join('');

    elements.gallery.insertAdjacentHTML('beforeend', markup);

    // Цей код дозволяє автоматично прокручувати сторінку на висоту 2 карток галереї, коли вона завантажується
    if (page === 1) {
        return
    }
    const { height: cardHeight } =
        elements.gallery
        .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

async function onloadMore() {
    page += 1;
    simpleLightBox.destroy();
    try {
        const data = await fetchImages(query, page, perPage);
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        const totalPages = Math.ceil(data.totalHits / perPage);
        if (page >= totalPages) {
            iziToast.warning({
                position: 'bottomCenter',
                message: "We're sorry, but you've reached the end of search results.",
            });
            window.removeEventListener('scroll', showLoadMorePage);
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            position: 'center',
            message: `${error.message} Something went wrong!`,
        });
        console.log(error);
    }
}

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight
  );
}

// Функція, яка виконуеться, якщо користувач дійшов до кінця сторінки
function showLoadMorePage() {
  if (checkIfEndOfPage()) {
    onloadMore();
  }
}
