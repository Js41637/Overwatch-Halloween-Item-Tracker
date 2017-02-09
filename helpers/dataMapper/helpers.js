const qualities = ['common', 'epic', 'rare', 'legendary']
const types = [
  { m: 'skin', name: 'skins' },
  { m: 'icon', name: 'icons' },
  { m: 'spray', name: 'sprays' },
  { m: 'emote', name: 'emotes' },
  { m: 'voice line', name: 'voicelines' },
  { m: 'victory pose', name: 'poses' },
  { m: 'heroic intro', name: 'intros' }
  //, { m: 'weapon skin', name: 'weapons' } // Golden
]
const matches = {} // Generate a match for each quality for every type of item
types.forEach(t => {
  qualities.forEach(q => matches[`${q} ${t.m}`] = { quality: q, type: t.name })
})

const getItemType = type => {
  let m = matches[type.toLowerCase()]
  if (!m) {
    if (type !== 'Common Weapon Skin') console.warn("Unknown type?", type)
    return {}
  }
  return m
}

const getClassForHero = hero => {
  switch (hero) {
    case "genji":
    case "mccree":
    case "pharah":
    case "reaper":
    case "soldier: 76":
    case "sombra":
    case "tracer":
      return "Assault"
    case "bastion":
    case "hanzo":
    case "junkrat":
    case "mei":
    case "torbjörn":
    case "widowmaker":
      return "Defence"
    case "d.va":
    case "reinhardt":
    case "roadhog":
    case "winston":
    case "zarya":
      return "Tank"
    case "ana":
    case "lúcio":
    case "mercy":
    case "symmetra":
    case "zenyatta":
      return "Support"
    default:
      return "Unknown"
  }
}

const getCleanID = (what, hero) => {
  return (hero ? `${hero}-` : '') + what.toLowerCase().replace('å', 'a').replace(/[öô]/g, 'o').replace('ú', 'u').replace('çã', 'ca').replace(/[^a-zA-Z 0-9]/g, '').replace(/ /g, '-')
}

const getImageURL = (type, event, id) => {
  const baseUrl = `./resources/updates/${event}/${type}/${id}`
  switch (type) {
    case 'emotes':
    case 'intros':
      return `${baseUrl}.webm`
    case 'sprays':
    case 'icons':
      return `${baseUrl}.png`
    case 'skins':
    case 'skinsEpic':
    case 'skinsLegendary':
    case 'poses':
      return `${baseUrl}.jpg`
  }
}

// http://stackoverflow.com/a/1359808
// Makes it so it JSON.stringify's in order
const sortObject = (o, update) => {
  var sorted = {}, key, a = []
  for (key in o) {
    if (o.hasOwnProperty(key)) a.push(key)
  }
  if (update) {
    a.sort((a, b) => {
      if (o[a].order < o[b].order) return -1;
      if (o[a].order > o[b].order) return 1;
      return 0;
    })
  } else {
    a.sort()
  }
  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]]
  }
  if (update) {
    Object.keys(sorted).forEach(update => {
      delete sorted[update].order
    })
  }
  return sorted
}

module.exports = { getCleanID, getClassForHero, getItemType, getImageURL, sortObject }
