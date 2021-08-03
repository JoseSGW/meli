const { default: axios } = require("axios");
const cors = require('cors');
const express = require("express");
const morgan = require("morgan");

//require('dotenv').config()
//process.env.VARIABLE

const app = express();

//configuracion general
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
        sameSite: true,
    })
);


//endpoints

app.get('/api/items/:id', async (req, res) => {

    const idItem = req.params.id;

    try {

        const URL_ITEM = `https://api.mercadolibre.com/items/${idItem}`;
        const responseItem = axios.get(URL_ITEM);

        const URL_DESCRIPTION = `https://api.mercadolibre.com/items/${idItem}/description`;
        const responseDescription = axios.get(URL_DESCRIPTION);

        const [{ data: dataItem }, { data: dataDescription }] = await Promise.all([responseItem, responseDescription])


        //recorrer filtrar y mandar :)

        let item = {};
        if (dataItem) {
            item = {
                id: dataItem.id,
                title: dataItem.title,
                price: {
                    currency: dataItem.price,
                    amount: dataItem.available_quantity,
                    decimals: Number
                },
                picture: dataItem.pictures[0].url,
                condition: dataItem.condition,
                free_shipping: dataItem.shipping.free_shipping,
                sold_quantity: dataItem.sold_quantity,
                description: dataDescription.plain_text
            }
        }


        const response = {
            author: {
                name: "Jose",
                lastname: "Ruz"
            },
            item,
        }

        res.json(response)

    } catch (error) {
        console.error("ERROR: ", error)
    }
})



app.get('/api/items', async (req, res) => {

    const query = req.query?.q;

    try {

        const { data } = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);

        const { results, filters } = data; // extraigo solo lo que necesito

        let categories = [];
        if (filters[0]) {
            const { values } = filters[0];
            categories = values.map(value => value.name); //array categorias
        }

        let items = [];
        if (results) {
            const lessResults = results.slice(0, 11);
            items = lessResults.map(result =>
            (
                {
                    id: result.id,
                    title: result.title,
                    price: {
                        currency: result.price,
                        amount: result.available_quantity,
                        decimals: (result.price - Math.floor(result.price)).toFixed(2)
                    },
                    picture: result.thumbnail,
                    condition: result.condition,
                    free_shipping: result.shipping.free_shipping
                }
            ))
        }

        const response = {
            author: {
                name: "Jose",
                lastname: "Ruz"
            },
            categories,
            items,
        }

        res.json(response);

    } catch (error) {
        console.error(error)
    }
})






const PORT = process.env.PORT || 3001;



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});