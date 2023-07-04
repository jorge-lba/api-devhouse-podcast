interface IObjectAnchor {
  _declaration: object
  rss: {
    _attributes: object,
    channel: {
      title: { _cdata: string },
      description: { _cdata: string },
      link: { _text: string },
      image: {
        url: { _text: string },
        title: { _text: string },
        link: { _text: string }
      },
      generator: { _text: string },
      lastBuildDate: { _text: string },
      'atom:link': [
        { _attributes: {
            href: string,
            rel: string, 
            type?: string
          } 
        }
      ],
      author: { _cdata: string },
      copyright: { _cdata: string },
      language: { _cdata: string },
      'itunes:author': { _text: string },
      'itunes:summary': { _text: string },
      'itunes:type': { _text: string },
      'itunes:owner': {
        'itunes:name': { _text: string },
        'itunes:email': { _text: string }
      },
      'itunes:explicit': { _text: string },
      'itunes:category': {
        _attributes: { text: string },
        'itunes:category': { _attributes: object }
      },
      'itunes:image': {
        _attributes: {
          href: string
        }
      },
      item: [
        {
          title: { _cdata: string },
          description: { _cdata: string },
          link: { _text: string },
          guid: {
            _attributes: { isPermaLink: boolean },
            _text: string
          },
          "dc:creator": { _cdata: string },
          pubDate: { _text: string },
          enclosure: {
            _attributes: {
              url: string,
              length: string,
              type: string
            }
          },
          "itunes:summary": { _text: string },
          "itunes:explicit": { _text: string },
          "itunes:duration": { _text: string },
          "itunes:image": { _attributes: { href: string } },
          "itunes:episodeType": { _text: string }
        }
      ]
    }
  }
}

interface IPodcastDTO {
  title: string,
  description: string,
  link: string,
  image: {
    url: string,
    title: string,
    link: string
  },
  generator: string,
  lastBuildDate: string,
  'atom:link': [] | [
    {
      href: string,
      rel: string, 
      type?: string
    }
  ],
  author: string,
  copyright: string,
  language: string,
  summary: string,
  type: string,
  owner: {
    name: string,
    email: string
  },
  explicit: string,
  category: {
    _attributes: string,
    category: object
  },
  itunesImage: string,
  episodes: [
    {
      title: string,
      description: string,
      link: string,
      guid: string,
      creator: string,
      pubDate: string,
      enclosure: {
        url: string,
        length: string,
        type: string
      },
      summary: string,
      explicit: string,
      duration: string,
      image: string,
      episodeType: string,
      members: string
    }
  ]
}

const getMembers =(value:string) => value
.replace(/(<([^>]+)>)/gi, "")
.split('host')[1]
.replace(':', '')
.replace('Guets:', '')
.replace(/\&nbsp;/g, '')
.replace(/^\s*\n/gm, '')
.replace(/,/gm, '')
.split(/\n/g)
.filter(member => member)
.join(', ')

const MapperObjectChannelAnchor = (anchor_object: IObjectAnchor): IPodcastDTO => {
  const channel = anchor_object.rss.channel
  //@ts-ignore
  const atomLink:[{
    href: string,
    rel: string, 
    type?: string
  }] = []

  for(let attributes of channel["atom:link"]){
    atomLink.push({
      href: attributes._attributes.href,
      rel: attributes._attributes.rel, 
      type: attributes._attributes?.type
    })
  }

  const episodes =channel.item.map( data => ({
      title: data.title._cdata,
      description: data.description._cdata,
      link: data.link._text,
      guid: data.guid._text,
      creator: data["dc:creator"]._cdata,
      pubDate: data.pubDate._text,
      enclosure: {
        url: data.enclosure._attributes.url,
        length: data.enclosure._attributes.length,
        type: data.enclosure._attributes.type
      },
      summary: data["itunes:summary"]._text,
      explicit: data["itunes:explicit"]._text,
      duration: data["itunes:duration"]._text,
      image: data["itunes:image"]._attributes.href,
      episodeType: data["itunes:episodeType"]._text,
      members: getMembers(data.description._cdata)
    })
  )
  
  return {
    title: channel.title._cdata,
    description: channel.description._cdata,
    link: channel.link._text,
    image: {
      url: channel.image.url._text,
      title: channel.image.title._text,
      link: channel.image.link._text
    },
    generator: channel.generator._text,
    lastBuildDate: channel.lastBuildDate._text,
    'atom:link': atomLink,
    author: channel.author._cdata,
    copyright: channel.copyright._cdata,
    language: channel.language._cdata,
    summary: channel["itunes:summary"]._text,
    type: channel["itunes:type"]._text,
    owner: {
      name: channel["itunes:owner"]["itunes:name"]._text,
      email: channel["itunes:owner"]["itunes:email"]._text
    },
    explicit: channel["itunes:explicit"]._text,
    category: {
      _attributes:  channel["itunes:category"]._attributes.text,
      category: channel["itunes:category"]["itunes:category"]._attributes
    },
    itunesImage: channel["itunes:image"]._attributes.href,
      //@ts-ignore
    episodes    
  }
}

export { IObjectAnchor, MapperObjectChannelAnchor, IPodcastDTO }