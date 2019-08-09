import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import { map, without, filter, includes, sortBy } from "lodash";
import CompetitorDisplay from "./CompetitorDisplay";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  minHeight: 400
});

export class CompetitorSelection extends Component {
  state = {
    selectable: [],
    selected: []
  };

  idToList = {
    droppable: "selectable",
    droppable2: "selected"
  };

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    if (droppableDestination.droppableId === "selected") {
      this.props.onAddCompetitor(removed);
      this.props.bracket.save();
    } else {
      this.props.onRemoveCompetitor(removed);
      this.props.bracket.save();
    }
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  getList = id => this.state[this.idToList[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    this.setState({ dragging: false });

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(
        this.state[source.droppableId],
        source.index,
        destination.index
      );
      this.setState({
        [source.droppableId]: reordered
      });
      if (destination.droppableId === "selected") {
        this.props.bracket.updateIndices(
          reordered,
          source.index,
          destination.index
        );
      }
    } else {
      this.setState(
        this.move(
          this.state[source.droppableId],
          this.state[destination.droppableId],
          source,
          destination
        )
      );
    }
  };

  onDragStart = () => {
    this.setState({ dragging: true });
  };

  componentWillReceiveProps(props) {
    if (!this.state.dragging) {
      this.setState({
        selectable: filter(props.selectable, val =>
          includes(props.selectable, val)
        ),
        ...props
      });
    }
  }

  componentDidMount() {
    this.setState({
      selectable: this.props.selectable,
      selected: sortBy(this.props.selected, ["index"])
    });
  }

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
                  {this.state.selectable.map((item, index) => (
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
                            this.props.onAddCompetitor(c);
                            this.setState({
                              selectable: without(this.state.selectable, c),
                              selected: [c].concat(this.state.selected)
                            });
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
                {map(this.state.selected, (item, index) => (
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
                          this.props.onRemoveCompetitor(c);
                          this.setState({
                            selected: without(this.state.selected, c)
                          });
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
