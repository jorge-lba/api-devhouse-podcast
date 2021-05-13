import { model } from "mongoose";
import { IEpisodeDTO } from "../../../dtos/IEpisodeDTO";
import { EpisodeSchema } from "../../mongoose/Episode";
import { IEpisodeRepository } from "../IEpisodeRepository";

class EpisodeRepository implements IEpisodeRepository {
  private repository = model<IEpisodeDTO>('Episode', EpisodeSchema)
  
  async create({
    title,
    description,
    members,
    duration,
    published_at,
    thumbnail,
    url
  }: IEpisodeDTO): Promise<IEpisodeDTO> {

    const episode = this.repository.create({
      title,
      description,
      members,
      duration,
      published_at,
      thumbnail,
      url
    })

    return episode
  }
}

export { EpisodeRepository }