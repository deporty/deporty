import { IMatchModel } from '@deporty/entities/tournaments';

export function existSMatchInList(
  match: IMatchModel,
  matches: IMatchModel[]
): boolean {
  return (
    matches.filter((m) => {
      return (
        (m.teamA.id === match.teamA.id && m.teamB.id === match.teamB.id) ||
        (m.teamA.id === match.teamB.id && m.teamB.id === match.teamA.id)
      );
    }).length > 0
  );
}
