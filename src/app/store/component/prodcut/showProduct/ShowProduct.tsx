import { Box, Card, CardContent, Typography } from "@mui/material";

const ShowProduct = ({ data }: any) => {
  return (
    <Box sx={{ width: '200px', height:'150px', mx: "auto", p: 2 }}>
      <Card
        key={data.id}
        variant="outlined"
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          height:'100%',
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {data.name}
          </Typography>

          <Typography variant="subtitle1" color="primary" gutterBottom>
            ${data.price}
          </Typography>

          {data.description && (
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShowProduct;
