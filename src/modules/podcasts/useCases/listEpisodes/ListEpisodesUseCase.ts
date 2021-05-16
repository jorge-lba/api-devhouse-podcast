import { IEpisodeRepository } from "../../infra/repositories/IEpisodeRepository";

interface IRequestDTO {
  page: number
  itemsByPage: number
}

class ListEpisodesUseCase {
  constructor(
    private episodeRepository: IEpisodeRepository
  ){}

  async execute({ page, itemsByPage }: IRequestDTO ){
    const episodes = await this.episodeRepository.list(
      page,
      itemsByPage
    )

    return episodes
  }
}

export { ListEpisodesUseCase }