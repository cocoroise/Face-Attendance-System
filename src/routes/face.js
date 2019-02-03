import faceController from '../controllers/FaceController'
export default async router => {
  router
    // 用户
    .post('/api/verifyFace', faceController.VerifyFace)
    .post('/api/addFace', faceController.addFace)
    .post('/api/updateFace', faceController.updateFace)
    .post('/api/deleteFace', faceController.deleteFace)
}
