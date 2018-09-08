var expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
  it('should generate correct message',()=>{
    var from='Batman';
    var text='I am Batman';
    var message=generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,text});
  });
});
describe('generateLocationMessage',()=>{
  it('should generate correct location',()=>{
    var from='Dara';
    var latitude=1;
    var longitude=1;
    var url='https://www.google.com/maps?q=1,1';
    var message=generateLocationMessage(from,latitude,longitude);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,url});
  });
});
