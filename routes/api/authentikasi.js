const mongo = require("./database-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const access_token_secret = 'ini_accessToken';
const refresh_token_secret = 'ini_refreshToken'; 


module.exports = { 
    signin : function(request, response){
        const connection = mongo.getDb();
        connection
            .collection("testAPI")
            .find({
                nama: request.nama
            })
            .toArray((err, user) => {
                if(err){
                    return response.status(400).send({
                        message: err
                    });
                }
                if(user){
                    user.map(usr => {
                        const validasi = bcrypt.compareSync(request.nim, usr.nim);
                        if(!validasi){
                            return response.status(401).send({
                                message: "Password incorrect",
                                access_token: null
                            })
                        }

                        const access_token = jwt.sign({
                            id: usr._id, 
                        }, access_token_secret, {expiresIn: '20m'});

                        const refresh_token = jwt.sign({
                            id: usr._id,
                        }, refresh_token_secret);

                        response.status(200).send({
                            id: usr._id,
                            token_access: access_token, 
                            refresh_token: refresh_token
                        });
                    })
                }else{
                    return response.status(404).send("User unknown")
                }
            })
        },
    verifyToken: function(request, response){
        if (request.headers && request.headers.authorization && request.headers.authorization.split(" ")[0] === 'JWT'){
            jwt.verify(request.headers.authorization.split(" ")[1], access_token_secret, function(err, decode){
                const connection = mongo.getDb();
                if (err) throw err
                connection
                    .collection("testAPI")
                    .find({
                        id: decode._id
                    })
                    .toArray((err, user) => {
                        if(err){
                            return response.status(403).send({
                                message: err
                            });
                        }else{
                            request.user = user;
                            if(request.user !== undefined){
                                response.status(200).send({
                                    message: 'OK'
                                })
                            }else{
                                response.status(403).send({
                                    message:"gagal authorizasi"
                                })
                            }
                        }
                    })
            });
        }else{
            request.user = undefined;
        }
    },
}