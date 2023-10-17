import express from 'express';
import ProductManager from './productManager.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



const productManager = new ProductManager('./src/products.json')

app.get('/products', async (req, res) => {

    try {

        const { limit } = req.query;

        const products = await productManager.getProducts()
        res.status(200).json({ products: products.slice(0, limit) });
        console.log('ejecutado')

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



app.get('/products/:id', async (req, res) => {

    try {

        const { id } = req.params;
        const products = await productManager.getProductById(parseInt(id))

        if (products) {

            res.status(200).json({ products })
        } else {

            res.status(404).json({ message: 'No se encontró el producto' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});