#node-red-contrib-epsql

sorry by the redaction, but i think everything is in here, somdey in the future i will work in the document!!

the short version :

    	npm install -g node-red-contrib-epsql
or my favorite:

	node-red-admin install node-red-contrib-epsql


#Long Version

las instrucciones completas para la instalacion

Install esentials, some dependences y some tools

	su root
	nano /etc/apt/sources.list
	apt-get update && apt-get upgrade
	apt-get install -y sudo wajig  build-essential curl
	usermod -a -G sudo user
	exit

reestart o logout, login 

	wajig install -y unixodbc unixodbc-dev
	wajig install -y libgcrypt20 libgcrypt20-dev libgcrypt20-dbg
	wajig install -y libssh2-1-dev libssl1.0.0 libssl-dev
	wajig install -y libssl1.0.0 libssl-dev
	wajig install -y libssl1.0.0 libssl-dev


verificar los locales, debe estar instalado el siguiente:
si no esta este idioma instalado no compila
the driver need en_us.utf-8 as locals !!, is very importante
verificar en_us.utf-8 utf-8

	sudo dpkg-reconfigure locales


Bajar el driver correspondiente
Cuidado por que son dos vinculos disintos para red hat y ubuntu, usar el apropiado o vendran los problemas con libcrypto.so.10 y libssl.so.10

there is a lot of confusion because there are three almost identical drivers, be carefully, dont waste your time like i did!!

Driver microsoft
https://msdn.microsoft.com/library/mt703139.aspx

redhat
https://www.microsoft.com/en-us/download/details.aspx?id=36437
	
	wget https://download.microsoft.com/download/B/C/D/BCDD264C-7517-4B7D-8159-C99FC5535680/msodbcsql-13.0.0.0.tar.gz

suse linux 
https://www.microsoft.com/en-us/download/details.aspx?id=34687
	
	wget https://download.microsoft.com/download/7/3/1/7318E2AD-E7C5-4301-AEFA-A15EDEDACFB4/msodbcsql-13.0.0.0.tar.gz

ubuntu debian
https://www.microsoft.com/en-us/download/details.aspx?id=50419
	
	wget https://download.microsoft.com/download/2/E/5/2E58F097-805C-4AB8-9FC6-71288AB4409D/msodbcsql-13.0.0.0.tar.gz


whith the downloaded file:

	tar -zxvf msodbcsql-13.0.0.0.tar.gz
	cd msodbcsql-13.0.0.0
	./install.sh verify
	sudo ./install.sh install --force --acept-license

Verify your instalation
Verificar la instalacion

	sudo ldd /opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.0.so.0.0

debe marcar que encontro todas las librerias, si falta alguna ahi que instalar las depedencias

