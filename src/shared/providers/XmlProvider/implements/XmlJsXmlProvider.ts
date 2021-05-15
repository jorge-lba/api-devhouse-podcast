import convert from "xml-js"
import { IXmlProvider } from "../IXmlProvider"

class XmlJsXmlProvider implements IXmlProvider {
  converteToObjectJs(xml:string):Object{
    const object = convert.xml2js(xml, { compact: true })    

    return object
  }
}

export { XmlJsXmlProvider }