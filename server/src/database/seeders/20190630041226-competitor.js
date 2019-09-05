"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert(
        "Brackets",
        [
          {
            id: "bracketFixture",
            name: "The Tupac Bracket",
            description: "Tupac",
            creator: "West Coast",
            creationState: "started",
            createdAt: "2019-09-05 18:10:19",
            updatedAt: "2019-09-05 18:10:48"
          }
        ],
        {}
      )
      .then(() => {
        return queryInterface.bulkInsert(
          "Competitors",
          [
            {
              id: "000c3e08-b811-498e-a3f7-60dddef4f2e1",
              index: 21,
              type: "track",
              spotifyId: "4voEoczU7Ijborps9XF1n3",
              createdAt: "2019-09-05 18:10:10",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "041da18b-5174-4a38-9e2c-07ba044bef8e",
              index: 20,
              type: "track",
              spotifyId: "6tDxrq4FxEL2q15y37tXT9",
              createdAt: "2019-09-05 18:10:10",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "0a3f1961-7782-44b6-a009-a76723f3dea8",
              index: 8,
              type: "track",
              spotifyId: "0NzNKU2MJ9LCetT2uZMJH2",
              createdAt: "2019-09-05 18:10:28",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "208c55ce-13e5-4333-88a1-d01c3ea84d10",
              index: 0,
              type: "track",
              spotifyId: "37zQVgP3aTLKNvluXLB5Ii",
              createdAt: "2019-09-05 18:10:48",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "27a407b8-2c58-4a79-b783-a71391e62be8",
              index: 22,
              type: "track",
              spotifyId: "0Z2J91b2iTGLVTZC4fKgxf",
              createdAt: "2019-09-05 18:10:09",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "396ad161-5ead-4ae7-b850-72bf1ea6e12b",
              index: 10,
              type: "track",
              spotifyId: "7jLbTp3qZzah9kMIdW8e5M",
              createdAt: "2019-09-05 18:10:27",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "3d9dcecf-be08-41ef-88f2-32ef7c7660de",
              index: 19,
              type: "track",
              spotifyId: "0XRbYXQUymj9SJkrr8YK5B",
              createdAt: "2019-09-05 18:10:11",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "55cd7744-1205-475e-8296-4043293af7b1",
              index: 14,
              type: "track",
              spotifyId: "1ofhfV90EnYhEr7Un2fWiv",
              createdAt: "2019-09-05 18:10:17",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "5f01f177-449d-4f29-a66d-e1b9a9553ac7",
              index: 9,
              type: "track",
              spotifyId: "5Ddu4AaN1VaZ1MTg1neCl7",
              createdAt: "2019-09-05 18:10:27",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "62e30010-a0c3-4997-87b5-79f2e5e25af1",
              index: 12,
              type: "track",
              spotifyId: "7HFl64GKBtPTa5YoW7j4jL",
              createdAt: "2019-09-05 18:10:18",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "74d81fe7-e4fe-4346-a5d1-f2476353621b",
              index: 2,
              type: "track",
              spotifyId: "4L1aB9H3HGsVstHlOM6Yz6",
              createdAt: "2019-09-05 18:10:46",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "79ebe3f2-6601-4514-9f0b-f3a6ab5e87b8",
              index: 15,
              type: "track",
              spotifyId: "1eduDdsjMO7Or4EXnMf2iS",
              createdAt: "2019-09-05 18:10:16",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "87147c05-2ca1-4f53-9b2c-8904cdb4aaa0",
              index: 25,
              type: "track",
              spotifyId: "3ssX20QT5c3nA9wk78V1LQ",
              createdAt: "2019-09-05 18:10:06",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "888a1502-984f-4c3f-bcc4-6c7117285645",
              index: 7,
              type: "track",
              spotifyId: "1JClFT74TYSXlzpagbmj0S",
              createdAt: "2019-09-05 18:10:40",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "a7fd4be4-b7ae-41da-b5d3-db63cd86e032",
              index: 3,
              type: "track",
              spotifyId: "3ivJymJnoceuUUe7wTP6m4",
              createdAt: "2019-09-05 18:10:44",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "ab03e691-ee3b-4c51-b008-2c95c19b5afb",
              index: 6,
              type: "track",
              spotifyId: "6EVKzzNM0ZhEvJTBk2SACX",
              createdAt: "2019-09-05 18:10:40",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "ac335202-7a19-4278-a1ab-a976fc385f2c",
              index: 5,
              type: "track",
              spotifyId: "00i2HU7TEzzftShjRrDSEF",
              createdAt: "2019-09-05 18:10:41",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "b32ea3b4-bb43-4cc5-b55a-f4bba8e7c9cf",
              index: 23,
              type: "track",
              spotifyId: "3djNBlI7xOggg7pnsOLaNm",
              createdAt: "2019-09-05 18:10:08",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "b7840216-3697-4884-a75e-9336131d4211",
              index: 13,
              type: "track",
              spotifyId: "2zoobJFEB9h15fjYjRd6oP",
              createdAt: "2019-09-05 18:10:18",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "b9a939ef-d2f5-454d-a68a-957a4e9bb564",
              index: 16,
              type: "track",
              spotifyId: "3ia3dJETSOllPsv3LJkE35",
              createdAt: "2019-09-05 18:10:16",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "c2a8b004-4af7-4a69-ad02-c2e7b8f653bc",
              index: 24,
              type: "track",
              spotifyId: "2xTft6GEZeTyWNpdX94rkf",
              createdAt: "2019-09-05 18:10:07",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "e271eaa4-50ab-41b2-a56e-260163854dfb",
              index: 17,
              type: "track",
              spotifyId: "13XHuE00ElL5thSxkaEXxK",
              createdAt: "2019-09-05 18:10:13",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "ec198b8c-9b23-4561-b7ab-ce45b8ceec18",
              index: 18,
              type: "track",
              spotifyId: "4AE7Lj39VnSZNOmGH2iZaq",
              createdAt: "2019-09-05 18:10:12",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "ee0cbd3c-d52c-47f4-861c-76a6aff26c3d",
              index: 4,
              type: "track",
              spotifyId: "76wJIkA63AgwA92hUhpE2V",
              createdAt: "2019-09-05 18:10:43",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "f477c089-c567-4829-ae20-a75d4b2785c3",
              index: 11,
              type: "track",
              spotifyId: "09EwNbGvUyu7BDEYG0cJro",
              createdAt: "2019-09-05 18:10:19",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            },
            {
              id: "f7fd7fa2-5d67-4963-b25b-2f24150d98da",
              index: 1,
              type: "track",
              spotifyId: "0ZDcLapel9chZ15ZNuOdD4",
              createdAt: "2019-09-05 18:10:47",
              updatedAt: "2019-09-05 18:10:48",
              bracketId: "bracketFixture"
            }
          ],
          {}
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkDelete("Competitors", null, {
        bracketId: "bracketFixture"
      })
      .then(() => {
        return queryInterface.bulkDelete("Brackets", null, {
          id: "bracketFixture"
        });
      });
  }
};
