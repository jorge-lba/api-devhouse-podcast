import { Router } from "express"
import { podcastRoutes } from "./poscast.routes"

const router = Router()

router.use("/podcasts", podcastRoutes)

export { router }