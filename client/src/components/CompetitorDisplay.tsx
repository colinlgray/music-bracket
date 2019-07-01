import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { get } from "lodash";
import AddIcon from "@material-ui/icons/Add";
import { Competitor, Artist } from "../models";

const useStyles = makeStyles(theme => ({
  card: {
    width: theme.spacing(50)
  },
  headerContent: {
    maxWidth: "67%"
  },
  headerText: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  player: {
    width: "100%",
    height: "80px"
  }
}));

const getSmallestImage = (competitor: Competitor) => {
  return get(competitor, "model.album.images", []).reduce(
    (memo: any, curr: { width: number; height: number; url: string }) => {
      if (!memo || curr.width < memo.width) {
        return curr;
      }
      return memo;
    },
    ""
  );
};

const getDisplayName = (c: Competitor) => {
  return get(c, "model.artists", []).reduce(
    (memo: string, val: Artist, idx: number, arr: Array<Artist>) => {
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
};

type Props = {
  competitor: Competitor;
  onClickCta: (competitor: Competitor) => any;
  innerRef?: React.RefObject<any>;
  isDragging?: boolean;
};

function CtaIcon(props: { competitor: Competitor }) {
  if (props.competitor.bracketId) {
    return <DeleteIcon />;
  } else {
    return <AddIcon />;
  }
}

function CompetitorDisplay(props: Props) {
  const { competitor, onClickCta, innerRef, isDragging, ...remaining } = props;
  const classes = useStyles();
  const displayName = getDisplayName(competitor);
  const [ctaClicked, setCtaClicked] = useState(false);
  const title = get(competitor, "model.name", "loading");

  const imageData = getSmallestImage(competitor);

  return (
    <Card className={classes.card} ref={innerRef} {...remaining}>
      <CardHeader
        avatar={<img alt="album cover" src={imageData.url} />}
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
                onClickCta(props.competitor);
              }
            }}
          >
            <CtaIcon competitor={competitor} />
          </IconButton>
        }
        title={title}
        subheader={displayName}
      />
    </Card>
  );
}
export default CompetitorDisplay;
