#node-red-contrib-mssql
A node-red node for connecting to Microsoft MS SQL Databases
Based on npm package [node-red-contrib-mssql]
(https://www.npmjs.com/package/node-red-contrib-mssql) 

Install

Run the following command in the root directory of your Node-RED install

npm install /g node-red-contrib-ftp


Importantly, this package need ODBC drivers for communicating with the Azure & MS SQL services or any other database, the user need to set-up environment level MSSQL (or similar) drivers.

    Basado en contrib mssql
    Se requiere un driver configurado
    actualmente no se usa el server del campo, se usa el del driver
    /etc/odbc.ini
/etc/odbcinst.ini
ejemplos:


gedit /etc/odbc.ini

[MSSQLTEST]  
Driver = ODBC Driver 13 for SQL Server
Server =  192.168.1.23,1434


gedit /etc/odbcinst.ini

[ODBC Driver 13 for SQL Server]
Description=Microsoft ODBC Driver 13 for SQL Server
Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.0.so.0.0
Threading=1
UsageCount=3

debe estar funcionando:
isql -v MSSQLTEST sa sa

se requiere
sudo apt-get install -y unixodbc unixodbc-dev
npm install -g --unsafe-perm odbc
sudo apt-get install -y libgcrypt20-dev
sudo apt-get install -y libssh2-1-dev

wget https://download.microsoft.com/download/2/E/5/2E58F097-805C-4AB8-9FC6-71288AB4409D/msodbcsql-13.0.0.0.tar.gz

tar -zxvf msodbcsql-13.0.0.0.tar.gz
cd msodbcsql-13.0.0.0
./install.sh verify
./install.sh install --force








    Abel Briones


Thanks to redant and redconnect-io, creator of https://github.com/redconnect-io/node-red-contrib-mssql - who's node this was based on.