import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import { red } from "@material-ui/core/colors";
import { FC } from "react";

interface ReceivedProps {
    total: Number;
}

const TReceived: FC<ReceivedProps> = ({ total }) => (
    <Card sx={{ height: "100%" }}>
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
            >
                <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                        RECEIVED
                    </Typography>
                    <Typography color="textPrimary" variant="h3">
                        {total}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: red[600],
                            height: 56,
                            width: 56,
                        }}
                    >
                        <MoneyIcon />
                    </Avatar>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default TReceived;
