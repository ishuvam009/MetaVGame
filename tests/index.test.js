const axios = require('axios');

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

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`);
        expect(response.statusCode).toBe(400);
    });

    test('Signin sucessced if username and password is correct.', async() => {
        const username = `shuvam${Math.random()}`;
        const password = "123456";

        const response = await axios.post(`${BACKEND_URL/api/v1/signup}`,{
            username,
            password
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    })
});