class Person {
  inserir(contato) {
    return new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
        tx.executeSql('INSERT INTO Tab_Pessoa (nome,email,telefone) VALUES (?,?,?)', [contato.userName, contato.userMail, contato.userPhone]);
      }, function (error) {
        reject(Error('Falha na gravação'));
      }, function () {
        resolve('Gravado com sucesso!');
      });
    });

  };

  editar(contato) {
    return new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
        tx.executeSql('Update Tab_Pessoa set nome = ?, email = ?, telefone = ? where id =?', [contato.userName, contato.userMail, contato.userPhone,contato.id]);
      }, function (error) {
        reject(Error('Falha na gravação : ' + error));
      }, function () {
        resolve('Editado com sucesso!');
      });
    });
  }


  editarFoto(id,foto){
    
    return new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
        tx.executeSql('Update Tab_Pessoa set foto = ? where id =?', [foto,id]);
      }, function (error) {
        reject(Error('Falha na gravação'));
      }, function () {
        resolve('Foto gravada com sucesso!');
      });
    });
  }
  excluir(contato) {
    return new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
        tx.executeSql('delete from  Tab_Pessoa where id =?', [contato.getId()]);
      }, function (error) {
        reject(Error('Falha na gravação'));
      }, function () {
        resolve('Deletado com sucesso!');
      });
    });
  }

  listar() {
    return new Promise(function (resolve, reject) {
      var users = [];
     

      db.transaction(function (tx) {

        tx.executeSql('SELECT * FROM Tab_Pessoa;', [], function (tx, res) {
          for (var i = 0; i < res.rows.length; i++) {
            var pessoa = new Pessoa();
            pessoa.setNome(res.rows.item(i).nome);
            pessoa.setEmail(res.rows.item(i).email);
            pessoa.setTelefone(res.rows.item(i).telefone);
            pessoa.setId(res.rows.item(i).id);
            pessoa.setFoto(res.rows.item(i).foto);
            users.push(pessoa);
           
          }
        });
      }, function (error) {
        reject(Error('Falha na gravação' + error));
      }, function () {
        resolve( users);
      });
    });
    }

}