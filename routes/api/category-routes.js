const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categoriesData = await Category.findAll({
            include: [Product],
        });
        console.log(categoriesData);
        res.status(200).json(categoriesData);
    } catch (err) {
        console.log(err);
        res.status(504).json(err);
    }
});

router.get("/:id", async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const categoriesData = await Category.findByPk(req.params.id, {
            include: [Product],
        });
        console.log(categoriesData);
        res.status(200).json(categoriesData);
    } catch (err) {
        console.log(err);
        res.status(504).json(err);
    }
});

router.post("/", (req, res) => {
    // create a new category
    Category.create({
        id: req.body.id,
        category_name: req.body.category_name,
    })
    .then((newCategory) =>{
      res.json(newCategory);
    })
    .catch((err) =>{
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
    // update a category by its `id` value
    Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name,
      },
      {
        where: {
          isbn: req.params.isbn,
        },
      }
    )
      .then((updatedCategory) => {
        // Sends the updated category as a json response
        res.json(updatedCategory);
      })
      .catch((err) => res.json(err));
  });


router.delete("/:id",  (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
      where: {
        category_name:req.params.category_name,
      },
    })
      .then((deletedCategory) => {
        res.json(deletedCategory);
      })
      .catch((err) => res.json(err))
});

module.exports = router;
