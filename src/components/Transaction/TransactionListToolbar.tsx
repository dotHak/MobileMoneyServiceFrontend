import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const CustomerListToolbar = (props: any) => (
    <Box {...props}>
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <Button color="primary" variant="contained">
                Transfer
            </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <Box sx={{ maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SvgIcon
                                            fontSize="small"
                                            color="action"
                                        >
                                            <SearchIcon />
                                        </SvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Search transactions"
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>
);

export default CustomerListToolbar;
