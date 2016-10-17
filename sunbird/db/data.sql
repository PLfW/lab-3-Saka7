INSERT INTO destinations(country, city) VALUES
  ('USA', 'New York'),
  ('USA', 'San Francisco'),
  ('German', 'Berlin'),
  ('Ukraine', 'Ivano-Frankivsk');


INSERT INTO users (type, first_name, second_name, email, password, phone, image, bio) VALUES
  ('CUSTOMER', 'Angela', 'Ortiz', 'aortiz0@yolasite.com', '9wpqSS899ak', '86-(253)152-3852', 'https://robohash.org/culpavelut.png?size=50x50&set=set1', 'Donec vitae nisi.'),
  ('CUSTOMER', 'Clarence', 'Torres', 'ctorres1@wordpress.com', 'tKp7VItn8', '7-(333)487-3177', 'https://robohash.org/eteligendinostrum.jpg?size=50x50&set=set1', 'Praesent blandit lacinia erat.'),
  ('CUSTOMER', 'Melissa', 'Freeman', 'mfreeman2@hao123.com', 'pCfLwIeLNVBq', '55-(769)760-8456', 'https://robohash.org/undedoloreut.jpg?size=50x50&set=set1', 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.'),
  ('CUSTOMER', 'Randy', 'Taylor', 'rtaylor3@nature.com', 'EN0gaQkfdOok', '62-(288)225-7873', 'https://robohash.org/hicquoqui.bmp?size=50x50&set=set1', 'Maecenas tincidunt lacus at velit.'),
  ('CUSTOMER', 'Alice', 'Patterson', 'apatterson4@storify.com', 'ZjmgwV', '62-(117)427-1897', 'https://robohash.org/nonquibusdamitaque.png?size=50x50&set=set1', 'Curabitur in libero ut massa volutpat convallis.'),
  ('CUSTOMER', 'Randy', 'Thompson', 'rthompsonk@exblog.jp', 'wW4CKTisBxB', '374-(525)280-9297', 'https://robohash.org/voluptatemaspernaturrerum.png?size=50x50&set=set1', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'),
  ('CUSTOMER', 'Steve', 'Reyes', 'sreyesl@fema.gov', 'ANlVyXxSR', '55-(171)552-0727', 'https://robohash.org/officiissintipsa.png?size=50x50&set=set1', 'Nulla ut erat id mauris vulputate elementum.'),
  ('CUSTOMER', 'Aaron', 'James', 'ajamesm@google.com', '2ZCXcv9', '1-(955)624-4190', 'https://robohash.org/etquidemdolores.png?size=50x50&set=set1', 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'),
  ('CUSTOMER', 'Raymond', 'Riley', 'rrileyn@dropbox.com', 'veZkn42tL', '86-(353)553-5510', 'https://robohash.org/etestcupiditate.png?size=50x50&set=set1', 'In hac habitasse platea dictumst.'),
  ('FLIGHT_PROVIDER', 'Kathryn', 'Sanders', 'ksanderso@linkedin.com', 'IL6c0zHCAOKK', '353-(653)438-3273', 'https://robohash.org/quibusdamanimisunt.png?size=50x50&set=set1', 'Morbi quis tortor id nulla ultrices aliquet.'),
  ('FLIGHT_PROVIDER', 'Michael', 'Wallace', 'mwallacep@columbia.edu', 'ds6EahR', '30-(249)486-1847', 'https://robohash.org/adebitissimilique.jpg?size=50x50&set=set1', 'Mauris lacinia sapien quis libero.'),
  ('ADMIN', 'Elizabeth', 'Rose', 'eroseq@netvibes.com', 'BEoA1JBdmG3Y', '380-(948)816-9319', 'https://robohash.org/estexcepturinumquam.jpg?size=50x50&set=set1', 'In hac habitasse platea dictumst.');


INSERT INTO flights (name, image, description, from_point, to_point, expiration_date, departure, duration, price) VALUES 
  ('in', 'http://dummyimage.com/100x141.bmp/5fa2dd/ffffff', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 1, 3, '2016-10-10', '2016-10-10 04:05:00', 8, 633),
  ('porta', 'http://dummyimage.com/204x236.png/dddddd/000000', 'Phasellus sit amet erat. Nulla tempus.', 3, 1, '2016-10-10', '2016-10-10 05:10:00', 6, 540),
  ('nunc', 'http://dummyimage.com/195x153.png/cc0000/ffffff', 'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.', 2, 3, '2016-09-12', '2016-09-13 08:10:00', 16, 660),
  ('dolor', 'http://dummyimage.com/250x191.jpg/5fa2dd/ffffff', 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.', 2, 1, '2016-09-15', '2016-09-16 12:00:00', 14, 1100),
  ('nam', 'http://dummyimage.com/203x147.jpg/cc0000/ffffff', 'Mauris lacinia sapien quis libero.', 3, 4, '2016-09-20', '2016-09-25 14:00:00', 19, 692),
  ('habitasse', 'http://dummyimage.com/215x240.jpg/dddddd/000000', 'Fusce consequat. Nulla nisl.', 4, 2, '2016-10-10', '2016-10-10 08:00:00', 16, 787),
  ('ultrices', 'http://dummyimage.com/245x125.png/dddddd/000000', 'Suspendisse potenti.', 4, 3, '2016-10-05', '2016-10-10 09:00:00', 2, 1860),
  ('pede', 'http://dummyimage.com/153x139.bmp/5fa2dd/ffffff', 'Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.', 3, 2, '2016-10-01', '2016-10-03 06:00:00', 19, 1424);

INSERT INTO orders (user_id, flight_id, applying_time, paying_time, rejection_time, is_rejected, is_paid) VALUES
  (2, 7, '2016-10-10 04:05:06', '2016-10-05 05:05:06', NULL, false, true),
  (5, 8, '2016-10-11 04:05:06', '2016-10-04 05:05:05', NULL, false, true),
  (8, 7, '2016-10-12 08:05:05', '2016-10-02 09:05:00', '2016-10-05 09:10:06', true, true),
  (1, 2, '2016-10-10 04:05:06', '2016-10-06 05:05:06', NULL, false, true),
  (4, 3, '2016-10-11 06:05:00', '2016-10-04 07:05:00', NULL, false, true),
  (6, 6, '2016-10-10 08:05:06', '2016-10-05 09:05:00', NULL, false, true),
  (2, 6, '2016-10-11 10:05:00', '2016-10-05 11:05:06', NULL, false, true);