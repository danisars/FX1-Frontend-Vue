import { GraphQLClient , gql } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Channel = {
  __typename?: 'Channel';
  Livestream?: Maybe<Livestream>;
  channelGroupID: Scalars['String'];
  createdAt?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  livestreamID?: Maybe<Scalars['String']>;
  lockerRoomID: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  type: Scalars['String'];
  unreadMessagesCount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['Float']>;
};

export type ChannelAndChannelGroup = {
  __typename?: 'ChannelAndChannelGroup';
  ChannelGroups?: Maybe<Array<Maybe<ChannelGroup>>>;
  Channels?: Maybe<Array<Maybe<Channel>>>;
};

export type ChannelGroup = {
  __typename?: 'ChannelGroup';
  Channels?: Maybe<Array<Maybe<Channel>>>;
  createdAt?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  group: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  lockerRoomID: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
  withLivestream?: Maybe<Scalars['Boolean']>;
};

export type ChannelGroups = {
  __typename?: 'ChannelGroups';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<ChannelGroup>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type Channels = {
  __typename?: 'Channels';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Channel>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type Club = {
  __typename?: 'Club';
  Avatar?: Maybe<Media>;
  CoverPhoto?: Maybe<Media>;
  createdAt?: Maybe<Scalars['Float']>;
  defaultChannelSlug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  leagueID?: Maybe<Scalars['String']>;
  leagueName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  sportIDs: Array<Scalars['String']>;
  supporterCount?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Float']>;
};

export type Clubs = {
  __typename?: 'Clubs';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Club>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type FanGroup = {
  __typename?: 'FanGroup';
  Avatar?: Maybe<Media>;
  CoverPhoto?: Maybe<Media>;
  createdAt?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  sportIDs: Array<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
};

export type FanGroups = {
  __typename?: 'FanGroups';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<FanGroup>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type InputCreateChannel = {
  channelGroupID: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
  userIDs: Maybe<Array<Maybe<Scalars['String']>>>
};

export type InputCreateChannelGroup = {
  description?: InputMaybe<Scalars['String']>;
  lockerRoomID: Scalars['String'];
  name: Scalars['String'];
};

export type InputCreateClub = {
  Avatar?: InputMaybe<InputMedia>;
  CoverPhoto?: InputMaybe<InputMedia>;
  leagueID: Scalars['String'];
  name: Scalars['String'];
  sportIDs: Array<Scalars['String']>;
};

export type InputEditChannel = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
};

export type InputEditChannelGroup = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type SportsWithIcon = {
  __typename?: 'SportsWithIcon',
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<NewSport>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type GetGamePartners = {
  __typename?: 'SportsWithIcon',
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<GamePartner>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type InputEditClub = {
  Avatar?: InputMaybe<InputMedia>;
  CoverPhoto?: InputMaybe<InputMedia>;
  name: Scalars['String'];
};

export type InputEditUser = {
  Avatar?: InputMaybe<InputMedia>;
};

export type InputInviteUserForManagerialRole = {
  emailAddress?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type InputMedia = {
  objectID: Scalars['String'];
  objectType: Scalars['String'];
};

export type InputQueryMedia = {
  isSport: Scalars['Boolean'];
  objectID: Scalars['String'];
  objectType: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};

export type InputUpdateLockerRoomUserRoles = {
  role?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  userID: Scalars['String'];
};

export type InputUser = {
  Avatar?: InputMaybe<InputMedia>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type League = {
  __typename?: 'League';
  Avatar?: Maybe<Media>;
  CoverPhoto?: Maybe<Media>;
  boost?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  sportIDs: Array<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
};

export type Leagues = {
  __typename?: 'Leagues';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<League>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type Livestream = {
  __typename?: 'Livestream';
  LivestreamSource?: Maybe<LivestreamSource>;
  createdAt?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  isLive?: Maybe<Scalars['Boolean']>;
  link: Scalars['String'];
  source: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
};

export type LivestreamSource = {
  __typename?: 'LivestreamSource';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type LockerRoom = {
  __typename?: 'LockerRoom';
  ChannelGroups?: Maybe<Array<Maybe<ChannelGroup>>>;
  Club?: Maybe<Club>;
  FanGroup?: Maybe<FanGroup>;
  League?: Maybe<League>;
  /** Return role if either owner or manager else null */
  MyRole?: Maybe<UserRole>;
  Roles?: Maybe<UserRolesInLockerRoom>;
  Sports?: Maybe<Array<Maybe<Sport>>>;
  channelCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Float']>;
  defaultChannelSlug?: Maybe<Scalars['String']>;
  group: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  isSupported?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  sportsIDs: Array<Scalars['String']>;
  supporterCount?: Maybe<Scalars['Int']>;
  totalUnreadMessagesCount?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Float']>;
  Game: Maybe<Game>;
};

export type Game = {
  __typename?: 'Game';
  group?: Scalars['String'];
  sport?: Scalars['String'];
  gameID?: Scalars['Int'];
  date?: Scalars['Float'];
  points?: Scalars['Int'];
  team1ID?: Scalars['Int'];
  team1City?: Scalars['String'];
  team1Name?: Scalars['String'];
  team1Nickname?: Scalars['String'];
  team1DisplayName: Scalars['String'];
  team1Ranking?: Scalars['Int'];
  team1Score?: Scalars['Int'];
  team1Color?: Scalars['String'];
  team2ID?: Scalars['Int'];
  team2City?: Scalars['String'];
  team2Name?: Scalars['String'];
  team2Nickname?: Scalars['String'];
  team2DisplayName: Scalars['String'];
  team2Ranking?: Scalars['Int'];
  team2Score?: Scalars['Int'];
  team2Color?: Scalars['String'];
  location?: Scalars['String'];
  headline?: Scalars['String'];
  links?: [any];
  timeLeft?: Scalars['String'];
  competition?: Scalars['String'];
  coverImage?: Scalars['String'];
  pointsLevel?: Scalars['String'];
  highPoints?: Scalars['Int'];
  isReminded?: Maybe<Scalars['Boolean']>;
};

export type GamePartner = {
  id?: Scalars['Int'];
  name?: Scalars['String']
  slug?: Scalars['String'];
  Icon?: Media;
  isHidden?: Maybe<Scalars['Boolean']>;
}


export type LockerRooms = {
  __typename?: 'LockerRooms';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<LockerRoom>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type GetGames = {
  __typename?: 'GetGames';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Game>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
}

export type LockerRoomsByLeague = {
  __typename?: 'LockerRoomsByLeague';
  LockerRooms: LockerRooms;
  leagueID: Scalars['String'];
  leagueName: Scalars['String'];
};


export type LockerRoomsByLeagueLockerRoomsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
};

export type Me = {
  __typename?: 'Me';
  Avatar?: Maybe<Media>;
  Supporting?: Maybe<Array<LockerRoom>>;
  createdAt?: Maybe<Scalars['Float']>;
  emailAddress: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  uid: Scalars['String'];
  unseenNotifications: Scalars['Int'];
  updatedAt?: Maybe<Scalars['Float']>;
  username: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  PhotoURL?: Maybe<Scalars['String']>;
  isSport?: Maybe<Scalars['Boolean']>;
  objectID: Scalars['String'];
  objectType: Scalars['String'];
};

export type ZipCode = {
  __typename?: 'ZipCode';
  zip?: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  state?: Scalars['String'];
  city?: Scalars['String'];
  country?: Scalars['String'];
};

export type MediaPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type MediaMessage = {
  __typename?: 'MediaMessage';
  PhotoURL?: Maybe<Scalars['String']>;
  isSport?: Maybe<Scalars['Boolean']>;
  objectID: Scalars['String'];
  objectType: Scalars['String'];
};


export type MediaMessagePhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  Media?: Maybe<Array<MediaMessage>>;
  PhotoURLs?: Maybe<Array<PhotoUrl>>;
  RepliedTo?: Maybe<Message>;
  User?: Maybe<User>;
  channelSlug: Scalars['String'];
  chatID: Scalars['String'];
  createdAt?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  isDeletedEveryone?: Maybe<Scalars['Boolean']>;
  isDeletedSelf?: Maybe<Scalars['Boolean']>;
  isEdited?: Maybe<Scalars['Boolean']>;
  isUserBlocked?: Maybe<Scalars['Boolean']>;
  repliedToChatID?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  userID: Scalars['String'];
};

export type Messages = {
  __typename?: 'Messages';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Message>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type MessagesNextAsString = {
  __typename?: 'MessagesNextAsString';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Message>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  blockUser: MutationResult;
  createChannel: MutationResult;
  createChannelGroup: MutationResult;
  createClub: MutationResult;
  createFormEntry: MutationResult;
  createUser: MutationResult;
  addZipCode: MutationResult;
  deleteChannel: MutationResult;
  deleteChannelGroup: MutationResult;
  deleteFirebaseAccount: MutationResult;
  deleteImages: MutationResult;
  deleteMessage: MutationResult;
  deleteUser: MutationResult;
  editChannel: MutationResult;
  editChannelGroup: MutationResult;
  editClub: MutationResult;
  editLockerRoomUserRole: MutationResult;
  editMessage: MutationResult;
  editUser: MutationResult;
  inviteUserForManagerialRole: MutationResult;
  readMessage: MutationResult;
  readNotification: MutationResult;
  /** @deprecated Use createFormEntry with type 'RegisterInterest' instead */
  registerInterest: MutationResult;
  removeUserManagerialRole: MutationResult;
  respondUserManagerialRoleInvite: MutationResult;
  seenNotification: MutationResult;
  sendMessage: MutationResult;
  /** If UserRole exists as owner/manager, no changes will be made. */
  support: MutationResult;
  trackLogin: MutationResult;
  trackRegisterAccount: MutationResult;
  trackSendMessage: MutationResult;
  trackSupportLockerRoom: MutationResult;
  trackUnsupportLockerRoom: MutationResult;
  trackViewPage: MutationResult;
  trackCreatePrivateRoom: MutationResult;
  unblockUser: MutationResult;
  undeleteChannel: MutationResult;
  undeleteChannelGroup: MutationResult;
  /** If UserRole exists as owner/manager, no changes will be made. */
  unsupport: MutationResult;
  updateLockerRoomUserRoles: MutationResult;
  leavePrivateChannel: MutationResult;
  acceptInvitationToPrivateChannel: MutationResult;
};

export type MutationBlockUserArgs = {
  targetUserID: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  input: InputCreateChannel;
};


export type MutationCreateChannelGroupArgs = {
  input: InputCreateChannelGroup;
};


export type MutationCreateClubArgs = {
  input: InputCreateClub;
};


export type MutationCreateFormEntryArgs = {
  data?: InputMaybe<Scalars['JSON']>;
  type: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: InputUser;
};

export type MutationAddZipCodeArgs = {
  zipCode: Scalars['String'];
};

export type MutationDeleteChannelArgs = {
  id: Scalars['String'];
};


export type MutationDeleteChannelGroupArgs = {
  id: Scalars['String'];
};


export type MutationDeleteImagesArgs = {
  objectIDs: Array<Scalars['String']>;
};


export type MutationDeleteMessageArgs = {
  chatID: Scalars['String'];
  deleteForEveryone: Scalars['Boolean'];
  deleteForSelf: Scalars['Boolean'];
};


export type MutationEditChannelArgs = {
  id: Scalars['String'];
  input: InputEditChannel;
};


export type MutationEditChannelGroupArgs = {
  id: Scalars['String'];
  input: InputEditChannelGroup;
};


export type MutationEditClubArgs = {
  id: Scalars['String'];
  input: InputEditClub;
};


export type MutationEditLockerRoomUserRoleArgs = {
  lockerRoomID: Scalars['String'];
  role: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationEditMessageArgs = {
  Media?: InputMaybe<Array<InputMedia>>;
  MentionedUserIDs?: InputMaybe<Array<Scalars['String']>>;
  chatID: Scalars['String'];
  repliedToChatID?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};


export type MutationEditUserArgs = {
  input: InputEditUser;
};


export type MutationInviteUserForManagerialRoleArgs = {
  input: Array<InputInviteUserForManagerialRole>;
  lockerRoomID: Scalars['String'];
};


export type MutationReadMessageArgs = {
  channelSlug: Scalars['String'];
};


export type MutationReadNotificationArgs = {
  notificationIDs: Array<Scalars['String']>;
};


export type MutationRegisterInterestArgs = {
  data?: InputMaybe<Scalars['JSON']>;
  type: Scalars['String'];
};


export type MutationRemoveUserManagerialRoleArgs = {
  lockerRoomID: Scalars['String'];
  role: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationRespondUserManagerialRoleInviteArgs = {
  id: Scalars['String'];
};


export type MutationSeenNotificationArgs = {
  lastNotificationID: Scalars['String'];
};


export type MutationSendMessageArgs = {
  Media?: InputMaybe<Array<InputMedia>>;
  MentionedUserIDs?: InputMaybe<Array<Scalars['String']>>;
  channelSlug: Scalars['String'];
  chatID: Scalars['String'];
  repliedToChatID?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};


export type MutationSupportArgs = {
  lockerRoomID: Scalars['String'];
};

export type MutationAcceptInvitationToPrivateChannelArgs = {
  token: Scalars['String'];
};

export type MutationTrackLoginArgs = {
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  loginMethod: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  platform: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
};


export type MutationTrackRegisterAccountArgs = {
  avatar: Scalars['String'];
  avatarObjectID?: InputMaybe<Scalars['String']>;
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  invited: Scalars['Boolean'];
  ip?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  platform: Scalars['String'];
  registrationMethod: Scalars['String'];
  username: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
};


export type MutationTrackSendMessageArgs = {
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  channel: Scalars['String'];
  ip?: InputMaybe<Scalars['String']>;
  league?: InputMaybe<Scalars['String']>;
  lockerRoomType: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  os?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  platform: Scalars['String'];
  sport: Scalars['String'];
  type: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
};

export type MutationTrackCreatePrivateRoomArgs = {
  sport: Scalars['String'];
  league?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  platform: Scalars['String'];
  homeTeam: Scalars['String'];
  awayTeam: Scalars['String'];
  webDisplaySize: Scalars['String']
  pageName: Scalars['String']
  model: Scalars['String']
  browser: Scalars['String']
  browserVersion: Scalars['String']
  os: Scalars['String']
};

export type MutationTrackSupportLockerRoomArgs = {
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  league?: InputMaybe<Scalars['String']>;
  lockerRoomType: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  os?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  platform: Scalars['String'];
  sport: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
};


export type MutationTrackUnsupportLockerRoomArgs = {
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  league?: InputMaybe<Scalars['String']>;
  lockerRoomType: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  os?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  platform: Scalars['String'];
  sport: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
};


export type MutationTrackViewPageArgs = {
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  league?: InputMaybe<Scalars['String']>;
  lockerRoomType?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  platform: Scalars['String'];
  sport?: InputMaybe<Scalars['String']>;
  webDisplaySize?: InputMaybe<Scalars['String']>;
};


export type MutationUnblockUserArgs = {
  targetUserID: Scalars['String'];
};


export type MutationUndeleteChannelArgs = {
  id: Scalars['String'];
};


export type MutationUndeleteChannelGroupArgs = {
  id: Scalars['String'];
};


export type MutationUnsupportArgs = {
  lockerRoomID: Scalars['String'];
};


export type MutationUpdateLockerRoomUserRolesArgs = {
  input: Array<InputUpdateLockerRoomUserRoles>;
  lockerRoomID: Scalars['String'];
};

export type MutationLeavePrivateChannelArgs = {
  privateChannelID: Scalars['String'];
}

export type MutationResult = {
  __typename?: 'MutationResult';
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  timestamp?: Maybe<Scalars['Float']>;
};

/** This is viewable on the specified owner of the targetUserID. */
export type Notification = {
  __typename?: 'Notification';
  Actor: User;
  LockerRoom: LockerRoom;
  Message: Message;
  /** This is the uid of the one who replied or mentioned a user. */
  actorUid: Scalars['String'];
  /** This is the userID of the one who replied or mentioned a user. */
  actorUserID: Scalars['String'];
  channelName: Scalars['String'];
  channelSlug: Scalars['String'];
  /** This is the chatID of the reply or where a user got mentioned. */
  chatID: Scalars['String'];
  createdAt?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  isRead?: Maybe<Scalars['Boolean']>;
  isSeen?: Maybe<Scalars['Boolean']>;
  /** This is the messageID of the reply or where a user got mentioned. */
  messageID: Scalars['String'];
  /** This is the uid of the one who got replied to or mentioned. */
  targetUid: Scalars['String'];
  /** This is the userID of the one who got replied to or mentioned. */
  targetUserID: Scalars['String'];
  type: Scalars['String'];
};

export type NotificationWithMessages = {
  __typename?: 'NotificationWithMessages';
  Messages: Array<Message>;
  Notification: Notification;
};

export type Notifications = {
  __typename?: 'Notifications';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Notification>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type PhotoUrl = {
  __typename?: 'PhotoURL';
  photoURL?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Me?: Maybe<Me>;
  Supporting?: Maybe<Array<Maybe<LockerRoom>>>;
  channelExists?: Maybe<Scalars['Boolean']>;
  channelGroupExists?: Maybe<Scalars['Boolean']>;
  getAllUsersViaUsername: Users;
  getChannel?: Maybe<Channel>;
  getChannelGroup?: Maybe<ChannelGroup>;
  getChannelGroups: ChannelGroups;
  getChannels: Channels;
  getClub?: Maybe<Club>;
  getClubs: Clubs;
  getDeletedChannelAndChannelGroups?: Maybe<ChannelAndChannelGroup>;
  getFanGroup?: Maybe<FanGroup>;
  getFanGroups: FanGroups;
  getFeatured: Array<LockerRoom>;
  getFeaturedGame: Game;
  getGames: GetGames;
  getGame: Game,
  getLeague?: Maybe<League>;
  getLeagues: Leagues;
  getLockerRoom?: Maybe<LockerRoom>;
  getLockerRooms: LockerRooms;
  getMessage?: Maybe<Message>;
  getMessagesByChannelSlug: Messages;
  getMessagesByChannelSlugUsingCreatedAtAsCursor: MessagesNextAsString;
  /** API that will return the focused chat sandwiched between 1 message above if available and at least 1 message below */
  getMessagesByChannelSlugUsingCreatedAtAsCursorFromNotification: MessagesNextAsString;
  /** API that is a combination of getMessagesByChannelSlugUsingCreatedAtAsCursor (commented) and getMessagesByChannelSlugUsingCreatedAtAsCursorFromNotification */
  getMessagesByChannelSlugUsingCreatedAtAsCursorV2: MessagesNextAsString;
  getNotification?: Maybe<Notification>;
  getNotificationWithMessages?: Maybe<NotificationWithMessages>;
  getNotifications?: Maybe<Notifications>;
  getPhotoURL?: Maybe<Scalars['String']>;
  getPhotoURLs?: Maybe<Array<Maybe<Scalars['String']>>>;
  getSport?: Maybe<Sport>;
  getSports: Sports;
  getUnreadMessages?: Maybe<Array<Maybe<ReadMessage>>>;
  getUser?: Maybe<User>;
  getUserInvite?: Maybe<UserInvite>;
  getUserRolesInLockerRoom?: Maybe<UserRolesInLockerRoom>;
  getUsers: Users;
  getUsersByLockerRoom: Users;
  invitedUserExists?: Maybe<Scalars['Boolean']>;
  userNameExists?: Maybe<Scalars['Boolean']>;
  getAvailableMemebersForPrivateChannel?: Maybe<Array<Maybe<User>>>;
  getDynamicLink?: Maybe<Scalars['String']>;
  getActualLink?: Maybe<Scalars['String']>;
};

export type QueryGetAvailableMemebersForPrivateChannel = {
  $lockerRoomID: Scalars['String'],
  $next: Scalars['String'],
  $count: Scalars['Int'],
  $name: Scalars['String']
};

export type QueryChannelExistsArgs = {
  channelGroupID: Scalars['String'];
  name: Scalars['String'];
};


export type QueryChannelGroupExistsArgs = {
  lockerRoomID: Scalars['String'];
  name: Scalars['String'];
};


export type QueryGetAllUsersViaUsernameArgs = {
  text?: InputMaybe<Scalars['String']>;
};


export type QueryGetChannelArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetChannelGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetChannelsArgs = {
  channelGroupID?: InputMaybe<Scalars['String']>;
};


export type QueryGetClubArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetFanGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetLeagueArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetLockerRoomArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
};


export type QueryGetMessageArgs = {
  id: Scalars['String'];
};


export type QueryGetMessagesByChannelSlugArgs = {
  channelSlug: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMessagesByChannelSlugUsingCreatedAtAsCursorArgs = {
  channelSlug: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  direction: Scalars['String'];
};


export type QueryGetMessagesByChannelSlugUsingCreatedAtAsCursorFromNotificationArgs = {
  channelSlug: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type QueryGetMessagesByChannelSlugUsingCreatedAtAsCursorV2Args = {
  channelSlug: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  direction: Scalars['String'];
  withAdditional: Scalars['Boolean'];
};


export type QueryGetNotificationArgs = {
  id: Scalars['String'];
};


export type QueryGetNotificationWithMessagesArgs = {
  id: Scalars['String'];
};


export type QueryGetNotificationsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetPhotoUrlArgs = {
  isSport?: InputMaybe<Scalars['Boolean']>;
  objectID: Scalars['String'];
  objectType: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetPhotoUrLsArgs = {
  input: Array<InputQueryMedia>;
};


export type QueryGetSportArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetUnreadMessagesArgs = {
  lockerRoomID: Scalars['String'];
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserInviteArgs = {
  id: Scalars['String'];
  type: Scalars['String'];
  group: Scalars['String'];
};


export type QueryGetUserRolesInLockerRoomArgs = {
  lockerRoomID: Scalars['String'];
};


export type QueryGetUsersByLockerRoomArgs = {
  lockerRoomID: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
};


export type QueryInvitedUserExistsArgs = {
  id: Scalars['String'];
};


export type QueryUserNameExistsArgs = {
  username: Scalars['String'];
};

export type QueryDynamicLinkArgs = {
  privateChannelID: Scalars['String'];
  gameID: Scalars['String'];
}

export type QueryActualLinkArgs = {
  privateChannelID: Scalars['String'];
  gameID: Scalars['String'];
}

export type ReadMessage = {
  __typename?: 'ReadMessage';
  channelSlug: Scalars['String'];
  unreadMessagesCount?: Maybe<Scalars['Float']>;
};

export type Sport = {
  __typename?: 'Sport';
  Avatar: Media;
  CoverPhoto: Media;
  FanGroupLockerRooms: LockerRooms;
  LockerRooms: LockerRooms;
  LockerRoomsByLeague: Array<LockerRoomsByLeague>;
  createdAt?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
};

export type NewSport = {
  __typename?: 'NewSport';
  Avatar?: Media;
  CoverPhoto?: Media;
  FanGroupLockerRooms?: LockerRooms;
  LockerRooms?: LockerRooms;
  LockerRoomsByLeague?: Array<LockerRoomsByLeague>;
  createdAt?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  name?: Scalars['String'];
  slug?: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  Icon?: Media;
};


export type SportFanGroupLockerRoomsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
};


export type SportLockerRoomsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
};

export type Sports = {
  __typename?: 'Sports';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Sport>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  Avatar?: Maybe<Media>;
  createdAt?: Maybe<Scalars['Float']>;
  emailAddress: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isBlocked?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  uid: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
  username: Scalars['String'];
};

export type UserInvite = {
  __typename?: 'UserInvite';
  data?: Maybe<UserInviteData>;
  expiration?: Maybe<Scalars['Float']>;
  group: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  time?: Maybe<Scalars['Float']>;
  type: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  userID: Scalars['String'];
};

export type UserInviteData = {
  __typename?: 'UserInviteData';
  emailAddress?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  lockerRoomID?: Maybe<Scalars['String']>;
  lockerRoomSlug?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  User: User;
  UserRoleType?: Maybe<Array<UserRoleType>>;
  createdAt?: Maybe<Scalars['Float']>;
  group: Scalars['String'];
  groupID: Scalars['String'];
  groupType: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  isPrimaryOwner?: Maybe<Scalars['Boolean']>;
  lockerRoomID: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  uid: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
  userID: Scalars['String'];
};

export type UserRoleType = {
  __typename?: 'UserRoleType';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type UserRoles = {
  __typename?: 'UserRoles';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<UserRole>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type UserRolesInLockerRoom = {
  __typename?: 'UserRolesInLockerRoom';
  Managers: Array<UserRole>;
  Owners: Array<UserRole>;
  Supporters: Array<UserRole>;
};

export type Users = {
  __typename?: 'Users';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<User>>;
  next?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};


export type AvailableUsersForPrivateChannel = {
  __typename?: 'AvailableUsersForPrivateChannel';
  count?: number | null;
  next?: string | null;
  items?: Array<{
    User?: {
      __typename?: 'User';
      username: string;
    } | null;
  } | null> | null;
};

export type ChannelRoleUser = {
  __typename?: 'ChannelRoleUser';
  User: {
    __typename?: 'User';
    username: string;
    id: string;
  };
};

export type ChannelRoles = {
  __typename?: 'ChannelRoles';
  Owners?: Array<{
    __typename?: 'ChannelRoleUser';
    User: {
      __typename?: 'User';
      username: string;
      id: string;
    };
  }>;
  Joiners?: Array<{
    __typename?: 'ChannelRoleUser';
    User: {
      __typename?: 'User';
      username: string;
      id: string;
    };
  }>;
};


export type ChannelContentsFragment = {
  __typename?: 'Channel';
  id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  channelGroupID: string;
  lockerRoomID: string;
  type: string;
  Roles?: {
    __typename?: 'ChannelRoles';
    Owners?: Array<{
      __typename?: 'ChannelRoleUser';
      User: {
        __typename?: 'User';
        username: string;
        id: string;
        Avatar:{
          _typename?: 'Media';
          PhotoURL?: string;
        }
      };
    }>;
    Joiners?: Array<{
      __typename?: 'ChannelRoleUser';
      User: {
        __typename?: 'User';
        username: string;
        id: string;
        Avatar:{
          _typename?: 'Media';
          PhotoURL?: string;
        }
      };
    }>;
  } | null;
  Livestream?: {
    __typename?: 'Livestream';
    title: string;
    link: string;
    startDate?: string | null;
    isLive?: boolean | null;
    LivestreamSource?: {
      __typename?: 'LivestreamSource';
      id?: string | null;
      name: string;
    } | null;
  } | null;
};

export type ChannelGroupsContentsFragment = { __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null };

export type ClubContentsFragment = { __typename?: 'Club', name: string, slug: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null };

export type FanGroupContentsFragment = { __typename?: 'FanGroup', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null };

export type LeagueContentsFragment = { __typename?: 'League', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null };

export type LockerRoomContentsFragment = { __typename?: 'LockerRoom', id?: string | null, name: string, slug: string, group: string, defaultChannelSlug?: string | null, channelCount?: number | null, supporterCount?: number | null, isSupported?: boolean | null, game?: { __typename?: 'Game', group?: string | null, sport?: string | null, gameID?: number | null, date?: number | null, points?: number | null, team1ID?: number | null, team1City?: string | null, team1Name?: string | null, team1Nickname?: string | null, team1DisplayName: string, team1Ranking?: number | null, team1Score?: number | null, team1Color?: string | null, team2ID?: number | null, team2City?: string | null, team2Name?: string | null, team2Nickname?: string | null, team2DisplayName: string, team2Ranking?: number | null, team2Score?: number | null, team2Color?: string | null, location?: string | null, headline?: string | null, links?: any[] | null,timeLeft?: string | null,competition?: string | null,coverImage?: string | null,pointsLevel?: string | null,highPoints?: number | null,isReminded?: boolean | null } | null, totalUnreadMessagesCount?: number | null, MyRole?: { __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null } | null, Sports?: Array<{ __typename?: 'Sport', name: string, Avatar: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', name: string, slug: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null } | null> | null, Roles?: { __typename?: 'UserRolesInLockerRoom', Owners: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Managers: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Supporters: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }> } | null };

export type MediaContentsFragment = { __typename?: 'Media', objectID: string, objectType: string, PhotoURL?: string | null };

export type MessageContentsFragment = { __typename?: 'Message', id?: string | null, createdAt?: number | null, channelSlug: string, text?: string | null, chatID: string, repliedToChatID?: string | null, isDeletedSelf?: boolean | null, isDeletedEveryone?: boolean | null, isEdited?: boolean | null, Media?: Array<{ __typename?: 'MediaMessage', objectID: string, objectType: string, PhotoURL?: string | null }> | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, chatID: string, isDeletedSelf?: boolean | null, isDeletedEveryone?: boolean | null, Media?: Array<{ __typename?: 'MediaMessage', objectID: string, objectType: string, PhotoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null } | null };

export type NotificationContentsFragment = { __typename?: 'Notification', id?: string | null, createdAt?: number | null, messageID: string, chatID: string, channelSlug: string, type: string, isRead?: boolean | null, channelName: string, LockerRoom: { __typename?: 'LockerRoom', name: string, slug: string, isSupported?: boolean | null }, Message: { __typename?: 'Message', createdAt?: number | null, text?: string | null, User?: { __typename?: 'User', id?: string | null, username: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string } | null } | null } };

export type SportContentsFragment = { __typename?: 'Sport', name: string, slug: string, Avatar: { __typename?: 'Media', PhotoURL?: string | null }, LockerRooms: { __typename?: 'LockerRooms', count?: number | null, next?: number | null, total?: number | null, items?: Array<{ __typename?: 'LockerRoom', id?: string | null, name: string, slug: string, group: string, defaultChannelSlug?: string | null, channelCount?: number | null, supporterCount?: number | null, isSupported?: boolean | null, totalUnreadMessagesCount?: number | null, MyRole?: { __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null } | null, Sports?: Array<{ __typename?: 'Sport', name: string, Avatar: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', name: string, slug: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null } | null> | null, Roles?: { __typename?: 'UserRolesInLockerRoom', Owners: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Managers: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Supporters: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }> } | null }> | null } };

export type UserContentsFragment = { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null };

export type UserRoleContentsFragment = { __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null };

export type TrackLoginMutationVariables = Exact<{
  loginMethod: Scalars['String'];
  platform: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
}>;


export type TrackLoginMutation = { __typename?: 'Mutation', trackLogin: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type TrackRegisterAccountMutationVariables = Exact<{
  username: Scalars['String'];
  emailAddress: Scalars['String'];
  avatar: Scalars['String'];
  registrationMethod: Scalars['String'];
  platform: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
  avatarObjectID?: InputMaybe<Scalars['String']>;
}>;


export type TrackRegisterAccountMutation = { __typename?: 'Mutation', trackRegisterAccount: { __typename?: 'MutationResult', success: boolean, timestamp?: number | null, objectID?: string | null, objectType?: string | null } };

export type TrackSendMessageMutationVariables = Exact<{
  sport: Scalars['String'];
  league?: InputMaybe<Scalars['String']>;
  channel: Scalars['String'];
  type: Scalars['String'];
  platform: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  lockerRoomType: Scalars['String'];
  name: Scalars['String'];
}>;

export type TrackSendMessageMutation = { __typename?: 'Mutation', trackSendMessage: { __typename?: 'MutationResult', objectID?: string | null, objectType?: string | null, success: boolean, timestamp?: number | null } };

export type TrackCreatePrivateRoomVariables = Exact<{
  sport: Scalars['String'];
  league?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  platform: Scalars['String'];
  homeTeam: Scalars['String'];
  awayTeam: Scalars['String'];
  webDisplaySize: Scalars['String']
  pageName: Scalars['String']
  model: Scalars['String']
  browser: Scalars['String']
  browserVersion: Scalars['String']
  os: Scalars['String']
}>;

export type TrackCreatePrivateRoomMutation = { __typename?: 'Mutation', TrackCreatePrivateRoom: { __typename?: 'MutationResult', objectID?: string | null, objectType?: string | null, success: boolean, timestamp?: number | null } };


export type TrackSupportLockerRoomMutationVariables = Exact<{
  name: Scalars['String'];
  lockerRoomType: Scalars['String'];
  sport: Scalars['String'];
  league?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  platform: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
}>;


export type TrackSupportLockerRoomMutation = { __typename?: 'Mutation', trackSupportLockerRoom: { __typename?: 'MutationResult', objectID?: string | null, objectType?: string | null, success: boolean, timestamp?: number | null } };

export type TrackUnsupportLockerRoomMutationVariables = Exact<{
  name: Scalars['String'];
  lockerRoomType: Scalars['String'];
  sport: Scalars['String'];
  league?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  platform: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
}>;


export type TrackUnsupportLockerRoomMutation = { __typename?: 'Mutation', trackUnsupportLockerRoom: { __typename?: 'MutationResult', objectID?: string | null, objectType?: string | null, success: boolean, timestamp?: number | null } };

export type TrackViewPageMutationVariables = Exact<{
  platform: Scalars['String'];
  webDisplaySize?: InputMaybe<Scalars['String']>;
  pageName: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
  browser?: InputMaybe<Scalars['String']>;
  browserVersion?: InputMaybe<Scalars['String']>;
  os?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  lockerRoomType?: InputMaybe<Scalars['String']>;
  sport?: InputMaybe<Scalars['String']>;
  league?: InputMaybe<Scalars['String']>;
}>;


export type TrackViewPageMutation = { __typename?: 'Mutation', trackViewPage: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type CreateChannelMutationVariables = Exact<{
  input: InputCreateChannel;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type CreateChannelGroupMutationVariables = Exact<{
  input: InputCreateChannelGroup;
}>;


export type CreateChannelGroupMutation = { __typename?: 'Mutation', createChannelGroup: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type CreateFormEntryMutationVariables = Exact<{
  type: Scalars['String'];
  data?: InputMaybe<Scalars['JSON']>;
}>;


export type CreateFormEntryMutation = { __typename?: 'Mutation', createFormEntry: { __typename?: 'MutationResult', objectID?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input: InputUser;
}>;

export type SetGameReminderMutationVariables = Exact<{
  gameID: Scalars['String'];
}>;
export type AddZipCodeMutationVariables = Exact<{
  zipCode: Scalars['String'];
}>;

export type AcceptInvitationToPrivateChannelVariables = Exact<{
  token: Scalars['String'];
}>;

export type AcceptInvitationToPrivateChannelMutation = {
  __typename?: 'Mutation',
  acceptInvitationToPrivateChannel: {
    __typename?: 'MutationResult',
    timestamp?: number | null,
    success: boolean,
    objectID?: string | null,
    objectType?: string | null
  }
};

export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };


export type SetGameReminderMutation = MutationResult;

export type AddZipCodeMutation = { __typename?: 'Mutation', addZipCode: { __typename?: 'MutationResult', zipCode?: string | null, ZipCode?: { __typename?: 'ZipCode', zip?: string, latitude?: number, longitude?: number, state?: string, city?: string, country?: string } | null, id?: string | null, username: string } };

export type DeleteChannelMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel: { __typename?: 'MutationResult', success: boolean, timestamp?: number | null, objectID?: string | null, objectType?: string | null } };

export type DeleteChannelGroupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteChannelGroupMutation = { __typename?: 'Mutation', deleteChannelGroup: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type DeleteFirebaseAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteFirebaseAccountMutation = { __typename?: 'Mutation', deleteFirebaseAccount: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type DeleteImagesMutationVariables = Exact<{
  objectIDs: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteImagesMutation = { __typename?: 'Mutation', deleteImages: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type DeleteMessageMutationVariables = Exact<{
  chatID: Scalars['String'];
  deleteForSelf: Scalars['Boolean'];
  deleteForEveryone: Scalars['Boolean'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type EditChannelMutationVariables = Exact<{
  id: Scalars['String'];
  input: InputEditChannel;
}>;


export type EditChannelMutation = { __typename?: 'Mutation', editChannel: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type EditChannelGroupMutationVariables = Exact<{
  id: Scalars['String'];
  input: InputEditChannelGroup;
}>;


export type EditChannelGroupMutation = { __typename?: 'Mutation', editChannelGroup: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type EditMessageMutationVariables = Exact<{
  chatID: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
  repliedToChatID?: InputMaybe<Scalars['String']>;
  Media?: InputMaybe<Array<InputMedia> | InputMedia>;
}>;


export type EditMessageMutation = { __typename?: 'Mutation', editMessage: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type InviteUserForManagerialRoleMutationVariables = Exact<{
  lockerRoomID: Scalars['String'];
  input: Array<InputInviteUserForManagerialRole> | InputInviteUserForManagerialRole;
}>;


export type InviteUserForManagerialRoleMutation = { __typename?: 'Mutation', inviteUserForManagerialRole: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type ReadNotificationMutationVariables = Exact<{
  notificationIDs: Array<Scalars['String']> | Scalars['String'];
}>;


export type ReadNotificationMutation = { __typename?: 'Mutation', readNotification: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type RegisterInterestMutationVariables = Exact<{
  type: Scalars['String'];
  data?: InputMaybe<Scalars['JSON']>;
}>;


export type RegisterInterestMutation = { __typename?: 'Mutation', registerInterest: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type RemoveUserManagerialRoleMutationVariables = Exact<{
  lockerRoomID: Scalars['String'];
  userID: Scalars['String'];
  role: Scalars['String'];
}>;


export type RemoveUserManagerialRoleMutation = { __typename?: 'Mutation', removeUserManagerialRole: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type RespondUserManagerialRoleInviteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RespondUserManagerialRoleInviteMutation = { __typename?: 'Mutation', respondUserManagerialRoleInvite: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type SeenNotificationMutationVariables = Exact<{
  lastNotificationID: Scalars['String'];
}>;


export type SeenNotificationMutation = { __typename?: 'Mutation', seenNotification: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type SendMessageMutationVariables = Exact<{
  channelSlug: Scalars['String'];
  text: Scalars['String'];
  chatID: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type SupportClubMutationVariables = Exact<{
  lockerRoomID: Scalars['String'];
}>;


export type SupportClubMutation = { __typename?: 'Mutation', support: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type UndeleteChannelMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UndeleteChannelMutation = { __typename?: 'Mutation', undeleteChannel: { __typename?: 'MutationResult', success: boolean, timestamp?: number | null, objectID?: string | null, objectType?: string | null } };

export type UndeleteChannelGroupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UndeleteChannelGroupMutation = { __typename?: 'Mutation', undeleteChannelGroup: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type UnsupportClubMutationVariables = Exact<{
  lockerRoomID: Scalars['String'];
}>;


export type UnsupportClubMutation = { __typename?: 'Mutation', unsupport: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type UpdateLockerRoomUserRolesMutationVariables = Exact<{
  lockerRoomID: Scalars['String'];
  input: Array<InputUpdateLockerRoomUserRoles> | InputUpdateLockerRoomUserRoles;
}>;


export type UpdateLockerRoomUserRolesMutation = { __typename?: 'Mutation', updateLockerRoomUserRoles: { __typename?: 'MutationResult', timestamp?: number | null, success: boolean, objectID?: string | null, objectType?: string | null } };

export type MutationLeavePrivateChannelVariables = Exact<{
  privateChannelID: Scalars['String'];
}>;

export type MutationLeavePrivateChannel = {
  __typename?: 'Mutation';
  leavePrivateChannel: {
    __typename?: 'MutationResult';
    timestamp?: number | null;
    success: boolean;
    objectID?: string | null;
    objectType?: string | null;
  };
};

export type ChannelExistsQueryVariables = Exact<{
  name: Scalars['String'];
  channelGroupID: Scalars['String'];
}>;

export type ChannelExistsQuery = { __typename?: 'Query', channelExists?: boolean | null };

export type GetAvailableMemebersForPrivateChannelQueryVariables = Exact<{
  lockerRoomID: Scalars['String'],
  next: Scalars['String'],
  count: Scalars['Int'],
  name: Scalars['String']
}>;

export type GetAvailableMembersForPrivateChannelQuery = {
  __typename?: 'Query';
  getAvailableUsersForPrivateChannel?: {
    __typename?: 'AvailableUsersForPrivateChannel';
    count?: number | null;
    next?: string | null;
    items?: Array<{
      __typename?: 'User';
      username: string;
      id: string | null;
      Avatar:{
        _typename?: 'Media';
        PhotoURL?: string;
      }
    }>;
  } | null;
};


export type ChannelGroupExistsQueryVariables = Exact<{
  name: Scalars['String'];
  lockerRoomID: Scalars['String'];
}>;


export type ChannelGroupExistsQuery = { __typename?: 'Query', channelGroupExists?: boolean | null };

export type GetAllUsersViaUsernameQueryVariables = Exact<{
  text?: InputMaybe<Scalars['String']>;
}>;


export type GetAllUsersViaUsernameQuery = { __typename?: 'Query', getAllUsersViaUsername: { __typename?: 'Users', items?: Array<{ __typename?: 'User', id?: string | null, username: string, uid: string, isBlocked?: boolean | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }> | null } };

export type GetChannelQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetChannelQuery = { __typename?: 'Query', getChannel?: { __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null };

export type GetClubQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetClubQuery = { __typename?: 'Query', getClub?: { __typename?: 'Club', name: string, slug: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null };

export type GetFeaturedQueryVariables = Exact<{ [key: string]: never; }>;

export type GetFeaturedGameQueryVariables = Exact<{ [key: string]: never; }>;

export type GetFeaturedQuery = { __typename?: 'Query', getFeatured: Array<{ __typename?: 'LockerRoom', name: string, slug: string, defaultChannelSlug?: string | null, supporterCount?: number | null, Sports?: Array<{ __typename?: 'Sport', CoverPhoto: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null }> };

export type GetFeaturedGameQuery = Game;

export type GetGamesQuery = GetGames;

export type GetGameQuery = Game;

export type GetLeagueQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetLeagueQuery = { __typename?: 'Query', getLeague?: { __typename?: 'League', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null };

export type GetLeaguesBySportQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetLeaguesBySportQuery = { __typename?: 'Query', getSport?: { __typename?: 'Sport', status?: string | null, Avatar: { __typename?: 'Media', PhotoURL?: string | null }, CoverPhoto: { __typename?: 'Media', PhotoURL?: string | null }, LockerRoomsByLeague: Array<{ __typename?: 'LockerRoomsByLeague', leagueID: string, leagueName: string, LockerRooms: { __typename?: 'LockerRooms', items?: Array<{ __typename?: 'LockerRoom', id?: string | null, name: string, slug: string, defaultChannelSlug?: string | null, supporterCount?: number | null, isSupported?: boolean | null, MyRole?: { __typename?: 'UserRole', role: string } | null, Sports?: Array<{ __typename?: 'Sport', name: string, CoverPhoto: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', name: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null } | null> | null }> | null } }>, FanGroupLockerRooms: { __typename?: 'LockerRooms', count?: number | null, items?: Array<{ __typename?: 'LockerRoom', id?: string | null, name: string, slug: string, defaultChannelSlug?: string | null, supporterCount?: number | null, isSupported?: boolean | null, MyRole?: { __typename?: 'UserRole', role: string } | null, Sports?: Array<{ __typename?: 'Sport', name: string, CoverPhoto: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', name: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null } | null> | null }> | null } } | null };

export type GetLockerRoomQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
}>;


export type GetLockerRoomQuery = { __typename?: 'Query', getLockerRoom?: { __typename?: 'LockerRoom', id?: string | null, name: string, slug: string, group: string, defaultChannelSlug?: string | null, game?: { __typename?: 'Game', group?: string | null, sport?: string | null, gameID?: number | null, date?: number | null, points?: number | null, team1ID?: number | null, team1City?: string | null, team1Name?: string | null, team1Nickname?: string | null, team1DisplayName: string, team1Ranking?: number | null, team1Score?: number | null, team1Color?: string | null, team2ID?: number | null, team2City?: string | null, team2Name?: string | null, team2Nickname?: string | null, team2DisplayName: string, team2Ranking?: number | null, team2Score?: number | null, team2Color?: string | null, location?: string | null, headline?: string | null, links?: any[] | null,timeLeft?: string | null,competition?: string | null,coverImage?: string | null,pointsLevel?: string | null,highPoints?: number | null,isReminded?: boolean | null } | null, channelCount?: number | null, supporterCount?: number | null, isSupported?: boolean | null, totalUnreadMessagesCount?: number | null, MyRole?: { __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null } | null, Sports?: Array<{ __typename?: 'Sport', name: string, Avatar: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', name: string, slug: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null } | null> | null, Roles?: { __typename?: 'UserRolesInLockerRoom', Owners: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Managers: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Supporters: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }> } | null } | null };

export type GetLockerRoomIsSupportedQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetLockerRoomIsSupportedQuery = { __typename?: 'Query', getLockerRoom?: { __typename?: 'LockerRoom', isSupported?: boolean | null } | null };

export type GetMessagesByChannelSlugQueryVariables = Exact<{
  channelSlug: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type GetMessagesByChannelSlugQuery = { __typename?: 'Query', getMessagesByChannelSlug: { __typename?: 'Messages', count?: number | null, next?: number | null, total?: number | null, items?: Array<{ __typename?: 'Message', id?: string | null, createdAt?: number | null, channelSlug: string, text?: string | null, chatID: string, repliedToChatID?: string | null, isDeletedSelf?: boolean | null, isDeletedEveryone?: boolean | null, isEdited?: boolean | null, Media?: Array<{ __typename?: 'MediaMessage', objectID: string, objectType: string, PhotoURL?: string | null }> | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, chatID: string, isDeletedSelf?: boolean | null, isDeletedEveryone?: boolean | null, Media?: Array<{ __typename?: 'MediaMessage', objectID: string, objectType: string, PhotoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null } | null }> | null } };

export type GetMessagesByChannelSlugUsingCreatedAtAsCursorQueryVariables = Exact<{
  channelSlug: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  direction: Scalars['String'];
}>;

export type GetGamesQueryVariables = Exact<{
  next: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  leagueCodes?: InputMaybe<Scalars['String']>;
  partnerNames?: InputMaybe<Scalars['String']>;
}>;

export type GetGameQueryVariables = Exact<{
  gameID?: InputMaybe<Scalars['Int']>;
}>;


export type GetMessagesByChannelSlugUsingCreatedAtAsCursorQuery = { __typename?: 'Query', getMessagesByChannelSlugUsingCreatedAtAsCursor: { __typename?: 'MessagesNextAsString', count?: number | null, next?: string | null, total?: number | null, items?: Array<{ __typename?: 'Message', id?: string | null, createdAt?: number | null, channelSlug: string, text?: string | null, chatID: string, repliedToChatID?: string | null, isDeletedSelf?: boolean | null, isDeletedEveryone?: boolean | null, isEdited?: boolean | null, Media?: Array<{ __typename?: 'MediaMessage', objectID: string, objectType: string, PhotoURL?: string | null }> | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, chatID: string, isDeletedSelf?: boolean | null, isDeletedEveryone?: boolean | null, Media?: Array<{ __typename?: 'MediaMessage', objectID: string, objectType: string, PhotoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null } | null }> | null } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;

export type GetSportsWithIconQueryVariables = Exact<{ [key: string]: never; }>;

export type GetGamePartnersQueryVariables = Exact<{ [key: string]: never; }>;

export type GetSportsWithIconQuery = SportsWithIcon;

export type GetGamePartnersQuery = GetGamePartners;

export type GetMyLocationQueryVariables = Exact<{ [key: string]: never; }>;

export type GetMyProfileQuery = { __typename?: 'Query', Me?: { __typename?: 'Me', id?: string | null, username: string, slug: string, uid: string, emailAddress: string, name: string, unseenNotifications: number, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null };

export type GetMyLocationQuery = { __typename?: 'Query', Me?: { __typename?: 'Me', zipCode?: string | null, ZipCode?: { __typename?: 'ZipCode', zip?: string, latitude?: number, longitude?: number, state?: string, city?: string, country?: string } | null, id?: string | null, username: string } | null };


export type GetMyProfileSupportingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileSupportingQuery = { __typename?: 'Query', Me?: { __typename?: 'Me', Supporting?: Array<{ __typename?: 'LockerRoom', id?: string | null, name: string, slug: string, group: string, defaultChannelSlug?: string | null, channelCount?: number | null, supporterCount?: number | null, isSupported?: boolean | null, totalUnreadMessagesCount?: number | null, MyRole?: { __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null } | null, Sports?: Array<{ __typename?: 'Sport', name: string, Avatar: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', name: string, slug: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', name: string, slug: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null } | null> | null, Roles?: { __typename?: 'UserRolesInLockerRoom', Owners: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Managers: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }>, Supporters: Array<{ __typename?: 'UserRole', userID: string, uid: string, role: string, status: string, isPrimaryOwner?: boolean | null, User: { __typename?: 'User', id?: string | null, username: string, slug: string, emailAddress: string, name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }, UserRoleType?: Array<{ __typename?: 'UserRoleType', id?: string | null, name: string }> | null }> } | null }> | null } | null };

export type GetMyUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserIdQuery = { __typename?: 'Query', Me?: { __typename?: 'Me', id?: string | null } | null };

export type GetNotificationQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNotificationQuery = { __typename?: 'Query', getNotification?: { __typename?: 'Notification', id?: string | null, createdAt?: number | null, messageID: string, chatID: string, channelSlug: string, type: string, isRead?: boolean | null, channelName: string, LockerRoom: { __typename?: 'LockerRoom', name: string, slug: string, isSupported?: boolean | null }, Message: { __typename?: 'Message', createdAt?: number | null, text?: string | null, User?: { __typename?: 'User', id?: string | null, username: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string } | null } | null } } | null };

export type GetNotificationWithMessagesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNotificationWithMessagesQuery = { __typename?: 'Query', getNotificationWithMessages?: { __typename?: 'NotificationWithMessages', Notification: { __typename?: 'Notification', id?: string | null, createdAt?: number | null, messageID: string, chatID: string, channelSlug: string, type: string, isRead?: boolean | null, channelName: string, LockerRoom: { __typename?: 'LockerRoom', name: string, slug: string, isSupported?: boolean | null }, Message: { __typename?: 'Message', createdAt?: number | null, text?: string | null, User?: { __typename?: 'User', id?: string | null, username: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string } | null } | null } }, Messages: Array<{ __typename?: 'Message', createdAt?: number | null, text?: string | null, User?: { __typename?: 'User', id?: string | null, username: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string } | null } | null }> } | null };

export type GetNotificationsQueryVariables = Exact<{
  isRead?: InputMaybe<Scalars['Boolean']>;
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications?: { __typename?: 'Notifications', count?: number | null, next?: number | null, items?: Array<{ __typename?: 'Notification', id?: string | null, createdAt?: number | null, messageID: string, chatID: string, channelSlug: string, type: string, isRead?: boolean | null, channelName: string, LockerRoom: { __typename?: 'LockerRoom', name: string, slug: string, isSupported?: boolean | null }, Message: { __typename?: 'Message', createdAt?: number | null, text?: string | null, User?: { __typename?: 'User', id?: string | null, username: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, RepliedTo?: { __typename?: 'Message', createdAt?: number | null, text?: string | null, PhotoURLs?: Array<{ __typename?: 'PhotoURL', type: string, photoURL?: string | null }> | null, User?: { __typename?: 'User', id?: string | null, username: string } | null } | null } }> | null } | null };

export type GetPhotoUrlQueryVariables = Exact<{
  objectID: Scalars['String'];
  objectType: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
}>;


export type GetPhotoUrlQuery = { __typename?: 'Query', getPhotoURL?: string | null };

export type GetPhotoUrLsQueryVariables = Exact<{
  input: Array<InputQueryMedia> | InputQueryMedia;
}>;


export type GetPhotoUrLsQuery = { __typename?: 'Query', getPhotoURLs?: Array<string | null> | null };

export type GetSportQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetSportQuery = { __typename?: 'Query', getSport?: { __typename?: 'Sport', status?: string | null, Avatar: { __typename?: 'Media', PhotoURL?: string | null }, CoverPhoto: { __typename?: 'Media', PhotoURL?: string | null }, LockerRooms: { __typename?: 'LockerRooms', items?: Array<{ __typename?: 'LockerRoom', id?: string | null, name: string, slug: string, defaultChannelSlug?: string | null, supporterCount?: number | null, isSupported?: boolean | null, MyRole?: { __typename?: 'UserRole', role: string } | null, Sports?: Array<{ __typename?: 'Sport', name: string, CoverPhoto: { __typename?: 'Media', PhotoURL?: string | null } } | null> | null, Club?: { __typename?: 'Club', name: string, leagueName?: string | null, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, League?: { __typename?: 'League', name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, FanGroup?: { __typename?: 'FanGroup', name: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null, CoverPhoto?: { __typename?: 'Media', PhotoURL?: string | null } | null } | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', id?: string | null, name: string, slug: string, group: string, Channels?: Array<{ __typename?: 'Channel', id?: string | null, name: string, slug: string, description?: string | null, channelGroupID: string, type: string, Livestream?: { __typename?: 'Livestream', title: string, link: string, startDate?: string | null, isLive?: boolean | null, LivestreamSource?: { __typename?: 'LivestreamSource', id?: string | null, name: string } | null } | null } | null> | null } | null> | null }> | null } } | null };

export type GetSportsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSportsQuery = { __typename?: 'Query', getSports: { __typename?: 'Sports', count?: number | null, next?: number | null, total?: number | null, items?: Array<{ __typename?: 'Sport', name: string, slug: string, status?: string | null, LockerRoomsByLeague: Array<{ __typename?: 'LockerRoomsByLeague', leagueID: string }> }> | null } };

export type GetSportsHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSportsHomePageQuery = { __typename?: 'Query', getSports: { __typename?: 'Sports', items?: Array<{ __typename?: 'Sport', name: string, slug: string, status?: string | null, CoverPhoto: { __typename?: 'Media', PhotoURL?: string | null }, LockerRooms: { __typename?: 'LockerRooms', count?: number | null } }> | null } };

export type SupportingQueryVariables = Exact<{ [key: string]: never; }>;


export type SupportingQuery = { __typename?: 'Query', Supporting?: Array<{ __typename?: 'LockerRoom', slug: string, totalUnreadMessagesCount?: number | null, ChannelGroups?: Array<{ __typename?: 'ChannelGroup', slug: string, Channels?: Array<{ __typename?: 'Channel', slug: string, unreadMessagesCount?: number | null } | null> | null } | null> | null } | null> | null };

export type GetUserInviteQueryVariables = Exact<{
  id: Scalars['String'];
  type: Scalars['String'];
  group: Scalars['String'];
}>;


export type GetUserInviteQuery = { __typename?: 'Query', getUserInvite?: { __typename?: 'UserInvite', id?: string | null, type?: string | null, group?: string | null, data?: { __typename?: 'UserInviteData', emailAddress?: string | null } | null } | null };

export type GetUsersByLockerRoomQueryVariables = Exact<{
  lockerRoomID: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersByLockerRoomQuery = { __typename?: 'Query', getUsersByLockerRoom: { __typename?: 'Users', items?: Array<{ __typename?: 'User', id?: string | null, username: string, Avatar?: { __typename?: 'Media', PhotoURL?: string | null } | null }> | null } };

export type InvitedUserExistsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type InvitedUserExistsQuery = { __typename?: 'Query', invitedUserExists?: boolean | null };

export type UserNameExistsQueryVariables = Exact<{
  username: Scalars['String'];
}>;

export type UserNameExistsQuery = { __typename?: 'Query', userNameExists?: boolean | null };

export type GetDynamicLinkQueryVariables = Exact<{
  privateChannelID: Scalars['String'];
  gameID?: InputMaybe<Scalars['String']>;
}>;

export type GetDynamicLinkQuery = {
  __typename?: 'Query',
  getDynamicEventInviteLink: string | null
}

export type GetActualLinkQueryVariables = Exact<{
  privateChannelID: Scalars['String'];
  gameID?: InputMaybe<Scalars['String']>;
}>;

export type GetActualLinkQuery = {
  __typename?: 'Query',
  getActualEventInviteLink: string | null
}

export const MediaContentsFragmentDoc = gql`
    fragment MediaContents on Media {
  objectID
  objectType
  PhotoURL
}
    `;
export const UserContentsFragmentDoc = gql`
    fragment UserContents on User {
  id
  username
  slug
  emailAddress
  name
  Avatar {
    PhotoURL
  }
}
    `;
export const MessageContentsFragmentDoc = gql`
    fragment MessageContents on Message {
  id
  createdAt
  channelSlug
  text
  chatID
  repliedToChatID
  Media {
    objectID
    objectType
    PhotoURL(type: "640x360")
  }
  PhotoURLs {
    type
    photoURL
  }
  isDeletedSelf
  isDeletedEveryone
  isEdited
  User {
    ...UserContents
  }
  RepliedTo {
    createdAt
    text
    Media {
      objectID
      objectType
      PhotoURL(type: "200sq")
    }
    User {
      ...UserContents
    }
    chatID
    isDeletedSelf
    isDeletedEveryone
  }
}
    ${UserContentsFragmentDoc}`;
export const NotificationContentsFragmentDoc = gql`
    fragment NotificationContents on Notification {
  id
  createdAt
  messageID
  chatID
  channelSlug
  type
  isRead
  channelName
  LockerRoom {
    name
    slug
    isSupported
  }
  Message {
    createdAt
    text
    User {
      id
      username
      Avatar {
        PhotoURL
      }
    }
    PhotoURLs {
      type
      photoURL
    }
    RepliedTo {
      createdAt
      text
      PhotoURLs {
        type
        photoURL
      }
      User {
        id
        username
      }
    }
  }
}
    `;
export const UserRoleContentsFragmentDoc = gql`
    fragment UserRoleContents on UserRole {
  userID
  uid
  role
  status
  isPrimaryOwner
  User {
    ...UserContents
  }
  UserRoleType {
    id
    name
  }
}
    ${UserContentsFragmentDoc}`;
export const ClubContentsFragmentDoc = gql`
    fragment ClubContents on Club {
  name
  slug
  Avatar {
    PhotoURL
  }
  CoverPhoto {
    PhotoURL
  }
  leagueName
}
    `;
export const LeagueContentsFragmentDoc = gql`
    fragment LeagueContents on League {
  name
  slug
  Avatar {
    PhotoURL
  }
  CoverPhoto {
    PhotoURL
  }
}
    `;
export const FanGroupContentsFragmentDoc = gql`
    fragment FanGroupContents on FanGroup {
  name
  slug
  Avatar {
    PhotoURL
  }
  CoverPhoto {
    PhotoURL
  }
}
    `;
export const ChannelContentsFragmentDoc = gql`
    fragment ChannelContents on Channel {
  id
  name
  slug
  description
  channelGroupID
  lockerRoomID
  type
  Roles {
    Owners {
      User {
        username
        id
        Avatar {
          PhotoURL
        }
      }
    }
    Joiners {
      User {
        username
        id
        Avatar {
          PhotoURL
        }
      }
    }
  }
  Livestream {
    title
    link
    startDate
    isLive
    LivestreamSource {
      id
      name
    }
  }
}
    `;
export const ChannelGroupsContentsFragmentDoc = gql`
    fragment ChannelGroupsContents on ChannelGroup {
  id
  name
  slug
  group
  Channels {
    ...ChannelContents
  }
}
    ${ChannelContentsFragmentDoc}`;
export const LockerRoomContentsFragmentDoc = gql`
    fragment LockerRoomContents on LockerRoom {
  id
  name
  slug
  group
  defaultChannelSlug
  channelCount
  supporterCount
  isSupported
  totalUnreadMessagesCount
  Game {
    group
    sport
    gameID
    date
    points
    team1ID
    team1City
    team1Name
    team1Nickname
    team1DisplayName
    team1Ranking
    team1Score
    team1Color
    team2ID
    team2City
    team2Name
    team2Nickname
    team2DisplayName
    team2Ranking
    team2Score
    team2Color
    location
    headline
    links {
      source
      type
      url
      iconUrl
    }
    timeLeft
    competition
    coverImage
    pointsLevel
    highPoints
    leagueCode
    isReminded
    isLive
  }
  MyRole {
    ...UserRoleContents
  }
  Sports {
    Avatar {
      PhotoURL
    }
    name
  }
  Club {
    ...ClubContents
  }
  League {
    ...LeagueContents
  }
  FanGroup {
    ...FanGroupContents
  }
  ChannelGroups {
    ...ChannelGroupsContents
  }
  Roles {
    Owners {
      ...UserRoleContents
    }
    Managers {
      ...UserRoleContents
    }
    Supporters {
      ...UserRoleContents
    }
  }
}
    ${UserRoleContentsFragmentDoc}
${ClubContentsFragmentDoc}
${LeagueContentsFragmentDoc}
${FanGroupContentsFragmentDoc}
${ChannelGroupsContentsFragmentDoc}`;
export const SportContentsFragmentDoc = gql`
    fragment SportContents on Sport {
  name
  slug
  Avatar {
    PhotoURL
  }
  LockerRooms(count: $count) {
    items {
      ...LockerRoomContents
    }
    count
    next
    total
  }
}
    ${LockerRoomContentsFragmentDoc}`;
export const TrackLoginDocument = gql`
    mutation trackLogin($loginMethod: String!, $platform: String!, $webDisplaySize: String, $pageName: String!, $model: String, $browser: String, $browserVersion: String, $os: String) {
  trackLogin(
    loginMethod: $loginMethod
    platform: $platform
    webDisplaySize: $webDisplaySize
    pageName: $pageName
    model: $model
    browser: $browser
    browserVersion: $browserVersion
    os: $os
  ) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const TrackRegisterAccountDocument = gql`
    mutation trackRegisterAccount($username: String!, $emailAddress: String!, $avatar: String!, $registrationMethod: String!, $platform: String!, $webDisplaySize: String, $pageName: String!, $model: String, $browser: String, $browserVersion: String, $os: String, $avatarObjectID: String, $invited: Boolean) {
  trackRegisterAccount(
    username: $username
    emailAddress: $emailAddress
    avatar: $avatar
    registrationMethod: $registrationMethod
    platform: $platform
    webDisplaySize: $webDisplaySize
    pageName: $pageName
    model: $model
    browser: $browser
    browserVersion: $browserVersion
    os: $os
    avatarObjectID: $avatarObjectID
    invited: $invited
  ) {
    success
    timestamp
    objectID
    objectType
  }
}
    `;
export const TrackSendMessageDocument = gql`
    mutation trackSendMessage($sport: String!, $league: String, $channel: String!, $type: String!, $platform: String!, $webDisplaySize: String, $pageName: String!, $model: String, $browser: String, $browserVersion: String, $lockerRoomType: String!, $name: String!) {
  trackSendMessage(
    lockerRoomType: $lockerRoomType
    name: $name
    sport: $sport
    league: $league
    channel: $channel
    type: $type
    platform: $platform
    webDisplaySize: $webDisplaySize
    pageName: $pageName
    model: $model
    browser: $browser
    browserVersion: $browserVersion
  ) {
    objectID
    objectType
    success
    timestamp
  }
}
    `;

export const TrackCreatePrivateRoomDocument = gql`
    mutation trackCreatePrivateRoom(
    $sport: String!
    $league: String
    $name: String!
    $platform: String!
    $homeTeam: String!
    $awayTeam: String!
    $webDisplaySize: String
    $pageName: String
    $model: String
    $browser: String
    $browserVersion: String
    $os: String )
    {
  trackCreatePrivateRoom(
    sport: $sport
    league: $league
    name: $name
    platform: $platform
    homeTeam: $homeTeam
    awayTeam: $awayTeam
    webDisplaySize: $webDisplaySize
    pageName: $pageName
    model: $model
    browser: $browser
    browserVersion: $browserVersion
    os: $os
  ) {
    objectID
    objectType
    success
    timestamp
  }
}


    `;

export const TrackSupportLockerRoomDocument = gql`
    mutation trackSupportLockerRoom($name: String!, $lockerRoomType: String!, $sport: String!, $league: String, $ip: String, $platform: String!, $webDisplaySize: String, $pageName: String!, $model: String, $browser: String, $browserVersion: String, $os: String) {
  trackSupportLockerRoom(
    name: $name
    lockerRoomType: $lockerRoomType
    sport: $sport
    league: $league
    ip: $ip
    platform: $platform
    webDisplaySize: $webDisplaySize
    pageName: $pageName
    model: $model
    browser: $browser
    browserVersion: $browserVersion
    os: $os
  ) {
    objectID
    objectType
    success
    timestamp
  }
}
    `;
export const TrackUnsupportLockerRoomDocument = gql`
    mutation trackUnsupportLockerRoom($name: String!, $lockerRoomType: String!, $sport: String!, $league: String, $ip: String, $platform: String!, $webDisplaySize: String, $pageName: String!, $model: String, $browser: String, $browserVersion: String, $os: String) {
  trackUnsupportLockerRoom(
    name: $name
    lockerRoomType: $lockerRoomType
    sport: $sport
    league: $league
    ip: $ip
    platform: $platform
    webDisplaySize: $webDisplaySize
    pageName: $pageName
    model: $model
    browser: $browser
    browserVersion: $browserVersion
    os: $os
  ) {
    objectID
    objectType
    success
    timestamp
  }
}
    `;
export const TrackViewPageDocument = gql`
    mutation trackViewPage($platform: String!, $webDisplaySize: String, $pageName: String!, $model: String, $browser: String, $browserVersion: String, $os: String, $channel: String, $name: String, $lockerRoomType: String, $sport: String, $league: String) {
  trackViewPage(
    platform: $platform
    webDisplaySize: $webDisplaySize
    pageName: $pageName
    model: $model
    browser: $browser
    browserVersion: $browserVersion
    os: $os
    channel: $channel
    name: $name
    lockerRoomType: $lockerRoomType
    sport: $sport
    league: $league
  ) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const CreateChannelDocument = gql`
    mutation createChannel($input: InputCreateChannel!) {
  createChannel(input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const CreateChannelGroupDocument = gql`
    mutation createChannelGroup($input: InputCreateChannelGroup!) {
  createChannelGroup(input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const CreateFormEntryDocument = gql`
    mutation createFormEntry($type: String!, $data: JSON) {
  createFormEntry(type: $type, data: $data) {
    objectID
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: InputUser!) {
  createUser(input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const SetGameReminderDocument = gql`
mutation setGameReminder($gameID: String!) {
  setGameReminder(gameID: $gameID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnsetGameReminderDocument = gql`
mutation unsetGameReminder($gameID: String!) {
  unsetGameReminder(gameID: $gameID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const AddZipCodeDocument = gql`
mutation addZipCode ($zipCode: String!) {
  addZipCode (zipCode: $zipCode) {
    zip
    latitude
    longitude
    state
    city
    country
  }
}
    `;

export const AcceptInvitationToPrivateChannel = gql`
    mutation acceptInvitationToPrivateChannel($token: String!) {
  acceptInvitationToPrivateChannel(token: $token) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;

export const DeleteChannelDocument = gql`
    mutation deleteChannel($id: String!) {
  deleteChannel(id: $id) {
    success
    timestamp
    objectID
    objectType
  }
}
    `;
export const DeleteChannelGroupDocument = gql`
    mutation deleteChannelGroup($id: String!) {
  deleteChannelGroup(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const DeleteFirebaseAccountDocument = gql`
    mutation deleteFirebaseAccount {
  deleteFirebaseAccount {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const DeleteImagesDocument = gql`
    mutation deleteImages($objectIDs: [String!]!) {
  deleteImages(objectIDs: $objectIDs) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const DeleteMessageDocument = gql`
    mutation deleteMessage($chatID: String!, $deleteForSelf: Boolean!, $deleteForEveryone: Boolean!) {
  deleteMessage(
    chatID: $chatID
    deleteForSelf: $deleteForSelf
    deleteForEveryone: $deleteForEveryone
  ) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const EditChannelDocument = gql`
    mutation editChannel($id: String!, $input: InputEditChannel!) {
  editChannel(id: $id, input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const EditChannelGroupDocument = gql`
    mutation editChannelGroup($id: String!, $input: InputEditChannelGroup!) {
  editChannelGroup(id: $id, input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const EditMessageDocument = gql`
    mutation editMessage($chatID: String!, $text: String, $repliedToChatID: String, $Media: [InputMedia!]) {
  editMessage(
    chatID: $chatID
    text: $text
    repliedToChatID: $repliedToChatID
    Media: $Media
  ) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const InviteUserForManagerialRoleDocument = gql`
    mutation inviteUserForManagerialRole($lockerRoomID: String!, $input: [InputInviteUserForManagerialRole!]!) {
  inviteUserForManagerialRole(lockerRoomID: $lockerRoomID, input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const ReadNotificationDocument = gql`
    mutation readNotification($notificationIDs: [String!]!) {
  readNotification(notificationIDs: $notificationIDs) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const RegisterInterestDocument = gql`
    mutation registerInterest($type: String!, $data: JSON) {
  registerInterest(type: $type, data: $data) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const RemoveUserManagerialRoleDocument = gql`
    mutation removeUserManagerialRole($lockerRoomID: String!, $userID: String!, $role: String!) {
  removeUserManagerialRole(
    lockerRoomID: $lockerRoomID
    userID: $userID
    role: $role
  ) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const RespondUserManagerialRoleInviteDocument = gql`
    mutation respondUserManagerialRoleInvite($id: String!) {
  respondUserManagerialRoleInvite(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const SeenNotificationDocument = gql`
    mutation seenNotification($lastNotificationID: String!) {
  seenNotification(lastNotificationID: $lastNotificationID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const SendMessageDocument = gql`
    mutation sendMessage($channelSlug: String!, $text: String!, $chatID: String!) {
  sendMessage(channelSlug: $channelSlug, text: $text, chatID: $chatID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const SupportClubDocument = gql`
    mutation supportClub($lockerRoomID: String!) {
  support(lockerRoomID: $lockerRoomID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UndeleteChannelDocument = gql`
    mutation undeleteChannel($id: String!) {
  undeleteChannel(id: $id) {
    success
    timestamp
    objectID
    objectType
  }
}
    `;
export const UndeleteChannelGroupDocument = gql`
    mutation undeleteChannelGroup($id: String!) {
  undeleteChannelGroup(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnsupportClubDocument = gql`
    mutation unsupportClub($lockerRoomID: String!) {
  unsupport(lockerRoomID: $lockerRoomID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UpdateLockerRoomUserRolesDocument = gql`
    mutation updateLockerRoomUserRoles($lockerRoomID: String!, $input: [InputUpdateLockerRoomUserRoles!]!) {
  updateLockerRoomUserRoles(lockerRoomID: $lockerRoomID, input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;

export const leavePrivateChannelDocument = gql`
  mutation leavePrivateChannel($privateChannelID: String!) {
  leavePrivateChannel(privateChannelID: $privateChannelID) {
    success
    objectID
  }
}
    `;

export const GetAvailableMemebersForPrivateChannel = gql`
    query getAvailableMemebersForPrivateChannel(
    $lockerRoomID: String!,
    $next: String,
    $count: Int,
    $name: String
    ) {
  getAvailableUsersForPrivateChannel(
      lockerRoomID: $lockerRoomID,
      next: $next,
      count: $count,
      name: $name
  ) {
      count
      next
      items {
          username
          id
          Avatar {
            PhotoURL
          }
      }
    }
}
    `;
export const ChannelExistsDocument = gql`
    query channelExists($name: String!, $channelGroupID: String!) {
  channelExists(name: $name, channelGroupID: $channelGroupID)
}
    `;
export const ChannelGroupExistsDocument = gql`
    query channelGroupExists($name: String!, $lockerRoomID: String!) {
  channelGroupExists(name: $name, lockerRoomID: $lockerRoomID)
}
    `;
export const GetAllUsersViaUsernameDocument = gql`
    query getAllUsersViaUsername($text: String) {
  getAllUsersViaUsername(text: $text) {
    items {
      id
      username
      uid
      Avatar {
        PhotoURL
      }
      isBlocked
    }
  }
}
    `;
export const GetChannelDocument = gql`
    query getChannel($id: String, $slug: String) {
  getChannel(id: $id, slug: $slug) {
    ...ChannelContents
  }
}
    ${ChannelContentsFragmentDoc}`;
export const GetClubDocument = gql`
    query getClub($id: String, $slug: String) {
  getClub(id: $id, slug: $slug) {
    ...ClubContents
  }
}
    ${ClubContentsFragmentDoc}`;
export const GetFeaturedDocument = gql`
    query getFeatured {
  getFeatured {
    name
    slug
    defaultChannelSlug
    supporterCount
    Sports {
      CoverPhoto {
        PhotoURL
      }
    }
    Club {
      Avatar {
        PhotoURL
      }
      CoverPhoto {
        PhotoURL
      }
    }
    League {
      Avatar {
        PhotoURL
      }
      CoverPhoto {
        PhotoURL
      }
    }
    FanGroup {
      Avatar {
        PhotoURL
      }
      CoverPhoto {
        PhotoURL
      }
    }
  }
}
    `;
export const GetFeaturedGameDocument = gql`
query getFeaturedGame {
  getFeaturedGame {
    group
    sport
    gameID
    date
    points
    team1ID
    team1City
    team1Name
    team1Nickname
    team1DisplayName
    team1Ranking
    team1Score
    team1Color
    team2ID
    team2City
    team2Name
    team2Nickname
    team2DisplayName
    team2Ranking
    team2Score
    team2Color
    location
    headline
    links {
      source
      type
      url
    }
    timeLeft
    competition
    coverImage
    leagueCode
    pointsLevel
    highPoints
    isLive
  }
}
    `;
export const GetGamesDocument = gql`
query getGames(
  $next: String,
  $type: String!,
  $count: Int,
  $leagueCodes: String,
  $partnerNames: String
) {
  getGames(
    next: $next,
    type: $type,
    count: $count,
    leagueCodes: $leagueCodes,
    partnerNames: $partnerNames
  ) {
    items {
      group
      sport
      gameID
      date
      points
      team1ID
      team1City
      team1Name
      team1Nickname
      team1DisplayName
      team1Ranking
      team1Score
      team1Color
      team1Logo
      team2ID
      team2City
      team2Name
      team2Nickname
      team2DisplayName
      team2Ranking
      team2Score
      team2Color
      team2Logo
      location
      headline
      links {
        source
        type
        url
        iconUrl
      }
      timeLeft
      competition
      coverImage
      pointsLevel
      highPoints
      leagueCode
      isReminded
      excitementLevel
    }
    count
    next
    total
  }
}
        `;
export const GetGameDocument = gql`
    query getGame($gameID: Int!) {
      getGame(gameID: $gameID) {
        group
        sport
        gameID
        date
        points
        team1ID
        team1City
        team1Name
        team1Ranking
        team1Score
        team1Color
        team2ID
        team2City
        team2Name
        team2Ranking
        team2Score
        team2Color
        location
        headline
        links {
          source
          type
          url
        }
        timeLeft
        competition
        coverImage
        pointsLevel
        highPoints
        leagueCode
        isReminded
        isLive
      }
    }
`;
export const GetLeagueDocument = gql`
    query getLeague($id: String, $slug: String) {
  getLeague(id: $id, slug: $slug) {
    ...LeagueContents
  }
}
    ${LeagueContentsFragmentDoc}`;
export const GetLeaguesBySportDocument = gql`
    query getLeaguesBySport($id: String, $slug: String) {
  getSport(id: $id, slug: $slug) {
    status
    Avatar {
      PhotoURL
    }
    CoverPhoto {
      PhotoURL
    }
    LockerRoomsByLeague {
      leagueID
      leagueName
      LockerRooms {
        items {
          id
          name
          slug
          defaultChannelSlug
          supporterCount
          isSupported
          MyRole {
            role
          }
          Sports {
            name
            CoverPhoto {
              PhotoURL
            }
          }
          Club {
            Avatar {
              PhotoURL
            }
            CoverPhoto {
              PhotoURL
            }
            name
            leagueName
          }
          League {
            Avatar {
              PhotoURL
            }
            CoverPhoto {
              PhotoURL
            }
            name
          }
          FanGroup {
            Avatar {
              PhotoURL
            }
            CoverPhoto {
              PhotoURL
            }
            name
          }
          ChannelGroups {
            ...ChannelGroupsContents
          }
        }
      }
    }
    FanGroupLockerRooms {
      items {
        id
        name
        slug
        defaultChannelSlug
        supporterCount
        isSupported
        MyRole {
          role
        }
        Sports {
          name
          CoverPhoto {
            PhotoURL
          }
        }
        Club {
          Avatar {
            PhotoURL
          }
          CoverPhoto {
            PhotoURL
          }
          name
          leagueName
        }
        League {
          Avatar {
            PhotoURL
          }
          CoverPhoto {
            PhotoURL
          }
          name
        }
        FanGroup {
          Avatar {
            PhotoURL
          }
          CoverPhoto {
            PhotoURL
          }
          name
        }
        ChannelGroups {
          ...ChannelGroupsContents
        }
      }
      count
    }
  }
}
    ${ChannelGroupsContentsFragmentDoc}`;
export const GetLockerRoomDocument = gql`
    query getLockerRoom($id: String, $slug: String, $group: String) {
  getLockerRoom(id: $id, slug: $slug, group: $group) {
    ...LockerRoomContents
  }
}
    ${LockerRoomContentsFragmentDoc}`;
export const GetLockerRoomIsSupportedDocument = gql`
    query getLockerRoomIsSupported($id: String, $slug: String) {
  getLockerRoom(id: $id, slug: $slug) {
    isSupported
  }
}
    `;
export const GetMessagesByChannelSlugDocument = gql`
    query getMessagesByChannelSlug($channelSlug: String!, $count: Int, $cursor: Int) {
  getMessagesByChannelSlug(
    channelSlug: $channelSlug
    count: $count
    cursor: $cursor
  ) {
    items {
      ...MessageContents
    }
    count
    next
    total
  }
}
    ${MessageContentsFragmentDoc}`;
export const GetMessagesByChannelSlugUsingCreatedAtAsCursorDocument = gql`
    query getMessagesByChannelSlugUsingCreatedAtAsCursor($channelSlug: String!, $count: Int, $cursor: String, $direction: String!) {
  getMessagesByChannelSlugUsingCreatedAtAsCursor(
    channelSlug: $channelSlug
    count: $count
    cursor: $cursor
    direction: $direction
  ) {
    items {
      ...MessageContents
    }
    count
    next
    total
  }
}
    ${MessageContentsFragmentDoc}`;
export const GetMyProfileDocument = gql`
    query getMyProfile {
  Me {
    id
    username
    slug
    uid
    emailAddress
    Avatar {
      PhotoURL
    }
    name
    unseenNotifications
  }
}
    `;
export const GetSportsWithIconDocument = gql`
query getSportsWithIcon {
  getSportsWithIcon  {
    count
    total
    next
    items {
      id
      name
      slug
      Icon {
        objectID
        objectType
        isSport
        PhotoURL
      }
    }
  }
}
    `;
export const GetGamePartnersDocument = gql`
query getGamePartners {
  getGamePartners  {
    count
    total
    next
    items {
      id
      name
      slug
      isHidden
      Icon {
        objectID
        objectType
        PhotoURL
      }
    }
  }
}
  `;
export const GetMyLocationDocument = gql`
query getMyLocation {
  Me {
    zipCode
    ZipCode {
      zip
      latitude
      longitude
      state
      city
      country
    }
    id
    username
  }
}
    `;
export const GetMyProfileSupportingDocument = gql`
    query getMyProfileSupporting {
  Me {
    Supporting {
      ...LockerRoomContents
    }
  }
}
    ${LockerRoomContentsFragmentDoc}`;
export const GetMyUserIdDocument = gql`
    query getMyUserID {
  Me {
    id
  }
}
    `;
export const GetNotificationDocument = gql`
    query getNotification($id: String!) {
  getNotification(id: $id) {
    ...NotificationContents
  }
}
    ${NotificationContentsFragmentDoc}`;
export const GetNotificationWithMessagesDocument = gql`
    query getNotificationWithMessages($id: String!) {
  getNotificationWithMessages(id: $id) {
    Notification {
      ...NotificationContents
    }
    Messages {
      createdAt
      text
      User {
        id
        username
        Avatar {
          PhotoURL
        }
      }
      PhotoURLs {
        type
        photoURL
      }
      RepliedTo {
        createdAt
        text
        PhotoURLs {
          type
          photoURL
        }
        User {
          id
          username
        }
      }
    }
  }
}
    ${NotificationContentsFragmentDoc}`;
export const GetNotificationsDocument = gql`
    query getNotifications($isRead: Boolean, $count: Int, $cursor: Int) {
  getNotifications(isRead: $isRead, count: $count, cursor: $cursor) {
    items {
      ...NotificationContents
    }
    count
    next
  }
}
    ${NotificationContentsFragmentDoc}`;
export const GetPhotoUrlDocument = gql`
    query getPhotoURL($objectID: String!, $objectType: String!, $type: String) {
  getPhotoURL(objectID: $objectID, objectType: $objectType, type: $type)
}
    `;
export const GetPhotoUrLsDocument = gql`
    query getPhotoURLs($input: [InputQueryMedia!]!) {
  getPhotoURLs(input: $input)
}
    `;
export const GetSportDocument = gql`
    query getSport($id: String, $slug: String) {
  getSport(id: $id, slug: $slug) {
    status
    Avatar {
      PhotoURL
    }
    CoverPhoto {
      PhotoURL
    }
    LockerRooms {
      items {
        id
        name
        slug
        defaultChannelSlug
        supporterCount
        isSupported
        MyRole {
          role
        }
        Sports {
          name
          CoverPhoto {
            PhotoURL
          }
        }
        Club {
          Avatar {
            PhotoURL
          }
          CoverPhoto {
            PhotoURL
          }
          name
          leagueName
        }
        League {
          Avatar {
            PhotoURL
          }
          CoverPhoto {
            PhotoURL
          }
          name
        }
        FanGroup {
          Avatar {
            PhotoURL
          }
          CoverPhoto {
            PhotoURL
          }
          name
        }
        ChannelGroups {
          ...ChannelGroupsContents
        }
      }
    }
  }
}
    ${ChannelGroupsContentsFragmentDoc}`;
export const GetSportsDocument = gql`
    query getSports {
  getSports {
    items {
      name
      slug
      LockerRoomsByLeague {
        leagueID
      }
      status
    }
    count
    next
    total
  }
}
    `;
export const GetSportsHomePageDocument = gql`
    query getSportsHomePage {
  getSports {
    items {
      name
      slug
      status
      CoverPhoto {
        PhotoURL
      }
      LockerRooms {
        count
      }
    }
  }
}
    `;
export const SupportingDocument = gql`
    query Supporting {
  Supporting {
    slug
    totalUnreadMessagesCount
    ChannelGroups {
      slug
      Channels {
        slug
        unreadMessagesCount
      }
    }
  }
}
    `;
export const GetUserInviteDocument = gql`
    query getUserInvite($id: String!) {
  getUserInvite(id: $id) {
    id
    type
    group
    data {
      emailAddress
    }
  }
}
    `;
export const GetUsersByLockerRoomDocument = gql`
    query getUsersByLockerRoom($lockerRoomID: String!, $text: String) {
  getUsersByLockerRoom(lockerRoomID: $lockerRoomID, text: $text) {
    items {
      id
      username
      Avatar {
        PhotoURL
      }
    }
  }
}
    `;
export const InvitedUserExistsDocument = gql`
    query invitedUserExists($id: String!) {
  invitedUserExists(id: $id)
}
    `;
export const UserNameExistsDocument = gql`
    query userNameExists($username: String!) {
  userNameExists(username: $username)
}
    `;

export const DynamicLinkDocument = gql`
    query getDynamicLink(
    $privateChannelID: String!,
    $gameID: String!
) {
    getDynamicEventInviteLink(
        privateChannelID: $privateChannelID,
        gameID: $gameID
    )
}
    `;

export const ActualLinkDocument = gql`
    query getActualLink(
    $privateChannelID: String!,
    $gameID: String!
) {
    getActualEventInviteLink(
        privateChannelID: $privateChannelID,
        gameID: $gameID
    )
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    trackLogin(variables: TrackLoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TrackLoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TrackLoginMutation>(TrackLoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trackLogin', 'mutation');
    },
    trackRegisterAccount(variables: TrackRegisterAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TrackRegisterAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TrackRegisterAccountMutation>(TrackRegisterAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trackRegisterAccount', 'mutation');
    },
    trackSendMessage(variables: TrackSendMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TrackSendMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TrackSendMessageMutation>(TrackSendMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trackSendMessage', 'mutation');
    },
    trackCreatePrivateRoom(variables: TrackCreatePrivateRoomVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TrackCreatePrivateRoomMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TrackCreatePrivateRoomMutation>(TrackCreatePrivateRoomDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trackCreatePrivateRoom', 'mutation');
    },
    trackSupportLockerRoom(variables: TrackSupportLockerRoomMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TrackSupportLockerRoomMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TrackSupportLockerRoomMutation>(TrackSupportLockerRoomDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trackSupportLockerRoom', 'mutation');
    },
    trackUnsupportLockerRoom(variables: TrackUnsupportLockerRoomMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TrackUnsupportLockerRoomMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TrackUnsupportLockerRoomMutation>(TrackUnsupportLockerRoomDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trackUnsupportLockerRoom', 'mutation');
    },
    trackViewPage(variables: TrackViewPageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TrackViewPageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TrackViewPageMutation>(TrackViewPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trackViewPage', 'mutation');
    },
    createChannel(variables: CreateChannelMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateChannelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateChannelMutation>(CreateChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createChannel', 'mutation');
    },
    createChannelGroup(variables: CreateChannelGroupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateChannelGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateChannelGroupMutation>(CreateChannelGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createChannelGroup', 'mutation');
    },
    createFormEntry(variables: CreateFormEntryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateFormEntryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateFormEntryMutation>(CreateFormEntryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createFormEntry', 'mutation');
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    setGameReminder(variables: SetGameReminderMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetGameReminderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetGameReminderMutation>(SetGameReminderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setGameReminder', 'mutation');
    },
    unsetGameReminder(variables: SetGameReminderMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetGameReminderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetGameReminderMutation>(UnsetGameReminderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unsetGameReminder', 'mutation');
    },
    addZipCode(variables: AddZipCodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddZipCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddZipCodeMutation>(AddZipCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addZipCode', 'mutation');
    },

    acceptInvitationToPrivateChannel(variables: AcceptInvitationToPrivateChannelVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AcceptInvitationToPrivateChannelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AcceptInvitationToPrivateChannelMutation>(AcceptInvitationToPrivateChannel, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'acceptInvitationToPrivateChannel', 'mutation');
    },

    deleteChannel(variables: DeleteChannelMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteChannelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteChannelMutation>(DeleteChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteChannel', 'mutation');
    },
    deleteChannelGroup(variables: DeleteChannelGroupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteChannelGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteChannelGroupMutation>(DeleteChannelGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteChannelGroup', 'mutation');
    },
    deleteFirebaseAccount(variables?: DeleteFirebaseAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteFirebaseAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteFirebaseAccountMutation>(DeleteFirebaseAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteFirebaseAccount', 'mutation');
    },
    deleteImages(variables: DeleteImagesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteImagesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteImagesMutation>(DeleteImagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteImages', 'mutation');
    },
    deleteMessage(variables: DeleteMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMessageMutation>(DeleteMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteMessage', 'mutation');
    },
    editChannel(variables: EditChannelMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditChannelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditChannelMutation>(EditChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editChannel', 'mutation');
    },
    editChannelGroup(variables: EditChannelGroupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditChannelGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditChannelGroupMutation>(EditChannelGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editChannelGroup', 'mutation');
    },
    editMessage(variables: EditMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditMessageMutation>(EditMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editMessage', 'mutation');
    },
    inviteUserForManagerialRole(variables: InviteUserForManagerialRoleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InviteUserForManagerialRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InviteUserForManagerialRoleMutation>(InviteUserForManagerialRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'inviteUserForManagerialRole', 'mutation');
    },
    readNotification(variables: ReadNotificationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ReadNotificationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReadNotificationMutation>(ReadNotificationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'readNotification', 'mutation');
    },
    registerInterest(variables: RegisterInterestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterInterestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterInterestMutation>(RegisterInterestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'registerInterest', 'mutation');
    },
    removeUserManagerialRole(variables: RemoveUserManagerialRoleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveUserManagerialRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveUserManagerialRoleMutation>(RemoveUserManagerialRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeUserManagerialRole', 'mutation');
    },
    respondUserManagerialRoleInvite(variables: RespondUserManagerialRoleInviteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RespondUserManagerialRoleInviteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RespondUserManagerialRoleInviteMutation>(RespondUserManagerialRoleInviteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'respondUserManagerialRoleInvite', 'mutation');
    },
    seenNotification(variables: SeenNotificationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SeenNotificationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SeenNotificationMutation>(SeenNotificationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'seenNotification', 'mutation');
    },
    sendMessage(variables: SendMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SendMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendMessageMutation>(SendMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendMessage', 'mutation');
    },
    supportClub(variables: SupportClubMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SupportClubMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SupportClubMutation>(SupportClubDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'supportClub', 'mutation');
    },
    undeleteChannel(variables: UndeleteChannelMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UndeleteChannelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UndeleteChannelMutation>(UndeleteChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'undeleteChannel', 'mutation');
    },
    undeleteChannelGroup(variables: UndeleteChannelGroupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UndeleteChannelGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UndeleteChannelGroupMutation>(UndeleteChannelGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'undeleteChannelGroup', 'mutation');
    },
    unsupportClub(variables: UnsupportClubMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnsupportClubMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnsupportClubMutation>(UnsupportClubDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unsupportClub', 'mutation');
    },
    updateLockerRoomUserRoles(variables: UpdateLockerRoomUserRolesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateLockerRoomUserRolesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateLockerRoomUserRolesMutation>(UpdateLockerRoomUserRolesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateLockerRoomUserRoles', 'mutation');
    },
    leavePrivateChannel(variables: MutationLeavePrivateChannelVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MutationLeavePrivateChannel> {
      return withWrapper((wrappedRequestHeaders) => client.request<MutationLeavePrivateChannel>(leavePrivateChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'leavePrivateChannel', 'mutation');
    },
    channelExists(variables: ChannelExistsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ChannelExistsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelExistsQuery>(ChannelExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channelExists', 'query');
    },
    channelGroupExists(variables: ChannelGroupExistsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ChannelGroupExistsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelGroupExistsQuery>(ChannelGroupExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channelGroupExists', 'query');
    },
    getAllUsersViaUsername(variables?: GetAllUsersViaUsernameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllUsersViaUsernameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllUsersViaUsernameQuery>(GetAllUsersViaUsernameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllUsersViaUsername', 'query');
    },
    getChannel(variables?: GetChannelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetChannelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChannelQuery>(GetChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChannel', 'query');
    },
    getClub(variables?: GetClubQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetClubQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetClubQuery>(GetClubDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getClub', 'query');
    },
    getFeatured(variables?: GetFeaturedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFeaturedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFeaturedQuery>(GetFeaturedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFeatured', 'query');
    },
    getFeaturedGame(variables?: GetFeaturedGameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFeaturedGameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFeaturedGameQuery>(GetFeaturedGameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFeaturedGame', 'query');
    },
    getGames(variables?: GetGamesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGamesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGamesQuery>(GetGamesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getGames', 'query');
    },
    getGame(variables?: GetGameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGameQuery>(GetGameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getGame', 'query');
    },
    getLeague(variables?: GetLeagueQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLeagueQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLeagueQuery>(GetLeagueDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLeague', 'query');
    },
    getLeaguesBySport(variables?: GetLeaguesBySportQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLeaguesBySportQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLeaguesBySportQuery>(GetLeaguesBySportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLeaguesBySport', 'query');
    },
    getLockerRoom(variables?: GetLockerRoomQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLockerRoomQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLockerRoomQuery>(GetLockerRoomDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLockerRoom', 'query');
    },
    getLockerRoomIsSupported(variables?: GetLockerRoomIsSupportedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLockerRoomIsSupportedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLockerRoomIsSupportedQuery>(GetLockerRoomIsSupportedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLockerRoomIsSupported', 'query');
    },
    getMessagesByChannelSlug(variables: GetMessagesByChannelSlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMessagesByChannelSlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMessagesByChannelSlugQuery>(GetMessagesByChannelSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMessagesByChannelSlug', 'query');
    },
    getAvailableMemebersForPrivateChannel(variables: GetAvailableMemebersForPrivateChannelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAvailableMembersForPrivateChannelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAvailableMembersForPrivateChannelQuery>(GetAvailableMemebersForPrivateChannel, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAvailableMemebersForPrivateChannel', 'query');
    },
    getMessagesByChannelSlugUsingCreatedAtAsCursor(variables: GetMessagesByChannelSlugUsingCreatedAtAsCursorQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMessagesByChannelSlugUsingCreatedAtAsCursorQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMessagesByChannelSlugUsingCreatedAtAsCursorQuery>(GetMessagesByChannelSlugUsingCreatedAtAsCursorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMessagesByChannelSlugUsingCreatedAtAsCursor', 'query');
    },
    getMyProfile(variables?: GetMyProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyProfileQuery>(GetMyProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyProfile', 'query');
    },
    getSportsWithIcon(variables?: GetSportsWithIconQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSportsWithIconQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSportsWithIconQuery>(GetSportsWithIconDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSportsWithIcon', 'query');
    },
    getGamePartners(variables?: GetGamePartnersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGamePartnersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGamePartnersQuery>(GetGamePartnersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getGamePartners', 'query');
    },
    getMyLocation(variables?: GetMyLocationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyLocationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyLocationQuery>(GetMyLocationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyLocation', 'query');
    },
    getMyProfileSupporting(variables?: GetMyProfileSupportingQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyProfileSupportingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyProfileSupportingQuery>(GetMyProfileSupportingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyProfileSupporting', 'query');
    },
    getMyUserID(variables?: GetMyUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyUserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyUserIdQuery>(GetMyUserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyUserID', 'query');
    },
    getNotification(variables: GetNotificationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNotificationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNotificationQuery>(GetNotificationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNotification', 'query');
    },
    getNotificationWithMessages(variables: GetNotificationWithMessagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNotificationWithMessagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNotificationWithMessagesQuery>(GetNotificationWithMessagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNotificationWithMessages', 'query');
    },
    getNotifications(variables?: GetNotificationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNotificationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNotificationsQuery>(GetNotificationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNotifications', 'query');
    },
    getPhotoURL(variables: GetPhotoUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPhotoUrlQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPhotoUrlQuery>(GetPhotoUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPhotoURL', 'query');
    },
    getPhotoURLs(variables: GetPhotoUrLsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPhotoUrLsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPhotoUrLsQuery>(GetPhotoUrLsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPhotoURLs', 'query');
    },
    getSport(variables?: GetSportQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSportQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSportQuery>(GetSportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSport', 'query');
    },
    getSports(variables?: GetSportsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSportsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSportsQuery>(GetSportsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSports', 'query');
    },
    getSportsHomePage(variables?: GetSportsHomePageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSportsHomePageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSportsHomePageQuery>(GetSportsHomePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSportsHomePage', 'query');
    },
    Supporting(variables?: SupportingQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SupportingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SupportingQuery>(SupportingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Supporting', 'query');
    },
    getUserInvite(variables: GetUserInviteQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserInviteQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserInviteQuery>(GetUserInviteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserInvite', 'query');
    },
    getUsersByLockerRoom(variables: GetUsersByLockerRoomQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersByLockerRoomQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersByLockerRoomQuery>(GetUsersByLockerRoomDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsersByLockerRoom', 'query');
    },
    invitedUserExists(variables: InvitedUserExistsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InvitedUserExistsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<InvitedUserExistsQuery>(InvitedUserExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'invitedUserExists', 'query');
    },
    userNameExists(variables: UserNameExistsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserNameExistsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserNameExistsQuery>(UserNameExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userNameExists', 'query');
    },
    getDynamicLink(variables: GetDynamicLinkQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDynamicLinkQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDynamicLinkQuery>(DynamicLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDynamicLink', 'query');
    },
    getActualLink(variables: GetActualLinkQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetActualLinkQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActualLinkQuery>(ActualLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getActualLink', 'query');
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
