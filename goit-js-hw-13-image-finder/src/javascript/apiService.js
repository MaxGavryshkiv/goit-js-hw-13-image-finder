// Класс для получения отвера от http
export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  //Метод класса для получения масива обектов
  async apiFetch() {
    const API_KEY = '21314712-d360d7109d82acff562e015b0';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const responce = await fetch(url);
    const pictures = await responce.json();
    this.incrementPage();
    return pictures.hits;
  }
  //Метод класса для увеличения страницы
  incrementPage() {
    this.page += 1;
  }
  //Метод класса для сброса страницы
  resetPage() {
    this.page = 1;
  }
  //Get запрос для получения результата query
  get query() {
    return this.searchQuery;
  }
  //Set запрос для обновления результата query
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
