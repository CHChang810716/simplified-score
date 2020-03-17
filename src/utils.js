export const value_or = (v, def) => {
  if(v!==undefined) return v
  else return def;
}
export const rects_union = (rects) => {
    return rects.reduce((r, pr) => {
      console.log(pr)
      let x = Math.min(r.x, pr.x)
      let y = Math.min(r.y, pr.y)
      return {
        x: x,
        y: y,
        width: Math.max(r.x + r.width, pr.x + pr.width)  - x,
        height: Math.max(r.y + r.height, pr.y + pr.height) - y
      }
    })
}