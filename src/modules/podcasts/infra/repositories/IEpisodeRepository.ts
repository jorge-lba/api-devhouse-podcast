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
}

export { IEpisodeRepository }