import { Grid, TextField, Typography } from "@mui/material";

const Thermoproject = (props: any) => {
  const { projNo, setProjNo, projName, setProjName, projDesc, setProjDesc } =
    props;

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        Project Data (only support English charset):
      </Typography>
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        item
        xs={4}
        gap={2}
        sx={{
          ml: 4,
          width: "75%",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Project No."
          variant="outlined"
          value={projNo}
          color="secondary"
          onChange={(e) => {
            setProjNo(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Project Name"
          variant="outlined"
          value={projName}
          color="secondary"
          multiline
          rows={3}
          onChange={(e) => {
            setProjName(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Project Description"
          variant="outlined"
          value={projDesc}
          color="secondary"
          multiline
          rows={7}
          onChange={(e) => {
            setProjDesc(e.target.value);
          }}
        />
      </Grid>
    </>
  );
};

export default Thermoproject;
