import classController from '../controllers/ClassController'
export default async router => {
  router
    // class班级
    .get('/api/allClass', classController.getAllClass)
    .get('/api/getClass', classController.getClassById)
    .post('/api/addClass', classController.addClass)
    .post('/api/updateClass', classController.updateClass)
    .get('/api/deleteClass', classController.deleteClass)
    // classtable上课表
    .get('/api/allClasstable', classController.getAllClasstable)
    .get('/api/getClasstable', classController.getClasstableById)
    .post('/api/addClasstable', classController.addClasstable)
    .post('/api/updateClasstable', classController.updateClasstable)
    .get('/api/deleteClasstable', classController.deleteClasstable)
    // classroom课室
    .get('/api/allClassroom', classController.getAllClassroom)
    .get('/api/getClassroom', classController.getClassroomById)
    .post('/api/addClassroom', classController.addClassroom)
    .post('/api/updateClassroom', classController.updateClassroom)
    .get('/api/deleteClassroom', classController.deleteClassroom)
}
