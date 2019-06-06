import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { Competitor } from "../models";

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

type Props = {
  competitor: Competitor;
  onClickCta: () => any;
  viewState: string;
  innerRef?: React.RefObject<any>;
  isDragging?: boolean;
};
function CtaIcon(props: { viewState: string; clicked: boolean }) {
  switch (props.viewState) {
    case "selected":
      return <DeleteIcon />;
    case "search":
      return props.clicked ? <CheckIcon /> : <AddIcon />;
    default:
      return null;
  }
}

function CompetitorDisplay(props: Props) {
  const {
    competitor,
    viewState,
    onClickCta,
    innerRef,
    isDragging,
    ...remaining
  } = props;
  const classes = useStyles();
  const artists = competitor.track.artists || [];
  const [ctaClicked, setCtaClicked] = useState(false);

  const artistNames = artists.reduce(
    (
      memo: string,
      val: { name: string },
      idx: number,
      arr: Array<{ name: string }>
    ) => {
      if (idx !== 0) {
        memo = `${memo} `;
      }
      memo += val.name;
      if (idx !== arr.length - 1) {
        memo = `${memo},`;
      }
      return memo;
    },
    ""
  );
  return (
    <Card className={classes.card} ref={innerRef} {...remaining}>
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
            <CtaIcon viewState={viewState} clicked={ctaClicked} />
          </IconButton>
        }
        title={competitor.track.name}
        subheader={artistNames}
      />
      <CardContent>
        <iframe
          title={competitor.track.id}
          src={`https://open.spotify.com/embed/track/${competitor.track.id}`}
          frameBorder="0"
          allow="encrypted-media"
          className={classes.player}
          width={300}
          height={80}
        />
      </CardContent>
    </Card>
  );
}
export default CompetitorDisplay;
