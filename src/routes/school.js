import schoolController from '../controllers/SchoolController'
export default async router => {
    router
        // college
        .get('/api/allCollege', schoolController.getAllCollege)
        .get('/api/getCollege', schoolController.getCollegeById)
        .post('/api/addCollege', schoolController.addCollege)
        .post('/api/updateCollege', schoolController.updateCollege)
        .get('/api/deleteCollege', schoolController.deleteCollege)
        // course
        .get('/api/allCourse', schoolController.getAllCourse)
        .get('/api/getCourse', schoolController.getCourseById)
        .post('/api/addCourse', schoolController.addCourse)
        .post('/api/updateCourse', schoolController.updateCourse)
        .get('/api/deleteCourse', schoolController.deleteCourse)
        // major
        .get('/api/allMajor', schoolController.getAllMajor)
        .get('/api/getMajor', schoolController.getMajorById)
        .post('/api/addMajor', schoolController.addMajor)
        .post('/api/updateMajor', schoolController.updateMajor)
        .get('/api/deleteMajor', schoolController.deleteMajor)
}
