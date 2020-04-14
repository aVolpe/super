/* tslint:disable:no-object-mutation */
// tslint:disable:no-expression-statement
import test from 'ava';
import * as fs from 'fs';
import {HttpHelper} from '../lib/http_helper';
import {CasaRicaConstants, CasaRicaScrapper} from './casa_rica';

const getFileData = (fileName: string) => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(fileName, 'UTF-8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

const httpHelper = new HttpHelper();
const scrapper = new CasaRicaScrapper(httpHelper);

httpHelper.get = (url) => {
  if (url === CasaRicaConstants.MAIN_URL) {
    return getFileData('src/test_data/casa_rica_index.html');
  } else {
    return new HttpHelper().get(url);
  }
};

test('CasaRica::buildData', async t => {

  try {
    const data = await scrapper.buildData();


    t.log(data);

    t.true(data.length);

  } catch (err) {
    t.log(err);
    t.fail('exception');
  }
});


