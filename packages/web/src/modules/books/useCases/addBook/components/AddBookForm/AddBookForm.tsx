import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, Stack, TextField } from "@mui/material";

import { AddBookFormValues, useAddBookForm } from "./useAddBookForm";

type AddBookFormProps = {
  isAdding: boolean;
  onSubmit: (values: AddBookFormValues) => void;
};

export const AddBookForm = ({ isAdding, onSubmit }: AddBookFormProps) => {
  const { fields, handleSubmit } = useAddBookForm({
    onSubmit,
  });

  return (
    <Stack component="form" onSubmit={handleSubmit} gap={3}>
      {/* TITLE FIELD */}
      <FormControl fullWidth {...fields.title}>
        <TextField id="addBookForm.title" name="title" label="Book title" />
        {/* <FormHelperText error>We'll never share your email.</FormHelperText> */}
      </FormControl>

      {/* AUTHOR FIELD */}
      <FormControl fullWidth {...fields.author}>
        <TextField id="addBookForm.author" name="author" label="Author" />
        {/* <FormHelperText error>We'll never share your email.</FormHelperText> */}
      </FormControl>

      {/* ISBN FIELD */}
      <FormControl fullWidth {...fields.isbn}>
        <TextField id="addBookForm.isbn" name="isbn" label="ISBN" />
        {/* <FormHelperText error>We'll never share your email.</FormHelperText> */}
      </FormControl>

      {/* ACTIONS */}
      <Box>
        <LoadingButton type="submit" variant="contained" loading={isAdding}>
          Add book
        </LoadingButton>
      </Box>
    </Stack>
  );
};
