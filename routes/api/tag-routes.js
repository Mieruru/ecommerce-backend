const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tag = await Tag.findAll({
      // be sure to include its associated Products
      include: [{ model: Product, through: ProductTag }]
    })
    res.status(200).json(tag)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one tag by its `id` value
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product, through: ProductTag }]
    })

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' })
      return
    }

    res.status(200).json(tag)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tag = await Tag.create(req.body)
    res.status(200).json(tag)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag by its `id` value
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!tag) {
      res.status(404).json({ message: 'No tag found' })
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
    // delete a tag by its `id` value
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!tag) {
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
