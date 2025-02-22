import http from "./http-common";
import AuthService from "./auth.service";

class ImageService {

    uploadImage(file, speciesName, sex, ageInDays, location, moultingStep, isFossil, isCaptive, specimenCount) {
        let formData = new FormData();

        formData.append("file", file);
        formData.append('taxonName', speciesName);
        formData.append('specimenCount', String(specimenCount));
        formData.append('sex', sex);
        formData.append('moultingStep', moultingStep);
        formData.append('isFossil', isFossil);
        formData.append('isCaptive', isCaptive);
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

    getFilesFromTaxon(taxonName) {
        if (taxonName) {
            return http.get("/image/taxon-specific?taxonName=" + taxonName);
        }
        return http.get("/image/all");
    }

    getTaxAnnotationsFromImageFilename(filename) {
        return http.get("/taxon-annotation/one?imageFilename=" + filename);
    }

    deleteTaxAnnotationsFromImageFilename(filename) {
        let currentUser = AuthService.getCurrentUser();
        let email;
        let token;
        if (currentUser) {
            email = currentUser.email;
            token = currentUser.token;
        }
        return fetch(process.env.REACT_APP_API_URL + "/taxon-annotation/delete", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"email": email, "token": token, "imageFilename": filename })
        })
            .then(response => response.json())
    }
}

export default new ImageService();
