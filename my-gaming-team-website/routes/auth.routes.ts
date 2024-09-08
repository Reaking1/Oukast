import express, { Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Admin from '../models/admin.model'
import dotenv from 'dotenv'



dotenv.config(); // Ensure environment variables are loaded


const router = express.Router()
const secretKey = process.env.JWT_SECRET!

//Basic structure for signup and login routes
router.post('/signup', async (req: Request, res: Response) => {
    //Signup logic will go here
    const {email, name, surname, dateOfBirth, role, password} = req.body;

    try{
        //Check if the email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if(existingAdmin) {
            return res.status(400).json({ message: 'Email is already in use'})
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt);

        //Create new admin
        const newAdmin = new Admin({
            email,
            name,
            surname,
            dateOfBirth: new Date(dateOfBirth),
            role,
            password: hashedPassowrd,
        });

        //Save the admin to the database
         await newAdmin.save();

         //Generate a token
         const token = jwt.sign({id: newAdmin._id, role: newAdmin.role}, secretKey, {expiresIn: '1h'});

         // Return token and admin data
         res.status(201).json({ token, admin: newAdmin})
    } catch (err) {
        console.error('Signup error', err.message);
        res.status(500).json({ error: err.message})
    }
})

router.post('/login', async (req: Request, res: Response) => {
    //Login logic will go here
    const {email, password} = req.body;

    try {
        //Find the admin by email
        const admin = await Admin.findOne({ email });
        if(!admin) {
            return res.status(404).json({ message: 'Admin not found'})
        }
        //Compare the passowrd with the hased passowrd
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invail credentials'})
        }
        //Generate a token
        const token = jwt.sign({id: admin._id, role: admin.role}, secretKey, {expiresIn: '1h'});

        //Return the token
        res.json({ token})
    } catch (err) {
        console.error('Login error', err.message);
        res.status(500).json({ error: err.message})
    }

})


export default router;
