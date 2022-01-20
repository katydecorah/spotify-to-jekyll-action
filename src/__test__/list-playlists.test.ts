import listPlaylists from "../list-playlists";

jest.mock("spotify-web-api-node", () => {
  return jest.fn().mockImplementation(() => {
    const userPlaylists = require("./fixtures/get-user-playlists.json");
    const playlistTracks = require("./fixtures/get-playlist-tracks.json");
    return {
      clientCredentialsGrant: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ body: { access_token: "token" } })
        ),
      setAccessToken: jest.fn(),
      getUserPlaylists: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ body: userPlaylists })),
      getPlaylistTracks: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ body: { items: playlistTracks } })
        ),
    };
  });
});

jest.mock("@actions/core");

describe("listPlaylists", () => {
  test("returns", async () => {
    expect(await listPlaylists("2021 Fall")).toMatchInlineSnapshot(`
      Object {
        "formatted_name": "2021-fall",
        "image": "https://mosaic.scdn.co/640/ab67616d0000b27304a205b54b5c1fbae8543efaab67616d0000b27364fa86e376b0279aa49a1832ab67616d0000b273acddc5a09b8cb4730995b60aab67616d0000b273ba738766498bddccae3d319a",
        "name": "2021 Fall",
        "tracks": Array [
          Object {
            "album": "one hand on the steering wheel the other sewing a garden",
            "artist": "Ada Lea",
            "name": "can't stop me from dying",
          },
          Object {
            "album": "No Shadow",
            "artist": "Hyd",
            "name": "No Shadow",
          },
          Object {
            "album": "Trip To Japan",
            "artist": "The Shacks",
            "name": "Trip To Japan",
          },
          Object {
            "album": "Keeper",
            "artist": "Hana Vu",
            "name": "Maker",
          },
          Object {
            "album": "Doomin' Sun",
            "artist": "Bachelor, Jay Som, Palehound",
            "name": "Anything at All",
          },
          Object {
            "album": "Would You Mind Please Pulling Me Close?",
            "artist": "Tasha",
            "name": "Would You Mind Please Pulling Me Close?",
          },
          Object {
            "album": "Genesis",
            "artist": "Spencer.",
            "name": "Genesis",
          },
          Object {
            "album": "Old Peel",
            "artist": "Aldous Harding",
            "name": "Old Peel",
          },
          Object {
            "album": "Everybody's Birthday",
            "artist": "Hana Vu",
            "name": "Everybody's Birthday",
          },
          Object {
            "album": "The Baby",
            "artist": "Samia",
            "name": "Big Wheel",
          },
          Object {
            "album": "-io",
            "artist": "Circuit des Yeux",
            "name": "Dogma",
          },
          Object {
            "album": "private LIFE",
            "artist": "Virginia Wing",
            "name": "I'm Holding Out For Something",
          },
          Object {
            "album": "Blue Weekend",
            "artist": "Wolf Alice",
            "name": "Delicious Things",
          },
          Object {
            "album": "Bottle Episode",
            "artist": "Mandy, Indiana",
            "name": "Bottle Episode",
          },
          Object {
            "album": "The Gaping Mouth",
            "artist": "Lowertown",
            "name": "The Gaping Mouth",
          },
          Object {
            "album": "Fantasize Your Ghost",
            "artist": "Ohmme",
            "name": "3 2 4 3",
          },
          Object {
            "album": "You Think It's Like This But Really It's Like This",
            "artist": "Mirah",
            "name": "Of Pressure",
          },
          Object {
            "album": "When the Sun Comes Up",
            "artist": "Greta Morgan",
            "name": "When the Sun Comes Up",
          },
          Object {
            "album": "Ceremony",
            "artist": "Anna von Hausswolff",
            "name": "Mountains Crave",
          },
        ],
        "url": "https://open.spotify.com/playlist/2YnPs9UNBkJpswmsRNwQ1o",
      }
    `);
  });
});
