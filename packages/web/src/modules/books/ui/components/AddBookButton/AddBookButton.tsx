import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const AddBookButton = () => {
  return (
    <Button component={RouterLink} to="/catalog/add" variant="contained">
      Add Book
    </Button>
  );
};
