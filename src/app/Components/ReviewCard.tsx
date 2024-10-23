import { Typography, Rating, Stack, Box, Divider, Button } from '@mui/material';
import { AiFillDelete, AiFillEdit, AiOutlineUser, AiTwotoneBank } from 'react-icons/ai';
import { grey } from '@mui/material/colors';
import { FC } from 'react';
import { Employee } from '../Types/types';

type ReviewCardProps = {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
};

const ReviewCard: FC<ReviewCardProps> = ({ employee, onEdit, onDelete }) => (
    <Box sx={{ bgcolor: 'white', borderRadius: 4, boxShadow: 1 }}>
        <Box sx={{ pt: 2, pb: 1, px: 3 }}>
            <Stack direction={'row'} alignItems={'center'}>
                <AiTwotoneBank
                    size={52}
                    color={grey[600]}
                    style={{
                        marginRight: '20px',
                        backgroundColor: grey[100],
                        padding: '5px',
                        borderRadius: '10%',
                        border: '1px solid #e0e0e0',
                    }}
                />
                <Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h6">{employee.companyName}</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography color="grey">Rating :</Typography>
                        <Rating name="read-only" value={employee.stars} readOnly size="small" />
                    </Stack>
                </Stack>
            </Stack>
        </Box>
        <Divider sx={{ border: '0.5px solid', borderColor: grey[200], mt: 2 }} />
        <Box mt={2} px={3} py={1} sx={{ maxHeight: 300, overflow: 'auto' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <AiOutlineUser size={16} color={grey[600]} />
                <Typography color="text.secondary">
                    {employee.login} : {employee.review}
                </Typography>
            </Stack>
        </Box>
        <Divider sx={{ border: '0.5px solid', borderColor: grey[200], mt: 2 }} />
        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ p: 2 }}>
            <Button
                size="small"
                startIcon={<AiFillEdit />}
                onClick={() => onEdit(employee)}
                sx={{
                    color: 'warning.main',
                    '&:hover': {
                        backgroundColor: 'warning.light',
                    },
                }}
            >
                Edit
            </Button>
            <Button
                size="small"
                startIcon={<AiFillDelete />}
                onClick={() => onDelete(employee.id)}
                sx={{
                    color: 'error.main',
                    '&:hover': {
                        backgroundColor: 'error.light',
                    },
                }}
            >
                Delete
            </Button>
        </Stack>
    </Box>
);

export default ReviewCard;
