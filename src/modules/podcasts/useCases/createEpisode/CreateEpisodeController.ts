import { Request, Response } from "express";
import { EpisodeRepository } from "../../infra/repositories/implements/EpisodeRepository";
import { CreateEpisodeUseCase } from "./CreateEpisodeUseCase";

class CreateEpisodeController {
  async handle(request:Request, response:Response): Promise<Response>{
    const {
      title,
      description,
      members,
      duration,
      published_at,
      thumbnail,
      url
    } = request.body

    const createEpisodeUseCase = new CreateEpisodeUseCase(new EpisodeRepository())
    
    const episode = await createEpisodeUseCase.execute({
      title,
      description,
      members,
      duration,
      published_at,
      thumbnail,
      url
    })

    return response.status(201).json(episode)
  }
}

export { CreateEpisodeController }