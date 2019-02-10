import classController from '../controllers/ClassController'
export default async router => {
  router
    // class班级
    .get('/api/allClass', classController.getAllClass)
    .get('/api/class', classController.getClassById)
    .post('/api/class', classController.addClass)
    .patch('/api/class', classController.updateClass)
    .delete('/api/class', classController.deleteClass)
    // classtable上课表
    .get('/api/classtable', classController.getClasstableById)
    .post('/api/classtable', classController.addClasstable)
    .patch('/api/classtable', classController.updateClasstable)
    .delete('/api/classtable', classController.deleteClasstable)
    // classroom课室
    .get('/api/allClassroom', classController.getAllClassroom)
    .get('/api/classroom', classController.getClassroomById)
    .post('/api/classroom', classController.addClassroom)
    .delete('/api/classroom', classController.updateClassroom)
    .patch('/api/classroom', classController.deleteClassroom)
}
