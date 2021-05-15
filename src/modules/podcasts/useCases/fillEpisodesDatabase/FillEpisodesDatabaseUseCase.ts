import { IObjectAnchor, MapperObjectChannelAnchor } from "../../../../mappers/MapperObjectChannelAnchor";
import { IHttpProvider } from "../../../../shared/providers/HttpProvider/IHttpProvider";
import { IXmlProvider } from "../../../../shared/providers/XmlProvider/IXmlProvider";
import { IEpisodeDTO } from "../../dtos/IEpisodeDTO";
import { IEpisodeRepository } from "../../infra/repositories/IEpisodeRepository";

class FillEpisodesDatabaseUseCase {
  constructor(
    private episodeRepository: IEpisodeRepository,
    private httpProvider: IHttpProvider,
    private xmlProvider: IXmlProvider
  ){}

  async execute():Promise<any>{
    const lastEpisodeInDatabase = await this.episodeRepository.lastEpisode()

    const data: string = await this.httpProvider.requestGetByUrl(`${
      process.env.ANCHOR_RSS
    }`)

    const result = this.xmlProvider.converteToObjectJs(data) as IObjectAnchor
    //@ts-ignore
    const podcast = MapperObjectChannelAnchor(result)

    const lastEpisodeInAnchor = podcast.episodes[0]
    
    if(lastEpisodeInAnchor?.title === lastEpisodeInDatabase?.title) return {
      message: "The database is already updated",
      episode: lastEpisodeInDatabase
    }

    console.log(lastEpisodeInAnchor?.title === lastEpisodeInDatabase?.title)
    console.log(lastEpisodeInAnchor?.title ,lastEpisodeInDatabase?.title)


    let numberOfMissingEpisodes = podcast.episodes.findIndex(episode => 
      episode.title === lastEpisodeInDatabase?.title
    ) - 1

    if(numberOfMissingEpisodes < 0) numberOfMissingEpisodes = podcast.episodes.length - 1

    let episode:IEpisodeDTO

    for(let i = numberOfMissingEpisodes; i >= 0; i-- ){
      episode = await this.episodeRepository.create({
        title: podcast.episodes[i].title,
        description:podcast.episodes[i].description,
        members:podcast.episodes[i].members,
        duration:Number(podcast.episodes[i].duration),
        published_at:new Date(podcast.episodes[i].pubDate),
        thumbnail:podcast.episodes[i].image,
        url:podcast.episodes[i].link
      })
    }
    
    return {
      message: "The database has been successfully updated!",
      //@ts-ignore
      episode
    }
  }
}

export { FillEpisodesDatabaseUseCase }