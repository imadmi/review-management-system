import { TextField, Typography, Rating, Stack, Box, InputAdornment } from '@mui/material';
import { AiOutlineUser, AiOutlineBank } from 'react-icons/ai';
import { ChangeEvent } from 'react';
import { Employee } from '../Types/types';

interface ReviewFormProps {
    formData: Partial<Employee>;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onRatingChange: (newValue: number | undefined) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onChange, onRatingChange }) => {
    const fields = [
        {
            name: 'login',
            label: 'Login',
            description: 'Enter the login of the reviewer',
            icon: <AiOutlineUser size={18} />,
        },
        {
            name: 'companyName',
            label: 'Company Name',
            description: 'Enter the name of the company being reviewed',
            icon: <AiOutlineBank size={18} />,
        },
        {
            name: 'review',
            label: 'Review',
            description: 'Share your detailed experience with the company',
            multiline: true,
            rows: 4,
        },
    ];

    return (
        <>
            {fields.map((field) => (
                <Stack key={field.name} gap={2} mb={1}>
                    <Typography color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {field.description}
                    </Typography>
                    <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof Employee] || ''}
                        onChange={onChange}
                        multiline={field.multiline}
                        rows={field.rows}
                        size="small"
                        InputProps={{
                            startAdornment: field.icon ? (
                                <InputAdornment position="start">{field.icon}</InputAdornment>
                            ) : undefined,
                            ...(field.multiline && {
                                startAdornment: (
                                    <Box sx={{ position: 'absolute', top: 13, left: 8 }}>
                                        {field.icon}
                                    </Box>
                                ),
                                sx: { pl: field.icon ? 4 : 2 },
                            }),
                        }}
                    />
                </Stack>
            ))}
            <Box display="flex" justifyContent="center" alignItems="center" pt={2}>
                <Stack alignItems={'center'} gap={1}>
                    <Typography color="text.secondary" fontSize={18}>
                        How was your experience?
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={formData.stars || 0}
                        onChange={(event, newValue) => {
                            if (newValue) onRatingChange(newValue);
                        }}
                        size="large"
                    />
                </Stack>
            </Box>
        </>
    );
};

export default ReviewForm;
