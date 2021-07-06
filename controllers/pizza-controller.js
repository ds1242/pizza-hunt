const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json({message: 'error finding all pizzas' });
            });
    },

    // get on Pizza by id

    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // if no pizza found send a 404
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                res.status(400).json({ message: 'error when attempting to find a single pizza' });
            });
    },

    // createPizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaDataCreate => res.json(dbPizzaDataCreate))
            .catch(err => res.status(400).json({ message: 'Error trying to create a new pizza' }));
    },

    // update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaDelete => {
                if(!dbPizzaDelete) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(dbPizzaDelete);
            })
            .catch(err => res.status(400).json({ message: 'An error occurred when trying to delete the data' }));
    }
};

module.exports = pizzaController;