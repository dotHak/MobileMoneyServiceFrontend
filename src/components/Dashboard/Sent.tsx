import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";
import { FC } from "react";

interface SentProps {
  amount: number;
}

const TSent: FC<SentProps> = ({ amount }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            SENT
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {amount}
          </Typography>
        </Grid>

        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TSent;
