import { Connection } from "../mongoose"
import { app } from "./app"

Connection()

app.listen(process.env.PORT || 3333, () => console.log("Server is running"))