export type KickoffStatistic =
  | 'TOUCHDOWNS'
  | 'TACKLES'
  | 'SACKS'
  | 'PASSES_ATTEMPTED'
  | 'PASSES_SUCCEEDED_YARDS'
  | 'RECEPTIONS'
  | 'RECEPTIONS_YARDS'
  | 'RUSHES'
  | 'RUSHING_YARDS'
  | 'TACKLES_SOLO'
  | 'TACKLES_ASSISTED'
  | 'TACKLES_FOR_LOSS'
  | 'EXTRA_POINTS_SUCCEEDED'
  | 'FIELD_GOALS_SUCCEEDED'
  | 'FIELD_GOALS_SUCCEEDED_YARDS_LONGEST'
  | 'FUMBLES_FORCED'
  | 'INTERCEPTIONS'
  | 'PASSES_RATING'
  | 'PASSES_SUCCEEDED'
  | 'PASSES_SUCCEEDED_YARDS_LONGEST'
  | 'PASSES_SUCCEEDED_PERCENTAGE'
  | 'PASSES_SUCCEEDED_THIRTY_PLUS_YARDS'
  | 'RECEPTIONS_YARDS_AVERAGE'
  | 'RECEPTIONS_YARDS_LONGEST'
  | 'RECEPTIONS_THIRTY_PLUS_YARDS'
  | 'PASSES_TARGETED_AT'
  | 'YARDS_AFTER_CATCH'
  | 'RUSHING_YARDS_AVERAGE'
  | 'RUSHING_YARDS_LONGEST'
  | 'RUSHES_TEN_PLUS_YARDS'
  | 'RUSHES_TWENTY_PLUS_YARDS'
  | 'TOUCHDOWNS_PASSES'
  | 'TOUCHDOWNS_PASSES_YARDS_LONGEST'
  | 'TOUCHDOWNS_RECEPTIONS'
  | 'TOUCHDOWNS_RECEPTIONS_YARDS_LONGEST'
  | 'TOUCHDOWNS_RUSHING'
  | 'TOUCHDOWNS_RUSHING_YARDS_LONGEST'
  | 'RUSHES_FIFTEEN_PLUS_MILES_PER_HOUR'
  | 'RUSHES_TWENTY_PLUS_MILES_PER_HOUR'
  | 'PASSES_DEFENDED'

export type KickoffValueType = 'INDIVIDUAL' | 'CUMULATIVE';

export type KickoffStatus = 'SCHEDULED' | 'OPEN' | 'STARTED' | 'FINISHED' | 'PROCESSED';

export interface KickoffSlotRequirements {
  playerPositions?: string[]; // Define PlayerPosition as necessary
}

export interface KickoffStat {
  id: string;
  stat: KickoffStatistic;
  valueNeeded: number;
  valueType: KickoffValueType;
  groupV2?: string;
}

export interface KickoffSlot {
  id: string;
  stats: KickoffStat[];
  requirements: KickoffSlotRequirements[];
  slotOrder?: number;
}

export interface Kickoff {
  id: string;
  name: string;
  slateID: string;
  difficulty: number;
  slots: KickoffSlot[];
  submissionDeadline: string;
  status: KickoffStatus;
  gamesStartAt?: string;
  completedAt?: string;
}

export interface KickoffEdge {
  node: Kickoff;
  cursor: string;
}

export interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
}

export interface SearchKickoffsResponse {
  edges: KickoffEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface SearchKickoffsInput {
  after?: string;
  first: number;
  filters: {
    byIDs: string[];
  };
  sortBy?: 'DEFAULT' | 'CREATED_AT_ASC' | 'CREATED_AT_DESC' | 'UPDATED_AT_ASC' | 'UPDATED_AT_DESC';
}