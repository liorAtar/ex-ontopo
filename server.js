const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const carouselService = require('./services/carousel.service.js')
const openAi = require('./services/openAi.service')

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use('/api/openAi', openAi)

// Express Routing:

// LIST
app.get('/api/carousel', (req, res) => {
    carouselService.query()
        .then((contents) => {
            res.send(contents)
        })
        .catch((err) => {
            console.log('OOPS:', err)
            res.status(400).send('Cannot load contents')
        })
})

// READ
app.get('/api/carousel/:contentId', (req, res) => {
    const { contentId } = req.params
    carouselService.getById(contentId)
        .then((content) => {
            res.send(content)
        })
        .catch((err) => {
            console.log('OOPS:', err)
            res.status(400).send('Cannot load content')
        })
})

// ADD
app.post('/api/carousel/', (req, res) => {
    const { title, img } = req.body

    const content = {
        title,
        img,
    }

    carouselService.save(content)
        .then((savedContent) => {
            res.send(savedContent)
        })
        .catch((err) => {
            console.log('OOPS:', err)
            res.status(400).send('Cannot save content')
        })
})

// UPDATE
app.put('/api/carousel/:contentId', (req, res) => {
    const { title, img, _id } = req.body

    const content = {
        _id,
        title,
        img,
    }

    carouselService.save(content)
        .then((savedContent) => {
            res.send(savedContent)
        })
        .catch((err) => {
            console.log('OOPS:', err)
            res.status(400).send('Cannot save content')
        })
})

// DELETE
app.delete('/api/carousel/:contentId', (req, res) => {
    const { contentId } = req.params
    carouselService.remove(contentId)
        .then(() => {
            res.send('Removed!')
        })
        .catch((err) => {
            console.log('OOPS:', err)
            res.status(400).send('Unknown content')
        })
})

const PORT = process.env.PORT || 3030

app.listen(PORT, () =>
    console.log(`Server listening on port http://127.0.0.1:${PORT}/`)
)