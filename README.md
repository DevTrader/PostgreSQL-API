# Stynx Challenge

## Stynx Challenge - About My Process

This project was created following TDD and SOLID principles, deployed on Heroku.

When the server runs it initializes the database by fetching 150 documents from: https://api.openbrewerydb.org/

After the fetch it adds all 150 rows to a PostgreSQL database on Heroku, the schema for the table was kept simple, I have only "jsondata" column and store all the rows there.

I opted to not break the JSON down into columns to take full advantage of JSON queries. Although I have added a SQL query builder (/services/db/index , function: "formParamQuery"), in case I wanted to break it apart.

I used the library: https://node-postgres.com/ to access the database and query, the queries are sanitized when used with their format.

All my queries (with the exception of GET ALL) are PostgreSQL JSON queries, using the arrows for JSON traversal.

Middlewares verify and handles incoming data (directory /middleware) and handle edge cases for the endpoints.

My routes are loaded dynamicaly with fs, allowing me to scale the number of routes with ease by adding new folders.

All my services are tested with Jest.js, and DB credentials are stored as .env

## Stynx Challenge - Endpoints

#### GET All

**endpoint**: https://syntx.herokuapp.com/breweries
**description**: Retrieves all breweries from PostgreSQL DB

#### GET With Query

**endpoint**: https://syntx.herokuapp.com/breweries?brewery_type=micro&state=california
**description**: Can take any of the following parameters: "id","name","brewery_type","street","city","state","postal_code","country","longitude","latitude","phone","website_url","updated_at","tag_list"

Retrieves all data that matches the query.

**process**: When the endpoint detects a query it forms a SQL JSON query that can support any number of allowed parameters.

#### POST Update By Id

**endpoint**: https://syntx.herokuapp.com/breweries/:id
**description**: Takes req.body (JSON) with any of the following params:
"id","name","brewery_type","street","city","state","postal_code","country","longitude","latitude","phone","website_url","updated_at","tag_list"

Updates that brewery document with the values specified at req.body

**process**: When the endpoint detects a req.body it queries for the id of brewery and reconstructs its data, then updates it on PostgreSQL database.

##Challenges
I wish I had used a different library for querying PostgreSQL on node, the library I selected has some limitations when dealing with JSON data.
