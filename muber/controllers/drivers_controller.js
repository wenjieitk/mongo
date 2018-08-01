module.exports = {

    greeting(req,res) {
        res.send({ // send to client
            hi: 'hi there'
        });
    },

    create(req, res) {
        console.log(req.body);
        res.send({ // send to client
            hi: 'hi there'
        });    
    }

}