const router = require("express").Router()
const Act = require('./helpers/actionModel')

//Routes
router.get("/", (req, res) => {
    Act.get().then(action => {
        res.status(200).json(action);
    })
    .catch((err) => {
        res.status(500).json({ message: "Oops! There was an error processing your Halloween action request!"});
    });
});

router.post("/", (req, res) => {
     Act
      .insert(req.body)
      .then(action => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({ message: "Oh no. Could not create Halloween action!" });
      });
  });

  router.put("/:id", (req, res) => {
    const changes = req.body;
    Act.update(req.params.id, changes)
    .then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Oops! We could not locate the requested Halloween action!' });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Could not update Halloween action!',
        });
    });
});

router.delete('/:id', (req, res) => {
    Act.remove(req.params.id)
        .then(action => {
            if (action > 0) {
                res.status(200).json({ message: 'Halloween action deleted!' });
            } else {
                res.status(404).json({ message: 'Oops! We could not locate the requested Halloween action!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not delete Halloween action!',
            });
        });
});


module.exports = router;