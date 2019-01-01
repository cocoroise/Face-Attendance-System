// const common = require('../controllers/ComController')
import iconv from 'iconv-lite'
import encodings from 'iconv-lite/encodings'
iconv.encodings = encodings

test('add and check', async () => {
    let res = await common.userController.getAll({
        name: '小明'
    })
    expect(res).toBeTruthy()
})

// test('getUsers', async() => {
//     let res = await user.getUsers()
//     expect(res).toBeTruthy()
// })
