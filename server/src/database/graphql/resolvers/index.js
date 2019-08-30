import { db } from "../../index";
import { map } from "lodash";
import { attachSpotify } from "../../../utils";

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
    // TODO: Seems to be breaking bracket after save
    updateCompetitor: (parent, args) => {
      return db.Competitor.upsert(args.update).then(r => args.update);
    }
  }
};

export default resolvers;
