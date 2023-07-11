import http from "./http-common";
import AuthService from "./auth.service";

class ImageService {

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

        let currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            formData.append('email', currentUser.email);
            formData.append('token', currentUser.token);
        }

        return http.post("/image/import", formData);
    }

    getFiles(email) {
        if (email) {
            return http.get("/image/user-specific?email=" + email);
        }
        return http.get("/image/all");
    }

    getLastFiles() {
        return http.get("/image/last");
    }
}

export default new ImageService();
