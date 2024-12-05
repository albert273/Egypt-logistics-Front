import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";
import Image from "next/image"; // Importing Next.js Image component

export default function CardService({ img, title, description, icon }) {
  return (
    <Card
      sx={{
        width: 360,
        height: 450,
        "&:hover .image": {
          transform: "scale(1.1)",
        },
        "&:hover .iconBox": {
          top: "210px", // Adjusted to animate the movement
        },
        position: "relative",
        marginBottom: "40px",
        boxShadow: "none",
        border: "1px solid #abb8c3",
        "&:hover .cardContent": { backgroundColor: "white" },
      }}
    >
      <CardActionArea>
        {/* Remove CardMedia and use the Next.js Image component */}
        <Box  sx={{ overflow: "hidden", height: "240px" }}>
          <Image
          className="image"
            src={img} // Use the img prop for the image
            alt={title}
            layout="responsive"
            width={360}
            height={240}
            objectFit="cover" // Ensure image covers the card
            style={{ transition: "transform 0.3s ease" }} // Add transition for hover effect
          />
        </Box>
        
        <Box
          className="iconBox"
          sx={{
            backgroundColor: "#dd3333",
            color: "white",
            width: "80px",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            position: "absolute",
            top: "180px",
            right: "40px",
            transition: "top 0.3s ease", // Added transition for the 'top' property
          }}
        >
          {icon}
        </Box>
        
        <CardContent className="cardContent" sx={{ padding: "30px 32px 30px 38px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
