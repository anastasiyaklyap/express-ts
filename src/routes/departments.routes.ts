import express from 'express'
import * as DepController from './../controllers/departments.controller'

const router = express.Router()

router.get('/departments', DepController.getAllDepartments)
router.get('/departments/:id', DepController.getDepartmentById)
router.post('/departments', DepController.createDepartment)
router.put('/departments/:id', DepController.updateDepartment)
router.delete('/departments/:id', DepController.deleteDepartment)

export default router
