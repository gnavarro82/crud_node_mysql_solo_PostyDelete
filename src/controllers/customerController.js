const { pool } = require("../db.js");
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            console.log(customers);
            res.render('customers.ejs', {
                data: customers
            });
            //si no le coloco la extension produce este erro
            //rror: No default engine was specified and no extension was provided.
        });
    });
};//fin del controlador list

controller.save = (req, res) => {
    //recibir los datos como un objeto
    //console.log(req.body);
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            console.log(customer);
            /** respuesta del customer
             OkPacket {
         fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
}
             */
            res.redirect('/');
        });
    });

};//fin del controlador save

controller.delete = (req, res) => {
    //caprutar el id del usuario
    //que se envia como un parametro de la url
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, customer) => {
            //  jconsole.log(customer);
            res.redirect('/');
        });
    });
};//fin del controlador delet

controller.edit = (req, res) => {

    const id = req.params.id;
    req.getConnection((err, cnn) => {
        cnn.query('SELECT * FROM WHERE id = ?', [id], (err, customer) => {
            res.render('customer_edit.ejs',{
                data:customer[0]
            });
        });
    });//fin de getConnection
};// fin de edit




module.exports = controller;