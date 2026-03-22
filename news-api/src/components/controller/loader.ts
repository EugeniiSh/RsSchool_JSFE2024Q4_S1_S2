import { ResponseData } from '../view/appView';

interface LoaderSetting {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    callback: CallBackFunc<ResponseData, void>;
    options?: Options;
    endpoint: 'sources' | 'everything';
}

interface Options {
    [key: string]: string;
}

interface CallBackFunc<T, U> {
    (arg: T): U;
}

type RequestConfig = Pick<LoaderSetting, 'options' | 'endpoint'>;

class Loader {
    baseLink: string;
    options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: RequestConfig,
        callback: CallBackFunc<ResponseData, void> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load({ method: 'GET', endpoint, callback, options });
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl({ options, endpoint }: RequestConfig): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load({ method, endpoint, callback, options }: LoaderSetting): void {
        fetch(this.makeUrl({ options, endpoint }), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: ResponseData) => callback(data))
            .catch((err) => console.error(err));
    }
}

export { Loader, CallBackFunc };
