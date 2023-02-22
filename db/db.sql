USE bqclu8cqr5u83r0fi2yn;

CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Fotos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(40) NOT NULL,
    urlImg VARCHAR(50) NOT NULL,
    descripcion TEXT,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    user_id INT,
    postedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES Users(id)
);

CREATE TABLE Comentario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    comentario TEXT NOT NULL,
    foto_id INT,
    postedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT foto_id FOREIGN KEY(foto_id) REFERENCES Users(id)
);

SELECT * FROM Fotos WHERE id = 6 AND user_id = 9