import { info, alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import PicturesApiService from './apiService';
import searchFormTemplate from '../templates/searchForm.hbs';
import button from '../templates/button.hbs';
import picturesList from '../templates/picturesList.hbs';
import modal from './modal';

// Переменые
const searchDivRef = document.querySelector('.search-div');
const loadMoreDivRef = document.querySelector('.load-more');
const picturesListDivRef = document.querySelector('.pictures-list');
const picturesApiService = new PicturesApiService();
searchDivRef.innerHTML = searchFormTemplate();
const searchForm = document.querySelector('.search-form');

// Добавляю слушатель на инпут
searchForm.addEventListener('submit', onSearch);
// Добавляю слушатель модалки
picturesListDivRef.addEventListener('click', modal);

// Асинхроная функция вызова поиска
async function onSearch(event) {
  event.preventDefault();
  picturesApiService.query = event.currentTarget.elements.query.value;
  // Проверка на наличие значения
  if (picturesApiService.query.trim() === '') {
    // Запуск функции pnotify
    messagePnotify();
    return;
  }
  // Обновляем страницу http запроса
  await picturesApiService.resetPage();
  // Очищаем список с елементами
  clearPicturesList();
  // Получаем ответ от http
  const answer = await picturesApiService.apiFetch();
  // Запускаем функцию рендера разметки
  appendPicturesMarkup(answer);
  // Зауск функции рендера кнопки после елементов списка
  loadMoreBttnMarkup();
}

// Асинхроная функция загрузки большего количества елементов поиска
async function onLoadMore() {
  // Получаем ответ от http
  const answer = await picturesApiService.apiFetch();
  // Запускаем функцию рендера разметки
  appendPicturesMarkup(answer);
  // Запуск функции скрола страницы
  windowsScrolling();
}

// Функция рендера разметки
function appendPicturesMarkup(hits) {
  picturesListDivRef.insertAdjacentHTML('beforeend', picturesList(hits));
}
// Функция очистки разметки
function clearPicturesList() {
  picturesListDivRef.innerHTML = '';
}
// Функция рендера кнопки Load more
function loadMoreBttnMarkup() {
  loadMoreDivRef.innerHTML = button();
  const loadMoreBttn = document.querySelector('.load-more-bttn');
  loadMoreBttn.addEventListener('click', onLoadMore);
}
// Функция скролинга страницы
function windowsScrolling() {
  const totalScrollHeight = document.body.scrollHeight;

  window.scrollTo({
    top: totalScrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}
// Функция pnotify
function messagePnotify() {
  new alert({
    title: 'Search problem',
    text: 'Please enter valid query!',
  });
}
