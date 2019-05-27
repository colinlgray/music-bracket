import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  card: {
    width: theme.spacing(50)
  },
  headerContent: {
    maxWidth: "85%"
  },
  headerText: {
    width: "85%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  player: {
    width: "100%",
    height: "80px"
  }
}));

function Track({ track, onClickCta, primaryIcon, secondaryIcon }) {
  const classes = useStyles();
  const artists = track.artists || [];
  const [ctaClicked, setCtaClicked] = useState(false);

  const artistNames = artists.reduce((memo, val, idx, arr) => {
    if (idx !== 0) {
      memo = `${memo} `;
    }
    memo += val.name;
    if (idx !== arr.length - 1) {
      memo = `${memo},`;
    }
    return memo;
  }, "");

  let icon = ctaClicked ? secondaryIcon : primaryIcon;

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          content: classes.headerContent,
          title: classes.headerText,
          subheader: classes.headerText
        }}
        action={
          <IconButton
            onClick={() => {
              if (!ctaClicked) {
                setCtaClicked(true);
                onClickCta();
              }
            }}
          >
            {icon}
          </IconButton>
        }
        title={track.name}
        subheader={artistNames}
      />
      <CardContent>
        <iframe
          title={track.id}
          src={`https://open.spotify.com/embed/track/${track.id}`}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          className={classes.player}
          width={300}
          height={80}
        />
      </CardContent>
    </Card>
  );
}
export default Track;
