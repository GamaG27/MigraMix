import PropTypes from "prop-types";
import { Typography, Card, CardActionArea, CardMedia, CardContent} from "@mui/material";


const FrontSideCard = ({ image,title, price }) => {
  const cardStyle = {
    width: '100%',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
};

const cardMediaStyle = {
    pt: "56.25%",
    backgroundImage: `url(${image})`,
};

const isFreeStyle = {
    background: price === "Free" ? "#84CC14" : "#FF4B4B",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    position: "absolute",
    top: "10px",
    left: "10px",
};

    return (
      <Card sx={cardStyle}>
        <CardActionArea>
            <CardMedia
                component="div"
                sx={cardMediaStyle}
                image={image}
                alt={title}
            />
            <div style={isFreeStyle}>
                {price === "Free" ? "Free" : "Paid"}
            </div>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {title || "Event Title"}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    )
}

FrontSideCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    initialDate: PropTypes.string.isRequired,
    finalDate: PropTypes.string.isRequired,
    urlEvent: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default FrontSideCard
