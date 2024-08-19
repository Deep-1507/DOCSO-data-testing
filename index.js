const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extracting data from the page
        let doctors = [];

        $('.resultbox_info').each((index, element) => {
            const name = $(element).find('.resultbox_title_anchor.line_clamp_1').text().trim();
            const imageUrl = $(element).find('.resultbox_image img').attr('src') || '';
            const specialization = $(element).find('.specialization').text().trim();
            const rating = $(element).find('.resultbox_totalrate').text().trim();
            const location = $(element).find('.fadeIn.animated').text().trim();
            const phone = $(element).find('.callcontent').text().trim();
            const slides = [];
            $(element).find('.slide img').each((i, el) => {
                slides.push($(el).attr('src'));
            });

            doctors.push({ 
                name, 
                imageUrl,
                specialization, 
                rating, 
                location, 
                slides,
                phone
            });
        });

        res.json(doctors);
    } catch (error) {
        console.error('Failed to scrape data:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
