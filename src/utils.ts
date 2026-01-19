/**
 * Randomly shuffles an array in place using Fisher-Yates algorithm.
 * @param array - Array to shuffle
 * @returns The same array, shuffled
 */

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array]; // copy so we don't mutate original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

/**
 * Decodes data from endpoint to human readable
 * @param string - the input you'd like to decode
 * @returns - decoded string
 */

export function decodeHtml(html: string) : string {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
}