if there is a lib missing you have problems, google is your friend
if it is missing some of this: libcrypto.so.10 or libssl.so.10 most likeli you have the wrong file check above.


	ldd /opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.0.so.0.0 
	linux-vdso.so.1 (0x00007fff7fdde000)
	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f53ffbb4000)
	libodbcinst.so.2 => /usr/lib/x86_64-linux-gnu/libodbcinst.so.2 (0x00007f53ff9a2000)
	libuuid.so.1 => /lib/x86_64-linux-gnu/libuuid.so.1 (0x00007f53ff79d000)
	libgss.so.3 => /usr/lib/libgss.so.3 (0x00007f53ff591000)
	libkrb5.so.3 => /usr/lib/x86_64-linux-gnu/libkrb5.so.3 (0x00007f53ff2bd000)
	libcrypto.so.1.0.0 => /usr/lib/x86_64-linux-gnu/libcrypto.so.1.0.0 (0x00007f53feec1000)
	libssl.so.1.0.0 => /usr/lib/x86_64-linux-gnu/libssl.so.1.0.0 (0x00007f53fec60000)
	libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007f53fe955000)
	libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f53fe654000)
	libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007f53fe43e000)
	libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f53fe221000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f53fde76000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f54001a0000)
	libltdl.so.7 => /usr/lib/x86_64-linux-gnu/libltdl.so.7 (0x00007f53fdc6c000)
	libshishi.so.0 => /usr/lib/libshishi.so.0 (0x00007f53fda0a000)
	libk5crypto.so.3 => /usr/lib/x86_64-linux-gnu/libk5crypto.so.3 (0x00007f53fd7d9000)
	libcom_err.so.2 => /lib/x86_64-linux-gnu/libcom_err.so.2 (0x00007f53fd5d5000)
	libkrb5support.so.0 => /usr/lib/x86_64-linux-gnu/libkrb5support.so.0 (0x00007f53fd3c9000)
	libkeyutils.so.1 => /lib/x86_64-linux-gnu/libkeyutils.so.1 (0x00007f53fd1c5000)
	libresolv.so.2 => /lib/x86_64-linux-gnu/libresolv.so.2 (0x00007f53fcfae000)
	libtasn1.so.6 => /usr/lib/x86_64-linux-gnu/libtasn1.so.6 (0x00007f53fcd9a000)
	libgnutls-deb0.so.28 => /usr/lib/x86_64-linux-gnu/libgnutls-deb0.so.28 (0x00007f53fca7b000)
	libgcrypt.so.20 => /lib/x86_64-linux-gnu/libgcrypt.so.20 (0x00007f53fc799000)
	libgpg-error.so.0 => /lib/x86_64-linux-gnu/libgpg-error.so.0 (0x00007f53fc587000)
	libidn.so.11 => /usr/lib/x86_64-linux-gnu/libidn.so.11 (0x00007f53fc353000)
	libz.so.1 => /lib/x86_64-linux-gnu/libz.so.1 (0x00007f53fc138000)
	libp11-kit.so.0 => /usr/lib/x86_64-linux-gnu/libp11-kit.so.0 (0x00007f53fbef2000)
	libnettle.so.4 => /usr/lib/x86_64-linux-gnu/libnettle.so.4 (0x00007f53fbcc0000)
	libhogweed.so.2 => /usr/lib/x86_64-linux-gnu/libhogweed.so.2 (0x00007f53fba91000)
	libgmp.so.10 => /usr/lib/x86_64-linux-gnu/libgmp.so.10 (0x00007f53fb80e000)
	libffi.so.6 => /usr/lib/x86_64-linux-gnu/libffi.so.6 (0x00007f53fb606000)



Verificar nuevamente

cd ..
	
	odbcinst -q -d -n "ODBC Driver 13 for SQL Server"

Debe salir algo como esto

	Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.0.so.0.0
	Threading=1
	UsageCount=1



another test just to be sure

para verificar el driver

	odbcinst -j

	unixODBC 2.3.1
	DRIVERS............: /etc/odbcinst.ini
	SYSTEM DATA SOURCES: /etc/odbc.ini
	FILE DATA SOURCES..: /etc/ODBCDataSources
	USER DATA SOURCES..: /home/exxerpro/.odbc.ini
	SQLULEN Size.......: 8
	SQLLEN Size........: 8
	SQLSETPOSIROW Size.: 8


of course you want to try with a real database
 a les you have mssqlserver for linux, you must have to configure slq server for remote conection, in sql express another big problem


ahi que configurar el acceso a MS SQL SERVER, algunos vinculos de utilidad y palabras claves
Some useful links and keyword 

https://blogs.msdn.microsoft.com/walzenbach/2010/04/14/how-to-enable-remote-connections-in-sql-server-2008/

https://msdn.microsoft.com/en-us/library/cc646023.aspx

som keyworks for google search

sql server configuration manager

	netsh advfirewall firewall add rule name="MSSQL TCP" dir=in action=allow protocol=TCP localport=1434
	netsh advfirewall firewall add rule name="MSSQL UDP" dir=in action=allow protocol=UDP localport=1434

	netstat -ano | find /i "3564"
	netstat -ano | find /i "3564"

	NET STOP MSSQL$SQLEXPRESS
	NET START MSSQL$SQLEXPRESS


