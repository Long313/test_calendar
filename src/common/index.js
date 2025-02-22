export const convertToYYYYMMDD = (isoString) => {
    const date = new Date(isoString);
    const options = { timeZone: 'Asia/Shanghai' };
    const year = date.toLocaleString('en-US', { year: 'numeric', ...options });
    const month = date.toLocaleString('en-US', { month: '2-digit', ...options });
    const day = date.toLocaleString('en-US', { day: '2-digit', ...options });
    return `${year}-${month}-${day}`;
}

export const convertToLongDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
        timeZone: 'Asia/Shanghai',
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

export const convertDate = (isoString) => { 
    const date = new Date(isoString);

    // Định dạng cho múi giờ GMT+7
    const options = { 
        timeZone: 'Asia/Bangkok', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    };

    const formatted = date.toLocaleString('en-US', options);

    return `${formatted} GMT+7`;
};