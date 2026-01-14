import React from "react";
import { Box, Container } from "@mui/material";
import UserStore from "./component/createstore/getstore/UserStore";

const page = () => {
  return (
    <>
     
        {/* Page Content */}
        <Box sx={{ flex: 1 }}>
          <Container maxWidth="xl">
            <Box
              sx={{ width: { xs: "95%", md: "90%" }, margin: "auto", py: 3, }}
            >
              <UserStore />
            </Box>
          </Container>
        </Box>
    </>
  );
};

export default page;
