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

    const episode = await this.repository.create({
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

  async findOne({
    title,
    description,
    members,
    duration,
    published_at,
    thumbnail,
    url
  }: IEpisodeDTO):Promise<IEpisodeDTO | null>{
    const episode = await this.repository.findOne({
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

  async lastEpisode():Promise<IEpisodeDTO | null>{
    const episode = await this.repository.findOne({},{},{sort: {
      published_at: -1
    }})

    return episode
  }
}

export { EpisodeRepository }