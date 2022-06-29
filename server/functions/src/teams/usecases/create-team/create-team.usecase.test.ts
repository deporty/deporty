import { ITeamModel } from '@deporty/entities/teams';
import { of } from 'rxjs';
import { Container } from '../../../core/DI';
import { buildContainer } from '../../../test/factories';
import { TeamsModulesConfig } from '../../teams-modules.config';
import { GetTeamByIdUsecase } from '../get-team-by-id/get-team-by-id.usecase';
import { TeamAlreadyExistsException } from './create-team.exceptions';
import { CreateTeamUsecase } from './create-team.usecase';
describe('CreateTeamUsecase', () => {
  let createTeamUsecase: CreateTeamUsecase;
  let getTeamByDocumentUsecase: GetTeamByIdUsecase;
  let container: Container;

  beforeAll(() => {
    container = buildContainer(TeamsModulesConfig);

    createTeamUsecase =
      container.getInstance<CreateTeamUsecase>('CreateTeamUsecase');

    getTeamByDocumentUsecase =
      container.getInstance<GetTeamByIdUsecase>('GetTeamByIdUsecase');
  });
  test('Should create instance', () => {
    expect(createTeamUsecase).not.toBeNull();
  });

  test('Should return a TeamAlreadyExistsException when the document exists in the db', (done) => {
    jest
      .spyOn(getTeamByDocumentUsecase, 'call')
      .mockImplementation((document: string) => {
        return of({
          name: 'Fka',
          id: '10235678989',
        } as ITeamModel);
      });

    const response = createTeamUsecase.call({
      document: '10534521654',
    } as any);
    response.subscribe({
      error: (error: any) => {
        expect(error).toBeInstanceOf(TeamAlreadyExistsException);
        done();
      },
    });
  });
});
