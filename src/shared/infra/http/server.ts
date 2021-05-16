import { Connection } from "../mongoose"
import { app } from "./app"

Connection()

app.listen(3333, () => console.log("Server is running"))