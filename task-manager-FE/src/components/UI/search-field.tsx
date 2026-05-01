import { forwardRef } from "react";
import { TextField, TextFieldProps, InputAdornment, Box } from "@mui/material";
import { SearchNormal1 } from "iconsax-reactjs";

type SearchFieldProps = TextFieldProps;

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ size = "small", placeholder = "Search...", ...props }, ref) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        size={size}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box display="flex" alignItems="center" color="text.secondary">
                <SearchNormal1 size="20" />
              </Box>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default SearchField;
