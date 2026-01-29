export interface Sentence {
    id: string
    text: string
    category: string
    isFavorite: boolean
    createdAt: Date
    updatedAt: Date
}

export type SentenceFormData = Omit<Sentence, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>
