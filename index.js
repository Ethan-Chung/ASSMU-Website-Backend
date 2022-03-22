const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Cosmic = require('cosmicjs');
const api = Cosmic();
const PORT = process.env.PORT || 3001

const bucket = api.bucket({
    slug: 'assmu-website-production',
    read_key: 'awDUr9JMT4yD9udUl9JSi4FXKLjCzTjDOiXnP4KjfFrtplgabn'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async(req, res) => {
    const data = await bucket.getObjects({
        query: {
            type: 'posts',
        },
        props: 'slug,title,content,metadata'
    })
    const posts = data.objects;
    res.set('Content-Type', 'text/html')  
    res.send(posts);
});
app.get('/officers', async(req, res) => {
    const data = await bucket.getObjects({
        query: {
            type: 'officers',
        },
        props: 'slug,title,content,metadata'
    })
    const posts = data.objects;
    res.set('Content-Type', 'text/html')  
    res.send(posts);
});

app.listen(PORT, () => {
    console.log("running on port 3001");
});