#Ejemplos de configuracion
Primero configuramos el archio odbc.ini

ejecutamos el siguiente comando:

	sudo nano /etc/odbc.ini

vamos a editarlo con lo siguiente:

the driver name must match exactly, 


Muy importante
este es el servidor que usaremos en node-red, el de la configuracion actualmente no le hace caso!!!

Very important
the server configured en node-red-controb-epsql is ignored, this is the real server to make the connection


	[MSSQLTEST]  
	Driver = ODBC Driver 13 for SQL Server
	Server =  192.168.1.23,1434
	# 
	# EXAMPLE
	# Server = tcp:servername,12345.
	#  
	# Note:  
	# Port is not a valid keyword in the ~/.odbc.ini file  
	# for the Microsoft ODBC driver on Linux  
	#  
	#
	#Encryption = Yes


El siguiente archivo ya debe estar configurado si se instalo bien el driver
the next file, must to be like this:

	sudo nano /etc/odbcinst.ini

	[ODBC Driver 13 for SQL Server]
	Description=Microsoft ODBC Driver 13 for SQL Server
	Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.0.so.0.0
	Threading=1
	UsageCount=3



Para probar una base de datos
now we can tray to connect

	isql -v "odbc driver" "user" "pwd"
	isql -v MSSQLTEST sa sa

be very carefull
the remote conection in sql server must to be working, i recommended verify with a windows machine just to be sure

tiene que entrar a la consola de isql
se requiere que exista el servidor en la direccion congigurada y con el usuario y password configurados
en caso contrario marcara timeout o otro error si no esta bien instalada

en caso de encontrar el siguiente error
	
	[unixODBC][Driver Manager]Can't open lib '/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.0.so.0.0' : file not found (0)

see the above comment about the 3 version of the driver (no counting windows version )
of course the file exist, is one of the librariis what is missing

para verificar la instalacion

	ldd /opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.0.so.0.0




para instalar el nodeJS, si no esta instalado aun
Installing node.js in case is not installed yet

	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	wajig install -y nodejs

Opcional
para probar la conexion con la base de datos en node.js
	
	nano s.js

	var odbc = require("odbc");
	var connectionString = "DSN=MSSQLTEST;UID=sa;PWD=sa;DATABASE=Produccion";
	var db = new odbc.Database();
		db.open(connectionString, function(err){

			if(err){
				throw err;
			};

			/*
				Once the connection is open you can query it.
				That means if you tried to query it outside or before this handler finished, it would say...
				"Connection Not Open"
			*/

			db.query("SELECT * FROM contador", function(err, rows, moreResultSets){
				if(err){
					console.log(err.message);
				};
				console.log(rows);
			});

		});

	process.on('SIGINT', function () {
		db.close(function(){
			console.log('Database Connection Closed');
			process.exit();
		});
	});

	node s.js
	
you must se the results in the console
be free to write your own query

Para instalar node-red
instalar como sudo por que requiere permisos de acceos a /usr/lib

	sudo npm install -g --unsafe-perm node-red
	sudo npm install -g --unsafe-perm pm2
	sudo npm install -g --unsafe-perm node-red-admin

Now you can start node-red

	pm2 start node-red

You can verify the running process with this:

	pm2 info node-red
	pm2 logs node-red


#Finally 

para instalarlo se requiere que este corriendo el node-red
recomiendo monitorear los logs, ya sea desde la pagina del node-red (localhost:1880) o desde otra consola (pm2 logs node-red) para ver que esta haciendo y ver los mensajes de error


	npm install -g node-red-contrib-epsql
	
	node-red-admin install node-red-contrib-epsql


    Abel Briones
    Exxerpro Solutions
    www.exxerpro.com
    

Thanks to redant and redconnect-io, creator of https://github.com/redconnect-io/node-red-contrib-mssql - who's node this was based on.
