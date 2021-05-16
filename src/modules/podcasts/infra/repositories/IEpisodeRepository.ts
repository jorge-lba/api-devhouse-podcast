import { IEpisodeDTO } from "../../dtos/IEpisodeDTO";

interface IEpisodeRepository {
  create({
    title,
    description,
    members,
    duration,
    published_at,
    thumbnail,
    url
  }: IEpisodeDTO):Promise<IEpisodeDTO>

  findOne({
    title,
    description,
    members,
    duration,
    published_at,
    thumbnail,
    url
  }: IEpisodeDTO): Promise<IEpisodeDTO | null> 

  lastEpisode(): Promise<IEpisodeDTO | null>

  list(page: number, itemsByPage: number): Promise<IEpisodeDTO[]>
}

export { IEpisodeRepository }