const SIXTEEN = 16
const HEXA_03 = 0x3
const HEXA_08 = 0x8

export const getID = () => {
  return "xxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (Math.random() * SIXTEEN) | 0,
      v = c === "x" ? r : (r & HEXA_03) | HEXA_08
    return v.toString(SIXTEEN)
  })
}

export const getUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (Math.random() * SIXTEEN) | 0,
      v = c === "x" ? r : (r & HEXA_03) | HEXA_08
    return v.toString(SIXTEEN)
  })
}
