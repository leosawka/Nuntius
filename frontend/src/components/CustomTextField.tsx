import { TextField, TextFieldProps } from '@mui/material'

export default function CustomTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      sx={{
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
      }}
    />
  )
}
