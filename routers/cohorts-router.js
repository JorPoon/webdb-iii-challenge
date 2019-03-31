const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    },
}

const db = knex(knexConfig);

router.get('/', (req,res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err =>{
            res.status(500).json(err)
        });
});

router.get('/:id', (req,res) => {
    const cohortId = req.params.id

    db('cohorts')
        .where({id: cohortId})
        .first()
        .then(cohort => {
            res.status(200).json(cohort);
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.post('/', (req,res) => {
    db('cohorts')
        .insert(req.body)
        .then(ids => {
            const id =ids[0];
            db('cohorts')
                .where({id})
                .first()
                .then(cohort => {
                    res.status(200).json(cohort);
                });              
        })
        .catch(err => {
            res.status(500).json(error);
        });
});

router.put('/:id', (req, res) => {
    db('cohorts')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if (count > 0 ) {
                res.status(200).json(count)
            } else {
                res.status(404).json({message: 'Cohort not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.delete('/:id', (req, res) => {
    db('cohorts')
        .where({id: req.params.id})
        .del()
        .then(count => {
            if(count > 0) {
                res.status(200).end();
            } else {
                res.status(404).json({message: 'Cohort not found'})
            }
        }) 
        .catch( err => {
            res.status(500).json(err)
        });
});



module.exports = router;