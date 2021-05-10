import { Box, Button, Typography } from "@material-ui/core";
import {
  Fingerprint as FingerprintIcon,
  Save as SaveIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  baseUrl,
  ErrorResponse,
  Fingerprint,
  isErrorResponse,
  isNotFoundResponse,
  NotFoundResponse,
} from "../../data/entities";
import { DisappearingProgress } from "../Controls/DisappearingProgress";
import { ImageUpload } from "../Controls/ImageUpload";

interface FingerprintUploadProps {
  token: string;
}

const fingerUrl = baseUrl + "fingerprints";
const getFingerprint = async (token: string) => {
  return fetch(fingerUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};
const saveFingerprint = async (token: string, data: FormData) => {
  return fetch(fingerUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: data,
  }).then((data) => data.json());
};
const updateFingerprint = async (token: string, data: FormData, id: number) => {
  return fetch(fingerUrl + `/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: data,
  }).then((data) => data.json());
};

export const FingerprintUpload: React.FC<FingerprintUploadProps> = ({
  token,
}) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fingerprint, setFingerprint] = useState<Fingerprint>();
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleSaveImage = async () => {
    setLoading(true);
    setShowLoading(true);
    let formData = new FormData();
    formData.append("file", selectedFile as File);
    let response: Fingerprint | ErrorResponse;
    if (!fingerprint) {
      response = await saveFingerprint(token, formData);
    } else {
      response = await updateFingerprint(token, formData, fingerprint.id);
    }
    if (!isErrorResponse(response)) {
      setFingerprint(response);
      setSelectedFile(undefined);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setShowLoading(false), 5000);
      return;
    }

    setLoading(false);
    setSuccess(false);
    setTimeout(() => setShowLoading(false), 5000);
  };

  useEffect(() => {
    getFingerprint(token).then((data: Fingerprint | NotFoundResponse) => {
      if (!isNotFoundResponse(data)) {
        setFingerprint(data);
      }
    });
  }, [token]);

  return (
    <>
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ImageUpload
          setSelectedFile={setSelectedFile}
          label="Upload Fingerprint"
          endIcon={<FingerprintIcon />}
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          endIcon={<FingerprintIcon />}
          disabled={!selectedFile}
          onClick={handleSaveImage}
        >
          Save
        </Button>{" "}
        {showLoading ? (
          <DisappearingProgress isLoading={isLoading} isSuccess={isSuccess} />
        ) : (
          ""
        )}
      </Box>
      <Typography variant="h5" sx={{ pl: 1, pt: 1 }}>
        {!selectedFile ? "" : selectedFile.name}
      </Typography>
    </>
  );
};
