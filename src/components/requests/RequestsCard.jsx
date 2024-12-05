import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function RequestsCard({
  name,
  email,
  phoneNumber,
  exportingCountry,
  importingCountry,
  createdAt,
  id,
  status,
  finishedAt
}) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Request from{" "}
          <span style={{ color: "#dd3333", fontWeight: "bold" }}>{name}</span>
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Email:
            </Typography>
            <Typography variant="body1">{email}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Phone:
            </Typography>
            <Typography variant="body1">{phoneNumber}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Exporting Country:
            </Typography>
            <Typography variant="body1">{exportingCountry}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Importing Country:
            </Typography>
            <Typography variant="body1">{importingCountry}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Requested on:
            </Typography>
            <Typography variant="body1">
              {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link href={`/pages/Requests/RequestDetails/${id}`}>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#dd3333",
              padding: {
                xs: "8px 12px",
                sm: "10px 16px",
              },
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "16px",
              transition: ".3s",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
          >
            show details
          </Button>
        </Link>
        {status?.length === 0 ? (
          <Typography sx={{color: '#dd3333', fontSize: "1.2rem"}}>In progress</Typography>
        ) : (
          <Stack alignItems={'center'}>
          <Typography sx={{color: '#dd3333', fontSize: "1.2rem"}}>Finished</Typography>
          <Typography sx={{color: '#00000'}}>{new Date(finishedAt).toLocaleDateString()}</Typography>
          </Stack>

        )}
      </Stack>
    </Card>
  );
}
