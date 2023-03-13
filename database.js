const {MongoClient, Collection} = require('mongodb')

class Database {
    constructor(uri) {
        this.client = new MongoClient(uri)
    }
    async checkDatabaseForEmail() {
     
        const result = await this.client.db('gigmates')
        console.log(result)
    }
    async addUserToDatabase(databaseName, collectionName, data) {
        const errors = {
            email: false,
            username: false,
        }
        try{
            await this.client.connect();

            const emailCheck  = await this.client.db(databaseName).collection(collectionName).findOne({email: data.email})

            const usernameCheck  = await this.client.db(databaseName).collection(collectionName).findOne({username: data.username})
            
            if(emailCheck) {
                errors.email = true
            } else {
                errors.email = false
            }

            if(usernameCheck) {
                errors.username = true
            } else {
                errors.username = false
            }

            if(!errors.username && !errors.email) {
                const added = await this.client.db(databaseName).collection(collectionName).insertOne(data)
            } else {
                console.log("Not add due to duplicate")
            }

            this.client.close()
            return errors
        
        } catch(e) {
            console.error(e)
        }
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
}

module.exports = {Database}