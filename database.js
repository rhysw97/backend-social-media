const {MongoClient} = require('mongodb')

class Database {
    constructor(uri) {
        this.client = new MongoClient(uri)
    }
    async checkDatabaseForEmail() {
     
        const result = await this.client.db('gigmates')
        console.log(result)
    }
    async addUserToDatabase(databaseName, collectionName, data) {
       
        try{
            await this.client.connect();
    
            const added = await this.client.db(databaseName).collection(collectionName).insertOne(data)
            console.log(`New user created with the following username: ${added.insertedId}`)
            const users = []
            this.client.db(databaseName).collection(collectionName).find({}).toArray((err, result) => {
                if (err) throw err
                console.log(result)
            })
            console.log(users)
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