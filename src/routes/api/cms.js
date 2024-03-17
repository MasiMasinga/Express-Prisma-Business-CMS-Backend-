const express = require('express');
const cmsController = require('../../controllers/cms');
const router = express.Router();

const auth = require('../../middleware/auth');

router.post('/department', auth, cmsController.createDepartment);
router.put('/department/:id', auth, cmsController.updateDepartment);
router.delete('/department/:id', auth, cmsController.deleteDepartment);
router.get('/department', auth, cmsController.getDepartment);
router.get('/department/:id', auth, cmsController.getDepartments);

router.post('/employee', auth, cmsController.createEmployee);
router.put('/employee/:id', auth, cmsController.updateEmployee);
router.delete('/employee/:id', auth, cmsController.deleteEmployee);
router.get('/employee', auth, cmsController.getEmployee);
router.get('/employee/:id', auth, cmsController.getEmployees);

router.post('/role', auth, cmsController.createRole);
router.put('/role/:id', auth, cmsController.updateRole);
router.delete('/role/:id', auth, cmsController.deleteRole);
router.get('/role', auth, cmsController.getRole);
router.get('/role/:id', auth, cmsController.getRoles);

module.exports = router;