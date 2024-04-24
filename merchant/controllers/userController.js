const { mysqlConnection }  = require('../db_connections');
const bcrypt = require('bcrypt');
const validator = require('validator');

const registration = async(req,res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(400).json({success:false, message:"All Fields are required!"});
        if(!validator.isEmail(email)) return res.status(400).json({success:false, message:"Enter valid Email"});

        
        let existingUser ="SELECT * FROM users WHERE email=?";
        let value = [email];
        const [records] = await mysqlConnection.promise().query(existingUser, [value])
        if(records.length) return res.status(500).json({success:false, message:'User with same email already exist!'}) ;

        //Hashing password and saving in db
        const salt =  await bcrypt.genSalt(10);
        let newpassword = await bcrypt.hash(password,salt);
        const sql = "Insert into users (`name`, `email`, `password`) values (?)";
        value = [name, email, newpassword];

        await mysqlConnection.promise().query(sql, [value])
            .then((data) => {
                res.status(200).json({
                    success:true,
                    data:data
                }) })
            .catch((err) => {
                res.status(500).json({
                    success:false,
                    message:'Error encountered while registring : '+err     
                });
            })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error encountered while registring : '+err
        })
    }
}

const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({success:false, message:"All Fields are required!"});
        
        let existingUser ="SELECT * FROM users WHERE email=?";
        let value = [email];
        const [user] = await mysqlConnection.promise().query(existingUser, [value])
        if(!user.length) return res.status(500).json({success:false, message:'Enter valid email or password Or Register'});

        const IsPasswordValid = await bcrypt.compare(password,user[0].password);
        if(!IsPasswordValid) return res.status(400).json({success:false, message:"Invalid Email or Password"});

        //JWT Token
        
        return res.status(200).json({success:true,id:user[0].id,name:user[0].name, email:email, token:'token'});

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error encountered while login : '+err
        })
    }
}


const getUsers = async(req,res) => {
    try{
        const [data] = await mysqlConnection.promise().query('Select * from users');
        if(!data)
            return res.status(404).json({
                success:false,
                message: 'No Record Found'
            })
        res.status(200).json({
            success:true,
            message:'Records Found!',
            data: data[0],
        });
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:'Error while getting records : '+err
        })
    }
}

module.exports = { registration, login, getUsers }