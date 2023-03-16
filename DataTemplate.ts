interface UserData {
    id: number
    email: string
    username: string
    dateOfBirth: string
    age: number
    password: string //Contains at least one uppercase, lowercase, number and special char
    //(must also be more than 8 letters)
    profilePiture: File //using GridFS
    about: string
    genres: Array<string> //list of genres the person is interested in
    interestedGigs: Array<GigData> //list of gigs the user has registered there interest with
    postHistory: Array<PostData>
}

interface GigData {
    artist: String
    genre: String
    location: GigLocationData
    date: string
    time: string
    eventPicture: File
}

interface GigLocationData {
    streetAddress:string
    city: string
    country: string
    postcode: string
}

interface PostData {
    username: string
    likedBy: Array<LikedUserData>
    comments: CommentData
    timePosted: string
    attachedFiles: File
}

interface LikedUserData {
    username: string
    profileURL: string
    profilePicture: File
}

interface CommentData {
    userName: string
    username: string
    likedBy: Array<LikedUserData>
    timePosted: string
}

