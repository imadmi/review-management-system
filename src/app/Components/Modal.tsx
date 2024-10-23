import React, { ReactNode } from 'react';
import { Modal, Box, Typography, IconButton, Divider } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { grey } from '@mui/material/colors';

type CustomModalProps = {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: ReactNode;
    footerButtons: ReactNode;
};

const CustomModal: React.FC<CustomModalProps> = ({
    open,
    handleClose,
    title,
    children,
    footerButtons,
}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                    sx={{
                        pt: 3,
                        px: 3,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
                        <AiOutlineClose />
                    </IconButton>
                </Box>
                <Divider sx={{ border: '0.5px solid', borderColor: grey[200], mt: 2 }} />
                <Box
                    sx={{
                        p: 3,
                    }}
                >
                    {children}
                </Box>
                <Divider sx={{ border: '0.5px solid', borderColor: grey[200], mt: 2 }} />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        p: 3,
                    }}
                >
                    {footerButtons}
                </Box>
            </Box>
        </Modal>
    );
};

export default CustomModal;
