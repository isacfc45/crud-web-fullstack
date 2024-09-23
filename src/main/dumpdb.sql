CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    nickname TEXT,
    tax_type TEXT NOT NULL,
    cpf_cnpj TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS person_copy (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    nickname TEXT,
    tax_type TEXT NOT NULL,
    cpf_cnpj TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS address (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    road TEXT NOT NULL,
    number TEXT NOT NULL,
    complement TEXT,
    neighborhood TEXT NOT NULL,
    cep TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    person_id INTEGER NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS phone (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    area TEXT NOT NULL,
    number TEXT NOT NULL,
    description TEXT,
    person_id INTEGER NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);