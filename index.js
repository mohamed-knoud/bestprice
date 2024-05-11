// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
// const fs = require('fs');
const fs = require('fs');

// // add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())




const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.get('/', (req, res) => {
  res.render('index', { variable: 0 ,query:''});
});
app.use(bodyParser.urlencoded({ extended: false }));
function data(req){
  let data = []

  puppeteer.launch({ headless: true , timeout: 60000}).then(async browser => {
    // console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto(`https://www.marjane.ma/search/${req.body.query}`, { timeout: 60000 })
    await page.waitForTimeout(15000)
    // await page.screenshot({ path: 'marjane.png', fullPage: true })
    const products = await page.$$eval('li.jsx-665482499.jsx-1583737155.list', (elements) =>
     {
        return elements.map((e) => {
        
          const nameElement = e.querySelector('h2.jsx-3277950657.title');
          const priceElement = e.querySelector('span.jsx-3054832242.price');
          if (priceElement && nameElement) {
            return {
              name: nameElement.innerText,
              price: priceElement.innerText,
            };
          } else if(nameElement){
            return {
              name: nameElement.innerText,
            }; // Return null if any element is missing
          }else{
            return null;
          }
          
        }).filter((product) => product !== null);
     })
    await browser.close()
    fs.writeFile('views/marjane.json', JSON.stringify(products), (err) => {
      if (err) throw err;
      // console.log('File saved');
    });

    // console.log(products)

    // console.log(`All done, check the screenshot. marjane ✨`)

  })
  puppeteer.launch({ headless: true , timeout: 60000}).then(async browser => {
    // console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto(`https://www.electroplanet.ma/recherche?q=${req.body.query}`, { timeout: 60000 })
    await page.waitForTimeout(5000)
    // await page.screenshot({ path: 'electroplanet.png', fullPage: true })
    const products1 = await page.$$eval('li.item.product.product-item', (elements) =>
      {
        return elements.map((e) => {
        
        const nameElement = e.querySelector('a.product-item-link');
        const priceElement = e.querySelector('span.price');
        if (priceElement && nameElement) {
          return {
            name: nameElement.innerText,
            price: priceElement.innerText,
          };
        } else if(nameElement){
          return {
            name: nameElement.innerText,
          }; // Return null if any element is missing
        }else{
          return null;
        }
        
      }).filter((product) => product !== null);
    }
    );
    fs.writeFile('views/electroplanet.json', JSON.stringify(products1), (err) => {
      if (err) throw err;
      // console.log('File saved');
    });
    await browser.close()
        
    // console.log(products1)

    // console.log(`All done, check the screenshot. for electroplanet`)

  })

  puppeteer.launch({ headless: true , timeout: 60000}).then(async browser => {
    // console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto(`https://www.marocannonces.com/maroc.html?kw=${req.body.query}`, { timeout: 60000 })
    await page.waitForTimeout(5000)
    // await page.screenshot({ path: 'marocannonces.png', fullPage: true })
    
    const products2 = await page.$$eval('a div.holder', (elements) =>{
      
      // elements.forEach(e=>{
      //   console.log(e)
      // })
      
      return elements.map((e) => {
        
        const nameElement = e.querySelector('h3');
        const priceElement = e.querySelector('strong.price');
        if (priceElement) {
          return {
            name: nameElement.innerText,
            price: priceElement.innerText,
          };
        } else {
          return {
            name: nameElement.innerText,
          }; // Return null if any element is missing
        }
        
      })
    }
      
    );
    fs.writeFile('views/marocannonces.json', JSON.stringify(products2), (err) => {
      if (err) throw err;
      // console.log('File saved');
    });
    // console.log(products2)
    await browser.close()
    // console.log(`All done, check the screenshot. for marocannonces`)

  })

  puppeteer.launch({ headless: true , timeout: 60000}).then(async browser => {
    // console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto(`https://www.avito.ma/fr/maroc/${req.body.query}`, { timeout: 60000 })
    await page.waitForTimeout(5000)
    // await page.screenshot({ path: 'avito.png', fullPage: true })
    const products3 = await page.$$eval('a.sc-1jge648-0.eTbzNs', (elements) =>{
      
      // elements.forEach(e=>{
      //   console.log(e)
      // })
      
      return elements.map((e) => {
        
        const nameElement = e.querySelector('p.sc-1x0vz2r-0.czqClV');
        const priceElement = e.querySelector("span[dir='auto']");
        if (priceElement) {
          return {
            name: nameElement.innerText,
            price: priceElement.innerText,
          };
        } else {
          return {
            name: nameElement.innerText,
          }; // Return null if any element is missing
        }
        
      })
    }
      
    );
    fs.writeFile('views/avito.json', JSON.stringify(products3), (err) => {
      if (err) throw err;
      // console.log('File saved');
    });
    await browser.close()
    // console.log(`All done, check the screenshot. for avito`)

  })

  puppeteer.launch({ headless: true , timeout: 60000}).then(async browser => {
    // console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto(`https://www.jumia.ma/catalog/?q=${req.body.query}`, { timeout: 60000 })
    await page.waitForTimeout(5000)
    // await page.screenshot({ path: 'jumia.png', fullPage: true })
    const products4 = await page.$$eval('article.prd._fb._spn.c-prd.col a.core', (elements) =>{
      
      // elements.forEach(e=>{
      //   console.log(e)
      // })
      
      return elements.map((e) => {
        
        const nameElement = e.querySelector('div.info h3.name');
        const priceElement = e.querySelector("div.info div.prc");
        if (priceElement) {
          return {
            name: nameElement.innerText,
            price: priceElement.innerText,
          };
        } else {
          return {
            name: nameElement.innerText,
          }; // Return null if any element is missing
        }
        
      })
    }
      
    );
    
    
  fs.writeFile('views/jumia.json', JSON.stringify(products4), (err) => {
    if (err) throw err;
    // console.log('File saved');
  });
    await browser.close()
    // console.log(`All done, check the screenshot. for jumia`)

  })
  return data;
}
app.post('/submit', async (req, res) => {
  const url_avito = 'views/avito.json';
  const url_jumia = 'views/jumia.json';
  const url_marjane = 'views/marjane.json';
  const url_electroplanet = 'views/electroplanet.json';
  const url_marocannonce = 'views/marocannonces.json';
  fs.unlink(url_avito, (err) => {
    if (err) {
      // console.error('Error deleting file:', err);
      return;
    }
    // console.log('File deleted successfully');
  });
  fs.unlink(url_jumia, (err) => {
    if (err) {
      // console.error('Error deleting file:', err);
      return;
    }
    // console.log('File deleted successfully');
  });
  fs.unlink(url_marjane, (err) => {
    if (err) {
      // console.error('Error deleting file:', err);
      return;
    }
    // console.log('File deleted successfully');
  });
  fs.unlink(url_electroplanet, (err) => {
    if (err) {
      // console.error('Error deleting file:', err);
      return;
    }
    // console.log('File deleted successfully');
  });
  fs.unlink(url_marocannonce, (err) => {
    if (err) {
      // console.error('Error deleting file:', err);
      return;
    }
    // console.log('File deleted successfully');
  });
      
    const datas = data(req);
    let variable = 1
    res.render('index', { variable: 1 , query:req.body.query});
      
  

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// puppeteer usage as normal



