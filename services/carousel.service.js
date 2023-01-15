
const fs = require('fs')
const gCarousel = require('../data/carousel.json')

module.exports = {
    query,
    getById,
    remove,
    save
}

function query() {
    return Promise.resolve(gCarousel)
}

function getById(contentId) {
    const content = gCarousel.carousel.find(content => content._id === contentId)
    if (!content) return Promise.reject('Unknown content')
    return Promise.resolve(content)
}

function remove(contentId) {
    const idx = gCarousel.carousel.findIndex(content => content._id === contentId)
    if (idx < 0) return Promise.reject('Unknown content')
    gCarousel.carousel.splice(idx, 1)
    return _saveCarouselToFile()
}

function save(content) {
    if (content._id) {
        const idx = gCarousel.carousel.findIndex(currContent => currContent._id === content._id)
        // Update only specific fields
        gCarousel.carousel[idx].title[gCarousel.lan] = content.title[gCarousel.lan]
    } else {
        bug._id = _makeId()
        gCarousel.carousel.unshift(bug)
    }
    return _saveCarouselToFile().then(() => bug)
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveCarouselToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gCarousel, null, 2)

        fs.writeFile('data/carousel.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}
