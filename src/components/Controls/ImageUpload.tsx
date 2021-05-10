import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React from "react";

interface ImageUploadProps {
  endIcon?: React.ReactNode;
  label: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  })
);
export const ImageUpload: React.FC<ImageUploadProps> = ({
  endIcon,
  label,
  setSelectedFile,
}) => {
  const classes = useStyles();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    setSelectedFile(files[0]);
  };
  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="imageUpload"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="imageUpload">
        <Button
          component="span"
          variant="contained"
          color="primary"
          startIcon={<PhotoCamera />}
          endIcon={endIcon}
        >
          {label}
        </Button>
      </label>
    </div>
  );
};
