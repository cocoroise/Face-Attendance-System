import schoolController from '../controllers/SchoolController'
export default async router => {
  router
    .get('/api/school', schoolController.getSchool)
    // college
    .get('/api/allCollege', schoolController.getAllCollege)
    .post('/api/college', schoolController.addCollegeById)
    .get('/api/college', schoolController.getCollegeById)
    .patch('/api/college', schoolController.updateCollege)
    .delete('/api/college', schoolController.deleteCollege)
    // course
    .get('/api/allCourse', schoolController.getAllCourse)
    .get('/api/course', schoolController.getCourseById)
    .post('/api/course', schoolController.addCourse)
    .patch('/api/course', schoolController.updateCourse)
    .delete('/api/course', schoolController.deleteCourse)
    // major
    .get('/api/allMajor', schoolController.getMajor)
    .get('/api/major', schoolController.getMajorById)
    .post('/api/major', schoolController.addMajor)
    .patch('/api/major', schoolController.updateMajor)
    .delete('/api/major', schoolController.deleteMajor)
  return router
}
