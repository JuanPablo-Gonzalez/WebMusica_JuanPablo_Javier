insert into usuarios values
('U001','juanpablo','','','',''),
('U002','LauraMusic','','','',''),
('U003','Rodrigo42','','','',''),
('U004','Musician23','','','',''),
('U005','ThePianist02','','','','');

insert into temas values
('T001','Ayuda','2022-02-12 12:20:20','U001','F001'),
('T002','Ayuda 2','2022-02-22 13:23:45','U002','F001'),
('T003','Recomendación','2022-03-15 14:23:23','U001','F003'),
('T004','Busco guitarrista','2022-04-10 14:23:55','U003','F002'),
('T005','Mejor canción','2022-04-11 14:33:40','U002','F003');

insert into comentarios values
('C001','2022-02-12','Necesito ayuda con la base','','','T001','U001'),
('C002','2022-02-12','Echad un ojo a esto','','','T002','U002'),
('C003','2022-02-12','Grupo de rock','','','T003','U001'),
('C004','2022-02-12','Busco guitarrista para evento','','','T004','U003'),
('C005','2022-02-12','Me ofrezco...','','','T004','U003'),
('C006','2022-02-12','Te recomiendo ... de ...','','','T003','U002'),
('C007','2022-02-12','Esa está bien, mira también...','','','T003','U004');