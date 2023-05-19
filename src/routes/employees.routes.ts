import express from 'express'
import * as EmployeeController from './../controllers/employees.controller'

const router = express.Router()

router.get('/employees', EmployeeController.getAllEmployees)
router.get('/employees/:id', EmployeeController.getEmployeeById)
router.post('/employees', EmployeeController.createEmployee)
router.put('/employees/:id', EmployeeController.updateEmployee)
router.delete('/employees/:id', EmployeeController.deleteEmployee)

export default router
