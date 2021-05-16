import { IEpisodeDTO } from "../../dtos/IEpisodeDTO";
import { IEpisodeRepository } from "../../infra/repositories/IEpisodeRepository";

class CreateEpisodeUseCase {
  constructor(
    private episodeRepository: IEpisodeRepository
  ){}

  async execute({
    title,
    description,
    members,
    duration,
    published_at,
    thumbnail,
    url
  }: IEpisodeDTO): Promise<IEpisodeDTO>{
    const episode = await this.episodeRepository.create({
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

export { CreateEpisodeUseCase }