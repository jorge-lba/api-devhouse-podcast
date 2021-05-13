import axios from "axios"
import { IHttpProvider } from "../IHttpProvider"

class AxiosHttpProvider implements IHttpProvider {
  async requestGetByUrl(url: string){
    const { data } = await axios.get(url)

    return data
  }
}

export { AxiosHttpProvider }