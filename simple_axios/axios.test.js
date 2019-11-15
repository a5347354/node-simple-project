//使用政府公開資料-澎湖縣電動機車充電處英文版
const axios = require('axios');
var axiosInstance = axios.create({
  baseURL: 'http://opendataap2.penghu.gov.tw'
  // timeout: 1000,
});

test('Testing Success', async () => {
  const res = await axiosInstance.get('/./resource/files/2018-11-20/e2fb8d6f733dee2cce61a09f00e523f5.json',axiosInstance);
  expect(res.status).toBe(200);
  expect(res.data[0].Township).toBe('Makung City');
  expect(typeof res.data[0].Township).toBe('string');
});



test('Testing Fail', async () => {
  const res = await axiosInstance.get('/./resource/files/2018-11-20/e2fb8d6f733dee2cce61a09f00e523f5.json',axiosInstance);
  expect(res.status).toBe(200);
  expect(res.data[0].Township).toBe('Makung City');
  expect(typeof res.data[0].Township).toBe('int');
});
