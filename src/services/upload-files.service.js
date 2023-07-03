import http from "./http-common";

class UploadFilesService {

    uploadImage(file, speciesName, sex, ageInDays, location, moultingStep, isFossil, specimenCount) {
        let formData = new FormData();

        formData.append("file", file);
        formData.append('speciesName', speciesName);
        formData.append('specimenCount', String(specimenCount));
        formData.append('sex', sex);
        formData.append('moultingStep', moultingStep);
        formData.append('isFossil', isFossil);
        if (ageInDays !== undefined && ageInDays !== '') {
            formData.append('ageInDays', String(ageInDays));
        }
        if (location !== undefined && location !== '') {
            formData.append('location', location);
        }
        return http.post("/image/import", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    getFiles() {
        return http.get("/image/all");
    }
}

export default new UploadFilesService();
