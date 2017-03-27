const fs = require('fs')
const _getCleanID = require('../../dataMapper/utils').getCleanID

const getCleanID = (what, hero) => {
  return _getCleanID(what.replace(/\.(png|dds|jpg)|$/, ''), hero)
}

const cleanFileIDs = (files, heroID) => {
  var itemIDCache = {}
  return files.map(file => {
    var id = getCleanID(file, heroID)
    if (itemIDCache[id]) {
      console.warn("ItemID collision found", id)
      id = `${id}1`
    }
    itemIDCache[id] = true
    return { name: file, cleanName: id}
  })
}

const getDirectories = where => {
  return new Promise((resolve, reject) => {
    fs.stat(where, err => {
      if (err) return reject(`${where} doesn't exist`)
      fs.readdir(where, (err, dirs) => {
        if (err) return reject("I dunno, no dirs??")
        return resolve(dirs.map(d => (d.startsWith('!') || d.endsWith('.js') || d.endsWith('.json')) ? null : d).filter(Boolean))
      })
    })
  })
}

const checkDirectorys = (who, type) => {
  return new Promise(resolve => {
    fs.stat(`./${who}`, err => {
      if (err) {
        fs.mkdir(`./${who}`, () => {
          fs.mkdir(`./${who}/${type}`, resolve)
        })
      } else resolve()
    })
  })
}

module.exports = { getDirectories, getCleanID, checkDirectorys, cleanFileIDs }