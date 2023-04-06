//register
import Mongoose from 'mongoose'
const {Schema, model} = Mongoose
import { UserData } from "../DataTemplate"
class User { 

    //types
    userSchema: any
    user: any
   constructor() { 
        this.userSchema=new Schema({
            id: String,
            email: String,
            username: String,
            dateOfBirth: String,
            age: Number,
            password: String, 
            profilePiture: File, 
            about: String,
            genres: Array, 
            interestedGigs: Array, 
            postHistory: Array,
            friendslist: Array
        })
        this.user = model('Users', this.userSchema)
    }
    
    addNewUser(userData: UserData ):boolean {
        const newUser = {
            email: userData.email,
            username: userData.username,
            dateOfBirth: userData.dateOfBirth,
            age: userData.age,
            password: userData.password, 
            profilePiture: '', 
            about: '',
            genres: [], 
            interestedGigs: [], 
            postHistory: [],
            friendslist: []
        }
        
        const doesUserExist= {
            email:  this.checkDataIsInDatabase(newUser.email),
            username: this.checkDataIsInDatabase(newUser.username)
        }

        const isNewUser = Object.values(doesUserExist).every(value => value=== true)
        if(isNewUser) {
            this.user.create(newUser)
            .catch(err=>{
                console.log("Error: "+err)
            })
            return true
        } else {
            return false
        }
    }
    
    checkDataIsInDatabase(data:any): boolean{
        if(this.user.find(data)) {
            return true
        } else {
            return false
        }
    }
}

module.exports = {
    User
}
