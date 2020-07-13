const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
const { sendWelcome } = require('../mails/config')

router.get('/', async (req, res) => {

  if(req.query.name) {
    let name = req.query.name
    const employees = await Employee.find({'name': {'$regex': name}});
    res.render('index', {
      employees,
    });
  } else {
    const employees = await Employee.find();
    res.render('index', {
      employees,
    });
   }
});

router.get('/create', async (req, res) => {
  res.render('create');
})

router.post('/add', async (req, res, next) => {
  const employee = new Employee(req.body);
  sendWelcome(req.body.email, req.body.name)
  await employee.save();
  res.redirect('/');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const employee = await Employee.findById(id);
  employee.status = !employee.status;
  await employee.save();
  res.redirect('/');
});


router.get('/edit/:id', async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  console.log(employee)
  res.render('edit', { employee });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Employee.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Employee.remove({_id: id});
  res.redirect('/');
});


module.exports = router;
