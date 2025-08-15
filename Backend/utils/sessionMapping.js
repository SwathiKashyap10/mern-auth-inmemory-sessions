const sessionIdToUserMap = new Map();

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}

function deleteUser(sessionId) {
  return sessionIdToUserMap.delete(sessionId);
}

module.exports = {setUser,getUser,deleteUser};