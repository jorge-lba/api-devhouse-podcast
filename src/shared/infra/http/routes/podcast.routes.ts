import { Router } from "express";
import { CreateEpisodeController } from "../../../../modules/podcasts/useCases/createEpisode/CreateEpisodeController";
import { FillEpisodesDatabaseController } from "../../../../modules/podcasts/useCases/fillEpisodesDatabase/FillEpisodesDatabaseController";
import { ListEpisodesController } from "../../../../modules/podcasts/useCases/listEpisodes/ListEpisodesController";

const podcastRoutes = Router()

const listEpisodesController = new ListEpisodesController()
const createEpisodeController = new CreateEpisodeController()
const fillEpisodesDatabaseController = new FillEpisodesDatabaseController()

podcastRoutes.get("/episodes", listEpisodesController.handle )
podcastRoutes.post("/episodes", createEpisodeController.handle)
podcastRoutes.post("/episodes/fill", fillEpisodesDatabaseController.handle)

export { podcastRoutes }