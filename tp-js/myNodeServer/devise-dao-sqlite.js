var sqlite3 = require('sqlite3').verbose();

function withDbConnection(callbackWithDb){
  var db = new sqlite3.Database('mydb.db');
  callbackWithDb(db);
  db.close();
}

function init_devise_db(){
withDbConnection(function(db) {
    db.serialize(function() {

      // Devise_ID INTEGER PRIMARY KEY  not used here (no autoincr)

      db.run("CREATE TABLE if not exists devise (code VARCHAR(12) PRIMARY KEY, nom VARCHAR(64) NOT NULL , change DOUBLE)");
      
      db.run("DELETE FROM devise");
      
      var pst = db.prepare("INSERT INTO DEVISE(code,nom,change) VALUES (?,?,?)");
      pst.run(["EUR" , "Euro" , 1.0]);
      pst.run(["USD" , "Dollar" , 1.1]);
      pst.run(["GBP" , "Livre" , 0.9]);
      pst.run(["JPY" , "Yen" , 123.0]);
      pst.finalize();

      db.each("SELECT code,nom,change FROM devise", function(err, row) {
          console.log(JSON.stringify(row));
      });
    });
  }); //end of withDbConnection()
}

function insert_new_devise(devise , cb_with_err_and_lastId){
  withDbConnection(function(db) {
    var pst = db.prepare("INSERT INTO devise (code, nom, change) VALUES(?,?,?)");
    pst.run( [ devise.code, devise.nom, devise.change ], function(err) {
            cb_with_err_and_lastId(err,this.lastID)
        });
    pst.finalize();
  }); //end of withDbConnection()
}

function update_devise(devise , cb_with_err_and_nbChanges){
  withDbConnection(function(db) {
    var pst = db.prepare("UPDATE devise SET nom=? , change=? WHERE code=?");
    pst.run( [ devise.nom, devise.change ,devise.code ], function(err) {
            cb_with_err_and_nbChanges(err,this.changes)
        });
    pst.finalize();
  }); //end of withDbConnection()
}

function get_devises_by_WhereClause(whereClause , cb_with_err_or_res){
  withDbConnection(function(db) {
    let sql = "SELECT code,nom,change FROM devise " + whereClause;
    db.all(sql, [], function(err, rows) {
            //console.log(JSON.stringify(rows));
            cb_with_err_or_res(err,rows)
        });
  }); //end of withDbConnection()
}

function get_devise_by_code(code , cb_with_err_or_res){
  withDbConnection(function(db) {
    let sql = "SELECT code,nom,change FROM devise WHERE code=?";
    db.get(sql, code, function(err, row) {
            //console.log(JSON.stringify(row));
            cb_with_err_or_res(err,row)
        });
  }); //end of withDbConnection()
}

function delete_devise_by_code(code , cb_with_err_and_nbChanges){
  withDbConnection(function(db) {
    let sql = "DELETE FROM devise WHERE code=?";
    db.run(sql, code, function(err) {
            cb_with_err_and_nbChanges(err,this.changes)
        });
  }); //end of withDbConnection()
}


module.exports.init_devise_db = init_devise_db;
module.exports.get_devises_by_WhereClause = get_devises_by_WhereClause;
module.exports.get_devise_by_code = get_devise_by_code ;
module.exports.delete_devise_by_code = delete_devise_by_code ;
module.exports.insert_new_devise = insert_new_devise;
module.exports.update_devise = update_devise;