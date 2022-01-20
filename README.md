# spotify-to-jekyll-action

Export a seaonsal Spotify playlist to YAML.

This workflow assumes that you named your Spotify playlists using the following format: `YYYY {season}`. Examples:

- `2021 Fall`
- `2021/2022 Winter`

You must also set the following [secrets to your repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to connect to Spotify. You can find these values from the [Spotify API dashboard](https://developer.spotify.com/dashboard):

- `SpotifyClientID`
- `SpotifyClientSecret`

<!-- START GENERATED DOCUMENTATION -->

## Set up the workflow

To use this action, create a new workflow in `.github/workflows` and modify it as needed:

````yml
name: Save Spotify playlist
on:
  schedule:
    - cron: "00 01 20 Mar,Jun,Sep,Dec *"

jobs:
  spotify_to_jekyll:
    runs-on: macOS-latest
    name: Save Spotify playlist and thumbnail
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Save the playlist
        uses: katydecorah/spotify-to-jekyll-action@v5.0.0
        env:
          SpotifyClientID: ${{ secrets.SpotifyClientID }}
          SpotifyClientSecret: ${{ secrets.SpotifyClientSecret}}
      - name: Save the thumbnail
        run: curl "${{ env.PlaylistImage }}" -o "img/playlists/${{ env.PlaylistImageOutput }}"
      - name: Commit files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A && git commit -m "🎵 ${{ env.playlist }}"
          git push
```<!-- END GENERATED DOCUMENTATION -->
````
