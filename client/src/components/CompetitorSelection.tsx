import React, { Component } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import { map } from "lodash";
import CompetitorDisplay from "./CompetitorDisplay";
import { Competitor } from "../types";
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  minHeight: 400
});

type Props = {
  [key: string]: any;
  onReorder: (params: {
    listName: string;
    startIndex: number;
    endIndex: number;
  }) => void;
  onAddCompetitor: (competitor: Competitor, index: number) => void;
  onRemoveCompetitor: (competitor: Competitor, index: number) => void;
  selected: Array<Competitor>;
  selectable: Array<Competitor>;
};
type State = {
  dragging: boolean;
};

export class CompetitorSelection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dragging: false
    };
  }

  onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    this.setState({ dragging: false });
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      this.props.onReorder({
        listName: source.droppableId,
        startIndex: source.index,
        endIndex: destination.index
      });
      return;
    }

    if (destination.droppableId === "selected") {
      this.props.onAddCompetitor(
        this.props[source.droppableId][source.index],
        destination.index
      );
    } else {
      this.props.onRemoveCompetitor(
        this.props[source.droppableId][source.index],
        destination.index
      );
    }
  };

  onDragStart = () => {
    this.setState({ dragging: true });
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Grid container>
          {this.props.editable && (
            <Droppable droppableId="selectable">
              {(provided, snapshot) => (
                <Grid
                  item
                  ref={provided.innerRef}
                  xs={6}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.props.selectable.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <CompetitorDisplay
                          competitor={item}
                          isDragging={snapshot.isDragging}
                          displayedOn="selection"
                          innerRef={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClickCta={c => {
                            this.props.onAddCompetitor(c, 0);
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          )}
          <Droppable droppableId="selected">
            {(provided, snapshot) => (
              <Grid
                item
                xs={this.props.editable ? 6 : 12}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {map(this.props.selected, (item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <CompetitorDisplay
                        competitor={item}
                        isDragging={snapshot.isDragging}
                        displayedOn="selection"
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClickCta={c => {
                          this.props.onRemoveCompetitor(c, 0);
                        }}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </Grid>
      </DragDropContext>
    );
  }
}
