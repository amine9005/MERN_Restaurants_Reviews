import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {

    static async apiPostUser(req,res,next){
        try{
            const user_id = req.body.user_id
            const user_name = req.body.user_name

            const response = await UsersDAO.addUser(user_id,user_name)
            res.status(200).json({status:"User added successfully"})
        } catch(err){
            res.status(500).json({ error: `Unable to add user: ${e.message}` })
        }
    }

    static async apiGetUser(req,res,next){
        try{
            const user_id = req.params.id
            console.log(`User ${user_id}`)
            const response = await UsersDAO.getUser(user_id)
            res.status(200).json(response)
        } catch(err){
            res.status(500).json({ error: `Unable to get user: ${e.message}` })
        }
    }
}