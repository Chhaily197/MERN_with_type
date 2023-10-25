import express, {Request, Response} from 'express';
import path from 'path';
import mysql from 'mysql'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

//Connect to the server mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

//Connect to the databse
db.connect((err: any) => {
    if(err){
        throw err;
    }
    console.log('Connected to MySql');
});

//Use body-parser for handling JSON data
app.use(bodyParser.json());

app.get('/products', (req: Request, res: Response) => {
    const query =  'SELECT * FROM products';
    db.query(query, (err: any, result: any) => {
        if(err){
            throw err;
        }
        res.json(result);
    })
});

app.post('/products', (req: Request, res: Response) => {
    const {name, price, des} = req.body;
    const query = 'INSERT INTO products (p_name, p_price, p_des) VALUES(?,?,?)';
    db.query(query, [name, price, des], (err: any, result: any) => {
        if(err){
            throw err;
        }
        res.json({ message: "Products added", id: result.insertId});
    });
});

app.put("/products/:id", (req: Request, res: Response) => {
    const pId = req.params.id;
    const {name, price, des} = req.body;

    const updateQuery = 'UPDATE products SET p_name=?, p_price=?, p_des=? WHERE p_id=?';
    db.query(updateQuery, [name, price, des, pId], (err: any, result: any) => {
        if(err){
            console.error("Error updating product: ", err);
            res.status(500).json({ err: 'Internal Server Error'});
        }else{
            res.json({message: 'Product updated', id: pId});
        }
    })
});

app.delete('/products/:id', (req: Request, res: Response) => {
    const pId = req.params.id;
    const deleteQuery = 'DELETE FROM products WHERE p_id=?';
    db.query(deleteQuery, [pId], (err: any, result: any) => {
        if(err){
            console.error("Invalid products");
            res.status(500).json({err: 'Invalid products'});
        }
        res.json({message: 'Products deleted successfully', id: pId});
    })
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});