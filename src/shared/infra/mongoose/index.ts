import { connect } from "mongoose"

const Connection = () => connect( `${process.env.MONGO_DB_LOCAL_URL}`, {useNewUrlParser: true, useUnifiedTopology: true })

export { Connection }