create table employeee(
   emp_id INT NOT NULL AUTO_INCREMENT,
   emp_name VARCHAR(100) NOT NULL,
   dob DATE,
   age INT,
   sex VARCHAR(2),
   designation VARCHAR(20),
   mob_number VARCHAR(15),
   emp_address VARCHAR(50),
   city VARCHAR(20),
   emp_salary VARCHAR(20),
   join_date DATE,
   PRIMARY KEY ( emp_id )
);