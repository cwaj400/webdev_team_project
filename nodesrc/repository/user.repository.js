const userModel = require('../model/user.model');

findAllUsers = () => {
  return userModel.find();
}

findUser = (id) => {
  return userModel.findById(id);
}

findUserByNameAndPassword = (username, password) => {
  return userModel.findOne({username: username, password: password});
}

saveUser = (user) => {
  return userModel(user).save();
}

upsertUser = (user) => {
  return userModel.findByIdAndUpdate(user._id, user, {upsert:true,new:true}).exec();
}

updateUser = (id, user) => {
  return userModel.findByIdAndUpdate(id, 
                                     {$set: {email: user.email}}, 
                                     {new:true}).exec();
}

updateUserPassword = (id, password) => {
  return userModel.findByIdAndUpdate(id, 
                                     {$set: {password: password}}, 
                                     {new:true}).exec();
}

addUserFollowing = (id, otherUserId) => {
  return userModel.findByIdAndUpdate(id, 
                                     {$push: {follows: otherUserId}}, 
                                     {new:true}).exec();
}

removeUserFollowing = (id, otherUserId) => {
  return userModel.findByIdAndUpdate(id, 
                                     {$pull: {follows: otherUserId}}, 
                                     {new:true}).exec();
}

saveUsers = (users) => {
  users.forEach((user) => {
    saveUser(user).then((err) => {if (err) {throw JSON.stringify(err);}});
  });
}

upsertUsers = (users) => {
  users.forEach((user) => {
    upsertUser(user).then((err) => {});
  });
}

searchUsersByName = (q) => {
  return userModel.find({username: new RegExp(q, "i")});
}

module.exports = {
  findAllUsers,
  findUser, 
  findUserByNameAndPassword,
  saveUser,
  saveUsers,
  upsertUser,
  updateUser,
  updateUserPassword,
  upsertUsers,
  searchUsersByName,
  addUserFollowing,
  removeUserFollowing
}
