export default `
    type Query {
       getBrackets(creationState: String): [Bracket]
    }

    type Competitor {
        id: ID!
        spotifyId: String!
        type: String!
        roundsWon: Int!
        bracketId: String
        index: Int!
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
