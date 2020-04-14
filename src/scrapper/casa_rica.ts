import $ from 'cheerio';
import {HttpHelper} from '../lib/http_helper';
import {Product} from '../model';

export const CasaRicaConstants = {
  MAIN_URL: "https://www.casarica.com.py/"
};

export class CasaRicaScrapper {


  constructor(private httpHelper: HttpHelper) {
  }

  public buildData(): Promise<ReadonlyArray<Product>> {

    console.log('CasaRica::buildData', 'building data');

    return this.fetchCategories()
      .then(cats => {
        return Promise
          .all(cats.map(cat => this.fetchProducts(cat.url)))
          .then(productsArray => ([] as Product[]).concat(...productsArray))
      });
  }


  private fetchCategories(): Promise<Array<{ name: string, url: string }>> {

    return this.httpHelper
      .get(CasaRicaConstants.MAIN_URL)
      .then(html => {
          const data = $('a.navlink', html);
          return data.toArray()
            .filter(el => el.attribs.href)
            .filter(el => !el.attribs.href.includes('promociones'))
            .map(el => ({
              name: (el.children && el.children[0] && el.children[0].data || '').trim(),
              url: el.attribs.href || ''
            }));
        }
      );

  }

  private fetchProducts(cat: string): Promise<Product[]> {

    console.log('fetching data from ', cat);

    return this.httpHelper
      .get(cat)
      .then(() => {
        console.log('fetching cat', cat);
        return [];
      });
  }

}
