# Postgres CDC (CHANGE DATA CAPTURE) with debezium and kafka

PostgreSQL CDC (Change Data Capture) is a technique used to track and capture data changes in a PostgreSQL database. 
Debezium is a popular open-source platform that provides a ready-to-use CDC infrastructure for various databases, including PostgreSQL. 
Kafka is a distributed streaming platform that can be used as a destination for the captured data events.

Together, Debezium and Kafka can be used to capture data changes in PostgreSQL databases, and then efficiently move these changes to other systems for further processing or analysis. 
This allows real-time monitoring and integration of database changes with other applications or services. Debezium's PostgreSQL connector captures row-level changes in the database and publishes them as events to Kafka, which can be consumed by other systems in real-time.


# Installation

1. Clone the repo
2. Create a .env file in bpth root folder and node-app folder (refer to the .env.template file)
2. Run 
 ```
 docker compose up
 ```
 3. After that go to the postgres container
 
 ```
 docker exec -it postgres bash
 ```
 
 4. Access postgres via  terminal and create a database customers
 
 ```
 psql -U postgres
 Create database customers (id serial PRIMARY, name VARCHAR ( 50 ) NULL);
 ```
 
 5. Also the debezium server is running at port 9090 of your local system. we have a config file to inform debezium about the database we are monitoring
  (refer to  pg-source-config.json)
  
  6. We send a post request to our local debezium server with this file
  ```
  curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:9090/connectors/ -d @pg-source-config.json
  ```
  It will create a topic in kafka as well
  
  You can see the list of connectors also by a get request on 9090
  
  ```
  curl -H "Accept:application/json" localhost:9090/connectors
  ```
  
  7. Start the node js app
  ```
  cd node-app && node index.js
  ```
  
  8. Insert a demo data into postgres
  
  ```
  insert into customers (id,name) values (1,'suraj');
  ```
  
  9. The node js app will stream the postgres events.
  ![image](https://user-images.githubusercontent.com/49373020/219532771-c63bbc8b-788c-4355-a62e-bf25e1d60593.png)


  
  
  
