module.exports = function(RED) {

	'use strict';

	var mustache = require('mustache');

	var sql = require('odbc');



	function connection(config) {

	    RED.nodes.createNode(this, config);

	    

        var node = this;

	    this.config = {

            user: node.credentials.username,

            password : node.credentials.password,

            server : config.server,

            driver : config.driver,

            database : config.database,

            options : {

                           encrypt : config.encyption

                       }

        };

        

        

	    this.connection = sql;



/*	   	node.on('close',function(){

	   		node.pool.close(function(){});

	   	})

*/	}

  	RED.nodes.registerType('epsql-CN', connection, {

	    credentials: {

			username: {type:'text'},

			password: {type:'password'}

	    }

	});



  	function epsql(config) {

	    RED.nodes.createNode(this, config);

	    var epsqlCN = RED.nodes.getNode(config.epsqlCN);

	    this.query = config.query;

	    this.connection = epsqlCN.connection;

	    this.config = epsqlCN.config;

	    this.outField = config.outField;

	    

        var node = this;

	    var b = node.outField.split('.');

        var i = 0;

        var r = null;

        var m = null;

        var rec = function(obj) {

            i += 1;

            if ((i < b.length) && (typeof obj[b[i-1]] === 'object')) {

                rec(obj[b[i-1]]); // not there yet - carry on digging

            }

            else {

                 if (i === b.length) { // we've finished so assign the value

                     obj[b[i-1]] = r;

                     node.send(m);

                     node.status({});

                 }

                 else {

                     obj[b[i-1]] = {}; // needs to be a new object so create it

                     rec(obj[b[i-1]]); // and carry on digging

                 }

            }

        };

        

        node.on('input',function(msg){

            console.log(node.config);

	    console.log(msg);

            var odbc = require("odbc");

//            var connectionString = "DSN=MSSQLTEST;UID=sa;PWD=sa;DATABASE=Produccion";

// Falta validar que la configuracion tenga valores corectos

            var connectionString="DSN="+node.config.driver+"; UID="+node.config.user+"; PWD="+node.config.password+"; DATABASE="+node.config.database

//            var connectionString = "DSN=MSSQLTEST;UID=sa;PWD=sa;DATABASE=Produccion";





	    var db = new odbc.Database();  



        node.status({fill:'blue',shape:'dot',text:'connecting'});



	db.open(connectionString, function(err){

 		if(err){

  			console.log(err.message);

		        node.status({fill:'red',shape:'ring',text:'Error'});

			msg.payload=err.message;

    		        node.send(msg);

			return;

		}; //end of error



		/*

			Once the connection is open you can query it.

			That means if you tried to query it outside or before this handler finished, it would say...

			"Connection Not Open"

		*/

          node.status({fill:'blue',shape:'dot',text:'requesting'});



              var query = mustache.render(node.query,msg);              

              if (!query || (query === '')) {

                  query = msg.payload;

              } // end of if



		db.query(query, function(err, rows, moreResultSets){

			if(err){

				console.log(err.message);

                                node.status({fill:'red',shape:'ring',text:'Error'});



			}; //end of error

			console.log(rows);

                        node.status({fill:'blue',shape:'dot',text:'results ready'});

			msg.payload=rows;

    		        node.send(msg);

                      node.status({fill:'blue',shape:'dot',text:'finish'});

		});  //End of db.querry

              });  // end of db.open

        }); // end of node.on



	}

  	RED.nodes.registerType('epsql', epsql);

};