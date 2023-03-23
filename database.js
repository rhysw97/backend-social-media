const {MongoClient, Collection} = require('mongodb')

class Database {
    constructor(uri) {
        this.client = new MongoClient(uri)
    }

    async addUserToDatabase(databaseName, collectionName, data) {
        
        try{
            await this.client.connect();

            const emailCheck  = await this.client.db(databaseName).collection(collectionName).findOne({email: data.email})

            const usernameCheck  = await this.client.db(databaseName).collection(collectionName).findOne({username: data.username})


            const errors = {
                email: this.checkData(emailCheck),
                username: this.checkData(usernameCheck),
            }

            if(!errors.username && !errors.email) {
                await this.client.db(databaseName).collection(collectionName).insertOne(data)
            } else {
                console.log("Not add due to duplicate")
            }

            this.client.close()
            return errors
        
        } catch(e) {
            console.error(e)
        }
    }

    checkData = dataToCheck => dataToCheck? true: false

    addDataToDataBase(database, collectionName, data) {

    }

    async checkLoginDetails(databaseName, collectionName, data ) {
        try {
            await this.client.connect()
            const loginCheck  = await this.client.db(databaseName).collection(collectionName).findOne({email: data.email, password: data.password})
            console.log(loginCheck)
            this.client.close()
            return loginCheck
        } catch(e) {
            console.error(e)
        }
    }
    async listDatabases() {
        const databasesList = await this.client.db().admin().listDatabases()
        console.log("Databases:")
    
        databasesList.databases.forEach(database => {
            console.log(database.name)
        });
    }

    async getDataFromCollection(database, collectionName, response) {
        await this.client.connect()
        const getPosts = await this.client.db(database).collection(collectionName).find({})
        console.log(getPosts)
        response.send(getPosts)
    }
}

module.exports = {Database}