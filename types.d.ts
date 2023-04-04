export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
      filter_enabled: boolean,
      filter_locked: boolean
  },
  external_urls: { spotify: string; };
  followers: { href: string; total: number; };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface TokenState {
  token: String | null;
}

export interface ArtistsFollowed {
  artists: Artists;
}

export interface Artists {
  items:   FollowedArtist[];
  next:    string;
  total:   number;
  cursors: Cursors;
  limit:   number;
  href:    string;
}

export interface Cursors {
  after: string;
}

export interface FollowedArtist {
  external_urls: ExternalUrls;
  followers:     Followers;
  genres:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity:    number;
  type:          Type;
  uri:           string;
}

export interface TopArtists {
  items:    TopArtistProfile[];
  total:    number;
  limit:    number;
  offset:   number;
  href:     string;
  next:     string;
  previous: null;
}

export interface TopArtistProfile {
  external_urls: ExternalUrls;
  followers:     Followers;
  genres:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity:    number;
  type:          string;
  uri:           string;
}

export interface TopTracks {
  items:    Track[];
  total:    number;
  limit:    number;
  offset:   number;
  href:     string;
  next:     string;
  previous: null;
}

export interface Track {
  album:             Album;
  artists:           Artist[];
  available_markets: string[];
  disc_number:       number;
  duration_ms:       number;
  explicit:          boolean;
  external_ids:      ExternalIDS;
  external_urls:     ExternalUrls;
  href:              string;
  id:                string;
  is_local:          boolean;
  name:              string;
  popularity:        number;
  preview_url:       null | string;
  track_number:      number;
  type:              string;
  uri:               string;
}

export interface Album {
  album_type:             string;
  artists:                Artist[];
  available_markets:      string[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Image[];
  name:                   string;
  release_date:           Date;
  release_date_precision: string;
  total_tracks:           number;
  type:                   string;
  uri:                    string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  name:          string;
  type:          Type;
  uri:           string;
}

export enum Type {
  Artist = "artist",
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}


// *PLAYLISTS
export interface Playlists {
  href:     string;
  items:    Playlist[];
  limit:    number;
  next:     null;
  offset:   number;
  previous: null;
  total:    number;
}

export interface Playlist {
  collaborative: boolean;
  description:   string;
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  images:        PlaylistImage[];
  name:          string;
  owner:         Owner;
  primary_color: null;
  public:        boolean;
  snapshot_id:   string;
  tracks:        Tracks;
  type:          string;
  uri:           string;
}

export interface PlaylistImage {
  height: number | null;
  url:    string;
  width:  number | null;
}

export interface Owner {
  display_name:  string;
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  type:          string;
  uri:           string;
}

export interface Tracks {
  href:  string;
  total: number;
}


// **********************RECENTLY PLAYED TRACKS
export interface RecentPlays {
  items:   RecentTrack[];
  next:    string;
  cursors: PlayCursors;
  limit:   number;
  href:    string;
}

export interface PlayCursors {
  after:  string;
  before: string;
}

export interface RecentTrack {
  track:     Track;
  played_at: Date;
  context:   Context;
}

export interface Context {
  type:          ContextType;
  external_urls: ExternalUrls;
  href:          string;
}

export interface Track {
  album:             Album;
  artists:           Artist[];
  available_markets: string[];
  disc_number:       number;
  duration_ms:       number;
  explicit:          boolean;
  external_ids:      ExternalIDS;
  external_urls:     ExternalUrls;
  href:              string;
  id:                string;
  is_local:          boolean;
  name:              string;
  popularity:        number;
  preview_url:       string;
  track_number:      number;
  type:              TrackType;
  uri:               string;
}

export interface Album {
  album_group:            AlbumGroup;
  album_type:             AlbumGroup;
  artists:                Artist[];
  available_markets:      string[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Image[];
  name:                   string;
  release_date:           Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks:           number;
  type:                   AlbumGroup;
  uri:                    string;
}

export enum AlbumGroup {
  Album = "album",
  Single = "single",
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = "track",
}


// ***************************ARTIST PROFILE
export interface ArtistProfile {
  external_urls: ExternalUrls;
  followers:     Followers;
  genres:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity:    number;
  type:          string;
  uri:           string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href:  null;
  total: number;
}



// *************************QUERY TYPES
export interface TopItemsParams {
  limit: number;
  timeRange: string;
}