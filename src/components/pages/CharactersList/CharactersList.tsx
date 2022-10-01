export interface Thumbnail {
  path: string
  extension: string
}

export interface Character {
  id: number
  name: string
  description: string
  thumbnail: Thumbnail
}

export interface CharactersListProps {
  characters: Character[]
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  )
}

export default CharactersList;