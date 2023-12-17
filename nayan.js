const express = require('express');
const router = express.Router();
const FormData = require('form-data');
const {
  BingImageCreator
} = require('./skrep.js');
const app = express();
const port = 8080;

router.get('/bing-img', async (req, res) => {
  try {
    let text = req.query.prompt;

if (!text) {
      return res.json({
        error: 'Invalid parameter, use it /bing-img?prompt=<teks>'
      });
    }

const bingImageCreator = new BingImageCreator({
      cookie: '14cRmMi8F7BapABkfSsK8gkOJ1fGfTBFPSQEo934atFVfD8kSRXaqs5HktCx3ytMkmGeRgX5AZeQbtIgqu2fOsDBX7ywz8_lERjX0PNZQ4PEKb9sa5JF2_-eSvFE_QRyeUljYpUregF7Il9O-9xmoEV1-geLS3JSZa7Zx1gJRhXkdo3b6oyTRvh1R0yy32u-0DFR8TN9Tmf_xUuNEm1ynIw'
    });

const data = await bingImageCreator.createImage(text);

if (data.length > 0) {
      res.json({
        success: true,
        author: 'Mohammad Nayan',
        result: data
      });
    } else {
      res.json({
        success: false,
        author: 'Mohammad Nayan',
        message: 'The prompt may have been blocked use another prompt'
      });
    }
  } catch (error) {
    console.error(`Error API: ${error.message}`);
    res.json({
      error: 'Internal server error'
    });
  }
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
