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
            profilePicture: String, 
            about: String,
            genres: Array, 
            interestedGigs: Array, 
            postHistory: Array,
            friendslist: Array
        })
        this.user = model('users', this.userSchema)
    }
    
    async addNewUser(userData) {
        const newUser = {
            email: userData.email,
            username: userData.username,
            dateOfBirth: userData.dateOfBirth,
            age: userData.age,
            password: userData.password, 
            profilePicture: '', 
            about: '',
            genres: [], 
            interestedGigs: [], 
            postHistory: [],
            friendslist: [],
            artists: []
        }
        
        const doesUserExist= {
            email: await this.checkDataIsInDatabase({email: newUser.email}),
            username: await this.checkDataIsInDatabase({username: newUser.username})
        }

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
        if(userData) {
            if(userData.password === data.password) {
                return {accepted: true, username: userData.username}
            }
        }
        return {accepted: false, username: ''}
    }

    async updateProfile(data) {
       
        const userData = await this.user.findOneAndUpdate({username: data.username}, )
        if(userData) {
            userData.profilePicture = data.profilePicture
            userData.about = data.about
            userData.genres = data.genres
            userData.interestedGigs = data.interestedGigs
            userData.artists = data.artists 
        }
    }

    async getProfileData(username, response) {
        const userData = await this.user.findOne({username: username})
        console.log(userData)
        if(userData) {
            response.send(userData)
        }
    }

    async getProfilePicture(username, response) {
        const userData = await this.user.findOne({username: username})
        if(userData) {
            response.send(userData.profilePicture)
        }
    }

    async updatePassword(username, password) {
        console.log(password)
        const user = await this.user.findOneAndUpdate({name: username}, {$set:{password: password}}, {new: true})
        console.log(user)
    }

    async returnProfilePicture(username) {
        const userData = await this.user.findOne({username: username})
        if(userData) {
            return userData.profilePicture
        }
    }

}

module.exports = {
    User
}