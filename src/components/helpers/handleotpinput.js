// handleOTPInput.js

export const handleOTPInput = (text, field, otp, setOtp, inputRefs) => {
    // Update the OTP state
    const newOtp = { ...otp, [field]: text };

    // Move to the next input once a number is entered
    setOtp(newOtp);

    if (text.length === 1) {
        switch (field) {
            case 1:
                inputRefs[2].current.focus();
                break;
            case 2:
                inputRefs[3].current.focus();
                break;
            case 3:
                inputRefs[4].current.focus();
                break;
            case 4:
                inputRefs[4].current.blur(); // Optionally blur the last input
                break;
            default:
                break;
        }
    }
};
