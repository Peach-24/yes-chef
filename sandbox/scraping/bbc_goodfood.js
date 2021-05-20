const request = require('request');
const cheerio = require('cheerio');
const url = 'https://www.bbcgoodfood.com/recipes/oven-baked-risotto';
const url2 = 'https://www.bbcgoodfood.com/recipes/pepper-steak-with-noodles';

const recipe = {
  main_img: "",
  dish: "",
  ingredients: [],
  steps: [],
}

// .html() gives us the html for an element

request(url2, (err, response, html) => {
  if (!err && response.statusCode == 200) {
    const $ = cheerio.load(html);

    const dish_name = $('.post-header__title');
    recipe.dish = dish_name.text();

    const instructions = $('.recipe__instructions').html();
    
    $('.recipe__ingredients li').each((i, el) => {
      const item = $(el).text();
      recipe.ingredients.push(item)
    })

    $('.grouped-list__list li').each((i, el) => {
      const item = $(el).text();
      recipe.steps.push(item)
    })

    console.log(recipe)
  }
})