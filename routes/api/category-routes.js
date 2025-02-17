const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const category = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    })
    res.status(200).json(category)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    })

    if (!category) {
      res.status(404).json({ message: 'Category not found' })
      return
    }

    res.status(200).json(category)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const category = await Category.create(req.body)
    res.status(200).json(category)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!category) {
      res.status(404).json({ message: 'No category found' })
      return
    }

    res.status(200).json({ message: 'Update successful' })
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!category) {
      res.status(404).json({ message: 'ID not found' })
      return
    }

    res.status(200).json({ message: 'Delete successful' })
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
