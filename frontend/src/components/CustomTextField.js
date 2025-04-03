import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from '@mui/material';
export default function CustomTextField(props) {
    return (_jsx(TextField, { ...props, sx: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'whitesmoke',
                },
                '&:hover fieldset': {
                    borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white',
                },
            },
            '& .MuiInputBase-input::placeholder': {
                color: 'whitesmoke',
            },
            input: { color: 'white' },
            textarea: { color: 'white' },
            label: { color: 'whitesmoke' },
            ...props.sx,
        } }));
}
