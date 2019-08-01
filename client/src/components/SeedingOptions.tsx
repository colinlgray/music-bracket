import React, { ChangeEvent } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    paddingLeft: theme.spacing(2)
  }
}));
const options = [
  { value: "custom", displayText: "Custom" },
  { value: "popularity", displayText: "Popularity" }
];
export function SeedingOptions(props: { onChange: (val: string) => void }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(options[0].value);

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setValue(event.target.value as string);
    props.onChange(event.target.value as string);
  }

  return (
    <Typography
      component="div"
      color="inherit"
      gutterBottom
      className={classes.title}
    >
      <FormControl>
        <InputLabel htmlFor="seed-by">Seed By</InputLabel>
        <Select
          inputProps={{
            id: "seed-by"
          }}
          value={value}
          onChange={handleChange}
        >
          {options.map(i => {
            return (
              <MenuItem key={i.value} value={i.value}>
                {i.displayText}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Typography>
  );
}
