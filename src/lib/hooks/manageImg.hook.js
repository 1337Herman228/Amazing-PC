
const useManageImg = () => {

    const saveImg = async (imgName, img) => {

        const formData = new FormData();
        formData.append('file', img);
        formData.append('name', imgName.toLowerCase().replace(/\s/g, '-'));

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error('Upload failed.');
            }
        } catch (error) {
        }
    }

    const deleteImg = async (imgName) => {

        const formData = new FormData();
        formData.append('name', imgName.toLowerCase().replace(/\s/g, '-'));

        try {
            const response = await fetch('/api/unlink', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error('Delete failed.');
            }
        } catch (error) {
        }
    }

    return {saveImg, deleteImg}
};

export default useManageImg