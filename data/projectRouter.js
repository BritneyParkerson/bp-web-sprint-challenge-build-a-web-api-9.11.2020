const express = require("express")
const router = express.Router()
const Pro = require('./helpers/projectModel')


router.get("/", (req, res) => {
    Pro.get().then((project) => {
        res.status(200).json(project);
    })
    .catch((err) => {
        res.status(500).json({ message: "Oops! could not retrieve Halloween projects!"});
    });
});


router.post("/", (req, res) => {
    Pro
      .insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch((err) => {
        res.status(500).json({ message: "Oh no! Could not create Halloween project!"});
      });
  });

  router.put('/:id', (req, res) => {
    const changes = req.body;
    Pro.update(req.params.id, changes)
        .then(project => {
            if (project) { 
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Oops! Could not locate Halloween project!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Oops! Could not update Halloween project!',
            });
        });
});

  router.delete("/:id", (req, res) => {
    Pro.remove(req.params.id)
    .then(project => {
        if (project > 0) {
        res.status(200).json({ message: 'Deleted id' });
        } else{
            res.status(404).json({ message: 'Oops! Could not locate Halloween project!'})
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Oops! Could not delete Halloween project!" });
      });
  });

  router.get('/:id', (req, res) => {
    Pro.getProjectActions(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Oops! Could not locate Halloween project!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'There was a problem completing your Halloween project request!',
            });
        });
});



module.exports = router;