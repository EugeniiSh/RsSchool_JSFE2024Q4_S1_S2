import AppLoader from './appLoader';
import { CallBackFunc } from './loader';
import { ResponseData } from '../view/appView';

class AppController extends AppLoader {
    getSources(callback: CallBackFunc<ResponseData, void>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallBackFunc<ResponseData, void>): void {
        let { target } = e;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (!(target instanceof HTMLElement && target.classList.contains('source__item'))) return;

            const sourceId = target.getAttribute('data-source-id');
            if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                newsContainer.setAttribute('data-source', sourceId);
                super.getResp({ endpoint: 'everything', options: { sources: sourceId } }, callback);
            }

            target = target.parentNode;
        }
    }
}

export default AppController;
