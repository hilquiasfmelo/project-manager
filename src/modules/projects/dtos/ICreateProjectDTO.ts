import { ProjectStatus } from '../enums/ProjectStatus';

export interface ICreateProjectDTO {
  name: string;
  client_id: string;
  status: ProjectStatus;
  logo: string;
  description: string;
}
