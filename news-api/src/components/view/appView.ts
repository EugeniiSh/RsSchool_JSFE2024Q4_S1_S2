import { News, NewsObject } from './news/news';
import { Sources, SourceObject } from './sources/sources';

interface ResponseData {
    articles?: NewsObject[];
    sources?: SourceObject[];
}

class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export { AppView, ResponseData };
