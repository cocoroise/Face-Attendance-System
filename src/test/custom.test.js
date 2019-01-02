import custom from '../controllers/CustomController'
import iconv from 'iconv-lite'
import encodings from 'iconv-lite/encodings'
iconv.encodings = encodings
// test('getUser', async () => {
//     let res = await custom.getUserById({
//         query: {
//             id: 1000
//         }
//     })
//     expect(res).toBeTruthy()
// })

// test('getUsers', async () => {
//     let res = await custom.getAllUsers()
//     expect(res).toBeTruthy()
// })

// test('Create', async () => {
//   let res = await custom.findOrCreateUserById({
//     request: {
//       body: {
//         user_id: 1015,
//         password: 1015,
//         type: 2
//       }
//     }
//   })
//   expect(res).toBeTruthy()
// })

test('find', async () => {
    let res = await custom.findOrCreateUserById({
        request: {
            body: {
                user_id: 1015
            }
        }
    })
    expect(res).toBeTruthy()
})

// test('update', async () => {
//     let res = await custom.updateUser({
//         request: {
//             body: {
//                 user_id: 1001,
//                 password: 1001
//             }
//         }
//     })
//     expect(res).toBeTruthy()
// })
