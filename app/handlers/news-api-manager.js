import {
    NEWS_API_KEY
} from '../components/globalVariables/hidden';

export default class NewsApiHandler {
    constructor() {
        this.apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    }

    getDate() {
        const today = new Date(),
            year = today.getFullYear(),
            day = today.getDate(),
            month = today.getMonth();

        return `${year}${this.pad(month + 1)}${this.pad(day)}`;
    }

    pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    getUpdates() {
        const data = {
            url: this.apiUrl + `?q=covid-19&begin_date=${this.getDate()}&api-key=${NEWS_API_KEY}`
        };

        return this.getData(data);
    }

    getData(data) {
        return fetch(data.url, {
            method: 'get'
        })
        .then((response) => {
            return response.json();
        });
    }
}