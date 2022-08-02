const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include:[Product]
  });
    console.log(categoriesData)
    res.status(200).json(categoriesData);
  } catch (err) {
    console.log(err)
    res.status(504).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
  const categoriesData = await Category.findByPk(req.params.id, {
    include: [Product]
  });
  console.log(categoriesData)
    res.status(200).json(categoriesData);
  } catch (err) {
    console.log(err)
    res.status(504).json(err);
  }

});
  


router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => { 
  // update a category by its `id` value
  try{
  const categoriesData = await Category.create({category_id: 2});
categoriesData.category_id = 2;
await categoriesData.save()
res.status(200).json(newCategories);
}
catch (err) {
  res.status(400).json(err);
}});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  const categoriesData = await Category.create({category_id: 2});
  categoriesData.category_id = 2;
  await categoriesData.save()
  res.status(200).json(newCategories);
  }catch (err) {
    res.status(400).json(err);
  }});


module.exports = router;
