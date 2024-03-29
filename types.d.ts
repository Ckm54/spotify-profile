export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
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
  items: FollowedArtist[];
  next: string;
  total: number;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface Cursors {
  after: string;
}

export interface FollowedArtist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: ArtistType;
  uri: string;
}

export interface TopArtists {
  items: TopArtistProfile[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: null;
}

export interface TopArtistProfile {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface TopTracks {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: null;
}

export interface ArtistTopTracksType {
  tracks: Track[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track_number: number;
  type: string;
  uri: string;
}

export interface RelatedArtistsData {
  artists: RelatedArtistsType[];
}

export interface RelatedArtistsType {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: ArtistType;
  uri: string;
}

// *PLAYLISTS
export interface Playlists {
  href: string;
  items: Playlist[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: PlaylistImage[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface PlaylistImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Tracks {
  href: string;
  total: number;
}

// **********************RECENTLY PLAYED TRACKS
export interface RecentPlays {
  items: RecentTrack[];
  next: string;
  cursors: PlayCursors;
  limit: number;
  href: string;
}

export interface PlayCursors {
  after: string;
  before: string;
}

export interface RecentTrack {
  track: Track;
  played_at: Date;
  context: Context;
}

export interface Context {
  type: ContextType;
  external_urls: ExternalUrls;
  href: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: TrackType;
  uri: string;
}

export enum AlbumGroup {
  Album = "album",
  Single = "single",
}

export enum ReleaseDatePrecision {
  Day = "day",
}

// ***************************ARTIST PROFILE
export interface ArtistProfile {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

//***********************ARTIST ALBUMS */
export interface ArtistAlbumsType {
  href: string;
  items: Album[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

//************************PLAYLIST INFORMATION */
export interface PlaylistInfoType {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: PlaylistImages[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface PlaylistImages {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Owner {
  display_name?: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type?: OwnerType;
  uri: string;
  name?: string;
}

export enum OwnerType {
  Artist = "artist",
  User = "user",
}

export interface PlaylistTracks {
  href: string;
  items: PlaylistTrackType[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface PlaylistTrackType {
  added_at: Date;
  added_by: Owner;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface Track {
  album: PlaylistAlbum;
  artists: Owner[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track: boolean;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface PlaylistAlbum {
  album_group: PlaylistAlbumGroup;
  album_type: PlaylistAlbumGroup;
  artists: Owner[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: PlaylistAlbumReleaseDatePrecision;
  total_tracks: number;
  type: PlaylistAlbumGroup;
  uri: string;
}

export enum PlaylistAlbumGroup {
  Album = "album",
  Compilation = "compilation",
  Single = "single",
}

export enum PlaylistAlbumReleaseDatePrecision {
  Day = "day",
  Year = "year",
}

export enum TrackType {
  Track = "track",
}

export interface VideoThumbnail {
  url: null;
}

//*******************************TRACK AUDIO FEATURES */
export interface TrackAudioFeaturesType {
  audio_features: AudioFeature[];
}

export interface AudioFeature {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: AudioFeaturesType;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
}

export enum AudioFeaturesType {
  AudioFeatures = "audio_features",
}

//*******************************ALBUM INFO TYPE */
export interface AlbumInfoType {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: AlbumExternalIDS;
  external_urls: ExternalUrls;
  genres: any[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  tracks: AlbumTracks;
  type: string;
  uri: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Copyright {
  text: string;
  type: string;
}

export interface AlbumExternalIDS {
  upc: string;
}

export interface AlbumTracks {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: ItemType;
  uri: string;
}

export enum ItemType {
  Track = "track",
}

//*****************************TRACK INFORMATION RESPONSE */
export interface TrackInfoResponseType {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ExternalIDS {
  isrc: string;
}

// *************************QUERY TYPES
export interface TopItemsParams {
  limit: number;
  timeRange: string;
}
