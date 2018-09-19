var expect=require('expect');

var {isRealString}=require('./validation');


describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    var res=isRealString(98);
    expect(res).toBe(false);
  });
  it('should reject with only string', () => {
    var res=isRealString('    ');
    expect(res).toBe(false);
  });
  it('should allow string with non-space character', () => {
    var res=isRealString('dara');
    expect(res).toBe(true);
  });
});
