import { map } from "lodash";
import { db } from "../../index";
import { attachSpotify } from "../../../utils";
import { newTournament } from "../../../controllers/challonge";

const resolvers = {
  Query: {
    getBrackets: (parent, args) => {
      return db.Bracket.findAll({ where: args });
    },
    getBracket: (parent, args) => {
      return db.Bracket.findByPk(args.id, {
        include: [{ all: true }]
      })
        .then(bracket => {
          if (!bracket) return Promise.resolve([]);
          const asJson = bracket.toJSON();
          return Promise.all([
            asJson,
            ...map(asJson.competitors, attachSpotify)
          ]);
        })
        .then(([bracket]) => {
          return Promise.resolve(bracket);
        });
    },
    newBracket: () => {
      return db.Bracket.create();
    }
  },
  Mutation: {
    updateCompetitor: (parent, args) => {
      return db.Competitor.upsert(args.update).then(r => args.update);
    },
    updateBracket: (parent, args) => {
      return db.Bracket.upsert(args.update).then(r => args.update);
    },
    newTournament: (parent, args) => {
      return newTournament(args.update)
        .then(({ tournament }) => {
          const update = {
            ...args.update,
            challongeUrl: tournament.url,
            challongeId: tournament.id
          };
          return Promise.all([db.Bracket.upsert(update), update]);
        })
        .then(([_, update]) => {
          return update;
        });
    }
  }
};

export default resolvers;
