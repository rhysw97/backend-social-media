const {MongoClient} = require('mongodb')

async function main() {
    const uri = "mongodb+srv://Rhysw97:SiameseLeopard03@gigmates.55nl0ue.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri)
    try {
        await client.connect();

        await findOneListingByName(client, "Infinite Views")
    } catch (e) {
        console.error(e);
    } finally {
        await client.close()
    }
}


main().catch(console.error)

function findListingsByMinimum(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: {$gte: minimumNumberOfBedrooms},
        bathrooms: {$gte: minimumNumberOfBathrooms}
    })
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing})

    if(result) {
        console.log(`Found a listing in the collection with the name ${nameOfListing}`)
        console.log(result)
    } else {
        console.log(`No listings found with name ${nameOfListing}`)
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases()
    console.log("Databases:")

    databasesList.databases.forEach(database => {
        console.log(database.name)
    });
}

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing)
    console.log(`New listing created with the following id: ${result.insertedId}`)
}

async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings)

    console.log(`${result.insertedCount} new listings created with the following id(s):`)
    console.log(result.insertedIds)
}