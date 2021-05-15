import { Router } from "express";
import { CreateEpisodeController } from "../../../../modules/podcasts/useCases/createEpisode/CreateEpisodeController";
import { FillEpisodesDatabaseController } from "../../../../modules/podcasts/useCases/fillEpisodesDatabase/FillEpisodesDatabaseController";

const podcastRoutes = Router()

const createEpisodeController = new CreateEpisodeController()
const fillEpisodesDatabaseController = new FillEpisodesDatabaseController()

podcastRoutes.post("/episodes", createEpisodeController.handle)
podcastRoutes.post("/episodes/fill", fillEpisodesDatabaseController.handle)

export { podcastRoutes }