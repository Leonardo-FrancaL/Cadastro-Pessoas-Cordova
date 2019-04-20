
var users = [];

var pic = './img/download.jpg';

var editar = 0;

function cadastrar() {
    var cadastro = MobileUI.objectByForm('formulario');

    try {
        // var 
        if (editar == 0) {
            var pessoa = new Pessoa();
            pessoa.setNome(cadastro.userName);
            pessoa.setEmail(cadastro.userMail);
            pessoa.setTelefone(cadastro.userPhone);
            // pessoa.setFoto(pic)
            users.push(pessoa);
            var service = new PessoaService();

            service.grava(cadastro).then(function (result) {
                alert(result);
                MobileUI.clearForm('formulario');

            }, function (err) {
                alert(err);
            });
        } else {
            var cadastro = MobileUI.objectByForm('formulario');
            var service = new PessoaService();

            service.update(cadastro).then(function (result) {
                alert(result);
                MobileUI.clearForm('formulario');
                editar = 0;
            }, function (err) {
                alert(err);
                MobileUI.clearForm('formulario');
                editar = 0;
            });
        }
    } catch (err) {
        alert(err);
    }
}


function getPic(id) {
    var func = createNewFileEntry;

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });

    function onSuccess(imageURI) {
        // alert(imageURI);
        updateFoto(id, imageURI).then(function (result) {
            alert(result);
            
        }, function (err) {
            alert(err);
        });
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function listar() {
    users = [];
    var service = new PessoaService();

    service.listar().then(function (result) {
        users = result;

    }, function (err) {
        alert('Erro :' + err);
    });
    openPage('listar')
}

function deletar(id) {
    var cadastro = MobileUI.objectByForm('formulario');
    var service = new PessoaService();

    service.deletar(users[id]).then(function (result) {
        alert(result);
        delete users[id];
    }, function (err) {
        alert('Erro :' + err);
    });

}
function update(id) {

    document.getElementById('id').value = users[id].getId();
    document.getElementById('userName').value = users[id].getNome();
    document.getElementById('userMail').value = users[id].getEmail();
    document.getElementById('userPhone').value = users[id].getTelefone();
    backPage();

    editar = 1;
}

function updateFoto(id, foto) {
    var service = new PessoaService();
    return new Promise(function (resolve, reject) {
        service.updateFoto(id, foto).then(function (result) {
            resolve(result);
        }, function (err) {
            reject(err);
        });
    });
}

function createNewFileEntry(imgUri) {


    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            alert("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

    }, onErrorResolveUrl);
}

function getFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        console.log("got file: " + fileEntry.fullPath);
        // displayFileData(fileEntry.nativeURL, "Native URL");

    }, function () {
        // If don't get the FileEntry (which may happen when testing
        // on some emulators), copy to a new FileEntry.
        createNewFileEntry(imgUri);
    });
}