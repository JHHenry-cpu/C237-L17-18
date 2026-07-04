CREATE DATABASE c237_studentlistapp;

USE c237_studentlistapp;

CREATE TABLE student (
    studentId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    contact VARCHAR(10) NOT NULL,
    image VARCHAR(1000) NOT NULL,
    PRIMARY KEY (studentId)
);

INSERT INTO student (name, dob, contact, image)
VALUES
('John Edward', '2007-05-08', '98765432', 'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D'),
('Mary Thomson', '2006-02-06', '98765678', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D'),
('Benny Teo', '2006-08-18', '98789879', 'https://plus.unsplash.com/premium_photo-1675080431524-3e7c85323972?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D');