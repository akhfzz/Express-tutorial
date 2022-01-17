const app = require('./config');
const uuid = require('uuid');
const data = require('../../users');

app.get('/', (req, res) => {
    res.json(data)
})

app.get('/:id', (req, res) =>{
    const found = data.some(user => user.id === parseInt(req.params.id))
    if(found){
        res.json(data.filter(user => user.id === parseInt(req.params.id)))
    }else{
        res.sendStatus(400)
    }
})

app.post('/', (req, res) => {
    const new_data = {
        id: uuid.v4(),
        nama: req.body.nama,
        ttl: req.body.ttl
    }
    if(!new_data.nama || !new_data.ttl){
        return res.sendStatus(400)
    }
    req.session.user = {
        nama: req.body.nama
    }
    data.push(new_data)
    res.json(req.session)
})

app.put('/:id', (req, res) =>{
    const variable = data.some(user => user.id === parseInt(req.params.id));
    if(variable){
        const body = req.body;
        data.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.nama = body.nama ? body.nama : user.nama
                user.ttl = body.ttl ? body.ttl : user.ttl
                res.json({
                    'alert': 'update success',
                    data
                })
            }else{
                return res.sendStatus(400)
            }
        })
    }
})

app.delete('/:id', (req, res) => {
    const found = data.some(user => user.id === parseInt(req.params.id))
    if(found){
        users = data.filter(user => user.id !== parseInt(req.params.id))
        res.json({
            'alert': 'User delete',
            users
        })
    }else{
        return res.sendStatus(400)
    }
})

module.exports = app