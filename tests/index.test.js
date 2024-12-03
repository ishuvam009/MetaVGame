const axios = require('axios');
const { beforeAll } = require('jest-circus');
const { describe } = require('yargs');

const BACKEND_URL = "http://localhost:4000";

describe("Authentication", () => {

    test('User is able to signup only once.',async() => {
        const username = "Shuvam"+Math.random();
        const password = "1234567";

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type: "admin"
        });

        expect(response.statusCode).toBe(200);

        const upDatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type: "admin"
        })

        expect(upDatedResponse.statusCode).toBE(400);
    });

    test('User signup fails if username is empty.', async() => {
        const username = `shuvam-${Math.randm()}`;
        const password = "123456";

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            password
        });
        expect(response.statusCode).toBe(400);
    });

    test('Signin sucessced if username and password is correct.', async() => {
        const username = `shuvam${Math.random()}`;
        const password = "123456";

        //assuming this username and password is never used/ not present in the atabase
        axios.post(`${BACKEND_URL}/api/v1/signup`)

        const response = await axios.post(`${BACKEND_URL/api/v1/signup}`,{
            username,
            password
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test('Signin fails if either username or password is incorrect.', async() =>{
        const username = `shuvam-${Math.random()}`;
        const password = "123456";

        axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username: "Sjihbb",
            password
        })

        expect(response.statusCode).toBe(403);
    });

});

describe("User information endpoint", () => {
    beforeAll( () =>{
        console.log('Before all it was called.');
    })
    tset()
})