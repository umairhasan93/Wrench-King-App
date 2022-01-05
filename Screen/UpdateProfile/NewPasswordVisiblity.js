import React, { useState } from 'react';

export const useToggleNewPasswordVisibility = () => {
    const [newpasswordVisibility, setNewPasswordVisibility] = useState(true);
    const [rightNewIcon, setRightNewIcon] = useState('eye-outline');

    const handleNewPasswordVisibility = () => {
        if (rightNewIcon === 'eye-outline') {
            setRightNewIcon('eye-off-outline');
            setNewPasswordVisibility(!newpasswordVisibility);
        } else if (rightNewIcon === 'eye-off-outline') {
            setRightNewIcon('eye-outline');
            setNewPasswordVisibility(!newpasswordVisibility);
        }
    };

    return {
        newpasswordVisibility,
        rightNewIcon,
        handleNewPasswordVisibility
    };
};