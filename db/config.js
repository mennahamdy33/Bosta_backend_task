const knex = require('knex');
//const { attachPaginate } = require('knex-paginate');
//attachPaginate();

const db=knex({
    // Enter your own database information here based on what you created
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'your-user',
        password: 'your-password',
        database: 'Bosta'
    }
});
module.exports=db;