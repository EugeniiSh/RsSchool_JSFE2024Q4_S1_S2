import './news.css';

interface NewsObject {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
}

class News {
    draw(data: NewsObject[]): void {
        const news: NewsObject[] = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as DocumentFragment;
            const newsItem = newsClone.querySelector('.news__item');
            if (idx % 2) newsItem?.classList.add('alt');

            const newsPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
            newsAuthor.textContent = item.author || item.source?.name || '';

            const newsDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
            newsDate.textContent = item.publishedAt?.slice(0, 10).split('-').reverse().join('-') || '';

            const newsTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            newsTitle.textContent = item.title || '';

            const newsSourceName = newsClone.querySelector('.news__description-source') as HTMLElement;
            newsSourceName.textContent = item.source?.name || '';

            const newsDescription = newsClone.querySelector('.news__description-content') as HTMLElement;
            if (item.description?.startsWith('<ol>' || 'ul')) newsDescription.innerHTML = item.description;
            newsDescription.textContent = item.description || '';

            const newsReadMore = newsClone.querySelector('.news__read-more a') as HTMLElement;
            newsReadMore.setAttribute('href', item.url || '#');

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (!newsContainer) return;
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export { News, NewsObject };
