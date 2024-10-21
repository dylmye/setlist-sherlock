const MusicKitUserTokenError = {
  USER_CANCELLED: 0,
  NO_SUBSCRIPTION: 1,
  SUBSCRIPTION_EXPIRED: 2,
  TOKEN_FETCH_ERROR: 3,
  UNKNOWN: 4,
} as const;

export default MusicKitUserTokenError;
