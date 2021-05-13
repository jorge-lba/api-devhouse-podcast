import { Schema } from "mongoose"

const EpisodeSchema = new Schema({
  title: String,
  thumbnail: String,
  members: String,
  published_at: Date,
  duration: Number,
  description: String,
  url: String
})

export { EpisodeSchema }