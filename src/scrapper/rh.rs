use scrapper::Scrapper;

static BASE_URL: &str = "https://www.casarica.com.py/";

pub(crate) struct RHScrapper {

}

impl Scrapper for RHScrapper {
    fn get_products(&self) -> &str {
        return BASE_URL
    }
}
