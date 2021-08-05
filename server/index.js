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
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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
                    currency: Math.floor(dataItem.price),
                    amount: dataItem.available_quantity,
                    decimals: (dataItem.price - Math.floor(dataItem.price)).toFixed(2).split('.').pop()
                },
                picture: dataItem.pictures[0].url,
                condition: dataItem.condition === "new" ? "Nuevo" : "Usado",
                free_shipping: dataItem.shipping.free_shipping,
                sold_quantity: dataItem.sold_quantity,
                description: dataDescription.plain_text,
                breadcrumb: dataItem.attributes.filter(at =>  at.id === 'BRAND' || at.id === 'MATERIAL')
                .map(at => at.value_name)
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
        let breadcrumb = [];
        if (filters[0]) {
            const { values } = filters[0];
            const { path_from_root } = values[0];
            categories = values.map(value => value.name); //array categorias
            breadcrumb = path_from_root.map(path => path.name);
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
                        currency: Math.floor(result.price),
                        amount: result.available_quantity,
                        decimals: (result.price - Math.floor(result.price)).toFixed(2).split('.').pop()
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
            breadcrumb
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