class PessoaService {



  grava(contato) {
    if (contato.userName == '') {
      throw 'Informe um nome';
    } else if (contato.userMail == '') {
      throw 'Informe um email';
    } else if (contato.userPhone == '') {
      throw 'Informe um telefone';
    }
    else {
      return new Promise(function (resolve, reject) {
        var pers = new Person();
        pers.inserir(contato).then(function (result) {
          resolve(result);
        }, function (err) {
          reject(Error('Erro :' + err));
        });

      });
    };
  }


  update(contato){
    return new Promise(function (resolve, reject) {
      var pers = new Person();
      pers.editar(contato).then(function (result) {
        resolve(result);
      }, function (err) {
        reject(err);
      });

    });
  }

  updateFoto(id,foto){
    return new Promise(function (resolve, reject) {
      
      var pers = new Person();
      
      pers.editarFoto(id,foto).then(function (result) {
        resolve(result);
      }, function (err) {
        reject(Error(err));
      });

    });
  }

  deletar(contato){
    return new Promise(function (resolve, reject) {
      var pers = new Person();
      pers.excluir(contato).then(function (result) {
        resolve(result);
      }, function (err) {
        reject(Error('Erro :' + err));
      });

    });
  }

  listar() {
    
    return new Promise(function (resolve, reject) {
      var pers = new Person();

      pers.listar().then(function (result) {
        resolve( result);
      }, function (err) {
        reject(Error('Erro :' + err));
      });
    });
  }
}