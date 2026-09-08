export const optimizeCloudinaryImage = (url, width = 500) => {
    if (!url?.includes("res.cloudinary.com")) {
        return url;
    }

    return url.replace(
        "/upload/",
        `/upload/f_auto,q_auto,c_pad,w_${width},h_${width},b_white/`,
    );
};
