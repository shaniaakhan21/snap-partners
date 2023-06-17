export type RankCriteria = {
  qvNonPL: number,
  qvPL: number,
  teamVolume: number
}

export enum Rank {
  Associate = 'associate',
  Promoter = 'promoter',
  Executive = 'executive',
  Perl = 'perl',
  Sapphire = 'sapphire',
  Ruby = 'ruby',
  Emerald = 'emerald',
  Diamond = 'diamond',
  DoubleDiamond = 'doubleDiamond',
  TripleDiamond = 'tripleDiamond',
  PresidentialDiamond = 'presidentialDiamond',
  AmbassadorDiamond = 'ambassadorDiamond',
  BlueDiamond = 'blueDiamond',
  BlackDiamond = 'blackDiamond',
  CrownAmbassador = 'crownAmbassador'
}

export const rankCriteria: { [key in Rank]: RankCriteria } = {
  [Rank.Associate]: {
    qvNonPL: 100,
    qvPL: 200,
    teamVolume: 300
  },
  [Rank.Promoter]: {
    qvNonPL: 200,
    qvPL: 400,
    teamVolume: 600
  },
  [Rank.Executive]: {
    qvNonPL: 300,
    qvPL: 600,
    teamVolume: 900
  },
  [Rank.Perl]: {
    qvNonPL: 400,
    qvPL: 800,
    teamVolume: 1200
  },
  [Rank.Sapphire]: {
    qvNonPL: 800,
    qvPL: 1600,
    teamVolume: 2400
  },
  [Rank.Ruby]: {
    qvNonPL: 1600,
    qvPL: 3200,
    teamVolume: 4800
  },
  [Rank.Emerald]: {
    qvNonPL: 3500,
    qvPL: 7000,
    teamVolume: 10500
  },
  [Rank.Diamond]: {
    qvNonPL: 8500,
    qvPL: 17000,
    teamVolume: 25500
  },
  [Rank.DoubleDiamond]: {
    qvNonPL: 20000,
    qvPL: 40000,
    teamVolume: 60000
  },
  [Rank.TripleDiamond]: {
    qvNonPL: 50000,
    qvPL: 100000,
    teamVolume: 150000
  },
  [Rank.PresidentialDiamond]: {
    qvNonPL: 125000,
    qvPL: 250000,
    teamVolume: 375000
  },
  [Rank.AmbassadorDiamond]: {
    qvNonPL: 250000,
    qvPL: 500000,
    teamVolume: 750000
  },
  [Rank.BlueDiamond]: {
    qvNonPL: 500000,
    qvPL: 1000000,
    teamVolume: 1500000
  },
  [Rank.BlackDiamond]: {
    qvNonPL: 1000000,
    qvPL: 2000000,
    teamVolume: 3000000
  },
  [Rank.CrownAmbassador]: {
    qvNonPL: 2000000,
    qvPL: 4000000,
    teamVolume: 6000000
  }
}
