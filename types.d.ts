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

interface Image {
  url: string;
  height: number;
  width: number;
}

export interface TokenState {
  token: String | null;
}

export interface ArtistsFollowed {
  artists: Artists;
}

export interface Artists {
  items:   Item[];
  next:    string;
  total:   number;
  cursors: Cursors;
  limit:   number;
  href:    string;
}

export interface Cursors {
  after: string;
}

export interface Item {
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

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href:  null;
  total: number;
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

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href:  null;
  total: number;
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

export interface ExternalUrls {
  spotify: string;
}

export enum Type {
  Artist = "artist",
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

export interface ExternalIDS {
  isrc: string;
}


export enum Type {
  Artist = "artist",
}