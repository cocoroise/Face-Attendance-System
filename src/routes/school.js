import schoolController from '../controllers/SchoolController'
export default async router => {
    router
        // college
        .get('/api/allCollege', schoolController.getAllCollege)
        .get('/api/college', schoolController.getCollegeById)
        .post('/api/college', schoolController.addCollege)
        .patch('/api/college', schoolController.updateCollege)
        .delete('/api/college', schoolController.deleteCollege)
        // course
        .get('/api/allCourse', schoolController.getAllCourse)
        .get('/api/course', schoolController.getCourseById)
        .post('/api/course', schoolController.addCourse)
        .patch('/api/course', schoolController.updateCourse)
        .delete('/api/course', schoolController.deleteCourse)
        // major
        .get('/api/allMajor', schoolController.getAllMajor)
        .get('/api/major', schoolController.getMajorById)
        .post('/api/major', schoolController.addMajor)
        .patch('/api/major', schoolController.updateMajor)
        .delete('/api/major', schoolController.deleteMajor)
}
