import { Router } from "express";
import { CreateEpisodeController } from "../../../../modules/podcasts/useCases/createEpisode/CreateEpisodeController";

const podcastRoutes = Router()

const createEpisodeController = new CreateEpisodeController()

podcastRoutes.post("/episodes", createEpisodeController.handle)

export { podcastRoutes }