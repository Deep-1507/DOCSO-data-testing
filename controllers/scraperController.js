const axios = require('axios');
const cheerio = require('cheerio');

const scrapeData = async (req, res) => {
    const { url } = req.body;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const doctors = [];

        $('.store-details').each((index, element) => {
            const name = $(element).find('.lng_cont_name').text().trim();
            const qualification = $(element).find('.qualification').text().trim();
            const specialization = $(element).find('.specialization').text().trim();
            const location = $(element).find('.cont_sw_addr').text().trim();
            const phoneNumber = $(element).find('.contact-info').text().trim();

            doctors.push({ name, qualification, specialization, location, phoneNumber });
        });

        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape data' });
    }
};

module.exports = { scrapeData };
