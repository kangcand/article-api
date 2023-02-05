const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);


pool.on('error', (err) => {
    console.log(err)
});

module.exports = {
    
    getAllArticle(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM articles';
            connection.query(query, function (err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },

    showArticle(req, res) {
        const id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM articles WHERE id = ? ';
            connection.query(query ,[id], function (err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },

    newArticle(req, res) {
        // parse data
        const {
            title,
            category,
            description,
            date,
            cover,
        } = req.body

        pool.getConnection(function (err, connection) {
            if (err) console.log(err);

            const query = 'INSERT INTO articles (title, category, description, date, cover) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [
                title,
                category,
                description,
                date,
                cover], function (err, result) {
                    if (err) console.log(err);

                    res.send({
                        success: true,
                        message: 'Your record has been saved successfully',
                    })
                })

            connection.release();
        })
    },

    updateArticle(req, res) {
        const id = req.params.id;

        // parse data
        const data = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            date: req.body.date,
            cover: req.body.cover,
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'UPDATE articles SET ? WHERE id = ? ';
            connection.query(query, [data, id], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    },

    deleteArticle(req, res) {
        const id = req.params.id;

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM articles WHERE id = ?';
            connection.query(query, [id], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Deleted successfully',
                })
            })
            connection.release();
        })
    }
}