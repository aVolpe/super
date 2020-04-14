import rp from 'request-promise-native';

export class HttpHelper {

    constructor() {

    }

    public get(url: string): Promise<string> {
        return rp(url).then(html => html.toString());
    }
}
