// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'deals';
const Deal = require('../models/Deal');
const User = require('../models/User');


exports.index = async (req, res) => {
  try {
    const deals = await Deal
      .find()
      .populate('user')
      .sort({createdAt: 'desc'});

    res.status(200).json(deals);
  } catch (error) {
    res.status(400).json({message: 'There is an issue while fetching the deals', error});
  }
};

exports.show = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate('user');
    res.status(200).json(deal);
    
  } catch (error) {
    res.status(400).json({message: "There was an error displaying this deal"});
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Deal'
  });
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const deal = await Deal.create({user: user._id, ...req.body});

    res.status(200).json(deal);
  } catch (error) {
    res.status(400).json({message: "There was an error creating this deal"});
  }
};

exports.edit = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: deal.title,
      formData: deal
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this deal: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    let deal = await Deal
      .findOne({user: user._id, _id: req.body.id});
    
    if (!deal) throw new Error('Deal could not be found');
    
    const attributes = {user: user._id, ...req.body};
    await Deal.validate(attributes);   

    await Deal.updateOne({_id: req.body.id, user: user._id}, {...req.body});

    res.status(200).json(deal);
  } catch (error) {
    res.status(400).json({message: `There was an error while updating this deal`});
  }
};

exports.delete = async (req, res) => {
  try {
    await Deal.deleteOne({_id: req.body.id});
    res.status(200).json({message: "Deleted!"});
  } catch (error) {
    res.status(400).json({message: "There is an issue while deleting this deal"});
  }
};