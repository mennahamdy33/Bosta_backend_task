const knex = require('knex');
//const { attachPaginate } = require('knex-paginate');
//attachPaginate();

const db=knex({
    // Enter your own database information here based on what you created
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'BvkvpFGQYTD23xDw',
        database: 'Bosta'
    }
});
module.exports=db;