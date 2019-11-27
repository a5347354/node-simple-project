const axios = require('axios');

test('Timeout of 2ms exceeded', async () => {
  const res = await axios.post("http://httpbin.org/post", {name:"masnun"}, {
    timeout: 2
  })
  .catch(error => {
    expect(error.message).toBe("timeout of 2ms exceeded");
  })
});