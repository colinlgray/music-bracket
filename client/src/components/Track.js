import React from "react";

function Track({ track }) {
  return (
    <iframe
      title={track.id}
      src={`https://open.spotify.com/embed/track/${track.id}`}
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
      width={300}
      height={80}
    />
  );
}
export default Track;
