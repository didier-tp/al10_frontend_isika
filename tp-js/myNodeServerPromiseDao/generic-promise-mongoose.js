//V1 (essentiel ok) - peaufinable

function findByIdWithModel(id,PersistentModel) {
    return new Promise( (resolve,reject)=>{
      PersistentModel.findById( id ,
          function(err,entity){
               if(err) reject({error:'can not find by id' , cause : err});
               else if(entity == null) reject({error:'NOT_FOUND' , 
                                               reason : "no entity found with id="+id});
               else resolve(entity);
          });
    });
  }
  
  
  
  //exemple of criteria : {} or { unitPrice: { $gte: 25 } } or ...
  function findByCriteriaWithModel(criteria,PersistentModel) {
    return new Promise( (resolve,reject)=>{
      PersistentModel.find( criteria ,
                         function(err,entities){
                          if(err) reject({error:'can not find' , cause :err });
                          else  resolve(entities);
                        });
    });
  }
  
  function saveWithModel(entity,PersistentModel) {
    return new Promise( (resolve,reject)=>{
      let  persistentEntity = new PersistentModel(entity);
      persistentEntity.save( function(err,savedEntity){
                          if(err != null) reject(
                            {error : "cannot insert in database" , cause : err});
                          else {
                            entity.id = savedEntity.id;
                            resolve(entity);
                          }
                        });
    });
  }
  
  function updateOneWithModel(newValueOfEntityToUpdate,idOfEntityToUpdate,PersistentModel) {
    return new Promise( (resolve,reject)=>{
      const filter = { _id :  idOfEntityToUpdate };
      //console.log("filter of updateOne=" +JSON.stringify(filter));
      PersistentModel.updateOne(filter , newValueOfEntityToUpdate,
                         function(err,opResultObject){
                           console.log("opResultObject of updateOne=" +JSON.stringify(opResultObject))
                          if(err) reject({ error : "cannot updateOne " , cause :  err});
                          else if(opResultObject.matchedCount == 1)
                             resolve(newValueOfEntityToUpdate);
                          else reject({ error : "NOT_FOUND" , reason : "no entity to update with id=" + idOfEntityToUpdate });
                        });
    });
  }
  
  function deleteOneWithModel(idOfEntityToDelete,PersistentModel) {
    return new Promise( (resolve,reject)=>{
      const filter = { _id : idOfEntityToDelete };
      console.log("filter of deleteOne=" +JSON.stringify(filter));
      PersistentModel.deleteOne(filter ,
                         function(err,opResultObject){
                          console.log("opResultObject of deleteOne=" +JSON.stringify(opResultObject))
                          if(err) reject({ error : "cannot delete " , cause :  err});
                          else if(opResultObject.deletedCount == 1) resolve({ deletedId : idOfEntityToDelete });
                            else reject({ error : "NOT_FOUND" , reason : "no entity to delete with id=" + idOfEntityToDelete });
                        });
    });
  }

module.exports.findByIdWithModel = findByIdWithModel ;
module.exports.findByCriteriaWithModel = findByCriteriaWithModel ;
module.exports.saveWithModel = saveWithModel ;
module.exports.updateOneWithModel = updateOneWithModel ;
module.exports.deleteOneWithModel = deleteOneWithModel ;