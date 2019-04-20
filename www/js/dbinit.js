function sqlite_connect() {
	db = window.sqlitePlugin.openDatabase({name: 'appsqlite.db', location: 'default'});
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS Tab_Pessoa (id integer primary key autoincrement, nome varchar(100),email varchar(100),telefone varchar(100),foto varchar(100))');
	  }, function(error) {
		alert('Transaction ERROR: ' + error.message);
	  }, function() {
		// alert('Tab_Pessoa atualizada com sucesso.');
	  });
}

function sqlite_close() {  // Invocar no ciclo de vida (finish)
	db.close(function() {
		console.log('Banco de dados fechado.');
	  }, function(error) {
		console.log('Erro ao fechar bando de dados.');
	});
}