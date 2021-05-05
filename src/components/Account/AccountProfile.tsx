import { Avatar, Box, Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";
import { UserDetail } from "../../data/entities";

interface Props {
    userDetail: UserDetail;
}
const user = {
    avatar: "/static/images/avatars/avatar_6.png",
};

const AccountProfile: FC<Props> = ({ userDetail }) => (
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
                    {`${userDetail?.firstName} ${
                        userDetail?.middleName === null
                            ? ""
                            : userDetail.middleName
                    }  ${userDetail?.lastName}`}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                    {`${userDetail?.region} | ${userDetail?.city} | ${userDetail?.town}`}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                    {`${userDetail?.houseNumber}`}
                </Typography>
                <Typography color="textSecondary" variant="body1"></Typography>
            </Box>
        </CardContent>
    </Card>
);

export default AccountProfile;
