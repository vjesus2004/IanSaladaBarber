create database jesus;

create table agenda(
ID int (3) auto_increment primary key,
dia date not null,
hora time not null,
nom varchar  (50) not null ,
tel int (9) not null,
nota  varchar(200)
);
 create table adm(
 usuario varchar(50) primary key not null,
 clave text not null);
 
 