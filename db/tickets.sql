CREATE DATABASE tickets;

USE tickets;

CREATE TABLE IF NOT EXISTS users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
    password TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ticket_info(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    status CHAR(10) NOT NULL DEFAULT 'Open',
    subject VARCHAR(100),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ticket_details(
    ticket_id INT UNSIGNED NOT NULL,
    details TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(ticket_id) REFERENCES ticket_info(id)
);

INSERT INTO users VALUES
(1, 'Yuri Yasvoin', 'yasvoin@gmail.com', 'yuri', 0),
(2, 'Alec Baldwin','abaldwin@gmail.com','01234', 0),
(3, 'Nicolas Cage','ncage@gmail.com','56789', 0);

INSERT INTO ticket_info VALUES
(1, 1,'Open','Canadian channels'),
(2, 2,'Open','Broadcast quality'),
(3, 3,'Open','VLC media player');

INSERT INTO ticket_details VALUES
(1,'For some reason, Canadian channels are not accessible and can not be open to watching,please help','2019-08-06'),
(2,'All of my live channels broadcast quality is bad, need help to adjust my antenna','2019-08-07'),
(3,'I need your guidance to set up VLC media player so I could watch live streaming channels','2019-08-08');