export function getShortId(id: string) {
  /* We don't want to use all 64 characters of the SHA256 output for displaying the ID, as this is unnecessarily long.
   * We just need only as many characters as is required to avoid a collision between short IDs used for the same pokemon fusion.
   * Each character represents 16 states, total possible states `= 16^x` where `x` is the number of characters used.
   * Let's use `y` to represent how many different sprites exist for a single fusion.
   * Thus the probability of no collision `= 1 * (16^x -1)/16^x * (16^x -2)/16^x * (16^x -3)/16^x * ...` for `y` times.
   * Whilst there is notation to help express this, let's be lazy.
   * Since `y` is going to be far, far lower than `16^x`, we can just round down for each term.
   * This gives us `((16^x - y)/16^x)^y` (technically `y-1` but again, laziness)
   * Then, we just need to roll the dice on this chance as many times as there are fusions.
     * Our final probability of a collision becomes `p = (((16^x - y)/16^x)^y)^(z^2)` (where z = number of based pokemon)
   * We know `z=470`, we can loosely pick `y=30` as an overestimate, and then we just need to try out values for `x` until `p` is close to 1
   * With `x=8` we get `p=0.95` which is satisfactory - a 5% chance that we get a short ID collision across all fusions if they have 30 sprites each.
   * Desmos graph example: https://www.desmos.com/calculator/xq0due3dbi
   */
  return id.slice(0, 8);
}
