export default `
    type Query {
       getBrackets(creationState: String): [Bracket]
       getBracket(id: String): Bracket
       newBracket: Bracket
    }

    type Album {
        id: ID
        album_type: String
        href: String
        name: String
        release_date: String
        release_date_precision: String
        total_tracks: Int
        type: String
        uri: String
        images: [Image]
    }

    type Image {
        url: String
        width: Int
        height: Int
    }

    type Track {
        duration: Int
        explicit: Boolean
        href: String
        popularity: Int
        preview_url: String
        type: String
        uri: String
        id: String
        disc_number: Int
        duration_ms: Int
        is_local: String
        is_playable: Boolean
        name: String
        track_number: Int
        album: Album
    }

    type Competitor {
        id: ID!
        spotifyId: String!
        type: String!
        roundsWon: Int!
        bracketId: String
        index: Int!
        spotifyData: Track
    }

    type Bracket {
        id: ID!
        name: String!
        description: String!
        creator: String!
        competitors: [Competitor!]
        creationState: String!
    }

`;
