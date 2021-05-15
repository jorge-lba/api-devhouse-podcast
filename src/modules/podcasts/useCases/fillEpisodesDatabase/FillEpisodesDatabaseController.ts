import { Request, Response } from "express";
import { AxiosHttpProvider } from "../../../../shared/providers/HttpProvider/implements/AxiosHttpProvider";
import { XmlJsXmlProvider } from "../../../../shared/providers/XmlProvider/implements/XmlJsXmlProvider";
import { IEpisodeDTO } from "../../dtos/IEpisodeDTO";
import { EpisodeRepository } from "../../infra/repositories/implements/EpisodeRepository";
import { FillEpisodesDatabaseUseCase } from "./FillEpisodesDatabaseUseCase";

class FillEpisodesDatabaseController {
  async handle(request:Request, response:Response):Promise<Response>{
    const fillEpisodesDatabaseUseCase = new FillEpisodesDatabaseUseCase(
      new EpisodeRepository(),
      new AxiosHttpProvider(),
      new XmlJsXmlProvider()
    )

    const podcast = await fillEpisodesDatabaseUseCase.execute()

    return response.json(podcast)
  }
}

export { FillEpisodesDatabaseController }