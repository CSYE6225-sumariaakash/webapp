import db from './../models/index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import authentication from '../config/authentication.js';

const user_table = db.users;
const Op = db.Sequelize.Op;
const saltRounds = 10;

var updated_first_name;
var updated_last_name;
var updated_password;

// Create and Save a new Tutorial
export const addUser = async (req, res) => {
   
    // Validate request
    if (req.body === Object || Object.keys(req.body).length === 0) {
      res.status(400).send();
      return;
    }else{
        var result = checkEmail(req.body.username);
        if(result == "incorrect"){
            res.status(400).send();
            return;
        }

        const userD = await user_table.findOne({ where: { username: req.body.username } });
        if (userD === null) {
            console.log('Not found!');
        } else {
            res.status(400).send();
            return;
        }

        // create UUID
        var uuid = uuidv4();

        // create bcrypt password with salt
        const encrypted_pwd = bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
               createUser(req.body, hash, uuid, res);
            });
        });
        }     
};

const createUser = (data, hash, uuid, res) =>{
    // Create a User
    const user = {
        id: uuid,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: hash
    };

    //Save user in the database
    user_table.create(user)
     .then(data => {
       res.status(201).send({
            id: data.id,
            first_name : data.first_name,
            last_name : data.last_name,
            username : data.username,
            updatedAt : data.updatedAt,
            createdAt : data.createdAt
       });
    })
    .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the user."
       });
     });
}

const passwordEncryption = (password) =>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          return hash;
        });
    });
}

export const updateUser = async (req, res) => { 
    const result = authentication(req);
    var user = result[0];
    var hash_pass = result[1];

    let id = req.params.id

    const userD = await user_table.findOne({ where: { username: user} });
    if (userD === null) {
        res.status(401).send();
        return;
    } else {
        const userD = await user_table.findOne({ where: { username: user, id: id } });
            if (userD === null) {
                res.status(403).send();
                return;
            } 
        const userdata = await getData(user);
        //console.log(userdata);
        const passComparison = comparePassword(userdata, hash_pass,req,res, user);
    }
}

export const getUser = async (req, res) => { 
    const result = authentication(req);
    let id = req.params.id
    var user = result[0];
    var hash_pass = result[1];

    const userD = await user_table.findOne({ where: { username: user} });
    if (userD === null) {
        res.status(401).send();
        return;
    } else {
            const userD = await user_table.findOne({ where: { username: user, id: id } });
            if (userD === null) {
                res.status(403).send();
                return;
            } 
        const userdata = await getData(user);
        const passComparison = compareGetPassword(userdata, hash_pass,res, user);
    }
    
}

const compareGetPassword = (userdata, hash_pass,res, user) =>{
    bcrypt.compare(hash_pass,userdata.password, (err, result) => {
        //console.log(result);
        if(!result){
            res.status(401).send();
        }else{
            user_table.findAll({ where: { username: user } })
                .then(data => {
                res.status(200).send({
                    id: data[0].id,
                    first_name : data[0].first_name,
                    last_name : data[0].last_name,
                    username : data[0].username,
                    updatedAt : data[0].updatedAt,
                    createdAt : data[0].createdAt
               });
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tutorials."
            });
            });
        }
    });
}

const getData = async (user) =>{
    const userD = await user_table.findOne({
        where: {
           username: user
        }
    }).then((data) =>{
        if (!data) {
            return 'not find';
        }
        return data.dataValues;
    });
    return userD;
}

const comparePassword = (userdata, hash_pass,req,res, user) =>{

    bcrypt.compare(hash_pass,userdata.password, (err, result) => {
        //console.log(result);
        if(!result){
            res.status(401).send();
        }else if(req.body.username){
            res.status(401).send();
        }else{
            const { first_name, last_name ,password } = req.body;

            if(first_name != null && first_name != userdata.first_name){
                updated_first_name = first_name
            }else{
                updated_first_name = userdata.first_name
            }

            if(last_name != null && last_name != userdata.last_name){
                updated_last_name = last_name
            }else{
                updated_last_name = userdata.last_name
            }

            if(password != null){
                //console.log(password);
                //console.log(userdata.password);
                bcrypt.compare(password, userdata.password, (err, result) => { 
                   console.log("result: " + result);
                    if(!result){
                        bcrypt.genSalt(saltRounds, (err, salt)=> {
                            bcrypt.hash(password, salt, (err, hash) => {
                                console.log("hash:" + hash);
                                updated_password = hash;
                            }); 
                        });
                    }else{
                        updated_password = userdata.password;
                    }
                });
            }
            console.log("updated_password: " + updated_password);

            setTimeout(() => {
                // Resolve the promise
                user_table.update({ first_name: updated_first_name, last_name: updated_last_name, password: updated_password }, { where: {username : user }})
                .then(userdata => 
                    res.status(204).send()
                )
                .catch();
            }, 1000);
        }
    });
}

export const findAllUser = (req, res) =>{
    //handles null error
//     user_model.findAll(req, function(err, employee) {
//         console.log('controller')
//         if (err)
//         res.send(err);
//         console.log('res', employee);
//         //res.send(employee);
// });
};

const checkEmail = (email) =>{
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email)) {
        return "incorrect";
    }else{
        return '';
    }
}