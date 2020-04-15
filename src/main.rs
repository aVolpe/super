use scrapper::Scrapper;

mod scrapper;

fn main() {
    let rh_scrapper = scrapper::RHScrapper {};
    println!("{}", rh_scrapper.get_products());
}
