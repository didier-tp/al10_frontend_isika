var sqlite3 = require('sqlite3').verbose();

function withDbConnection(callbackWithDb){
  var db = new sqlite3.Database('mydb.db');
  callbackWithDb(db);
  db.close();
}

function init_produit_db(){
withDbConnection(function(db) {
    db.serialize(function() {

      // Produit with pk = code (integer)
      //nb , the column with INTEGER PRIMARY KEY is a alias 
      //    for rowid implicit autoincr colomn of any slqlite table
      // do not use AUTOINCREMENT keyword with sqlite (not useful)

      db.run("CREATE TABLE if not exists produit (code INTEGER PRIMARY KEY , nom VARCHAR(64) NOT NULL , prix DOUBLE)");
      
      db.run("DELETE FROM produit");
      
      var pst = db.prepare("INSERT INTO produit(code,nom,prix) VALUES (?,?,?)");
      pst.run([1 , "Classeur" , 4.0]);
      pst.run([2 , "Cahier" , 2.1]);
      pst.run([3 , "Colle" , 2.4]);
      pst.run([4 , "Stylo" , 1.9]);
      pst.finalize();

      db.each("SELECT code,nom,prix FROM produit", function(err, row) {
          console.log(JSON.stringify(row));
      });
    });
  }); //end of withDbConnection()
}

function insert_new_produit(produit , cb_with_err_and_lastId){
  withDbConnection(function(db) {
    var pst = db.prepare("INSERT INTO produit (code, nom, prix) VALUES(?,?,?)");
    pst.run( [ null, produit.nom, produit.prix ], function(err) {
            cb_with_err_and_lastId(err,this.lastID)
        });
    pst.finalize();
  }); //end of withDbConnection()
}

function update_produit(produit , cb_with_err_and_nbChanges){
  withDbConnection(function(db) {
    var pst = db.prepare("UPDATE produit SET nom=? , prix=? WHERE code=?");
    pst.run( [ produit.nom, produit.prix ,produit.code ], function(err) {
              cb_with_err_and_nbChanges(err,this.changes)
        });
    pst.finalize();
  }); //end of withDbConnection()
}

function get_produits_by_WhereClause(whereClause , cb_with_err_or_res){
  withDbConnection(function(db) {
    let sql = "SELECT code,nom,prix FROM produit " + whereClause;
    db.all(sql, [], function(err, rows) {
            //console.log(JSON.stringify(rows));
            cb_with_err_or_res(err,rows)
        });
  }); //end of withDbConnection()
}

function get_produit_by_code(code , cb_with_err_or_res){
  withDbConnection(function(db) {
    let sql = "SELECT code,nom,prix FROM produit WHERE code=?";
    db.get(sql, code, function(err, row) {
            //console.log(JSON.stringify(row));
            cb_with_err_or_res(err,row)
        });
  }); //end of withDbConnection()
}

function delete_produit_by_code(code , cb_with_err_and_nbChanges){
  withDbConnection(function(db) {
    let sql = "DELETE FROM produit WHERE code=?";
    db.run(sql, code, function(err) {
             cb_with_err_and_nbChanges(err,this.changes)
        });
  }); //end of withDbConnection()
}


module.exports.init_produit_db = init_produit_db;
module.exports.get_produits_by_WhereClause = get_produits_by_WhereClause;
module.exports.get_produit_by_code = get_produit_by_code ;
module.exports.delete_produit_by_code = delete_produit_by_code ;
module.exports.insert_new_produit = insert_new_produit;
module.exports.update_produit = update_produit;