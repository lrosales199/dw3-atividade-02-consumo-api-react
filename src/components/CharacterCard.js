import Link from "next/link";

export default function CharacterCard({ character }) {
  return (
    <Link href={`/characters/${character.id}`} className="card">
      {character.image ? (
        <img src={character.image} alt={character.name} loading="lazy" />
      ) : (
        <div className="no-img">?</div>
      )}
      <h2>{character.name}</h2>
    </Link>
  );
}
