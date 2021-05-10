import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
} from "@material-ui/core";
import React, { FC } from "react";
import { Search as SearchIcon } from "react-feather";
import { Merchant } from "../../data/entities";

interface Props {
  setMerchants: React.Dispatch<React.SetStateAction<Merchant[]>>;
  backupList: Merchant[];
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const MerchantsListToolbar: FC<Props> = ({
  setMerchants,
  backupList,
  setOpenPopup,
}) => {
  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const searchWord = event.target.value.toLowerCase();
    if (searchWord.length === 0) {
      setMerchants(backupList);
      return;
    }

    const merchs: Merchant[] = backupList.filter(
      (value) =>
        value.name.toLowerCase().includes(searchWord) ||
        value.address.toLowerCase().includes(searchWord) ||
        value.city.toLowerCase().includes(searchWord) ||
        value.region.toLowerCase().includes(searchWord) ||
        value.email.toLowerCase().includes(searchWord)
    );

    setMerchants(merchs);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          New Merchant
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search merchants"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MerchantsListToolbar;
