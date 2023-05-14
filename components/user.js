//register
const Mongoose = require('mongoose')
const {Schema, model} = Mongoose

class User {
   constructor() { 
        this.userSchema=new Schema({
            id: String,
            email: String,
            username: String,
            dateOfBirth: String,
            age: Number,
            password: String, 
            profilePiture: String, 
            about: String,
            genres: Array, 
            interestedGigs: Array, 
            postHistory: Array,
            friendslist: Array
        })
        this.user = model('Users', this.userSchema)
    }
    
    async addNewUser(userData) {
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
            email: await this.checkDataIsInDatabase({email: newUser.email}),
            username: await this.checkDataIsInDatabase({username: newUser.username})
        }

        console.log(doesUserExist)

        
        if(!doesUserExist.email && !doesUserExist.username) {
            this.user.create(newUser)
            .catch(err=>{
                console.log("Error: "+err)
            })
        }
        return doesUserExist;
    }
    
    async checkDataIsInDatabase(data){
        const isInDatabase = await this.user.findOne(data)
        console.log('hey', isInDatabase)
        if(isInDatabase) {
            return true
        } else {
            return false
        }
    }

    async checkLoginDetails(data) {
        const userData = await this.user.findOne({email: data.email})
        console.log(userData)
        if(userData) {
            if(userData.password === data.password) {
                return {accepted: true, username: userData.username}
            }
        }
        return {accepted: false, username: ''}
    }

    async updateProfile(data) {
       
        const userData = await this.user.findOne({username: data.username})
        if(userData) {
            userData.profilePicture = data.profilePiture
            userData.about = data.about
            userData.genres = data.genres
            userData.interestedGigs = data.interestedGigs
            userData.save()
          
        }
    }

    async getProfileData(data, response) {
        const userData = await this.user.findOne({username: data.username})
        if(userData) {
            response.send(userData)
        }
    }

}

module.exports = {
    User
}
