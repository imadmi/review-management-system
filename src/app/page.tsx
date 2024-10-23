'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Box, Typography, InputAdornment, TextField } from '@mui/material';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import ReviewForm from './Components/ReviewForm';
import CustomModal from './Components/Modal';
import ReviewList from './Components/ReviewList';
import { grey } from '@mui/material/colors';
import { Employee } from './Types/types';
import { useReviews } from './hooks/useReviews';
import toast, { Toaster } from 'react-hot-toast';

const ITEMS_PER_PAGE = 9;

export default function Component() {
    const { employees, fetchReviews, addReview, updateReview, deleteReview } = useReviews();

    useEffect(() => {
        fetchReviews();
    }, []);

    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [formData, setFormData] = useState<Partial<Employee>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredEmployees = useMemo(() => {
        return employees.filter(
            (employee) =>
                employee.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.review.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [employees, searchQuery]);

    React.useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedEmployees = filteredEmployees.slice(startIndex, endIndex);

    const handleOpenModal = (employee: Employee | null = null) => {
        setEditingEmployee(employee);
        setFormData(employee || { stars: 0 });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingEmployee(null);
        setFormData({ stars: 0 });
        setModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (newValue: number | undefined) => {
        setFormData({ ...formData, stars: newValue });
    };
    const handleSubmitReview = async () => {
        if (isSubmitting) return;

        const loadingToast = toast.loading(
            editingEmployee ? 'Updating review...' : 'Adding review...'
        );

        try {
            setIsSubmitting(true);

            if (editingEmployee && formData) {
                await updateReview(editingEmployee.id, formData);
                toast.success('Review updated successfully', { id: loadingToast });
            } else {
                await addReview({
                    login: formData.login || '',
                    companyName: formData.companyName || '',
                    review: formData.review || '',
                    stars: formData.stars || 0,
                });
                toast.success('Review added successfully', { id: loadingToast });
            }

            handleCloseModal();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to submit review', {
                id: loadingToast,
            });
            console.error('Failed to submit review:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteReview = async (id: number) => {
        const loadingToast = toast.loading('Deleting review...');

        try {
            await deleteReview(id);
            toast.success('Review deleted successfully', { id: loadingToast });
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to delete review', {
                id: loadingToast,
            });
            console.error('Failed to delete review:', err);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-200 p-4">
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        duration: 3000,
                        style: {
                            background: '#4CAF50',
                            color: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: '#EF5350',
                            color: '#fff',
                        },
                    },
                    loading: {
                        style: {
                            background: '#2196F3',
                            color: '#fff',
                        },
                    },
                }}
            />
            <Box className="mb-4 p-4">
                <div className="p-4 flex justify-between items-center mb-4">
                    <h1 className="text-black text-3xl font-bold">Review Center</h1>
                    <div className="space-x-2">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md flex items-center space-x-2"
                            onClick={() => handleOpenModal()}
                        >
                            <AiOutlinePlus style={{ marginRight: 2 }} />
                            Add New Review
                        </button>
                    </div>
                </div>
                <Typography
                    component={'div'}
                    sx={{
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                    }}
                >
                    This is a review management system where users can submit reviews for various
                    companies, including a star rating. You can edit or delete reviews and view them
                    paginated. The purpose of this project is to showcase user feedback collection
                    and manipulation.
                </Typography>

                {/* Search Bar */}
                <Box
                    sx={{
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <TextField
                        placeholder="Search by company name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            width: '100%',
                            maxWidth: 500,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: grey[300],
                                    borderRadius: 10,
                                },
                                '&:hover fieldset': {
                                    borderColor: grey[400],
                                    borderRadius: 10,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                    borderRadius: 10,
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AiOutlineSearch size={20} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {filteredEmployees.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No reviews found {searchQuery ? <>for "{searchQuery}"</> : null}
                        </Typography>
                        <Typography color="text.secondary">
                            Try searching for a different company name
                        </Typography>
                    </Box>
                )}

                <ReviewList
                    displayedEmployees={displayedEmployees}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalEmployees={employees.length}
                    page={page}
                    totalPages={Math.ceil(employees.length / ITEMS_PER_PAGE)}
                    onPageChange={handlePageChange}
                    onEditReview={handleOpenModal}
                    onDeleteReview={handleDeleteReview}
                />
            </Box>

            <CustomModal
                open={modalOpen}
                handleClose={handleCloseModal}
                title={editingEmployee ? 'Edit Review' : 'Add New Review'}
                footerButtons={
                    <>
                        <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitReview}
                            variant="contained"
                            color="primary"
                            disabled={!formData.stars}
                        >
                            {editingEmployee ? 'Update' : 'Add'}
                        </Button>
                    </>
                }
            >
                <ReviewForm
                    formData={formData}
                    onChange={handleChange}
                    onRatingChange={handleRatingChange}
                />
            </CustomModal>
        </div>
    );
}
