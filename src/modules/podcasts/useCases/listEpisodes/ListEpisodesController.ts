import { Request, Response } from "express";
import { EpisodeRepository } from "../../infra/repositories/implements/EpisodeRepository";
import { ListEpisodesUseCase } from "./ListEpisodesUseCase";

class ListEpisodesController {
  async handle(request:Request, response:Response): Promise<Response>{
    const { page, itemsByPage } = request.query


    const pageValue = Number(page ?? 1) -1
    const itemsByPageValue = Number(itemsByPage ?? 10)

    if(pageValue < 0 ) return response.status(409).json({
      error: "Page Error"
    })

    if(itemsByPageValue < 1 ) return response.status(409).json({
      error: "Items by Page Error"
    })

    const listEpisodesUseCase = new ListEpisodesUseCase(
      new EpisodeRepository()
    )

    const episodes = await listEpisodesUseCase.execute({
      page: pageValue,
      itemsByPage: itemsByPageValue
    })

    return response.json(episodes)
  }
}

export { ListEpisodesController }