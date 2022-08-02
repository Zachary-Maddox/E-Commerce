const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include:[Product]
  });
    console.log(tagData)
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err)
    res.status(504).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    console.log(tagData)
      res.status(200).json(tagData);
    } catch (err) {
      console.log(err)
      res.status(504).json(err);
    }
  
  });


router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    id: req.body.id,
    tag_name:req.body.tag_name,
    },
    {
      where:{
        tag_name: req.params.tag_name,
      },
    }
  )
  .then((updatedTag) =>{
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
    tag_name: req.params.tag_name,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});


module.exports = router;
