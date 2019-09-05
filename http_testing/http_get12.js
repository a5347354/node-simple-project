const request = require('./http_get');

it('Simple Testing',() => {
  // resqu();
  // expect.assertions(1);
  return expect('Paul').toEqual('Paul');
});



  it('Simple Testing',() => {
    // resqu();
    // console.log(request.modifyTime)
    console.log(request())
    return expect(request).toBeDefined()
  });
