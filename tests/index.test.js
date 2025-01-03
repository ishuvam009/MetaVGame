const axios2 = require('axios');

const BACKEND_URL = "http://localhost:3000";

const axios = {
    post: async (...args) => {
        try {
            const res = await axios2.post(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    get: async (...args) => {
        try {
            const res = await axios2.get(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    put: async (...args) => {
        try {
            const res = await axios2.put(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    delete: async (...args) => {
        try {
            const res = await axios2.delete(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
}

//All routes

describe("Authentication", () => {

    test("User is able to sign up only once", async () => {
        const username = `kirat-${Math.random()}@100x.com`;
        const password = "123456";

        // Log request payloads and responses
        console.log("Signup 1 Request", { username, password });
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });
        console.log("Signup 1 Response", response.data);

        expect(response.status).toBe(200); // Check if backend accepts the first signup

        console.log("Signup 2 Request", { username, password });
        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });
        console.log("Signup 2 Response", updatedResponse.data);

        expect(updatedResponse.status).toBe(400); // Ensure second signup fails
    });

    test('Signup request fails if the username is empty', async () => {
        const username = `kirat-${Math.random()}` // kirat-0.12312313
        const password = "123456"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            password
        })

        expect(response.status).toBe(400)
    })

    test('Signin succeeds if the username and password are correct', async() => {
        const username = `kirat-${Math.random()}@100x.com`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });

        expect(response.status).toBe(200)
        expect(response.data.token).toBeDefined()
        
    })

    test('Signin fails if the username and password are incorrect', async() => {
        const username = `kirat-${Math.random()}@100x.com`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            role: "admin"
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: "WrongUsername",
            password
        })

        expect(response.status).toBe(403)
    })
});


// describe("Authentication", () => {

//     test('User is able to signup only once.',async() => {
//         const username = "Shuvam"+Math.random();
//         const password = "1234567";

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type: "admin"
//         });

//         expect(response.statusCode).toBe(200);

//         const upDatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type: "admin"
//         })

//         expect(upDatedResponse.statusCode).toBE(400);
//     });

//     test('User signup fails if username is empty.', async() => {
//         const username = `shuvam-${Math.randm()}`;
//         const password = "123456";

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             password
//         });
//         expect(response.statusCode).toBe(400);
//     });

//     test('Signin sucessced if username and password is correct.', async() => {
//         const username = `shuvam${Math.random()}`;
//         const password = "123456";

//         //assuming this username and password is never used/ not present in the atabase
//         axios.post(`${BACKEND_URL}/api/v1/signup`)

//         const response = await axios.post(`${BACKEND_URL/api/v1/signup}`,{
//             username,
//             password
//         });

//         expect(response.statusCode).toBe(200);
//         expect(response.body.token).toBeDefined();
//     });

//     test('Signin fails if either username or password is incorrect.', async() =>{
//         const username = `shuvam-${Math.random()}`;
//         const password = "123456";

//         axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password
//         });

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username: "Sjihbb",
//             password
//         })

//         expect(response.statusCode).toBe(403);
//     });

// });

// describe("User information endpoint", () => {
//     beforeAll( () =>{
//         console.log('Before all it was called.');
//     })
//     tset()
// })