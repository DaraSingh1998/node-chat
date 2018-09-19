const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
  var users;

  beforeEach(()=>{
    users=new Users();
    users.users=[{
      id:'1',
      name:'Dara',
      room:'123'
    },
    {
      id:'2',
      name:'Dara2',
      room:'1234'
    },
    {
      id:'3',
      name:'Dara3',
      room:'123'
    }]
  });

  it('Should add new users',()=>{
    var users= new Users();
    var user={
      id:'123',
      name:'Dara',
      room:'abc'
    };
    var resUser=users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });
  it('Should return users of room 123',()=>{
    var resArray=users.getUserList('123');
    expect(resArray).toEqual(['Dara','Dara3']);
  });
  it('Should return user with id 1',()=>{
    var resUser=users.getUser('1');
    expect(resUser.id).toBe('1');
  });
  it('Should return user with id 1',()=>{
    var resUser=users.removeUser('1');
    expect(resUser.id).toBe('1');
    expect(users.users.length).toBe(2);
  });
});
