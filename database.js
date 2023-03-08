const {MongoClient} = require('mongodb')

class Database {
    constructor(uri) {
        this.client = new MongoClient(uri)
    }
    async checkDatabaseForEmail() {
     
        const result = await this.client.db('gigmates')
    }
    async addUserToDatabase(databaseName, collectionName, data) {
       
        try{
            await this.client.connect();
           
            const result = await this.client.db(databaseName).collection(collectionName).insertOne(data)
            console.log(`New user created with the following username: ${result.insertedId}`)
            console.log(result)
            const users = await this.client.db(databaseName).collection(collectionName).find()
            console.log(users)
        } catch(e) {
            console.error(e)
        } finally {
            await this.client.close()
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