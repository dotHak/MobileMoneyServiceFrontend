import { Box, CircularProgress, Fade, Typography } from "@material-ui/core";
import React from "react";

interface DisappearingProgressProps {
  isSuccess: boolean;
  isLoading: boolean;
}

export const DisappearingProgress: React.FC<DisappearingProgressProps> = ({
  isSuccess,
  isLoading,
}) => {
  return (
    <Box>
      <Fade
        in={isLoading}
        style={{
          transitionDelay: isLoading ? "400ms" : "0ms",
        }}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>

      <Fade
        in={!isLoading}
        style={{
          transitionDelay: !isLoading ? "400ms" : "0ms",
        }}
        unmountOnExit
      >
        <Typography>{isSuccess ? "Success" : "Failed"}</Typography>
      </Fade>
    </Box>
  );
};
