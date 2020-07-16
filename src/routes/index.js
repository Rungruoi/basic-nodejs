const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
const { sendWelcome } = require('../mails/config')
const  multer  = require('multer')
const path = require('path')

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './src/public/image/')
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

router.get('/avatar/:id',  async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  res.render('avatar', {employee})
})

router.post('/avatar/:id', upload.single('avatar'), async(req, res, next) => {
  const { id } = req.params;
  await Employee.update({_id: id}, {avatar: req.file.filename});
  res.redirect('back');
})

router.get('/', async (req, res) => {
  const resPerPage = 5; // results per page
  const page = req.query.page || 1; // Page 

  if(req.query.name) {
    let name = req.query.name
    const employees = await Employee.find({'name': {'$regex': name}}).skip((resPerPage * page) - resPerPage)
    .limit(resPerPage)
    const numberOfEmployee = await Employee.count({'name': {'$regex': name}});
    res.render('index', {
      employees: employees,
      currentPage: page, 
      pages: Math.ceil (numberOfEmployee / resPerPage), 
      numOfResults: numberOfEmployee
    });
  } else {
    const employees = await Employee.find().skip((resPerPage * page) - resPerPage)
    .limit(resPerPage)
    const numberOfEmployee = await Employee.count()
    
    res.render('index', {
      employees: employees,
      currentPage: page, 
      pages: Math.ceil (numberOfEmployee / resPerPage), 
      numOfResults: numberOfEmployee
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
