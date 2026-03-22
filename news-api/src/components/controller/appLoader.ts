import { Loader } from './loader';

enum ApiConfig {
    apiUrl = 'https://rss-news-api.onrender.com/mocks/',
    apiKey = '57ebc583630445ed82eb2a729025f250',
}

class AppLoader extends Loader {
    constructor() {
        super(ApiConfig.apiUrl, { apiKey: ApiConfig.apiKey });
    }
}

export default AppLoader;
