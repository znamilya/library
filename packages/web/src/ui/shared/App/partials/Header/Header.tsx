import { AppBar, Box, Button, Container, Toolbar, Link, Typography, BoxProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type HeaderProps = BoxProps;

export const Header = ({ sx, ...props }: HeaderProps) => {
  return (
    <Box {...props} sx={{ ...sx, flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to="/" color="common.white" underline="none">
                Logo
              </Link>{" "}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
