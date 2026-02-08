import {  Dialog, DialogActions, DialogContent, } from "@mui/material";
import { colors } from "@/app/constants/colors";
import AuthButton from "../common/AuthButton";
import React from "react";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    btnTitle: string
}

const CustomDialog = ({
    open,
    onClose,
    children,
    btnTitle
}: CustomDialogProps) => {
    return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: colors.surface,
                        borderRadius: "16px",
                        width: "100%",
                        padding: { md: "40px", sm: "30px", xs: "20px" },
                        margin: 0,
                    },
                }}
            >

                {/* Content */}
                <DialogContent
                    sx={{
                        width: "100%",
                        padding: 0,
                        mt: 1,
                        "&::-webkit-scrollbar": { width: "6px" },
                        "&::-webkit-scrollbar-track": {
                            background: colors.surface,
                            borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: colors.border,
                            borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            background: colors.secondary,
                        },
                    }}
                >
                    {children}
                </DialogContent>

                {/* Actions */}
                <DialogActions>
                    <AuthButton
                        onClick={onClose}
                        label={btnTitle}
                        variant="contained"
                        width="100px"
                    />
                </DialogActions>
            </Dialog>
    );
};

export default CustomDialog;
