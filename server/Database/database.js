const mongoose = require('mongoose')

function Database(url) {


    mongoose.connect(url).then(() => { console.log("database connected") })
        .catch((err) => {
            console.log("error in connecting data base");
        })

}
module.exports = Database