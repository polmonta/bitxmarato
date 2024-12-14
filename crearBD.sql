create table pacients
(dni char(10),
nomComplet char(100) not null,
telefon char(15) unique not null,
hospitalPacient integer not null,
dniMetgeAssociat char(10) not null,
malaltia char(10) not null,
primary key (dni),
foreign key (hospitalPacient) references hospitals,
foreign key (dniMetgeAssociat) references metges,
foreign key (malaltia) references malalties);

create table metges
(dni char(10),
nomComplet char(100) not null,
telefon char(15) unique not null,
hospitalAdscrit integer not null,
primary key (dni),
foreign key (hospitalAdscrit) references hospitals);


create table hospitals
(id integer,
nom char(100) not null,
primary key (id));

create table malalties
(sigles char(10),
nom char(100),
primary key (sigles));


create table respostaQuestionari
(data TIMESTAMP,
pacient char(10),
febre BOOLEAN,
tos BOOLEAN,
primary key (data, pacient),
foreign key (pacient) references pacients);
