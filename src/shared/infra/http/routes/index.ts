import { Router } from "express"
import { podcastRoutes } from "./podcast.routes"

const router = Router()

router.use("/podcasts", podcastRoutes)

export { router }