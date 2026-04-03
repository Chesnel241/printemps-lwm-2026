import { prisma } from '../db/prisma.server'

export class AuthService {
  /**
   * Normalizes a string for comparison:
   * - Lowercase
   * - Removes accents
   * - Replaces non-alphanumeric with spaces
   */
  private static normalize(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/[^a-z0-9]/g, ' ')      // non-alphanumeric to space
      .trim()
  }

  static async login(name: string, church: string) {
    if (!name || !church) throw new Error('Name and church are required')

    const participants = await prisma.participant.findMany({
      where: { church }
    })

    const inputCleaned = this.normalize(name)
    const inputWords = inputCleaned.split(/\s+/).filter(w => w.length > 1)

    // ── MATCHING STRATEGY (multi-level) ──

    // 1. Exact match (cleaned)
    const exact = participants.find(p => this.normalize(p.name) === inputCleaned)
    if (exact) return exact

    // 2. Input contains all words of the database name
    //    → Person types "Nathalie Martin" and DB has "Nathalie" ✅
    const dbInInput = participants.find(p => {
      const dbNorm = this.normalize(p.name)
      const dbWords = dbNorm.split(/\s+/).filter(w => w.length > 1)
      return dbWords.length > 0 && dbWords.every(w => inputCleaned.includes(w))
    })
    if (dbInInput) return dbInInput

    // 3. Database name contains all words of input
    //    → Person types "sewoong" and DB has "Lee Sewoong" ✅
    const inputInDb = participants.find(p => {
      const dbNorm = this.normalize(p.name)
      return inputWords.length > 0 && inputWords.every(w => dbNorm.includes(w))
    })
    if (inputInDb) return inputInDb

    // 4. Scored Partial Match
    // Handles cases like "Phil Chesnel.E" vs "Phil Chesnel"
    const partialMatches = participants.map(p => {
      const dbNorm = this.normalize(p.name)
      const dbWords = dbNorm.split(/\s+/).filter(w => w.length > 1)
      let score = 0
      
      for (const iw of inputWords) {
        for (const dw of dbWords) {
          if (dw === iw) score += 5             // exact word match
          else if (dw.startsWith(iw)) score += 3 // input is prefix of DB word
          else if (iw.startsWith(dw)) score += 2 // DB word is prefix of input
        }
      }
      return { p, score }
    }).filter(m => m.score > 0)

    if (partialMatches.length > 0) {
      partialMatches.sort((a, b) => b.score - a.score)
      // If we have a clear winner (best score is at least 2 higher than next)
      if (partialMatches.length === 1 || partialMatches[0].score >= partialMatches[1].score + 2) {
        return partialMatches[0].p
      }
    }

    throw new Error('Participant not found')
  }

  static async getParticipants() {
    return prisma.participant.findMany({
      orderBy: { num: 'asc' }
    })
  }
}
