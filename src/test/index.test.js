import user from '../controllers/UserController'
import iconv from 'iconv-lite'
import encodings from 'iconv-lite/encodings'
iconv.encodings = encodings

test('add and check', async () => {
    let res = await user.getUser({ name: 'marry' })
    expect(res).toBeTruthy()
})

// test('getUsers', async() => {
//     let res = await user.getUsers()
//     expect(res).toBeTruthy()
// })
