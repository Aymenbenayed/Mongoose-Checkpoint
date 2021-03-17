//require express
const express = require('express')
//const Router = require('express')
//routes 
const router = express.Router()

//require user model 
const User = require ('../models/User')

    //*********** Routes ********** */
/**
 * @desc : Get all users
 * @path : 'http://localhost:7000/api/users/'
 * @method : GET
 * @data : req.body
 * @acess : pub
 */
    
    router.get('./', async (req , res) => {
        try {
            const listUsers = await User.find()
            res.status(200).send({ msg : 'this is the list of users' , listUsers})
        } catch (error) {
            res.status(400).send({ msg : 'can not get all users ! ' ,error})
        }
    })
/**
* @desc : Add user
* @path : 'http://localhost:7000/api/users/'
* @method : POST
* @data : req.body
* @acess : public
*/

        router.post('./', async (req , res) => {
        try {
            const { name , email , phone } = req.body
            const newUser = new User({
                name,
                email,
                phone 
            })
            await newUser.save()
            res.status(200).send({ msg : 'User added successfully ...' , newUser})
        } catch (error) {
            res.status(400).send({ msg : 'User can not be added ...' ,error})
        }
    })

    
/** 
*@desc : update user
*@path : 'http://localhost:7000/api/users/:_id'
*@method : UPDATE
*@data : req.params & req.body
*@acess : public
*/ 

router.put('/:_id',async(req,res)=>{
    try {
        const result = await User.updateOne({ _id },{$set : {...req.body}})
        res.status(200).send({msg : 'User is updated ... '})
        }
    catch (error) {
        res.status(400).send({msg : "Can not update User with this id !!  "})
    }})


    /** 
*@desc : Delete user
*@path : 'http://localhost:7000/api/users/:_id'
*@method : DELETE
*@data : req.params
*@acess : public
*/ 


router.delete('/:_id',async(req,res)=>{
    try {
        const { _id} = req.params
        const userToDelete = await User.findOneAndDelete({ _id })
        if (!userToDelete) {
            res.status(400).send({msg:'user already deleted !!! '})
            return
        }
        res.status(200).send({msg : "User is Deleted ... " })
    } catch (error) {
        res.status(400).send({msg : "Can not delete User with this id !!  "})
    }
})


    module.exports = router