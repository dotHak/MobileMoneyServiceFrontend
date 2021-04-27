import { Avatar, Box, Card, CardContent, Typography } from "@material-ui/core";
import { UserDetail } from "../../data/entities";

interface Props {
    userDetail: UserDetail;
}
const user = {
    avatar: "/static/images/avatars/avatar_6.png",
};

const AccountProfile = (props: Props) => (
    <Card>
        <CardContent>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 100,
                        width: 100,
                    }}
                />
                <Typography color="textPrimary" gutterBottom variant="h3">
                    {`${props.userDetail?.firstName} ${props.userDetail?.middleName}  ${props.userDetail?.lastName}`}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                    {`${props.userDetail?.region} | ${props.userDetail?.city} | ${props.userDetail?.town}`}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                    {`${props.userDetail?.houseNumber}`}
                </Typography>
                <Typography color="textSecondary" variant="body1"></Typography>
            </Box>
        </CardContent>
    </Card>
);

export default AccountProfile;
